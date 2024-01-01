## Weather-App-Mobile-react-native

### To run the app:

* _git clone_
* move to app folder
* _npm install_
* _npx expo start_
* scan the QR code shown after running previous command

### NOTE

In files **CurrentWeather.js** and **WeatherForecastScreen.js** change _${APPID}_ in fetching URL (such as const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APPID}`)) to your own real appid.
To do that, register at [weather API website](api.openweathermap.org). Copy the appid and paste it into the URLs in the code.