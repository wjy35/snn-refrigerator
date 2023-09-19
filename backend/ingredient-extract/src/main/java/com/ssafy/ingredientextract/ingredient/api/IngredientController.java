package com.ssafy.ingredientextract.ingredient.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.ssafy.ingredientextract.ingredient.api.Request.TextListRequest;
import com.ssafy.ingredientextract.ingredient.api.Response.Response;
import com.ssafy.ingredientextract.ingredient.api.Response.ResponseViews;
import com.ssafy.ingredientextract.trie.Trie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("")
public class IngredientController {
    @Autowired
    private Trie trie;

    @JsonView(ResponseViews.NoRequest.class)
    @PostMapping("")
    public ResponseEntity<Response> ingredientExtract(@RequestBody TextListRequest request){
        List<String> textList = request.getTextList();

        Set<Integer> s = new HashSet<Integer>();

        for(String text : textList){
            s.addAll(trie.ahoCorasick(text));
        }

        List<String> ingredients = new ArrayList<String>();
        for(int idx : s){
            ingredients.add(trie.getIngredient(idx));
        }

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", ingredients);

        Response response = Response
                .builder()
                .message("OK")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }
}
