package com.ssafy.ingredientautocomplete.util;

import com.ssafy.ingredientautocomplete.db.entity.IngredientInfoEntity;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Trie {

    //초성, 중성, 종성
    final static char[][] HANGUL = {
            { 0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139, 0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147, 0x3148, 0x3149, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e },
            { 0x314f, 0x3150, 0x3151, 0x3152, 0x3153, 0x3154, 0x3155, 0x3156, 0x3157, 0x3158, 0x3159, 0x315a, 0x315b, 0x315c, 0x315d, 0x315e, 0x315f, 0x3160, 0x3161, 0x3162, 0x3163 },
            { 0,      0x3131, 0x3132, 0x3133, 0x3134, 0x3135, 0x3136, 0x3137, 0x3139, 0x313a, 0x313b, 0x313c, 0x313d, 0x313e, 0x313f, 0x3140, 0x3141, 0x3142, 0x3144, 0x3145, 0x3146, 0x3147, 0x3148, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e }};

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
        root = new Node(' ');
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
            if((ch-0xAC00)%28!=0) sb.append(HANGUL[2][(ch-0xAC00)%28]);
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
