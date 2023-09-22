import { StyleSheet } from 'react-native';

export const myPageStyles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    height: 300,
    borderWidth: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImage: {
    height: 140,
    width: 140,
    borderWidth: 1,
    borderRadius: 999,
    marginTop: 5,
  },
  profileInfo: {
    height: 70,
    borderWidth: 1,
  },
  profileRowContainer: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
  },
  optionsContainer: {
    width: '100%',
    borderWidth: 1,
  }
});
