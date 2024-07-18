"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/utils/actions";

// TYPES
import type { TWeatherInfo } from "@/lib/types";

// COMPONENTS
import Cloudy from "./Cloudy";
import ActivateLocation from "./ActivateLocation";
import Sunny from "./Sunny";
import MainlySunny from "./MainlySunny";
import PartlyCloudy from "./PartlyCloudy";

const Weather = () => {
	const [weatherInfo, setWeatherInfo] = useState<TWeatherInfo | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if ("geolocation" in navigator) {
			// setIsLoading(true);
			let result: TWeatherInfo | null = null;
			// Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
			navigator.geolocation.getCurrentPosition(async ({ coords }) => {
				const { latitude, longitude } = coords;
				result = await fetchData(latitude, longitude, new Date().getHours());
				console.log(result);
				setWeatherInfo(result);
			});
			if (!result) {
				setWeatherInfo({
					WMOCode: -1,
					day: "day",
				});
			}
			setIsLoading(false);
		} else {
			setWeatherInfo(null);
			setIsLoading(false);
		}
	}, []);
	return isLoading ? (
		<div>Loading</div>
	) : (
		<div>
			{weatherInfo?.WMOCode === -1 ? <ActivateLocation /> : null}
			{weatherInfo?.WMOCode === 0 ? <Sunny /> : null}
			{weatherInfo?.WMOCode === 1 ? <MainlySunny /> : null}
			{weatherInfo?.WMOCode === 2 ? <PartlyCloudy /> : null}
			{weatherInfo?.WMOCode === 3 ? <Cloudy /> : null}
		</div>
	);
};

export default Weather;
