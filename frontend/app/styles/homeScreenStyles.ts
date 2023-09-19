import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
  },
  homeMention: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    width: '96%',
    height: 100
  },
  homeRecipeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10,
    borderWidth: 1,
    width: '96%',
    height: 200,
  },
  ingredientContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10,
    borderWidth: 1,
    width: '96%',
    height: 200,
  },
  homeRecipeListContainer: {
    height: 200,
  }
});
