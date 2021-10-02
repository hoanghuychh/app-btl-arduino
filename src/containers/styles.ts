import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const stylesSheet = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
    width: '100%',
  },
  topbar: {
    position: 'absolute',
    top: 30,
    left: 0,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    lineHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  buttonBottom: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    borderRadius: 100,
    width: '70%',
    marginTop: 32,
  },
  buttonMenu: {
    borderRadius: 100,
    width: '70%',
    paddingHorizontal: 30,
    marginTop: 32,
  },
  linearGradientBtn: {
    borderRadius: 100,
    width: '45%',
    marginTop: 30,
  },
  linearGradientBtnAdd: {
    borderRadius: 100,
    width: '55%',
    marginTop: 30,
  },
  linearGradientBottom: {
    borderRadius: 100,
    width: '70%',
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonTextNormal: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  wrapImage: {
    width: windowWidth,
    height: (windowWidth * 2005) / 948,
  },
  image: {
    width: windowWidth,
    height: (windowWidth * 2005) / 950,
    resizeMode: 'contain',
  },
  logo: {
    width: '100%',
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 50,
  },
  titleRemote: {
    width: '90%',
  },
  title: {
    height: 50,
    color: '#ec4427',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  imageLogo: {
    width: '40%',
    resizeMode: 'contain',
  },
  wrapKmakey: {
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  wrapSocial: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  wrapSignup: {
    marginTop: 15,
  },
  textSignup: {
    color: '#ec4427',
  },
});

export default stylesSheet;
