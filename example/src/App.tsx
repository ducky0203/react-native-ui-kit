import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  GestureHandlerRootView,
  SafeAreaProvider,
  ToastProvider,
} from 'react-native-ui-kit';
import type { RootStackParamList } from './navigation';
import { HomeScreen } from './screens/HomeScreen';
import { ButtonsScreen } from './screens/ButtonsScreen';
import { FormScreen } from './screens/FormScreen';
import { DisplayScreen } from './screens/DisplayScreen';
import { ListsScreen } from './screens/ListsScreen';
import { LayoutScreen } from './screens/LayoutScreen';
import { FeedbackScreen } from './screens/FeedbackScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'UI Kit' }}
              />
              <Stack.Screen
                name="Buttons"
                component={ButtonsScreen}
                options={{ title: 'Buttons' }}
              />
              <Stack.Screen
                name="Form"
                component={FormScreen}
                options={{ title: 'Form & Text' }}
              />
              <Stack.Screen
                name="Display"
                component={DisplayScreen}
                options={{ title: 'Display' }}
              />
              <Stack.Screen
                name="Lists"
                component={ListsScreen}
                options={{ title: 'Lists' }}
              />
              <Stack.Screen
                name="Layout"
                component={LayoutScreen}
                options={{ title: 'Layout' }}
              />
              <Stack.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{ title: 'Feedback' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
