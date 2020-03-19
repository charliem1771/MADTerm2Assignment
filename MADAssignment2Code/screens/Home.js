import React, {Component} from 'react';
import{AsyncStorage,Alert,FlatList,ActivityIndicator,Text,View,Button,TextInput,StyleSheet,TouchableOpacity,Select} from 'react-native';
class HomeScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      isLoading: true,
      chits: [],
      user:[],
      id: '',
      userId:''
    }
  }
  getData()
  {
    return fetch("http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=100")
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
      console.log(responseJson)
      this.setState({
        user:responseJson,
        });
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  async storeId(resp,respVal)
  {
    await AsyncStorage.setItem(resp,respVal)
    let id = await AsyncStorage.getItem('otherUserId');
    this.props.navigation.navigate('otherUser')
    console.log(id);
    //Alert.alert(this.state.chits.user.user_id)
  }
  componentDidMount()
  {
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
      <View>
        <Text style = {styles.headerText}>Chitter!</Text>
        <TextInput placeholder = "Search Users..." style ={styles.textInput}
        onChangeText = {(text) => this.setState({id:text})}/>
        <View style={styles.searchButton}>
          <Button title="Search Users" onPress={()=>this.getUser()}/>
        </View>
        <View style={styles.loginButton}>
          <Button title = "Login" onPress={()=>this.props.navigation.navigate('Login')}/>
        </View>
        <View>
          <View style= {styles.user}>
            <FlatList
            data = {this.state.user}
            renderItem = {({item}) =>
            <View>
              <TouchableOpacity onPress = {() => this.storeId('otherUserId',item.user_id.toString())}>
                <Text>{item.given_name} {item.family_name}</Text>
              </TouchableOpacity>
            </View>}
            keyExtractor = {({id},index) => id}
            />
          </View>
        </View>
          <View style= {styles.chits}>
            <FlatList
            data = {this.state.chits}
            renderItem = {({item}) =>
            <View>
              <TouchableOpacity onPress = {() => this.storeId('otherUserId',item.user.user_id.toString())}>
                <Text>{item.user.given_name} {item.user.family_name}: {item.chit_content}</Text>
              </TouchableOpacity>
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
    top:80,
    height:500,
    fontSize: 22,
    marginLeft: 10,
    marginRight: 10,
  },
  loginButton: {
    flexDirection: 'row-reverse',
    marginTop: -40,
    height:40,
    marginLeft:350,
    marginTop: -100,
    marginHorizontal: 0
  },
  user: {
    top:60,
    height:40,
    fontSize: 16,
  }
});

export default HomeScreen;
