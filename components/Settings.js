import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { ThemeContext } from "./ThemeContext";

const Settings = () => {
    const { theme, updateTheme } = useContext(ThemeContext);

    const lightTheme = () => {
        updateTheme({
            backgroundColor: 'white',
            textColor: 'black',
            tabIconColor: '#505050',
            tabBarBg: 'whitesmoke',
            inputContainerBg: 'lightblue'
        });
    }

    const darkTheme = () => {
        updateTheme({
            backgroundColor: '#454545',
            textColor: 'whitesmoke',
            tabIconColor: 'whitesmoke',
            tabBarBg: '#606060',
            inputContainerBg: '#606060'
        });
    }



    return (
        <View style={{ backgroundColor: theme.backgroundColor, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginBottom: 20 }}>
                <Button title='Light theme' onPress={lightTheme} />
            </View>
            <Button title='Dark theme' onPress={darkTheme} />
        </View>
    )
}

export default Settings;