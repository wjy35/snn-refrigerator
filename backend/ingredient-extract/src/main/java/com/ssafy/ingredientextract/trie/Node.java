package com.ssafy.ingredientextract.trie;


import lombok.Data;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Data
public class Node {
    HashMap<Character, Node> child;
    char value;
    Node fail;
    Set<Short> isEnd;

    public Node(char value) {
        this.child = new HashMap<Character, Node>();
        this.value = value;
        this.isEnd = new HashSet<Short>();
    }
}
