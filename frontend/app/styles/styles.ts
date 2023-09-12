import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  tabContainer: {
    height: 80,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
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
  mainColor: {
    color: '#3093EF',
  },
  font: {
    fontFamily: 'BM-HANNA',
  },
  tabFontSize: {
    paddingTop: 5,
    fontSize: 10,
  }
});

export default styles;
