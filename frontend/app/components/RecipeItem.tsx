import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback, ImageBackground} from 'react-native';
import {recipeStyles} from "@/styles/recipeStyles";
import RecipeInfo from "@/components/RecipeInfo";
import {dish, starActive, starDisactive, time, user} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {styles} from "@/styles/styles";
import KoreanWordWrap from "@/components/KoreanWordWrap";
import CircularPercent from "@/components/CircularPercent";
import {TEXT_COLOR, TEXT_SUB_COLOR} from "@/assets/colors/colors";


interface props {
  item: any;
  navigation: any;
  width?: any;
  height?: any;
}

const RecipeItem = ({item, navigation}:props) => {
  function toDetail() {
    navigation.navigate('RecipeDetail', {recipeId: item.recipeId})
  }

  return (
    <TouchableWithoutFeedback
      onPress={toDetail}
    >
      <View style={[recipeStyles.recipeItemContainer, { height: 200, aspectRatio:"9/5"}
      ]}>
        <View style={recipeStyles.recipeFavoriteContainer}>
          <SvgXml
              xml={starDisactive}
              width={25}
              height={25}
              style={{alignSelf:'center'}}
          />
        </View>
        <View style={[recipeStyles.recipeItemImage]}>
          <ImageBackground source={{uri: item.profileImageUrl}}
                           resizeMode={"cover"}
                           style={{width:'100%', height:'100%'}}
                           imageStyle={{borderRadius: 10,}}
          />
        </View>


        <View style={recipeStyles.recipeItemInfo}>
          <View style={recipeStyles.recipeItemTitleContainer}>
            <KoreanWordWrap str={item.title} textStyle={[styles.font, recipeStyles.recipeItemTitle, {textAlign:'center'}]}/>
            {/*<Text style={[styles.font, recipeStyles.recipeItemTitle, {textAlign:'center'}]} numberOfLines={2}>{item.title}</Text>*/}
          </View>
          <View style={recipeStyles.recipeItemBodyContainer}>
            <View style={recipeStyles.recipeInfoContainer}>
              <View style={recipeStyles.recipeInfoLineContainer}>
                <View>
                  <ImageBackground source={{uri: item.profileImageUrl}}
                                   style={{width:25, height:25, marginRight:4}}
                                   imageStyle={{borderRadius:99, borderWidth:1, borderColor:TEXT_COLOR}}
                  />
                </View>
                <Text style={[styles.font,{color:TEXT_SUB_COLOR}]}>{item.nickname}</Text>
              </View>
              <View style={recipeStyles.recipeInfoLineContainer}>
                <View>
                  <SvgXml
                      xml={dish}
                      width={20}
                      height={20}
                      style={{marginLeft:2, marginRight:7}}
                  />
                </View>
                <Text style={[styles.font,{color:TEXT_SUB_COLOR}]}>{item.foodName}</Text>
              </View>
              <View style={recipeStyles.recipeInfoLineContainer}>
                <View>
                  <SvgXml
                      xml={user}
                      width={20}
                      height={20}
                      style={{marginLeft:2, marginRight:7}}
                  />
                </View>
                <Text style={[styles.font,{color:TEXT_SUB_COLOR}]}>{item.serving}</Text>
              </View>
              <View style={recipeStyles.recipeInfoLineContainer}>
                <View>
                  <SvgXml
                      xml={time}
                      width={20}
                      height={20}
                      style={{marginLeft:2, marginRight:7}}
                  />
                </View>
                <Text style={[styles.font,{color:TEXT_SUB_COLOR}]}>{item.cookingTime}</Text>
              </View>
            </View>


            <View style={recipeStyles.recipeProgressContainer}>
              <CircularPercent total={item.neededIngredients} now={item.myIngredients}/>
            </View>

          </View>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default RecipeItem;
