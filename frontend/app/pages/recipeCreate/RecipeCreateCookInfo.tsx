import React from 'react';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import EditableIngredients from "@/components/EditableIngredients";
import EditableContent from "@/components/EditableContent";

interface props {
  textList: string[];
  content: string[];
  addContent: Function;
  deleteContent: Function;
  editContent: Function;
  recipeInfo: any;
}

const RecipeCreateCookInfo = ({textList, content, editContent, deleteContent, addContent, recipeInfo}: props) => {
  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={3} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}}>
        <View style={styles.marginContainer}>
          <Text style={[styles.font, styles.mainColor, {fontSize: 22}]}>
            <Text>{recipeInfo.foodName&&recipeInfo.foodName} </Text>
            <Text>{recipeInfo.serving&&recipeInfo.serving} </Text>
            <Text>레시피</Text>
          </Text>
        </View>
        <View style={styles.marginContainer}>
          {
            content.map((i: string, idx)=>{
              return (
                <React.Fragment key={`ingredient${idx}`}>
                  <EditableContent deleteContent={deleteContent} content={i} editContent={editContent} index={idx} addContent={addContent}/>
                </React.Fragment>
              )
            })
          }
          <Button title='추가하기' onPress={()=>addContent(0)}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default RecipeCreateCookInfo;
