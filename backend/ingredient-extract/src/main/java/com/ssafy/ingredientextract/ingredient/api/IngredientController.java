package com.ssafy.ingredientextract.ingredient.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.ssafy.ingredientextract.ingredient.api.Request.TextListRequest;
import com.ssafy.ingredientextract.ingredient.api.Response.Response;
import com.ssafy.ingredientextract.ingredient.api.Response.ResponseViews;
import com.ssafy.ingredientextract.ingredient.db.IngredientInfo;
import com.ssafy.ingredientextract.ingredient.dto.IngredientInfoDto;
import com.ssafy.ingredientextract.ingredient.service.IngredientInfoServiceImpl;
import com.ssafy.ingredientextract.trie.Trie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("")
public class IngredientController {
    @Autowired
    private Trie trie;

    @Autowired
    private IngredientInfoServiceImpl ingredientService;

    @JsonView(ResponseViews.NoRequest.class)
    @PostMapping("/ingredient-extract")
    public ResponseEntity<Response> ingredientExtract(@RequestBody TextListRequest request){
        String text = request.getText();

        Set<Short> s = trie.ahoCorasick(text);

        List<String> ingredients = new ArrayList<>();
        for(Short idx : s){
            ingredients.add(trie.getIngredient(idx));
        }

        Map<String, Object> data = new HashMap<>();
        data.put("data", ingredients);

        Response response = Response
                .builder()
                .message("OK")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }

    @JsonView(ResponseViews.NoRequest.class)
    @PostMapping("/ingredient-extract/{ingredientName}")
    public ResponseEntity<Response> addIngredient(@PathVariable String ingredientName){

        IngredientInfo ingredientInfo = ingredientService.addIngredient(ingredientName);

        IngredientInfoDto infos = IngredientInfoDto
                .builder()
                .ingredientId(ingredientInfo.getIngredientInfoId())
                .ingredientName(ingredientInfo.getIngredientInfoName())
                .build();

        Map<String, Object> data = new HashMap<String, Object>();
        data.put("data", infos);

        Response response = Response
                .builder()
                .message("OK")
                .data(data)
                .build();
        return ResponseEntity.ok(response);
    }
}
