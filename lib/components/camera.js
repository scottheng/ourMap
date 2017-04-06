'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Camera from 'react-native-camera';
import CryptoJS from 'crypto-js';


class CameraView extends Component {
  render() {

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.disk}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};

    this.camera.capture({metadata: options})
      .then((data) => this.savePhotoInfo(data.path))
      .catch(err => console.error(err));
  }

  savePhotoInfo(uri) {

		let timestamp = (Date.now() / 1000 | 0).toString();
		let api_key = '146822358129321';
		let api_secret = 'bkQSxoG-g_OJyGHGyh6KOLEQiNI';
		let cloud = 'ourmap';
		let hash_string = 'timestamp=' + timestamp + api_secret;
		let signature = CryptoJS.SHA1(hash_string).toString();
		let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload';

		let xhr = new XMLHttpRequest();
		xhr.open('POST', upload_url);
		xhr.onload = () => {
			console.log(xhr);
		};
		let formdata = new FormData();
		formdata.append('file', {uri: uri, type: 'image/png', name: 'upload.png'});
		formdata.append('timestamp', timestamp);
		formdata.append('api_key', api_key);
		formdata.append('signature', signature);
		xhr.send(formdata);
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default CameraView;