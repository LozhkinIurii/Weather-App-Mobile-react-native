import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, TextInput, Button, Text, Dimensions, useWindowDimensions, ToastAndroid, Platform, Alert } from 'react-native';
import WeatherForecastListItem from './WeatherForecastListItem';
import * as Location from 'expo-location';
import { ThemeContext } from './ThemeContext';

const WeatherForecastScreen = () => {
    const windowDimensions = useWindowDimensions();
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [forecast, setForecast] = useState([]);
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('Tampere');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [refresh, setRefresh] = useState(true);
    let prevDay = null;
    const { theme } = useContext(ThemeContext);


    useEffect(() => {
        getLocation();
    }, []);


    useEffect(() => {
        const handleOrientationChange = () => {
            setScreenWidth(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change', handleOrientationChange);
        return () => {
            if (Dimensions.removeEventListener) {
                Dimensions.removeEventListener('change', handleOrientationChange);
            }
        };
    }, [windowDimensions.width]);


    useEffect(() => {
        const fetchWeatherForecast = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=ef7f6e82e66fc22ccbecc983a791642d`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setForecast(data.list);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherForecast();
    }, [refresh])


    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            const userLocation = await Location.getCurrentPositionAsync({});
            setLatitude(userLocation?.coords?.latitude);
            setLongitude(userLocation?.coords?.longitude);
            if (Platform.OS === 'android') {
                ToastAndroid.show(`Your location has been successfully determined`, ToastAndroid.SHORT);
            }
        } catch (error) {
            if (Platform.OS === 'android') {
                ToastAndroid.show(`Couldn't determine your location`, ToastAndroid.SHORT);
            }
            console.error('Error fetching location: ', error);
        }
    };

    const buttonClick = () => {
        setCity(location);
        setLocation('');
        setRefresh(!refresh);
    }


    const currentLocation = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setForecast(data.list);
            setCity(data.city.name);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }


    return (
        <View style={[styles.container, { width: screenWidth, backgroundColor: theme.backgroundColor }]}>
            <View style={[styles.inputContainer, { backgroundColor: theme.inputContainerBg }]}>
                <Button title='Current location' onPress={currentLocation} />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Type a location'
                        onChangeText={value => setLocation(value.trim())}
                    />
                    <Button title='Set location' onPress={buttonClick} />
                </View>
                <Text style={[styles.locationText, { color: theme.textColor }]}>{city}</Text>
            </View>
            <FlatList
                data={forecast}
                renderItem={({ item }) => {
                    const currentDay = new Date(item.dt_txt).getDay();
                    if (currentDay !== prevDay) {
                        prevDay = currentDay;
                        return (
                            <WeatherForecastListItem
                                weatherIcon={item.weather[0].icon}
                                temperature={item.main.temp}
                                windSpeed={item.wind.speed}
                                screenWidth={screenWidth}
                                dayOfWeek={currentDay}
                                timeOfDay={item.dt_txt.split(' ')[1]}
                            />
                        );
                    }
                    return (
                        <WeatherForecastListItem
                            weatherIcon={item.weather[0].icon}
                            temperature={item.main.temp}
                            windSpeed={item.wind.speed}
                            screenWidth={screenWidth}
                            timeOfDay={item.dt_txt.split(' ')[1]}
                        />
                    )
                }
                }
                keyExtractor={item => item.dt}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        marginTop: 35
    },
    input: {
        width: '50%',
        height: 40,
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginRight: 15,
        backgroundColor: 'white'
    },
    button: {
        marginBottom: 20,
    },
    locationText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});


export default WeatherForecastScreen;