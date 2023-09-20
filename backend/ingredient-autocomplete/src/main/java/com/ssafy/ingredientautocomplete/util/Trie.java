package com.ssafy.ingredientautocomplete.util;

import com.ssafy.ingredientautocomplete.db.entity.IngredientInfoEntity;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Trie {

    class Node {
        HashMap<Character,Node> child;
        char value;
        ArrayList<IngredientInfoEntity> found;
        public Node(char value) {
            this.child = new HashMap<>();
            this.value = value;
        }

        @Override
        public String toString() {
            return "Node{" +
                    "child=" + child +
                    ", value=" + value +
                    ", found=" + found +
                    '}';
        }
    }

    private final Node root;

    public Trie(){
        root = new Node(' ');
    }

    public void init(List<IngredientInfoEntity> dict){
        for(IngredientInfoEntity entity:dict) addWord(entity.getIngredientName(), entity);
    }

    public void addWord(String word, IngredientInfoEntity obj){
        Node now = root;
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
        if(now.found==null) now.found = new ArrayList<>();
        now.found.add(obj);
    }

    public List<IngredientInfoEntity> find(String keyword, int limit){
        List<IngredientInfoEntity> ret = new ArrayList<>();
        Node now = root;
        for(char ch:keyword.toCharArray()){
            if(!now.child.containsKey(ch)) return ret;
            now = now.child.get(ch);
        }
        ArrayDeque<Node> dq = new ArrayDeque<>();
        dq.offerLast(now);
        while(!dq.isEmpty()){
            now = dq.pollFirst();
            if(now.found!=null) ret.addAll(now.found);
            if(ret.size()>=limit) return ret;
            for(Node next:now.child.values()) dq.offerLast(next);
        }
        return ret;
    }

}
