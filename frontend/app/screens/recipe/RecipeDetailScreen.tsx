import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import RecipeLayout from '@/screens/recipe/RecipeLayout';
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {recipeStyles} from "@/styles/recipeStyles";
import {styles} from "@/styles/styles";
import RecipeInfo from "@/components/RecipeInfo";

interface props {
}

const RecipeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(() => {
    const recipeId = route?.params?.recipeId;
  })

  return (
    <RecipeLayout title="레시피" optionTitle="수정">
      <ScrollView style={{width: '100%'}}>
        <View style={recipeStyles.recipeDetailImage}>
          {/* 음식 이미지 삽입 */}
        </View>
        <View style={recipeStyles.recipeDetailInfoContainer}>
          <View>
            <Text style={[styles.font, recipeStyles.recipeDetailTitleText]}>초간단 김치찌개</Text>
          </View>
          <View style={recipeStyles.recipeDetailInfo}>
            <View style={recipeStyles.recipeDetailUserContainer}>
              <View style={recipeStyles.recipeDetailUserImage}>
                {/* 유저 프로필 이미지 */}
              </View>
              <View style={recipeStyles.recipeDetailUserInfo}>
                <Text>집밥 백선생</Text>
                <Text>좋아요 100</Text>
              </View>
            </View>
            <View>
              <RecipeInfo serving={'3'} cookingTime={'180분'} foodName={'김치찌개'} size={20}/>
            </View>
          </View>
        </View>
        <View style={recipeStyles.recipeDetailBodyContainer}>
          <View style={recipeStyles.recipeDetailTabContainer}>
            <View style={recipeStyles.recipeDetailSingleTab}>
              <Text>재료</Text>
            </View>
            <View style={recipeStyles.recipeDetailSingleTab}>
              <Text>조리 과정</Text>
            </View>
          </View>
          <View style={recipeStyles.recipeDetailBody}>
          </View>
        </View>

      </ScrollView>
    </RecipeLayout>
  )
}

export default RecipeDetailScreen;
