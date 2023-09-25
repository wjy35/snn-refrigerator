import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import EditableIngredients from "@/components/EditableIngredients";
import EditableContent from "@/components/EditableContent";

interface props {
  textList: string[];
  foodName?: any;
  serving?: any;
  content: any[];
  addContent: Function;
  deleteContent: Function;
  editContent: Function;
}

const RecipeCreateCookInfo = ({textList, foodName, serving, content, editContent, deleteContent, addContent}: props) => {
  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={3} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}}>
        <View style={styles.marginContainer}>
          <Text style={[styles.font, styles.mainColor, {fontSize: 22}]}>
            <Text>{foodName.text} </Text>
            <Text>{serving.text} </Text>
            <Text>레시피</Text>
          </Text>
        </View>
        <View style={styles.marginContainer}>
          {
            content.map((i: any, idx)=>{
              return (
                <React.Fragment key={`ingredient${idx}`}>
                  <EditableContent deleteContent={deleteContent} order={i.order} content={i.content}/>
                </React.Fragment>
              )
            })
          }
        </View>

      </ScrollView>
    </View>
  )
}

export default RecipeCreateCookInfo;
