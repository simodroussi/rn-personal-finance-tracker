import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import Home from './screens/Home';
import AddCategory from './screens/AddCategory';
import { Provider } from './context/context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#228CDB',
            },
            headerTintColor: '#fff',
          }}
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRightContainerStyle: {
                marginRight: 10,
              },
              headerRight: () => (
                <Icon
                  name="plus"
                  type="feather"
                  color="#fff"
                  onPress={() => navigation.navigate('AddCategory')}
                />
              ),
            })}
          />
          <Stack.Screen name="AddCategory" component={AddCategory} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
