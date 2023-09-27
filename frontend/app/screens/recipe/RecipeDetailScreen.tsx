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

  const [recipeDetail, setRecipeDetail] = useState({
    recipeId:"",
    nickname:"",
    title:"",
    imageUrl:"",
    favoriteCount: 0,
    // TODO : 백에서 profile이미지, followCount 응답 추가해야함
    followCount: 0,
    ingredientResponseList:[],
    contentResponseList:[],
    foodName:"",
    cookingTime:"",
    serving:2
  });

  useEffect(() => {
    const recipeId = route?.params?.recipeId;
    // const serving = route?.params?.serving;
    setRecipeDetail(recipeId)
    // setRecipeDetail(serving)

    // Todo : 멤버아이디 가져와야함
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
        setRecipeDetail(mappedData)
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
          <Text>음식 이미지</Text>
          {/* 음식 이미지 삽입 */}
        </View>
        <View style={recipeStyles.recipeDetailInfoContainer}>
          <View>
            <Text style={[styles.font, recipeStyles.recipeDetailTitleText]}>{recipeDetail.title}</Text>
          </View>
          <View style={recipeStyles.recipeDetailInfo}>
            <View style={recipeStyles.recipeDetailUserContainer}>
              <View style={recipeStyles.recipeDetailUserImage}>
                <Text>프로필 이미지</Text>{/*{recipeDetail.image}*/}
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

          {/* 재료 목록 가져옴*/}
          <View style={recipeStyles.recipeDetailBody}>
            {recipeDetail.ingredientResponseList ? (
                recipeDetail.ingredientResponseList.map((ingredient, index) => (
                    <View key={index}>
                      <Text>{ingredient.name}</Text>
                      <Text>{ingredient.amount}</Text>
                      <Text>{ingredient.lastDate}</Text>
                    </View>
                ))
            ) : (
                <Text>재료 정보가 없습니다.</Text>
            )}

            {/* 세부 내용 목록 가져옴 */}
            {recipeDetail.contentResponseList ? (
                recipeDetail.contentResponseList.map((ingredient, index) => (
                    <View key={index}>
                      <Text>order: {ingredient.order}, content: {ingredient.content}</Text>
                    </View>
                ))
            ) : (
                <Text>내용 정보가 없습니다.</Text>
            )}
          </View>
        </View>

      </ScrollView>
    </RecipeLayout>
  )
}

export default RecipeDetailScreen;
