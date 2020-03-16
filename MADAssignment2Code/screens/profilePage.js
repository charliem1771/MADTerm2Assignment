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
      data:[]
    }
  }
  async getUser()
  {
    let userToken = await AsyncStorage.getItem('TOKEN_KEY')
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
  componentDidMount()
  {
    this.getUser();
  }
  render()
  {
    return(

      <Text>{this.state.given_name}</Text>

    );
  }
}
const styles = StyleSheet.create({
  chits: {
    marginTop: 65,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  }
});
export default ProfileScreen;
