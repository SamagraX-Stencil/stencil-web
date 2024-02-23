import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com';

export const getUsersData = async () => {
	try {
		const response = await axios.get(`${baseUrl}/users`);
		return response?.data;
	} catch (error) {
		return error;
	}
};

export const createUser = async (user: any) => {
	try {
		const response = await axios.post(`${baseUrl}/users`, user);
		return response;
	} catch (error) {
		return error;
	}
};
