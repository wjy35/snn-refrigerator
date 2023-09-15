import {StyleSheet} from "react-native";

export const recipeStyles = StyleSheet.create({
  recipeItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 130,
    width: 300,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  recipeItemImage: {
    height: 120,
    width: 120,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    marginLeft: 5,
  },
  recipeItemInfo: {
    position: 'relative',
    height: 120,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
  },
  recipeItemPercent: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    width: 50,
    height: 50,
    margin: 3,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeItemUser: {
    justifyContent: 'flex-start'
  },
  recipeItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3093EF',
  },
  recipeItemTitleContainer: {
    alignItems: 'center',
    justifyContent:'center',
    height: 50,
    borderWidth: 1,
  }
})