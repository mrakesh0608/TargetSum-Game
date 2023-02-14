import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import HomeStack from "./stacks/HomeStack";

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent'
    },
};


export default function Navigator() {
    return (
        <NavigationContainer theme={MyTheme}>
            <HomeStack />
        </NavigationContainer>
    );
}