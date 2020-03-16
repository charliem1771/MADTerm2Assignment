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
      refreshText:
      {
        refreshText: 'Text'
      }
    };
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
      this.setState({refreshText:''})
      console.log(jsonChit)
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
    this.getData();
    this.getUser();
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
      <View>
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
        <View style = {styles.chit}>
          <TextInput placeholder = "Chit.." onChangeText ={(text) => this.setState({chit_content:text})}/>
          <Button title = "Chit!" onPress={()=>this.postChit()}/>
          <FlatList
          data = {this.state.chits}
          renderItem = {({item}) =>
          <View>
            <Text style ={styles.chits}>{item.chit_content}</Text>
          </View>}
          keyExtractor = {({id},index) => id}
          />
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
    marginTop: 65,
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
  }
});

export default HomeScreenLoggedIn;
