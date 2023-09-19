package com.ssafy.ingredientextract.trie;


import lombok.Data;
import java.util.HashMap;
import java.util.Set;

@Data
public class Node {
    HashMap<Character, Integer> child;
    char value;
    int fail;
    Set<Integer> isEnd;

    public Node(HashMap<Character, Integer> child, char value, Set<Integer> isEnd) {
        this.child = child;
        this.value = value;
        this.isEnd = isEnd;
    }
}
