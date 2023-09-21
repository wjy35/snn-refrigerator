import { StyleSheet } from 'react-native';

export const bottomTabStyles = StyleSheet.create({
  tabContainer: {
    height: 80,
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
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
    margin: 10,
  },
  activeSingleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    color: '#3093EF'
  },
  tabFontSize: {
    paddingTop: 5,
    fontSize: 10,
  },
});
