import { StyleSheet } from 'react-native';

export const bottomTabStyles = StyleSheet.create({
  tabContainer: {
    height: 80,
    position: 'absolute',
    width:'100%',
    bottom: 0,
    backgroundColor: '#ffffff',
    // marginTop:3,
  },
  tabItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  tabFontSize: {
    paddingTop: 5,
    fontSize: 15,
  },
});
