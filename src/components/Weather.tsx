"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/utils/actions";

// TYPES
import type { TWeatherInfo } from "@/lib/types";

// COMPONENTS
import Sunny from "./WMOCodes/0Sunny";
import MainlySunny from "./WMOCodes/1MainlySunny";
import PartlyCloudy from "./WMOCodes/2PartlyCloudy";
import Cloudy from "./WMOCodes/3Cloudy";
import Foggy from "./WMOCodes/45Foggy";
import RimeFog from "./WMOCodes/48RimeFog";
import LightDrizzle from "./WMOCodes/51LightDrizzle";
import Drizzle from "./WMOCodes/53Drizzle";
import HeavyDrizzle from "./WMOCodes/55HeavyDrizzle";
import LightFreezingDrizzle from "./WMOCodes/56LightFreezingDrizzle";
import FreezingDrizzle from "./WMOCodes/57FreezingDrizzle";
import LightRain from "./WMOCodes/61LightRain";
import Rain from "./WMOCodes/63Rain";
import HeavyRain from "./WMOCodes/65HeavyRain";
import LightFreezingRain from "./WMOCodes/66LightFreezingRain";
import FreezingRain from "./WMOCodes/67FreezingRain";
import LightSnow from "./WMOCodes/71LightSnow";
import Snow from "./WMOCodes/73Snow";
import HeavySnow from "./WMOCodes/75HeavySnow";
import SnowGrains from "./WMOCodes/77SnowGrains";
import LightShowers from "./WMOCodes/80LightShowers";
import Showers from "./WMOCodes/81Showers";
import HeavyShowers from "./WMOCodes/82HeavyShowers";
import LightSnowShowers from "./WMOCodes/85LightSnowShowers";
import SnowShowers from "./WMOCodes/86SnowShowers";
import Thunderstorm from "./WMOCodes/95Thunderstorm";
import LightThunderstormsWithHail from "./WMOCodes/96LightThunderstormsWithHail";
import ThunderstormWithHail from "./WMOCodes/99ThunderstormWithHail";
import ActivateLocation from "./ActivateLocation";
import NoLocation from "./NoLocation";

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
			{weatherInfo?.WMOCode === 45 ? <Foggy /> : null}
			{weatherInfo?.WMOCode === 48 ? <RimeFog /> : null}
			{weatherInfo?.WMOCode === 51 ? <LightDrizzle /> : null}
			{weatherInfo?.WMOCode === 53 ? <Drizzle /> : null}
			{weatherInfo?.WMOCode === 55 ? <HeavyDrizzle /> : null}
			{weatherInfo?.WMOCode === 56 ? <LightFreezingDrizzle /> : null}
			{weatherInfo?.WMOCode === 57 ? <FreezingDrizzle /> : null}
			{weatherInfo?.WMOCode === 61 ? <LightRain /> : null}
			{weatherInfo?.WMOCode === 63 ? <Rain /> : null}
			{weatherInfo?.WMOCode === 65 ? <HeavyRain /> : null}
			{weatherInfo?.WMOCode === 66 ? <LightFreezingRain /> : null}
			{weatherInfo?.WMOCode === 67 ? <FreezingRain /> : null}
			{weatherInfo?.WMOCode === 71 ? <LightSnow /> : null}
			{weatherInfo?.WMOCode === 73 ? <Snow /> : null}
			{weatherInfo?.WMOCode === 75 ? <HeavySnow /> : null}
			{weatherInfo?.WMOCode === 77 ? <SnowGrains /> : null}
			{weatherInfo?.WMOCode === 80 ? <LightShowers /> : null}
			{weatherInfo?.WMOCode === 81 ? <Showers /> : null}
			{weatherInfo?.WMOCode === 82 ? <HeavyShowers /> : null}
			{weatherInfo?.WMOCode === 85 ? <LightSnowShowers /> : null}
			{weatherInfo?.WMOCode === 86 ? <SnowShowers /> : null}
			{weatherInfo?.WMOCode === 95 ? <Thunderstorm /> : null}
			{weatherInfo?.WMOCode === 96 ? <LightThunderstormsWithHail /> : null}
			{weatherInfo?.WMOCode === 99 ? <ThunderstormWithHail /> : null}
			{!weatherInfo ? <NoLocation /> : null}
		</div>
	);
};

export default Weather;
