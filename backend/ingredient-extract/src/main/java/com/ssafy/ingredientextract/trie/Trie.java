package com.ssafy.ingredientextract.trie;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Trie {
    private List<Node> trie = new ArrayList<Node>();
    private List<String> dict = new ArrayList<String>();

    Trie(){
        Node root = new Node(
                new HashMap<Character, Integer>(),
                ' ',
                new HashSet<Integer>()
        );
        trie.add(root);
        System.out.println("Trie successfully created");
    }

    public String getIngredient(int idx){
        return dict.get(idx);
    }

    public void addWord(String word){
        char[] charArr = word.toCharArray();
        int leng = trie.size();
        Node cur = trie.get(0);
        for(char c : charArr){
            if(cur.child.containsKey(c)){
                int idx = cur.child.get(c);
                cur = trie.get(idx);
            }
            else{
                Node newNode = new Node(new HashMap<Character, Integer>(), c, new HashSet<Integer>());
                trie.add(newNode);
                cur.child.put(c, leng++);
                cur = newNode;
            }
        }
        cur.isEnd.add(dict.size());
        dict.add(word);

        //트라이 제작 끝.
        //BFS를 통해 Fail 함수 전파

        Node root = trie.get(0);
        root.fail = 0;

        Queue<Integer> que = new LinkedList<Integer>();
        que.add(0); //루트 노드 저장
        while(!que.isEmpty()){
            Node now = trie.get(que.poll());

            for(Map.Entry<Character, Integer> elem: now.child.entrySet()){
                Node next = trie.get(elem.getValue());
                int idx = now.fail;
                Node prev = trie.get(idx);

                if(now == root){
                    next.fail = 0;
                }
                else{
                    while(prev != root && !prev.child.containsKey(elem.getKey())){
                        idx = prev.fail;
                        prev = trie.get(idx);
                    }
                    if(prev.child.containsKey(elem.getKey())){
                        idx = prev.child.get(elem.getKey());
                        prev = trie.get(idx);
                    }
                    next.fail = idx;
                }

                if(!prev.isEnd.isEmpty()){
                    next.isEnd.addAll(prev.isEnd);
                }
                que.add(elem.getValue());
            }
        }
    }

    public Set<Integer> ahoCorasick(String searchWord){
        Node cur = trie.get(0);
        Node root = trie.get(0);

        Set<Integer> result = new HashSet<Integer>();
        for(int i = 0; i < searchWord.length(); i++){
            char c = searchWord.charAt(i);
            while(cur != root && !cur.child.containsKey(c)){
                cur = trie.get(cur.fail);
            }

            if(cur.child.containsKey(c)){
                cur = trie.get(cur.child.get(c));
            }

            if(!cur.isEnd.isEmpty()){
                result.addAll(cur.isEnd);
            }
        }
        return result;
    }
}
