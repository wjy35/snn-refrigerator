package com.ssafy.ingredientextract.trie;


import lombok.Data;
import java.util.HashMap;

@Data
public class Node {
    HashMap<Character, Integer> child;
    char value;
    int fail;
    Integer isEnd;

    public Node(HashMap<Character, Integer> child, char value, Integer isEnd) {
        this.child = child;
        this.value = value;
        this.isEnd = isEnd;
    }
}
