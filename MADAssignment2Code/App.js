import{ createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import { createStackNavigator  } from 'react-navigation-stack';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreenLoggedIn from './screens/HomeLoggedIn';
import ProfileScreen from './screens/profilePage';
import ProfileOther from './screens/otherUser';
import ProfileOtherSignedIn from './screens/otherUserLoggedIn'
const AppStackNav = createStackNavigator({
  Home:{
    screen: HomeScreen
  },
  Login:
  {
    screen: LoginScreen
  },
  Register:
  {
    screen: RegisterScreen
  },
  HomeLoggedIn:
  {
    screen: HomeScreenLoggedIn
  },
  profilePage:
  {
    screen: ProfileScreen
  },
  otherUser:
  {
    screen: ProfileOther
  },
  otherUserLoggedIn:
  {
    screen: ProfileOtherSignedIn
  }
});

const AppContainer = createAppContainer(AppStackNav)
export default AppContainer;
