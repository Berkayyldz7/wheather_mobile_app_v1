import axios from "axios";

const apiKey = "<your-wheatherapi.com-api-keys>";
const forecastEndPoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndPoint = params => `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;


const apiCall = async (endpoint)=>{
    const options = {
        method : "GET",
        url : endpoint,

    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

export const fetchForecast = params => {
    return apiCall(forecastEndPoint(params))
}

export const fetchLocations = params => {
    return apiCall(locationsEndPoint(params))
}
