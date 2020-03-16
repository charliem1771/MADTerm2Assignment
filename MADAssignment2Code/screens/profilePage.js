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
      followers:'',
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
      this.props.navigation.navigate('HomeLoggedIn');
    })
    .catch((error) => {
      console.log(error)
    });

}
  /*aysnc getFollowers()
  {
    let id = await AsyncStorage.getItem('userId')
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/"+id+"/followers")
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
  }*/
  componentDidMount()
  {
    this.getUser();
  }
  render()
  {
    return(
      <View>
        <Text style ={styles.header}>User Profile: {this.state.data.given_name} {this.state.data.family_name}</Text>
        <Text style ={styles.user}>Update Profile</Text>
        <Text style ={styles.user}>Name: {this.state.data.given_name}</Text>
        <TextInput placeholder = {this.state.data.given_name} onChangeText ={(text) => this.setState({name:text})}/>
        <Text style ={styles.user}>Last Name: {this.state.data.family_name}</Text>
        <TextInput placeholder = "Last Name.." onChangeText ={(text) => this.setState({last_name:text})}/>
        <Text style ={styles.user}>Email: {this.state.data.email}</Text>
        <TextInput placeholder = "Email.." onChangeText ={(text) => this.setState({email:text})}/>
        <Text style ={styles.user}>Password: {this.state.data.password}</Text>
        <TextInput placeholder = "Password.." onChangeText ={(text) => this.setState({password:text})}/>
        <Text style ={styles.user}>Followers:</Text>
        <Text style ={styles.user}>Following:</Text>
        <Button title = "Update User Profile" onPress={()=>this.updateUser()}/>
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
  }
});
export default ProfileScreen;
