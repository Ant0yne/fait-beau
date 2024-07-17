"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/utils/actions";
import type { TWeatherInfo } from "@/lib/types";
import Cloudy from "./Cloudy";

const Weather = () => {
	const [weatherInfo, setWeatherInfo] = useState<TWeatherInfo | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if ("geolocation" in navigator) {
			setIsLoading(true);
			// Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
			navigator.geolocation.getCurrentPosition(async ({ coords }) => {
				const { latitude, longitude } = coords;
				const result = await fetchData(
					latitude,
					longitude,
					new Date().getHours()
				);

				console.log(result);

				setWeatherInfo(result);
				setIsLoading(false);
			});
		}
	}, []);
	return isLoading ? (
		<div>Loading</div>
	) : (
		<div>{weatherInfo?.WMOCode === 3 ? <Cloudy /> : null}</div>
	);
};

export default Weather;
