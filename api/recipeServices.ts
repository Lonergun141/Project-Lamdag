

export const fetchRandomRecipe = async () => {
	try {
		const promises = Array.from({ length: 6 }, () =>
			fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then((res) => res.json())
		);
		const results = await Promise.all(promises);
        console.log(results);
        return results.map((result) => result.meals[0]);
	} catch (error) {
		console.error('Error fetching random recipes:', error);
	}
};



