import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import {CameraRoll} from '@react-native-camera-roll/camera-roll';
  
  const Preview = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {path, type} = route.params;
  
    const renderButtons = () => {
      return (
        <View style={styles.buttons}>
          <Button title="Back" onPress={() => navigation.goBack()} />
          <View style={{marginTop: 10}} />
          <Button
            title="Save to Gallery"
            onPress={() => {
              CameraRoll.saveAsset(path, {type})
                .then(() => {
                  Alert.alert(`${type} Saved`, `${type} saved to Gallery!`);
                })
                .catch(err => {
                  Alert.alert('Something Goes Wrong', err.message);
                });
            }}
          />
        </View>
      );
    };
  
    const renderContent = () => {
      if (type === 'photo') {
        return (
          <Image style={{height: '100%', width: '100%'}} source={{uri: path}} />
        );
      }
  
      return (
        //   <Video
        //     resizeMode="contain"
        //     source={{ uri: path }}
        //     style={styles.video}
        //     controls
        //   />
        null
      );
    };
  
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            marginLeft: 20,
          }}
          onPress={() => navigation.goBack()}>
        
        </TouchableOpacity>
        {renderContent()}
        {renderButtons()}
      </View>
    );
  };
  
  export default Preview;
  
  const styles = StyleSheet.create({
    buttons: {
      position: 'absolute',
      bottom: 20,
      width: '100%',
      zIndex: 100,
    },
  });  