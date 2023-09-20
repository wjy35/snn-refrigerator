import {StyleSheet} from "react-native";

export const recipeStyles = StyleSheet.create({
  recipeListContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recipeItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 140,
    borderColor: '#da3c3c',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  recipeItemImage: {
    flex: 1,
    height: '95%',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    marginLeft: 5,
  },
  recipeItemInfo: {
    height: '95%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
  },
  recipeItemPercent: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    width: 50,
    height: 50,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeItemUser: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '15%',
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
  },
  recipeItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recipeItemTitleContainer: {
    alignItems: 'center',
    justifyContent:'center',
    height: '45%',
    borderWidth: 1,
    width: '100%',
  },
  recipeItemInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  singleRecipeInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginLeft: 5,
  },
  recipeInfoText: {
    marginLeft: 5,
  },
  recipeFavoriteContainer: {
    backgroundColor: 'rgba(217, 217, 217, 0.50)',
    width: 30,
    height: 30,
    position: 'relative',
    top: 5,
    left: 5,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent:'center',
  },
  recipeDetailImage: {
    width: '100%',
    height: 200,
    borderWidth: 1,
  },
  recipeDetailInfoContainer: {
    Width: '100%',
    height: 150,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  recipeDetailTitleText: {
    fontSize: 35,
  },
  recipeDetailInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    height: '70%'
  },
  recipeDetailUserContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeDetailUserImage: {
    borderWidth: 1,
    height: '80%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeDetailUserInfo: {
    borderWidth: 1,
    height: '80%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  recipeDetailBodyContainer: {
    margin: 20,
    borderWidth: 1,
  },
  recipeDetailTabContainer: {
    flexDirection: 'row',


  },
  recipeDetailBody: {
    height: 500,
    borderWidth: 1,

  },
  recipeDetailSingleTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
  }
})
