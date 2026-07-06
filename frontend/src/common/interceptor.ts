import axios from 'axios';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const instance = axios.create();

instance.interceptors.request.use(
	async function (config) {
		const cookieStore = cookies();
		const token = (await cookieStore).get('loginToken');
		config.headers.Authorization = `Bearer ${token?.value}`;

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response) {
			const statusCode = error.response.status;
			const errorMessage = error.response.data.message || 'An error occured';

			if (statusCode === 401) {
				console.error('Bạn không có quyền truy cập trang này');
			} else if (statusCode === 500) {
				console.error('Lỗi kết nối với server');
			} else {
				redirect('/error');
				//console.error(`Lỗi ${statusCode}: ${errorMessage}`);
			}
		} else if (error.request) {
			console.error('Lỗi network - vui lòng kiểm tra đường truyền');
		} else {
			console.error(`Request error: `, error.message);
		}
	},
);

export default instance;
