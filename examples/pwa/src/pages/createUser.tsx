import React, { useEffect } from 'react';
import UserForm from '@component/components/userForm'; // Adjust the import path based on your file structure

const CreateUser = () => {
	return (
		<div className="bg-gray-100 min-h-screen flex items-center justify-center">
			<UserForm />
		</div>
	);
};

export default CreateUser;
