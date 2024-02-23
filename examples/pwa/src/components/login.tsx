import { useRouter } from 'next/router';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { useOfflineSyncContext } from 'offline-sync-handler';
const LoginForm = () => {
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
		swal({
			text: 'User is signed up',
			icon: 'success'
		});
	};

	return (
		<div className="min-w-[50vw] mx-auto my-10 p-4 bg-white rounded-lg shadow-lg">
			<h1 className="mt-4 mb-8 text-center text-3xl font-bold">Sign Up</h1>
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
						placeholder="Enter your phone number"
					/>
				</div>

				{/* Company */}
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">Password</label>
					<input
						type="password"
						name="companyName"
						placeholder="Enter your password"
						onChange={() => {}}
						className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="text-center">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-5"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
