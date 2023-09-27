import {StyleSheet} from "react-native";
import {MAIN_COLOR, TEXT_COLOR, TEXT_DEACTIVATED_COLOR, TEXT_SUB_COLOR} from "@/assets/colors/colors";

export const recipeStyles = StyleSheet.create({
  recipeListContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
  },
  recipeItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    margin:5,
    backgroundColor:'white',
  },
  recipeItemImage: {
    flex: 1,
    height: '95%',
    // borderWidth: 1,
    marginLeft: 5,
  },
  recipeItemInfo: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:5,
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
  recipeInfoContainer:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '65%',
    flexDirection: 'column',
  },
  recipeDetailInfoLinesContainer:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: '100%',
    width: '30%',
    flexDirection: 'column',
  },
  recipeProgressContainer:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100%',
    width: '35%',
    flexDirection: 'row',
  },
  recipeInfoLineContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '25%',
    width: '100%',
    flexDirection: 'row',
  },
  recipeItemTitle: {
    fontSize: 23,
    color:TEXT_COLOR,
  },
  recipeItemTitleContainer: {
    alignItems: 'center',
    justifyContent:'center',
    height: '45%',
    width: '100%',
  },
  recipeItemBodyContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center',
    height: '55%',
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
    position: 'absolute',
    top: 5,
    left: 5,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent:'center',
    zIndex:10,
  },
  recipeDetailImage: {
    width: '100%',
    height: 200,
    // borderWidth: 1,
  },
  recipeDetailInfoContainer: {
    Width: '100%',
    height: 100,
    // borderWidth: 1,
    flexDirection: 'row',
    // backgroundColor:'white',
    marginHorizontal:20,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeDetailTitleText: {
    fontSize: 35,
    marginHorizontal:20,
  },
  recipeDetailInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderRadius: 10,
    // height: '70%'
  },
  recipeDetailUserContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeDetailUserImage: {
    // borderWidth: 1,
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeDetailUserInfo: {
    // borderWidth: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  recipeDetailBodyContainer: {
    margin: 20,
    // borderWidth: 1,
  },
  recipeDetailLineContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '33%',
    width: '100%',
    flexDirection: 'row',
  },
  recipeDetailTabContainer: {
    flexDirection: 'row',


  },
  recipeDetailBody: {
    height: 500,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    backgroundColor:'white'
  },
  recipeDetailSingleTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 60,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderColor:TEXT_DEACTIVATED_COLOR,
    borderBottomColor:TEXT_COLOR,
    backgroundColor:'white'
  },
  recipeDetailSingleSelectedTab: {
    borderColor:TEXT_COLOR,
    borderBottomWidth:0,
    zIndex:5,
  }
})
