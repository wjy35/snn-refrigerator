import { StyleSheet } from 'react-native';

export const ingredientStyles = StyleSheet.create({
  singleColumnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  singleTop: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  singleMiddle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
    verticalAlign:"bottom",
  },
  singleBottom: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: "space-around",
    verticalAlign:"bottom",
  },
  singleName: {
    fontSize: 30,
  },
  dateContainer: {
    flex: 1,
  },
  nameContainer: {
    flex: 2,
    // marginTop: 3,
  },
  dDayContainer: {
    // flex: 1,
    // marginTop: 10,
  },
  overContainer: {
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderColor: '#000000',
    borderRadius: 16,
  },
  alertContainer: {
    borderWidth: 1,
    backgroundColor: 'rgba(255, 80.75, 80.75, 0.15)',
    borderColor: '#FF5151',
    borderRadius: 16,
  },
  warnContainer: {
    borderWidth: 1,
    backgroundColor: 'rgba(255, 154, 3, 0.15)',
    borderColor: '#FF9A03',
    borderRadius: 16,
  },
  safeContainer: {
    borderWidth: 1,
    backgroundColor: 'rgba(129.65, 222.26, 97.24, 0.15)',
    borderColor: '#5DC13A',
    borderRadius: 16,
  },
  coldContainer: {
    borderWidth: 1,
    backgroundColor: 'rgba(0, 209.10, 255, 0.20)',
    borderColor: '#00D1FF',
    borderRadius: 16,
  },
  alertText: {
    color: '#FF5151'
  },
  warnText: {
    color: '#FF9A03'
  },
  safeText: {
    color: '#5DC13A'
  },
  overText: {
    color: '#000000'
  },
  coldText: {
    color: '#00D1FF'
  }
});
