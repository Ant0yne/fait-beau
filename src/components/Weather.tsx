"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/utils/actions";

const Weather = () => {
	const [temp, setTemp] = useState<number | null>(null);
	useEffect(() => {
		if ("geolocation" in navigator) {
			// Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
			navigator.geolocation.getCurrentPosition(async ({ coords }) => {
				const { latitude, longitude } = coords;
				const result = await fetchData(
					latitude,
					longitude,
					new Date().getHours()
				);
				setTemp(result);
			});
		}
	}, []);
	return <div>Weather</div>;
};

export default Weather;
