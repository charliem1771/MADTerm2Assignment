import{ createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import { createStackNavigator  } from 'react-navigation-stack';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
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
});

const AppContainer = createAppContainer(AppStackNav)
export default AppContainer;
