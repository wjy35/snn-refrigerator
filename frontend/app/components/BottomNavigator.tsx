import React from 'react';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styled} from 'nativewind';

const StyledView = styled(View);

const BottomNavigator = () => {
  const navigation: any = useNavigation();
  return (
    <StyledView className="fixed">
      <Button
        title="Go to Home"
        onPress={ () => navigation.push('Home')}
      />
      <Button
        title="Go to Recipe"
        onPress={ () => navigation.navigate('RecipeList')}
      />
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
      <Button
        title="Go to Share"
        onPress={ () => navigation.navigate('ShareList')}
      />
      <Button
        title="Go to Mypage"
        onPress={ () => navigation.navigate('MyPage')}
      />
    </StyledView>
  );
};

export default BottomNavigator;
