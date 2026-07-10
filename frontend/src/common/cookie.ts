export function getCookieValue(key: string): string | null {
	if (typeof key !== 'string' || !key.trim()) {
		console.error('Invalid cookie name');
		return null;
	}

	if (typeof document === 'undefined') {
		return null;
	}

	const cookies = '; ' + document.cookie;
	const parts = cookies.split('; ' + encodeURIComponent(key) + '=');

	if (parts.length === 2) {
		const cookieValue = parts.pop()?.split(';').shift();
		return cookieValue ? decodeURIComponent(cookieValue) : null;
	}

	return null;
}
