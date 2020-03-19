import React,{Component} from 'react';
import{StyleSheet,Text,TouchableOpacity,View,AsyncStorage} from 'react-native'
import{RNCamera} from 'react-native-camera';

class ProfilePhoto extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <View style = {styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
        />
        <View style ={styles.pos}>
          <TouchableOpacity onPress = {this.takePicture.bind(this)} style = {styles.capture}>
            <Text style = {styles.text}>
              Take Photo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async() => {
    if(this.camera)
    {
      const options = {quality:0.5,base64:true};
      const data = await this.camera.takePictureAsync(options);
      this.storeUri('uri',data.uri);
    }
  };

  async storeUri(resp,respVal)
  {
    try
    {
      await AsyncStorage.setItem(resp,respVal)
      let uri = await AsyncStorage.getItem('uri');
      this.addPhoto();
      console.log("Have we saved the uri: ",uri)
    }
    catch(error)
    {
      console.log("Error");
    }
  }

  async addPhoto()
  {
    let uri = await AsyncStorage.getItem('uri')
    let userToken = await AsyncStorage.getItem('TOKEN_KEY')
    let userId = await AsyncStorage.getItem('userId')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/photo",
    {
      headers:
      {
        'Content-Type': 'image/jpeg',
        'X-Authorization': userToken
      },
      method:'POST',
      body:JSON.stringify({
        uri
      })
    })
    .then(response => response.json())
    .then(jsonChit => {
    })
    .catch((error) => {
      console.log(error)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center'
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal:20,
    alignSelf:'center',
    margin:20,
  },
  text:
  {
    fontSize: 16
  },
  pos:
  {
    flex:0,
    flexDirection:'row',
    justifyContent:'center'
  }
});

export default ProfilePhoto
