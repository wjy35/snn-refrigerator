import {StyleSheet} from "react-native";

export const progressbarStyles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%'
  },
  progressContainer: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  nowContainer: {
    flex: 1,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  nowOuter: {
    width: 32,
    height: 32,
    backgroundColor: '#1364FF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowInner: {
    width: 10,
    height: 10,
    backgroundColor: '#ffffff',
    borderRadius: 100,
  },
  waitContainer: {
    flex: 1,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  waitOuter: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: '#ffffff',
  },
  waitInner: {
    width: 10,
    height: 10,
    backgroundColor: '#D1D5DB',
    borderRadius: 100,
  },
  doneContainer: {
    flex: 1,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  doneOuter: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#3093EF',
  },
  now2wait: {
    flexGrow: 4,
    width: 32,
    height: 2,
    backgroundColor: '#D1D5DB',
  },
  done2now: {
    flexGrow: 4,
    width: 32,
    height: 4,
  },
  done2done: {
    flexGrow: 4,
    width: 32,
    height: 4,
    backgroundColor: '#3093EF',
  },
  textItemContainer: {
    position: 'absolute',
    width: 200,
    bottom: 35,
    alignItems: 'center',
  },
  nowText: {
    color: '#1364FF',
    fontSize: 20,
  },
  waitText: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  doneText: {
    color: '#3093EF',
    fontSize: 14,
  }
})
