import Image from "next/image";

const Sunny = () => {
	return (
		<div>
			<h2 className="text-center text-3xl font-bold">Sunny</h2>
			<Image
				src="https://raw.githubusercontent.com/roe-dl/weathericons/db4f99ea682e252f5bf0dac118f7bab9aea3450b/weathericons-filled/clear-day.svg"
				width={500}
				height={500}
				alt="A sun animation"
			/>
		</div>
	);
};

export default Sunny;
