import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
  },
  bg: {
    flex: 1,
    width: '100%',
  },
  marginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    // borderWidth: 1,
    width: '96%',
  },
  marginRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    // borderWidth: 1,
    width: '96%'
  },
  smallContainer: {
    height: 80,
    width: '100%'
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainColor: {
    color: '#3093EF',
  },
  backgroundMainColor: {
    color: '#3093EF'
  },
  font: {
    fontFamily: 'BM-HANNA',
    color: '#000000'
  },
  headerFont: {
    fontSize : 30,
    color: '#002055'
  },
  subHeaderFont: {
    fontSize : 23,
    color: '#002055',
  },
  flex: {
    flex: 1,
  },
  input: {
    height: 60,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
  },
  image: {
    width: 100,
    height: 100,
  }
});
