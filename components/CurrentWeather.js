import { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button, Alert, Linking, Platform } from "react-native";
import * as Location from 'expo-location';
import { ThemeContext } from "./ThemeContext";

const CurrentWeather = () => {
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('Tampere');
    const [weather, setWeather] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        getLocation();
    }, []);


    useEffect(() => {
        const fetchWeatherForecast = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APPID}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setWeather(data);
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
        } catch (error) {
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
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${APPID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setWeather(data);
            setCity(data.name);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    const showOnMap = () => {
        const url = Platform.select({
            android: `geo:${latitude},${longitude}`,
            ios: `maps:${latitude},${longitude}`
        });
        Linking.openURL(url);
    }



    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={{ alignItems: 'center' }}>
                <Button title='Current location' onPress={currentLocation} />
                <TextInput
                    style={styles.input}
                    placeholder='Type a location'
                    value={location}
                    onChangeText={value => setLocation(value.trim())}
                />
                <Button title='Set location' onPress={buttonClick} />
                <View style={{ marginTop: 20 }}>
                    <Button title='Show geolocation on map' onPress={showOnMap} />
                </View>
                <Text style={[styles.locationText, { color: theme.textColor }]}>{city}</Text>
            </View>
            <Image style={styles.image} source={{ uri: 'http://openweathermap.org/img/w/' + weather?.weather[0].icon + '.png' }}></Image>
            <Text style={{ fontSize: 18, color: theme.textColor }}>Temperature: {weather?.main.temp} °C</Text>
            <Text style={{ fontSize: 18, color: theme.textColor }}>Wind speed: {weather?.wind.speed}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    input: {
        width: '80%',
        height: 40,
        fontSize: 18,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
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

export default CurrentWeather;