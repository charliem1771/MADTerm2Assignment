import{ createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs';
import { createStackNavigator  } from 'react-navigation-stack';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
const AppStackNav = createStackNavigator({
  Home:{
    screen: HomeScreen
  },
  Login:
  {
    screen: LoginScreen
  }
});

const AppContainer = createAppContainer(AppStackNav)
export default AppContainer;
/*const AppTabNav = createBottomTabNavigator({
  Home:
  {
      screen: HomeScreen
  },
  Login:
  {
      screen: LoginScreen
  }
});
const AppContainer = createAppContainer(AppTabNav);
export default AppContainer;*/
