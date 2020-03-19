import React,{ Component } from 'react';
import{FlatList,ActivityIndicator,Text,View,Button,TextInput,StyleSheet,AsyncStorage,Alert} from 'react-native';
class ProfileScreen extends Component
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
      name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  async getUser()
  {
    let id = await AsyncStorage.getItem('userId')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+id)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        data:responseJson,
        });
        this.setData();
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  async updateUser()
  {
    let id = await AsyncStorage.getItem('userId')
    let token = await AsyncStorage.getItem('TOKEN_KEY')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+id,
    {
      headers:
      {
          'Content-Type': 'application/json',
          'X-Authorization': token
      },
      method:'PATCH',
      body:JSON.stringify
      ({
        	given_name: this.state.name,
        	family_name: this.state.last_name,
        	email: this.state.email,
        	password: this.state.password,
      })
    })
    .then(response => {
      console.log(response)
      this.props.navigation.navigate('HomeLoggedIn');
    })
    .catch((error) => {
      console.log(error)
    });

}

setData()
{
  this.setState({
    name: this.state.data.given_name,
    last_name: this.state.data.family_name,
    email: this.state.data.email,
    password: this.state.data.password
  })
}
  async getFollowers()
  {
    let id = await AsyncStorage.getItem('userId')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+id+"/followers")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("test ",responseJson)
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
    let id = await AsyncStorage.getItem('userId')
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
  }
  render()
  {
    return(
      <View>
        <Text style ={styles.header}>User Profile: {this.state.data.given_name} {this.state.data.family_name}</Text>
        <Text style ={styles.user}>Update Profile</Text>
        <Text style ={styles.user}>Name: {this.state.data.given_name}</Text>
        <TextInput style = {styles.user} defaultValue = {this.state.data.given_name} onChangeText ={(text) => this.setState({name:text})}/>
        <Text style ={styles.user}>Last Name: {this.state.data.family_name}</Text>
        <TextInput style = {styles.user} defaultValue = {this.state.data.family_name} onChangeText ={(text) => this.setState({last_name:text})}/>
        <Text style ={styles.user}>Email: {this.state.data.email}</Text>
        <TextInput style = {styles.user} defaultValue = {this.state.data.email} onChangeText ={(text) => this.setState({email:text})}/>
        <Button title = "Update User Profile" onPress={()=>this.updateUser()}/>
        <Text style = {styles.user}>Followers: {this.state.followers.length}</Text>
        <Text style ={styles.user}>Following: {this.state.following.length}</Text>
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
    marginTop: 10,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  }
});
export default ProfileScreen;
