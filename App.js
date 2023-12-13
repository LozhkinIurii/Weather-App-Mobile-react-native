import { ThemeProvider } from './components/ThemeContext';
import WeatherApp from './components/WeatherApp';


export default function App() {

    return (
        <ThemeProvider>
            <WeatherApp />
        </ThemeProvider>
    );
}
