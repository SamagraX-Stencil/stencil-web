import React from 'react';

const UserCard = ({ user }: any) => {
	return (
		<div className="mx-3 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg">
			<img
				className="object-cover h-48 w-full"
				src={`https://i.pravatar.cc/300?img=${user?.id}`}
				alt={user?.name}
			/>
			<div className="px-4 py-2">
				<h2 className="font-bold text-xl mb-2">{user?.name}</h2>
				<p className="text-gray-600 mb-2">@{user?.username}</p>
				<p className="text-gray-600 mb-2">{user?.email}</p>
				<p className="text-gray-600 mb-2">{user?.phone}</p>
				<p className="text-gray-600 mb-2">{user?.website}</p>
				<div className="border-t border-gray-300 pt-2">
					<h3 className="font-bold text-lg mb-2">Address</h3>
					<p className="text-gray-600 mb-2">
						{user?.address?.street}, {user?.address?.suite}
					</p>
					<p className="text-gray-600 mb-2">
						{user?.address?.city}, {user?.address?.zipcode}
					</p>
				</div>
				<div className="border-t border-gray-300 pt-2">
					<h3 className="font-bold text-lg mb-2">Company</h3>
					<p className="text-gray-600 mb-2">{user?.company?.name}</p>
					<p className="text-gray-600 mb-2">{user?.company?.catchPhrase}</p>
					<p className="text-gray-600 mb-2">{user?.company?.bs}</p>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
