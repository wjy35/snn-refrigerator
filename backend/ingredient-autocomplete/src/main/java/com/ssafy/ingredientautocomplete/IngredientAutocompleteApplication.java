package com.ssafy.ingredientautocomplete;

import com.ssafy.ingredientautocomplete.service.IngredientAutocompleteService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class IngredientAutocompleteApplication {

	public static void main(String[] args) {
		SpringApplication.run(IngredientAutocompleteApplication.class, args);
	}

}
