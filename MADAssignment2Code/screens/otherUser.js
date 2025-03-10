import React,{ Component } from 'react';
import{Image,FlatList,ActivityIndicator,Text,View,Button,TextInput,StyleSheet,AsyncStorage,Alert} from 'react-native';
class ProfileOther extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      isLoading: true,
      data:[],
      followers:[],
      following:[],
      photo:[],
      name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  async getPhoto()
  {
    let id = await AsyncStorage.getItem('otherUserId')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+id+"/photo")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("test ",responseJson)
      this.setState({
        isLoading:false,
        photo:responseJson,
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  async getUser()
  {
    let id = await AsyncStorage.getItem('otherUserId')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+id)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        data:responseJson,
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  async getFollowers()
  {
    let id = await AsyncStorage.getItem('otherUserId')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+id+"/followers")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        followers:responseJson,
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  async getFollowing()
  {
    let id = await AsyncStorage.getItem('otherUserId')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+id+"/following")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("test ",responseJson)
      this.setState({
        isLoading:false,
        following:responseJson,
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  componentDidMount()
  {
    this.getUser();
    this.getFollowers();
    this.getFollowing();
    this.getPhoto();
  }
  render()
  {
    return(
      <View>
        <Image style ={styles.profilePicture} source={{uri: this.state.photo.uri}}/>
        <Text style ={styles.header}>User Profile: {this.state.data.given_name} {this.state.data.family_name}</Text>
        <Text style ={styles.user}>Name: {this.state.data.given_name}</Text>
        <Text style ={styles.user}>Last Name: {this.state.data.family_name}</Text>
        <Text style ={styles.user}>Email: {this.state.data.email}</Text>
        <Text style = {styles.user}>Followers: {this.state.followers.length}</Text>
        <Text style ={styles.user}>Following:{this.state.following.length}</Text>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  header:{
    marginTop:15,
    fontSize: 25,
    textAlign: 'center'
  },
  user: {
    marginTop: 20,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginLeft: 150
  }
});
export default ProfileOther;
