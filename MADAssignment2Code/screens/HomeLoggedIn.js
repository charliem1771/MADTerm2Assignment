import React, {Component} from 'react';
import GeoLocation from 'react-native-geolocation-service'
import{TouchableOpacity,FlatList,ActivityIndicator,Text,View,Button,TextInput,StyleSheet,AsyncStorage,Alert,PermissionsAndroid} from 'react-native';
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
      locationPermission:'',
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
        timestamp:this.state.timestamp,
        chit_content: this.state.chit_content,
        location:
        {
          longitude: this.state.longitude,
          latitude: this.state.latitude
        }
      })
    })
    .then(response => response.json())
    .then(jsonChit => {
      this.setState({refresh:''})
      //this.getData();
    })
    .catch((error) => {
      console.log(error)
    });
  }
  async logOut()
  {
    let userToken = await AsyncStorage.getItem('TOKEN_KEY')

    return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
    {
      headers:
      {
        'Content-Type': 'application/json',
        'X-Authorization': userToken
      },
      method:'POST',
    })
    .then(response => {
      AsyncStorage.removeItem('TOKEN_KEY')
      Alert.alert("Logout Successful");
      this.props.navigation.navigate('Login')
    })
    .catch((error) => {
      console.log(error)
    });
  }
  async storeId(resp,respVal)
  {
    await AsyncStorage.setItem(resp,respVal)
    let id = await AsyncStorage.getItem('otherUserId');
    this.props.navigation.navigate('otherUserLoggedIn')
    console.log(id);
  }

  async getLocationPermission()
  {
    try
    {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access Title',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
      if(granted === PermissionsAndroid.RESULTS.GRANTED)
      {
        console.log("Location access granted")
        return true;
      }
      else
      {
        console.log("Location access denied")
        return false;
      }

    }
    catch(error)
    {
      console.log(error)
    }
  }

  getCoordinates = () =>
  {
    if(!this.state.locationPermission)
    {
      this.state.locationPermission = this.getLocationPermission();
    }
    GeoLocation.getCurrentPosition(
      (position) =>
      {
        const geolocation = JSON.stringify(position);
        this.setState({
          geolocation,
          timestamp: position.timestamp,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        console.log("Check",geolocation)
        console.log("timestamp",this.state.timestamp)
        console.log("check latitude",this.state.latitude)
        console.log("check longitude",this.state.longitude)
        this.postChit();
      },
      (error) =>
      {
        Alert.alert(error.message)
      },
      {
        enabledHighAccuracy:true,
        timeout:20000,
        maximumAge:1000
      }
    );
  };
  addLocation()
  {
    Alert.alert(
      'Add location?',
      'Do you want to add your geolocation?',
      [
        {text: "Do not add location", onPress: () => this.postChit()},
        {text: "cancel",onPress: () => console.log("Canceled")},
        {text: 'OK',onPress:() => this.getCoordinates()},
      ]
    );
  }
  componentDidMount()
  {
    this.getUser();
    this.getData();
    this.getLocationPermission();
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
        <View style = {styles.chits}>
          <FlatList
          data = {this.state.chits}
          renderItem = {({item}) =>
          <View>
            <TouchableOpacity onPress = {() => this.storeId('otherUserId',item.user.user_id.toString())}>
              <Text>{item.user.given_name} {item.user.family_name}: {item.chit_content}</Text>
              <Text>{this.state.latitude} {this.state.longitude}</Text>
            </TouchableOpacity>
          </View>}
          keyExtractor = {({id},index) => id}
          />
        </View>
        <TextInput style = {styles.textInputC} placeholder = "Chit.." onChangeText ={(text) => this.setState({chit_content:text})} value ={this.state.refresh}/>
        <View style = {styles.chitInput}>
          <Button title = "Chit!" onPress={()=>this.addLocation()}/>
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
    fontSize: 22,
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
    bottom: 0,
    width: 150,
    marginLeft: 120
  },
  textInputC:
  {
    height:40,
    width: 420,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 25,
    position: "absolute",
    marginBottom:0,
    bottom: 35,
  },
  user:
  {
    top:60,
    height:40,
    fontSize:16,
  }
});

export default HomeScreenLoggedIn;
