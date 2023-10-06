import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import RecipeLayout from '@/screens/recipe/RecipeLayout';
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {recipeStyles} from "@/styles/recipeStyles";
import {styles} from "@/styles/styles";
import RecipeInfo from "@/components/RecipeInfo";
import recipeApi from "@/apis/recipeApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import {MAIN_COLOR, TEXT_COLOR, TEXT_DEACTIVATED_COLOR, TEXT_SUB_COLOR} from "@/assets/colors/colors";
import {SvgXml} from "react-native-svg";
import {dish, filledfollowIcon, followIcon, time, user} from "@/assets/icons/icons";
import ShowYoutube from "@/components/ShowYoutube";
import memberApi from "@/apis/memberApi";

const RecipeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {memberId} = useSelector((state:RootState)=>state.userReducer);
  const [activatedTab, setActivatedTab] = useState(0);

  const [recipeDetail, setRecipeDetail] = useState({
    recipeId:"",
    nickname:"닉네임 로딩중",
    title:"레시피 정보를 불러오는 중입니다",
    imageUrl:"",
    favoriteCount: 0,
    followCount: 0,
    ingredientResponseList:[],
    contentResponseList:[],
    foodName:"로딩중",
    cookingTime:"로딩중",
    serving:'로딩중'
  });
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [like, setLike] = useState(false);
  const [chefId, setChefId] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const recipeId = route?.params?.recipeId;
    const getRecipeDetail = async() => {
      try{
        let res = await recipeApi.detail({memberId, recipeId});
        if(res.status===200){
          if (res.data.data.recipeInfo.youtubeUrl) {
            const splitUrl = res.data.data.recipeInfo.youtubeUrl.split('/',);
            const targetUrl = splitUrl[3]?.split('?v=');
            const target = targetUrl?.pop();
            setYoutubeUrl(target?target.slice(0, 11):'');
          }
          setRecipeDetail({
            ...res.data.data.recipeInfo,
          });

          let nickname = res.data.data.recipeInfo.nickname;

          const memberIdres = await memberApi.getMemberIdFromNick(nickname);
          setChefId(memberIdres.data.data.memberId);
          const followRes = await memberApi.toggleFollow( memberId, memberIdres.data.data.memberId);
          setLike(!followRes.data.data.flag);
          await memberApi.toggleFollow( memberId, memberIdres.data.data.memberId);
        }
      }catch (e){
        console.log(e);
      }
    }
    getRecipeDetail();
  },[route?.params?.recipeId]);

  const pressAfter = async () => {
    setIsDisabled(pre => true);
    const followRes = await memberApi.toggleFollow( memberId, chefId );
    setLike(followRes.data.data.flag);
    setIsDisabled(pre => false);
  }

  const moveToUserPage = async () => {
    navigation.navigate('User', {
      id: chefId
    });
  }

  return (
    <RecipeLayout
      title="레시피"
      optionTitle={memberId === chefId ? '수정' : ''}
      optionFunction={memberId === chefId ? ()=>navigation.navigate('RecipeUpdate', {...recipeDetail, recipeId: route?.params?.recipeId}) : ()=>{}}>
      <ScrollView style={{width: '100%'}}>
        <View style={recipeStyles.recipeDetailImage}>
          {
            recipeDetail?.imageUrl && <ImageBackground source={{uri: recipeDetail.imageUrl}} resizeMode={'cover'} style={{width:'100%', height:'100%'}}/>
          }

        </View>
        <View>
          <Text style={[styles.font, recipeStyles.recipeDetailTitleText]}>{recipeDetail.title}</Text>
        </View>
        <View style={recipeStyles.recipeDetailInfoContainer}>
          <View style={recipeStyles.recipeDetailInfo}>
            <View style={recipeStyles.recipeDetailUserContainer}>
              <TouchableOpacity onPress={moveToUserPage}>
                <View style={recipeStyles.recipeDetailUserImage}>
                  {recipeDetail.profileImageUrl&&<Image source={{uri: recipeDetail.profileImageUrl}}
                                   style={{height:70,width:70,borderRadius:99, borderWidth:1, borderColor:TEXT_COLOR ,marginRight:10}}
                  />}
                </View>
              </TouchableOpacity>
              <View style={[recipeStyles.recipeDetailUserInfo]}>
                <TouchableOpacity onPress={moveToUserPage}>
                  <Text style={[styles.font,{fontSize:20, color:TEXT_SUB_COLOR, marginVertical:3}]}>{recipeDetail.nickname}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection:'row', justifyContent:'center', marginVertical:3}}>
                  <TouchableOpacity onPress={pressAfter} disabled={isDisabled}>
                    {like ? <SvgXml
                      xml={filledfollowIcon}
                      width={20}
                      height={20}
                    />:<SvgXml
                      xml={followIcon}
                      width={20}
                      height={20}
                    />}
                  </TouchableOpacity>
                  <Text style={[styles.font,{fontSize:20, color:TEXT_SUB_COLOR}]}>{recipeDetail.favoriteCount}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={recipeStyles.recipeDetailInfoLinesContainer}>
            <View style={recipeStyles.recipeDetailLineContainer}>
              <View>
                <SvgXml
                    xml={dish}
                    width={25}
                    height={25}
                    style={{marginLeft:2, marginRight:7}}
                />
              </View>
              <Text style={[styles.font,{color:TEXT_SUB_COLOR, fontSize:15}]}>{recipeDetail.foodName}</Text>
            </View>
            <View style={recipeStyles.recipeDetailLineContainer}>
              <View>
                <SvgXml
                    xml={user}
                    width={25}
                    height={25}
                    style={{marginLeft:2, marginRight:7}}
                />
              </View>
              <Text style={[styles.font,{color:TEXT_SUB_COLOR, fontSize:15}]}>{recipeDetail.serving}</Text>
            </View>
            <View style={recipeStyles.recipeDetailLineContainer}>
              <View>
                <SvgXml
                    xml={time}
                    width={25}
                    height={25}
                    style={{marginLeft:2, marginRight:7}}
                />
              </View>
              <Text style={[styles.font,{color:TEXT_SUB_COLOR, fontSize:15}]}>{recipeDetail.cookingTime}</Text>
            </View>
          </View>
        </View>

        <View style={recipeStyles.recipeDetailBodyContainer}>
          <View style={recipeStyles.recipeDetailTabContainer}>
            <TouchableWithoutFeedback
                onPress={()=>{setActivatedTab(0)}}
            >
            <View style={[recipeStyles.recipeDetailSingleTab, activatedTab===0?recipeStyles.recipeDetailSingleSelectedTab:{},{marginRight:-1}]}>
              <Text style={[styles.font,{color:activatedTab===0?TEXT_SUB_COLOR:TEXT_DEACTIVATED_COLOR, fontSize:20}]}>재료</Text>
            </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={()=>{setActivatedTab(1)}}
            >
            <View style={[recipeStyles.recipeDetailSingleTab, activatedTab===1?recipeStyles.recipeDetailSingleSelectedTab:{}]}>
              <Text style={[styles.font,{color:activatedTab===1?TEXT_SUB_COLOR:TEXT_DEACTIVATED_COLOR, fontSize:20}]}>조리 과정</Text>
            </View>
            </TouchableWithoutFeedback>
          </View>

          {/* 재료 목록 가져옴*/}
          <View style={recipeStyles.recipeDetailBody}>
            {activatedTab===0&&
                (recipeDetail.ingredientResponseList ?
                    <>
                    <View style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      flexDirection: 'row',
                      margin:10,
                    }}>
                      <Text style={[styles.font,{color:TEXT_COLOR, fontSize:20, width:'60%'}]}>[재료]</Text>
                      <Text style={[styles.font,{color:TEXT_COLOR, fontSize:20, width:'40%'}]}>[소비기한]</Text>
                    </View>
                    {recipeDetail.ingredientResponseList.map((ingredient, index) => (
                          <View key={index} style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            flexDirection: 'row',
                            marginHorizontal:10,
                            marginVertical:3,
                          }}>
                            <Text style={[styles.font,{color:ingredient.lastDate?MAIN_COLOR:TEXT_COLOR, fontSize:20, width:'60%'}]}>{`${ingredient.name} ${ingredient.amount&&`(${ingredient.amount})`}`}</Text>
                            <Text style={[styles.font,{color:ingredient.lastDate?MAIN_COLOR:TEXT_COLOR, fontSize:20, width:'40%'}]}>{ingredient.lastDate?ingredient.lastDate:'          -'}</Text>
                          </View>
                      ))}
                    </>
                   :
                    (<Text>재료 정보가 없습니다.</Text>)
                  )
            }

            {activatedTab===1&&
                (recipeDetail.contentResponseList ? (
                    <>
                      { youtubeUrl && (
                          <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            flexDirection: 'row',
                            margin:10,}}>
                            <ShowYoutube youtubeId={youtubeUrl} />
                          </View>
                      )
                      }
                    <View style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      flexDirection: 'row',
                      margin:10,
                    }}>
                      <Text style={[styles.font,{color:TEXT_COLOR, fontSize:20, width:'100%'}]}>[만드는 법]</Text>
                    </View>
                      {recipeDetail.contentResponseList.map((ingredient, index) => (
                      <View key={index} style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        marginHorizontal:10,
                        marginVertical:3,
                      }}>
                        <Text style={[styles.font,{color:TEXT_COLOR, fontSize:20, width:'100%'}]}>{`${ingredient.order}. ${ingredient.content}`}</Text>
                      </View>
                  ))}


                  </>)
               : (
                  <Text>내용 정보가 없습니다.</Text>
              ))
            }
          </View>
        </View>
      </ScrollView>
    </RecipeLayout>
  )
}

export default RecipeDetailScreen;
