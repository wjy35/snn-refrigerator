package com.ssafy.ingredientextract.trie;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Trie {
    private List<Node> trie = new ArrayList<Node>();
    List<String> dict = new ArrayList<String>();

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
                Node newNode = new Node(new HashMap<Character, Integer>(), c, null);
                trie.add(newNode);
                cur.child.put(c, leng++);
                cur = newNode;
            }
        }
        cur.isEnd = Integer.valueOf(dict.size());
        dict.add(word);

        //트라이 제작 끝.
        //BFS를 통해 Fail 함수 전파

        Node root = trie.get(0);

        Queue<Integer> que = new LinkedList<Integer>();
        que.add(0); //루트 노드 저장
        while(!que.isEmpty()){
            Node now = trie.get(que.poll());

            for(Map.Entry<Character, Integer> elem: now.child.entrySet()){
                Node next = trie.get(elem.getValue());
                if(now == root){
                    next.fail = 0;
                }
//                else{
//                    prev =
//                }


            }



        }

    }

    public List<String> ahoCorasick()
}
