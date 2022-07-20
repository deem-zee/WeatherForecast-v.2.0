import { format } from 'date-fns'

export function dataGetter(data) {
    return {
        icon: `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
        feelsLike: Math.round(data.list[0].main.feels_like),
        currentTemp: Math.round(data.list[0].main.temp),
        description: data.list[0].weather[0].description,
        humidity: data.list[0].main.humidity,
        city: data.city.name,
        pressure: data.list[0].main.pressure,
        wind: data.list[0].wind.speed,
        sunrise: new Date(data.city.sunrise * 1000),
        sunset: new Date(data.city.sunset * 1000)
    }
}      

export function searchedCityData(data) {
    return {
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        feelsLike: Math.round(data.main.feels_like),
        currentTemp: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        city: `${data.name}, ${data.sys.country}`,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000)
    }
}

export function futureWeatherGetter(data) {
    const weather = [];
    for(let i = 1; i < 6; i++) {
        let day = {
            temp: data.list[i].main.temp,
            time: format(new Date(data.list[i].dt_txt), "HH:mm"),
            img: data.list[i].weather[0].icon
        }
        weather.push(day);
    }
    return weather;
}