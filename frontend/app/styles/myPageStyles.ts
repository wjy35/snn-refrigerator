import { StyleSheet } from 'react-native';

export const myPageStyles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 999,
    marginTop: 5,
  },
  profileInfo: {
    height: 70,
  },
  profileRowContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  optionsContainer: {
    width: '100%',
  }
});
