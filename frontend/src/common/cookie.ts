export function getCookieValue(key: string) {
	if (typeof key !== 'string' || !key.trim()) {
		console.error('Invalid cookie name');
		return null;
	}

	// Add "; " at the start to simplify matching
	const cookies = '; ' + document.cookie;
	const parts = cookies.split('; ' + encodeURIComponent(key) + '=');

	console.log(parts);
	// if (parts.length === 2) {
	// 	// Decode in case the cookie value is URL-encoded
	// 	return decodeURIComponent(parts.pop().split(';').shift());
	// }

	return parts[1].split(';')[0]; // Not found
}
