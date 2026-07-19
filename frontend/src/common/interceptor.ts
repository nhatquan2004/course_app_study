import axios from 'axios';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const instance = axios.create();

instance.interceptors.request.use(
	async function (config) {
		let token = '';

		const cookieStore = cookies();
		token = (await cookieStore).get('loginToken')?.value || '';

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	function (error) {
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
			} else if (statusCode === 400 || statusCode === 409 || statusCode === 422) {
				console.error(`Yêu cầu không hợp lệ (${statusCode}): ${errorMessage}`);
			} else if (statusCode === 500) {
				console.error('Lỗi kết nối với server');
			} else {
				console.error(`Lỗi ${statusCode}: ${errorMessage}`);
				redirect('/error');
			}
		} else if (error.request) {
			console.error('Lỗi network - vui lòng kiểm tra đường truyền');
		} else {
			console.error(`Request error: `, error.message);
		}
		return Promise.reject(error);
	},
);

export default instance;
