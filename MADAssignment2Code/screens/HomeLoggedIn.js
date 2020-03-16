import React, {Component} from 'react';
import{FlatList,ActivityIndicator,Text,View,Button,TextInput,StyleSheet,AsyncStorage,Alert} from 'react-native';
class HomeScreenLoggedIn extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      isLoading: true,
      chits: [],
      id: '',
      user: '',
      timestamp: 0,
      chit_content: '',
      location:
      {
        longitude: 0,
        latitude: 0
      },
      refresh:
      {
        refresh: 'Text'
      }
    };
  }

  getData()
  {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=1000")
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

  getUser()
  {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/search_user?q="+this.state.id)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        user:responseJson,
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  async postChit()
  {
    let userToken = await AsyncStorage.getItem('TOKEN_KEY')

    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
    {
      headers:
      {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
      method:'POST',
      body:JSON.stringify({
        timestamp:0,
        chit_content: this.state.chit_content,
        location:
        {
          longitude:0,
          latitude:0
        }
      })
    })
    .then(response => response.json())
    .then(jsonChit => {
      this.setState({refresh:''})
      this.getData();
    })
    .catch((error) => {
      console.log(error)
    });
  }
  async logOut()
  {
    await AsyncStorage.removeItem('TOKEN_KEY')
    Alert.alert("Logout Successful");
    this.props.navigation.navigate('Login');
  }
  componentDidMount()
  {
    this.getUser();
    this.getData();
  }

  static navigationOptions = {header: null}
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
      <View style = {styles.container}>
        <Text style = {styles.headerText}>Chitter!</Text>
        <TextInput placeholder = "Search Users..." style ={styles.textInput}
        onChangeText = {(text) => this.setState({id:text})}/>
        <View style={styles.searchButton}>
          <Button title="Search Users" onPress={()=>this.getUser()}/>
        </View>
        <View style={styles.logoutButton}>
          <Button title = "Logout" onPress={()=>this.logOut()}/>
        </View>
        <View style={styles.profileButton}>
          <Button title = "Profile" onPress={()=>this.props.navigation.navigate('profilePage')}/>
        </View>
        <View style = {styles.chits}>
          <FlatList
          data = {this.state.chits}
          renderItem = {({item}) =>
          <View>
            <Text>{item.chit_content}</Text>
          </View>}
          keyExtractor = {({id},index) => id}
          />
        </View>
        <View style = {styles.chitInput}>
          <TextInput style = {styles.textInputC} placeholder = "Chit.." onChangeText ={(text) => this.setState({chit_content:text})} value ={this.state.refresh}/>
          <Button title = "Chit!" onPress={()=>this.postChit()}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flexDirection:"column",
    flex: 1
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
    top:60,
    height:430,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  logoutButton: {
    flexDirection: 'row-reverse',
    marginTop: -40,
    height:40,
    marginLeft:335,
    marginTop: -100,
    marginHorizontal:-50
  },
  profileButton: {
    flexDirection:'row-reverse',
    marginTop: -40,
    height:40,
    marginLeft:10,
  },
  chit:{
    marginTop: 100
  },
  chitInput:{
    position: "absolute",
    marginBottom:0,
    bottom: 0
  },
  textInputC:
  {
    height:40,
    width: 420,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 25
  }
});

export default HomeScreenLoggedIn;
