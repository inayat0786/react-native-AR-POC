
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import DeepARView, {CameraPositions, IDeepARHandle} from 'react-native-deepar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const CameraView = () => {
  const deepARRef = useRef<IDeepARHandle>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <DeepARView
        ref={deepARRef}
        apiKey={
          Platform.OS === 'android'
            ? '4f0e47ad20748b474e2397b906e76d963122d98145946f2f495003e81e84ec4f1746f842ccce003c'
            : '9735a0722435ff0031040c394edf9798a1a5be7b8c2159581591cb1c92790e5f6caf5df183b8ec69'
        }
        style={{flex: 1}}
        onInitialized={() => {
          console.log('INITIALIZED');
        }}
        position={CameraPositions.FRONT}
        onError={(text, type) => {
          console.log('onError =>', text, 'type =>', type);
        }}
      />
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upLeftButtons: {
    position: 'absolute',
    alignItems: 'flex-start',
    left: 20,
    top: 40,
  },
  upLeftButton: {
    marginBottom: 10,
  },
  switchCameraButton: {
    position: 'absolute',
    top: 40,
    right: 40,
  },
  cameraIcon: {
    width: 50,
    height: 40,
  },
  bottomButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    bottom: 60,
    height: 50,
  },
  screenshotIcon: {
    width: 70,
    height: 70,
  },
  title: {
    position: 'absolute',
    bottom: 10,
    fontSize: 20,
    color: '#FFF',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFF',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  notSupportedEffectName: {
    color: '#F00',
  },
});
