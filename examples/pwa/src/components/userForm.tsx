import { useRouter } from 'next/router';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { useOfflineSyncContext } from 'offline-sync-handler';
const UserForm = () => {
	const _ = useOfflineSyncContext();
	const [data, setData] = useState(null);
	const router = useRouter();
	const [user, setUser] = useState({
		id: 0,
		name: '',
		username: '',
		email: '',
		address: {
			street: '',
			suite: '',
			city: '',
			zipcode: '',
			geo: {
				lat: '',
				lng: ''
			}
		},
		phone: '',
		website: '',
		company: {
			name: '',
			catchPhrase: '',
			bs: ''
		}
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: value
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response: any = await _?.sendRequest({
			url: 'https://jsonplaceholder.typicode.com/users',
			method: 'POST',
			data: user
		});

		if (response) {
			swal({
				text: 'User is created successfully',
				icon: 'success'
			});
			router.push('/');
		}
	};

	return (
		<div className="max-w-lg mx-auto my-10 p-4 bg-white rounded-lg shadow-lg">
			<h1 className="mt-4 mb-8 text-center text-3xl font-bold">Create User</h1>
			{data && JSON.stringify(data)}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="name">
						Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={user.name}
						onChange={handleChange}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="Enter your name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="username">
						Username
					</label>
					<input
						type="text"
						name="username"
						id="username"
						value={user.username}
						onChange={handleChange}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="Enter your name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={user.email}
						onChange={handleChange}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="Enter your email"
					/>
				</div>
				{/* Address */}
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">Address</label>
					<input
						type="text"
						name="street"
						placeholder="Street"
						value={user.address.street}
						onChange={handleChange}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>

					<input
						type="text"
						name="zipcode"
						placeholder="Zipcode"
						value={user.address.zipcode}
						onChange={handleChange}
						className="appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
						Phone
					</label>
					<input
						type="text"
						name="phone"
						id="phone"
						value={user.phone}
						onChange={handleChange}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2" htmlFor="website">
						Website
					</label>
					<input
						type="text"
						name="website"
						id="website"
						value={user.website}
						onChange={handleChange}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				{/* Company */}
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">Company</label>
					<input
						type="text"
						name="companyName"
						placeholder="Company Name"
						value={user.company.name}
						onChange={handleChange}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="text-center">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserForm;
