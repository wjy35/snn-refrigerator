import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    width: '100%',
  },
  marginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    borderWidth: 1,
    width: '96%',
  },
  marginRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
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
  },
  flex: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  }
});
