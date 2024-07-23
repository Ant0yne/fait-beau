import { motion } from "framer-motion";

import Image from "next/image";

const Sunny = () => {
	return (
		<div className="flex flex-col gap-10">
			<h2 className="text-center text-3xl font-bold">Sunny</h2>
			<motion.div
				animate={{
					rotate: [0, 45, 90, 135, 180, 225, 270, 315],
					scale: [1, 1.1, 1, 1.1, 1.1, 1, 1.1, 1],
				}}
				drag="y"
				dragConstraints={{ top: 0, bottom: 0 }}
				dragSnapToOrigin
				transition={{
					repeat: Infinity,
					duration: 10,
					ease: "linear",
				}}>
				<Image
					src="https://raw.githubusercontent.com/roe-dl/weathericons/db4f99ea682e252f5bf0dac118f7bab9aea3450b/weathericons-filled/clear-day.svg"
					width={500}
					height={500}
					alt="A sun animation"
				/>
			</motion.div>
		</div>
	);
};

export default Sunny;
