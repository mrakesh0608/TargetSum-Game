import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Home';
import Game from '../../screens/Game';
import CustomGame from '../../screens/CustomGame';

const Stack = createStackNavigator();

export default function HomeStack() {

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc',
                height: 80
            },
            headerTitleAlign: 'center',
        }}>
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Custom Game" component={CustomGame} />
        </Stack.Navigator>
    );
}