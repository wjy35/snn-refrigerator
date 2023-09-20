package com.ssafy.ingredientextract.trie;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Trie {
    private Map<Short, String> dict = new HashMap<Short, String>();

    Node root = new Node(' ');
    Trie(){
        root.fail = root;
    }

    public String getIngredient(Short idx){
        return dict.get(idx);
    }

    public void addWord(Short id, String word){
        Node now = this.root;
        for(char c : word.toCharArray()){
            if(now.child.containsKey(c)) {
                now = now.child.get(c);
            }
            else{
                Node next = new Node(c);
                now.child.put(c,next);
                now = next;
            }
        }
        dict.put(id, word);
        now.isEnd.add(id);
    }

    public void bfs(){
        ArrayDeque<Node> deque = new ArrayDeque<>();
            deque.add(root);
            while(!deque.isEmpty()){
                Node now = root;
                now = deque.poll();
                for(Node next:now.child.values()){
                    Node prev  = now.fail;
                    if(now==root) next.fail = root;
                    else{
                        while(prev!=root&&prev.child.containsKey(next.value)){
                            prev = prev.fail;
                        }
                        next.fail = prev = prev.child.getOrDefault(next.value,prev);
                    }
                    next.isEnd.addAll(prev.isEnd);
                    deque.offerLast(next);
                }
            }
    }

    public Set<Short> ahoCorasick(String keyword){
        Node now = root;
        Set<Short> ret = new HashSet<Short>();
        for(char c : keyword.toCharArray()){
            while(now!=root&&!now.child.containsKey(c)) now = now.fail;
            now = now.child.getOrDefault(c,now);
            ret.addAll(now.isEnd);
        }
        return ret;
    }
}
