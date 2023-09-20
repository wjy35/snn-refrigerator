package com.ssafy.ingredientautocomplete.util;

import com.ssafy.ingredientautocomplete.db.entity.IngredientInfoEntity;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Trie {

    //초성, 중성, 종성
    final static String[][] HANGUL = {
            { "ㄱ", "ㄱㄱ", "ㄴ", "ㄷ", "ㄷㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅂㅂ", "ㅅ", "ㅅㅅ", "ㅇ", "ㅈ", "ㅈㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" },
            { "ㅏ", "ㅏㅣ", "ㅑ", "ㅑㅣ", "ㅓ", "ㅓㅣ", "ㅕ", "ㅕㅣ", "ㅗ", "ㅗㅏ", "ㅗㅏㅣ", "ㅗㅣ", "ㅛ", "ㅜ", "ㅜㅓ", "ㅜㅓㅣ", "ㅜㅣ", "ㅠ", "ㅡ", "ㅡㅣ", "ㅣ" },
            { "", "ㄱ", "ㄱㄱ", "ㄱㅅ", "ㄴ", "ㄴㅈ", "ㄴㅎ", "ㄷ", "ㄹ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅁ", "ㅂ", "ㅂㅅ", "ㅅ", "ㅅㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" }};

    final static StringBuilder sb = new StringBuilder();

    class Node {
        HashMap<Character,Node> child;
        char value;
        ArrayList<IngredientInfoEntity> found;
        public Node(char value) {
            this.child = new HashMap<>();
            this.value = value;
        }
    }

    private final Node root;

    public Trie(){
        root = new Node('*');
    }

    public void init(List<IngredientInfoEntity> dict){
        for(IngredientInfoEntity entity:dict) addWord(entity.getIngredientName(), entity);
    }

    public String toHangulString(String s){
        sb.setLength(0);
        for(char ch:s.toCharArray()){
            if (ch < 0xAC00 || ch > 0xD7A3) continue;
            sb.append(HANGUL[0][(ch-0xAC00)/588]);
            sb.append(HANGUL[1][((ch-0xAC00)%588)/28]);
            sb.append(HANGUL[2][(ch-0xAC00)%28]);
        }
        return sb.toString();
    }

    public void addWord(String word, IngredientInfoEntity obj){
        Node now = root;
        for(char c : toHangulString(word).toCharArray()){
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
        for(char ch:toHangulString(keyword).toCharArray()){
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
