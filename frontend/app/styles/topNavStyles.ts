import { StyleSheet } from 'react-native';

export const topNavStyles = StyleSheet.create({
  tabContainer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    borderWidth: 1,
    width: '100%',
  },
  tabItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    height: 45,
    width: 45,
    marginLeft: 10,
    borderRadius: 999,
    borderColor: '#E9F1FF',
  },
  optionalRightButton: {
    marginRight: 10,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
