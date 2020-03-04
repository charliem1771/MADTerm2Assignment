import React, {Component} from 'react';
import{FlatList,ActivityIndicator,Text,View,Button,TextInput,StyleSheet} from 'react-native';
class HomeScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      isLoading: true,
      chits: [],
    }
  }
  getData()
  {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading:false,
        chits:responseJson,
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  componentDidMount()
  {
    this.getData();
  }
  render()
  {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
        )
    }
    return(
      <View>
        <Text style = {styles.headerText}>Chitter!</Text>
        <View style = {styles.loginButton}>
            <Button title = "login!"/>
        </View>
        <TextInput style = {styles.textInput} placeholder = "Search Users..."/>
        <View style={styles.searchButton}>
          <Button title="Search Users" onPress={()=>this.props.navigation.navigate('Login')}/>
        </View>
        <FlatList
        data = {this.state.chits}
        renderItem = {({item}) =>
        <View>
          <Text style ={styles.chits}>{item.chit_content}</Text>
        </View>}
        keyExtractor = {({id},index) => id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loginButton: {
    flexDirection: 'row-reverse',
    marginTop: -40,
    height:40,
    marginLeft: 350
  },
  headerText:{
    marginTop:15,
    fontSize: 25,
    textAlign: 'center'
  },
  textInput:
  {
    height:40,
    width: 296,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 25
  },
  searchButton: {
    flexDirection: 'row-reverse',
    marginTop: -40,
    height:40,
    marginHorizontal: 0
  },
  chits: {
    marginTop: 23,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  }
});

export default HomeScreen;
