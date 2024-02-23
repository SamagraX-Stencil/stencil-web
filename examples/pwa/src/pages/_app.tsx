'use client';
import '@component/styles/global.css';
import '@component/styles/tailwind.css';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export default function App({ Component, pageProps }: AppProps) {
	const [packageModule, setPackageModule] = useState<{
		OfflineSyncProvider: any | undefined;
	}>();

	useEffect(() => {
		const fetchPackage = async () => {
			try {
				const packageModule = await import('offline-sync-handler');
				//@ts-ignore
				setPackageModule(packageModule);
			} catch (error) {
				console.error('Error loading the npm package:', error);
			}
		};
		fetchPackage();
	}, []);

	const onSyncSuccess = (response: any) => {
		if (response.config.identifier !== 'fetchUser') {
			swal({
				text: 'User is created successfully',
				icon: 'success'
			});
		}
	};

	const renderOffline = ({ isOnline }: { isOnline: boolean }) => {
		return isOnline ? null : (
			<div style={{ backgroundColor: 'red', color: 'white' }} className="text-center">
				Not Connected to Internet
			</div>
		);
	};
	if (packageModule) {
		return (
			<packageModule.OfflineSyncProvider render={renderOffline} onSyncSuccess={onSyncSuccess}>
				<>
					<Component {...pageProps} />
				</>
			</packageModule.OfflineSyncProvider>
		);
	}

	return (
		<>
			<Component {...pageProps} />
		</>
	);
}
