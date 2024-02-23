import UserCard from '@component/components/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useOfflineSyncContext } from 'offline-sync-handler';

const Home = () => {
	const router = useRouter();
	const [users, getUsers]: any = useState();
	const syncContext = useOfflineSyncContext();

	useEffect(() => {
		const getData = async () => {
			const users = await syncContext?.sendRequest({
				url: `https://jsonplaceholder.typicode.com/users`,
				method: 'GET',
				identifier: 'fetchUser'
			});
			getUsers(users);
		};
		if (syncContext?.sendRequest) getData();
	}, [syncContext]);

	const handleCreateUser = () => {
		router.push('/createUser');
	};
	return (
		<div className="p-4 container mx-auto">
			<h1 className="mt-4 mb-8 text-center text-3xl font-bold">Sample Users</h1>
			<div className="flex justify-end mt-3 mb-5 px-4">
				<button
					onClick={handleCreateUser}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Create New User
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{users &&
					users?.length > 0 &&
					users?.map((user: any, index: number) => <UserCard user={user} key={index} />)}
			</div>
		</div>
	);
};

export default Home;
