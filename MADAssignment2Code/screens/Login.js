import React,{ Component } from 'react';
import { FlatList,ActivityIndicator,Text,View,TextInput,StyleSheet,Alert,Button } from 'react-native';
import {AsyncStorage} from 'react-native';
class LoginScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      email: '',
      password: '',
      token: ''
    }
  }

  async storeToken(resp,respVal)
  {
    try
    {
      await AsyncStorage.setItem(resp,respVal)
      let user = await AsyncStorage.getItem('TOKEN_KEY');
      let id = await AsyncStorage.getItem('userId');
    }
    catch(error)
    {
      console.log("Error");
    }
  }

  login()
  {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/login/",{
      method: 'POST',
      headers:
      {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify
      ({
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then(response => response.json())
    .then(json => {
      let data = json.id.toString();
      this.storeToken('userId',data);
      this.storeToken('TOKEN_KEY',json.token)
      this.props.navigation.navigate('HomeLoggedIn');
    }
    )
    .catch((error) => {
      Alert.alert("Login Failed");
    });
  }
  render()
  {
    return(
      <View>
        <Text style = {styles.headerText} >Login!</Text>
        <TextInput style = {styles.textInput} placeholder = "Username..." onChangeText = {(text) => this.setState({email:text})}/>
        <TextInput style = {styles.textInput2} secureTextEntry={true} placeholder = "Password..." onChangeText = {(text) => this.setState({password:text})}/>
        <View style={styles.loginButton}>
          <Button title="Login" onPress={()=>this.login()}/>
        </View>
        <View style={styles.registerButton}>
          <Button title="Dont have an Account Sign Up!" onPress={()=>this.props.navigation.navigate('Register')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText:{
    marginTop:15,
    fontSize: 25,
    textAlign: 'center'
  },
  textInput:
  {
    height:40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 25,
    marginLeft: 70
  },
  textInput2:
  {
    height:40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 26,
    marginLeft: 70
  },
  loginButton: {
    flexDirection: 'row-reverse',
    marginTop: 20,
    height:40,
    marginLeft: 180
  },
  registerButton: {
    flexDirection: 'row-reverse',
    marginTop: 100,
    height:40,
    marginLeft: 90
  }
});
export default LoginScreen;
