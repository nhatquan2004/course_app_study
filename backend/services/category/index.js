const { readFile, writeFile } = require('node:fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../../store/categories.json');

async function getCategories() {
	try {
		const data = await readFile(filePath, 'utf8');

		console.log(data);
		return JSON.parse(data);
	} catch (err) {
		console.log('error', err);
	}
}

async function createCategory(categoryName) {
	const category = {
		id: Date.now(),
		categoryName,
	};

	const originalData = await readFile(filePath, 'utf8');

	const parseOriginalData = JSON.parse(originalData);

	parseOriginalData.push(course);
	const data = JSON.stringify(parseOriginalData, null, 2);
	await writeFile(filePath, data);

	return course;
}

module.exports = { createCategory };
