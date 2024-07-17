// cSpell: ignore openmeteo meteofrance datetime

"use server";

import { fetchWeatherApi } from "openmeteo";

export const fetchData = async (
	lat: number,
	long: number,
	hour: number
): Promise<number | null> => {
	const params = {
		latitude: lat,
		longitude: long,
		hourly: ["temperature_2m", "is_day"],
		forecast_days: 1,
		models: "meteofrance_seamless",
	};
	const url = "https://api.open-meteo.com/v1/meteofrance";
	const responses = await fetchWeatherApi(url, params);

	// Helper function to form time ranges
	const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

	// Process first location. Add a for-loop for multiple locations or weather models
	const response = responses[0];

	// Attributes for timezone and location
	const utcOffsetSeconds = response.utcOffsetSeconds();
	// const timezone = response.timezone();
	// const timezoneAbbreviation = response.timezoneAbbreviation();
	// const latitude = response.latitude();
	// const longitude = response.longitude();

	const hourly = response.hourly()!;

	// Note: The order of weather variables in the URL query and the indices below need to match!
	const weatherData = {
		hourly: {
			time: range(
				Number(hourly.time()),
				Number(hourly.timeEnd()),
				hourly.interval()
			).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
			temperature2m: hourly.variables(0)!.valuesArray()!,
			isDay: hourly.variables(1)!.valuesArray()!,
		},
	};

	// `weatherData` now contains a simple structure with arrays for datetime and weather data
	for (let i = 0; i < weatherData.hourly.time.length; i++) {
		const weatherHour = weatherData.hourly.time[i].getHours();
		if (hour === weatherHour) {
			// console.log(
			// 	weatherData.hourly.time[i].toISOString(),
			// 	Math.round(weatherData.hourly.temperature2m[i])
			// );
			return Math.round(weatherData.hourly.temperature2m[i]);
		}
	}
	return null;
};
