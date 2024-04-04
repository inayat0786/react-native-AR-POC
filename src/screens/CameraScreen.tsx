import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import DeepARView, {CameraPositions, IDeepARHandle} from 'react-native-deepar';
import {images} from '../constants/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {effects} from '../constants/effects';

const CameraView = () => {
  const deepARRef = useRef<IDeepARHandle>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cameraState, setCameraState] = useState<
    CameraPositions.FRONT | CameraPositions.BACK
  >(CameraPositions.FRONT);

  useEffect(() => {
    deepARRef?.current?.switchEffect({
      mask: effects[activeIndex]?.name as string,
      slot: 'effect',
    });
    //   deepARRef?.current?.switchEffect({
    //     mask: effects[activeIndex]?.name as string,
    //     slot: 'mask',
    //   });
  }, [activeIndex]);

  const changeEffect = (direction: number) => {
    if (!deepARRef) {
      return;
    }

    let newIndex = direction > 0 ? activeIndex + 1 : activeIndex - 1;

    if (newIndex >= effects.length) {
      newIndex = 0;
    }

    if (newIndex < 0) {
      newIndex = effects.length - 1;
    }
    setActiveIndex(newIndex);
  };

  const takeScreenshot = () => {
    if (deepARRef) {
      deepARRef?.current?.takeScreenshot();
    }
  };

  const renderBottom = () => {
    return (
      <View style={styles.bottomAbsView}>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.nextPrevBackground}
            onPress={() => changeEffect(-1)}>
            <Image source={images.left} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.captureView}
            onPress={takeScreenshot}
          />
          <TouchableOpacity
            style={styles.nextPrevBackground}
            onPress={() => changeEffect(1)}>
            <Image source={images.right} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textCenter}>{effects?.[activeIndex]?.title}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
          marginLeft: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Image source={images.backIcon} />
      </TouchableOpacity>
      <DeepARView
        ref={deepARRef}
        apiKey={
          Platform.OS === 'android'
            ? '4f0e47ad20748b474e2397b906e76d963122d98145946f2f495003e81e84ec4f1746f842ccce003c'
            : '9735a0722435ff0031040c394edf9798a1a5be7b8c2159581591cb1c92790e5f6caf5df183b8ec69'
        }
        style={{flex: 1}}
        onInitialized={() => {
          console.log('Initiated');
        }}
        position={cameraState}
        onError={(text, type) => {
          console.log('onError =>', text, 'type =>', type);
        }}
        onScreenshotTaken={(screenshotPath: String) => {
          console.log('screenshotPath', screenshotPath);
          const path = 'file://' + screenshotPath;
          navigation.navigate('Preview', {
            path: path,
            type: 'photo',
          });
        }}
      />
      {renderBottom()}
      <TouchableOpacity
        style={styles.cameraContainer}
        onPress={() =>
          cameraState === CameraPositions.FRONT
            ? setCameraState(CameraPositions.BACK)
            : setCameraState(CameraPositions.FRONT)
        }>
        <Image source={images.cameraRotate} />
      </TouchableOpacity>
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({
  bottomAbsView: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    zIndex: 100,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textCenter: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  captureView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  nextPrevBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 4,
  },
  cameraContainer: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'white',
    padding: 4,
    right: 20,
    bottom: 150,
    borderRadius: 20,
  },
});
