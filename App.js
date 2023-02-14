import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { View } from 'react-native';

import Navigator from './src/navigation/Navigator';

export default class App extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Navigator />
                <StatusBar style='dark' />
            </View>
        );
    }
}