import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/pages/HomeScreen';
import RegisterAtividade from './src/pages/RegisterAtividade';
import UpdateAtividade from './src/pages/UpdateAtividade';
import ViewAtividade from './src/pages/ViewAtividade';
import ViewAllAtividade from './src/pages/ViewAllAtividade';
import DeleteAtividade from './src/pages/DeleteAtividade';
import ViewByDate from './src/pages/ViewByDate';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Gerenciamento de Atividades',
            headerStyle: {
              backgroundColor: 'lime',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterAtividade}
          options={{
            title: 'Cadastrar Atividade',
            headerStyle: {
              backgroundColor: '#00FFFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateAtividade}
          options={{
            title: 'Atualizar Atividade',
            headerStyle: {
              backgroundColor: '#006400',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewAtividade}
          options={{
            title: 'Visualizar Atividade',
            headerStyle: {
              backgroundColor: '#D2691E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllAtividade}
          options={{
            title: 'Visualizar Todas os Atividades',
            headerStyle: {
              backgroundColor: '#4B0082',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteAtividade}
          options={{
            title: 'Excluir Atividade',
            headerStyle: {
              backgroundColor: '#DC143C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewByDate"
          component={ViewByDate}
          options={{
            title: 'Ver por Data',
            headerStyle: {
              backgroundColor: '	#808000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;