import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import RecipeLayout from '@/screens/recipe/RecipeLayout';
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {recipeStyles} from "@/styles/recipeStyles";
import {styles} from "@/styles/styles";
import RecipeInfo from "@/components/RecipeInfo";
import recipeApi from "@/apis/recipeApi";


interface props {
}

const RecipeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [recipeDetail, setRecipeDetail] = useState<any>({

  });

  useEffect(() => {
    const recipeId = route?.params?.recipeId;
    console.log(recipeId)

    const memberId : string = '3029548333'
    const getRecipeDetail = async() => {
      try{
        let res = await recipeApi.detail({memberId, recipeId});
        setRecipeDetail(res.data.data.recipeInfo);
        const mappedData = {
          nickname: res.data.data.recipeInfo.nickname,
          title: res.data.data.recipeInfo.title,
          image: res.data.data.recipeInfo.image,
          youtubeUrl: res.data.data.recipeInfo.youtubeUrl,
          favoriteCount: res.data.data.recipeInfo.favoriteCount,
          followCount: res.data.data.recipeInfo.followCount,
          ingredientResponseList: res.data.data.recipeInfo.ingredientResponseList.map((ingredient) => ({
            name: ingredient.name,
            amount: ingredient.amount,
            lastDate: ingredient.lastDate,
          })),
          contentResponseList: res.data.data.recipeInfo.contentResponseList.map((content) => ({
            content: content.content,
            order: content.order,
          })),
        };
        setRecipeDetail(mappedData);
        if(res.status===200){
        }else{
          console.log(res.data.message);
        }
      }catch (e){
        console.log(e);
      }
    }
    getRecipeDetail();
  },[])

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
                <Text>{recipeDetail.nickname}</Text>
                <Text>{recipeDetail.favoriteCount}</Text>
              </View>
            </View>
            <View>
              <RecipeInfo serving={recipeDetail.serving} cookingTime={recipeDetail.cookingTime} foodName={recipeDetail.foodName} size={20}/>
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
            {/*{recipeDetail}*/}
          </View>
        </View>

      </ScrollView>
    </RecipeLayout>
  )
}

export default RecipeDetailScreen;
