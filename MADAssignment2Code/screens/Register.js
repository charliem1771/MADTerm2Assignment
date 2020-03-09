import React, {Component} from 'react';
import{FlatList,ActivityIndicator,Text,View,Button,TextInput,StyleSheet} from 'react-native';

class RegisterScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      name: '',
      surname:'',
      email: '',
      password: ''
    }
  }

  register()
  {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/user/",{
      method: 'POST',
      headers:
      {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify
      ({
        given_name: this.state.name,
        family_name: this.state.surname,
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then((response) => this.props.navigation.navigate('Login'))
    .catch((error) => {
      console.log(error);
    });
  }

  render()
  {
    return(
      <View>
        <Text style = {styles.headerText} >Sign Up!</Text>
        <TextInput style = {styles.textInput} placeholder = "Name..." onChangeText = {(text) => this.setState({name:text})}/>
        <TextInput style = {styles.textInput} placeholder = "Surname..." onChangeText = {(text) => this.setState({surname:text})}/>
        <TextInput style = {styles.textInput} placeholder = "Email..." onChangeText = {(text) => this.setState({email:text})}/>
        <TextInput style = {styles.textInput} placeholder = "Password..." onChangeText = {(text) => this.setState({password:text})}/>
        <View style={styles.registerButton}>
          <Button title="Sign Up!" onPress={()=>this.register()}/>
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
  registerButton: {
    flexDirection: 'row-reverse',
    marginTop: 20,
    height:35,
    marginLeft: 180
  },
});
export default RegisterScreen;
