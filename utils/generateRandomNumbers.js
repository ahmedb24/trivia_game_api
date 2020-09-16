function generateRandomNumbers() {
	let set = new Set();
	while (set.size < 10) {
		var randNumber = Math.floor(Math.random() * 10);
		set.add(randNumber);
	}
	return set;
}
exports.generateRandomNumbers = generateRandomNumbers;
