import { useContext } from 'react';
import { StyleSheet, Text, Image, ScrollView } from 'react-native';
import { ThemeContext } from './ThemeContext';


export default function WeatherForecastListItem(props) {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = (props.dayOfWeek !== undefined) ? weekDays[props.dayOfWeek] : null;
    const { theme } = useContext(ThemeContext);



    return (
        <ScrollView contentContainerStyle={[styles.container, { width: props.screenWidth }]}>
            {day && <Text style={[styles.text, { fontWeight: 'bold', fontSize: 22, color: theme.textColor }]}>{day}</Text>}
            <Text style={[styles.text, { color: theme.textColor }]}>{props.timeOfDay}</Text>
            <Image style={styles.image} source={{ uri: 'http://openweathermap.org/img/w/' + props.weatherIcon + '.png' }}></Image>
            <Text style={[styles.text, { color: theme.textColor }]}>Temperature: {props.temperature} °C</Text>
            <Text style={[styles.text, { color: theme.textColor }]}>Wind speed: {props.windSpeed} m/s</Text>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 18,
    },
    input: {
        width: 200,
        height: 40,
        fontSize: 18,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 10
    },
    button: {
        marginVertical: 30
    }
});
