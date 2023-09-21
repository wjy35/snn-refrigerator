import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '@/screens/LogInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import HomeScreen from '@/screens/HomeScreen';
import UserScreen from '@/screens/UserScreen';
import RecipeCreateScreen from '@/screens/recipe/RecipeCreateScreen';
import RecipeDetailScreen from '@/screens/recipe/RecipeDetailScreen';
import RecipeListScreen from '@/screens/recipe/RecipeListScreen';
import RecipeUpdateScreen from '@/screens/recipe/RecipeUpdateScreen';
import AccountSettingScreen from '@/screens/myPage/AccountSettingScreen';
import AlarmSettingScreen from '@/screens/myPage/AlarmSettingScreen';
import MyFavoriteScreen from '@/screens/myPage/MyFavoriteScreen';
import MyPageScreen from '@/screens/myPage/MyPageScreen';
import MyPageUpdateScreen from '@/screens/myPage/MyPageUpdateScreen';
import MyShareScreen from '@/screens/myPage/MyShareScreen';
import ShareChatListScreen from '@/screens/share/ShareChatListScreen';
import ShareCreateScreen from '@/screens/share/ShareCreateScreen';
import ShareDetailScreen from '@/screens/share/ShareDetailScreen';
import ShareListScreen from '@/screens/share/ShareListScreen';
import SingleShareChatScreen from '@/screens/share/SingleShareChatScreen';
import React from "react";

const Stack = createStackNavigator();


const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name="LogIn" component={LogInScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="User" component={UserScreen}/>
        <Stack.Screen name="RecipeList" component={RecipeListScreen}/>
        <Stack.Screen name="RecipeCreate" component={RecipeCreateScreen}/>
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen}/>
        <Stack.Screen name="RecipeUpdate" component={RecipeUpdateScreen}/>
        <Stack.Screen name="ShareList" component={ShareListScreen}/>
        <Stack.Screen name="ShareDetail" component={ShareDetailScreen}/>
        <Stack.Screen name="ShareCreate" component={ShareCreateScreen}/>
        <Stack.Screen name="ShareChatList" component={ShareChatListScreen}/>
        <Stack.Screen name="SingleShareChat" component={SingleShareChatScreen}/>
        <Stack.Screen name="MyPage" component={MyPageScreen}/>
        <Stack.Screen name="MyPageUpdate" component={MyPageUpdateScreen}/>
        <Stack.Screen name="AccountSetting" component={AccountSettingScreen}/>
        <Stack.Screen name="AlarmSetting" component={AlarmSettingScreen}/>
        <Stack.Screen name="MyShare" component={MyShareScreen}/>
        <Stack.Screen name="MyFavorite" component={MyFavoriteScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
