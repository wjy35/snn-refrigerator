package com.ssafy.membermanage.hateIngredient.service;

import com.ssafy.membermanage.error.CustomException;
import com.ssafy.membermanage.error.ErrorCode;
import com.ssafy.membermanage.hateIngredient.db.HateIngredient;
import com.ssafy.membermanage.hateIngredient.db.HateIngredientRepository;
import com.ssafy.membermanage.member.db.Member;
import com.ssafy.membermanage.feign.client.RequestIngredientApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HateIngredientServiceImpl {

    @Autowired
    private RequestIngredientApiClient  requestIngredientApiClient;

    @Autowired
    private HateIngredientRepository hateIngredientRepository;
    public String ingredientName(Short id){
        try{
            Map<String, Object> response = requestIngredientApiClient.getIngredientName(id);
            Map<String, Object> data = (Map<String, Object>) response.get("data");
            Map<String, Object> info = (Map<String, Object>) data.get("ingredientInfo");
            return (String) info.get("ingredientInfoName");
        } catch (Exception e){
            throw new CustomException(ErrorCode.No_Such_Ingredient);
        }
    }

    public HateIngredient save(HateIngredient hateIngredient){
        return hateIngredientRepository.save(hateIngredient);
    }

    public List<HateIngredient> findByMember(Member member){
        return hateIngredientRepository.findByMember(member);
    }

    public List<HateIngredient> findByMemberAndIngredientId(Member member, Short ingredientId){
        return hateIngredientRepository.findByMemberAndIngredientId(member, ingredientId);
    }

    public void deleteByHateIngredientTblId(Integer hateIngredientSeq){
        hateIngredientRepository.deleteById(hateIngredientSeq);
    }
}
