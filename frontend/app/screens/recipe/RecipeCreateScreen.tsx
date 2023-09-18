import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import ProgressPage from "@/components/ProgressPage";
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import RecipeCreateBasicInfo from "@/pages/recipeCreate/RecipeCreateBasicInfo";

const RecipeCreateScreen = ({navigation}:any) => {
  const textList = ['기본 정보', '필요한 재료', '조리 과정']
  return (
    <RecipeLayout title="레시피" optionTitle="다음">
      <ProgressPage>
        <RecipeCreateBasicInfo
          textList={textList}
        />
        <ScrollView>
          <View style={styles.marginContainer}>
            <Progressbar progress={2} total={3} textList={textList}/>
          </View>
          <View>
            <Text>2</Text>
          </View>
        </ScrollView>
        <ScrollView>
          <View style={styles.marginContainer}>
            <Progressbar progress={3} total={3} textList={textList}/>
          </View>
          <View>
            <Text>3</Text>
          </View>
        </ScrollView>
      </ProgressPage>
    </RecipeLayout>
  )
}

export default RecipeCreateScreen;
