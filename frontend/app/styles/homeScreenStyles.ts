import { StyleSheet } from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
  },
  homeMention: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    marginTop: 20,
    // borderWidth: 1,
    width: '96%',
    height: 100
  },
  homeRecipeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10,
    // borderWidth: 1,
    width: '96%',
  },
  ingredientContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 5,
    // borderWidth: 1,
    width: '96%',
  },
  homeRecipeListContainer: {
    height: 200,
  }
});
