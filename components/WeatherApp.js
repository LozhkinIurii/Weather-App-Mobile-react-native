import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WeatherForecastScreen from './WeatherForecastScreen';
import Settings from './Settings';
import CurrentWeather from './CurrentWeather';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';


export default function WeatherApp() {
    const Tab = createBottomTabNavigator();
    const { theme } = useContext(ThemeContext);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === '5 Days Forecast') {
                            iconName = 'calendar-outline';
                        } else if (route.name === 'Current weather') {
                            iconName = 'partly-sunny-outline';
                        } else if (route.name === 'Settings') {
                            iconName = 'settings-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: theme.tabIconColor,
                    tabBarActiveBackgroundColor: 'lightblue',
                    tabBarStyle: { backgroundColor: theme.tabBarBg },
                    headerShown: false,
                })}
            >
                <Tab.Screen name="5 Days Forecast" component={WeatherForecastScreen} />
                <Tab.Screen name="Current weather" component={CurrentWeather} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
