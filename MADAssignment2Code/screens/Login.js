import React,{ Component } from 'react';
import { FlatList,ActivityIndicator,Text,View,Button,TextInput,StyleSheet } from 'react-native';
class LoginScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      email: '',
      password: ''
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
    .then((response) => this.props.navigation.navigate('Home'))
    .catch((error) => {
      console.log(error);
    });
  }
  render()
  {
    return(
      <View>
        <Text style = {styles.headerText} >Login!</Text>
        <TextInput style = {styles.textInput} placeholder = "Username..." onChangeText = {(text) => this.setState({email:text})}/>
        <TextInput style = {styles.textInput2} placeholder = "Password..." onChangeText = {(text) => this.setState({password:text})}/>
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
    marginLeft: 150
  }
});
export default LoginScreen;
