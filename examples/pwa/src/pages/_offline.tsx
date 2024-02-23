import React from 'react';
import { useRouter } from 'next/router';

const Offline = () => {
	const router = useRouter();
	const handleBack = () => {
		router.back();
	};

	return (
		<div
			id="login"
			className="xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary min-h-[100vh] flex justify-center items-center flex-col"
		>
			<img src="./images/offline.png" />
			<div className="text-appGray font-bold text-[22px] mt-3">You are offline</div>
			<div className="text-primary font-regular text-[15px] text-center mt-2">
				It seems there is a problem with your connection. Please check your network status.
			</div>
			<div className="font-medium mt-3" onClick={handleBack}>
				Back
			</div>
		</div>
	);
};

export default Offline;
