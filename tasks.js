{
	function sum(a) {
		return function (b) {
			return a + b; // берёт "a" из внешнего лексического окружения
		};
	}
}

{
	let arr = [1, 2, 3, 4, 5, 6, 7];

	function inBetween(a, b) {
		return function f(num) {
			return num >= a && num <= b;
		}
	}

	function inArray(arr) {
		return function f(num) {
			return arr.includes(num);
		}
	}

	console.log(arr.filter(inBetween(3, 6)))
	console.log(arr.filter(inArray([1, 2, 10])))
}

{
	let users = [
		{ name: "John", age: 20, surname: "Johnson" },
		{ name: "Pete", age: 18, surname: "Peterson" },
		{ name: "Ann", age: 19, surname: "Hathaway" }
	];

	function byField(field) {
		return function (a, b) {
			return (a[field] > b[field]) ? 1 : -1;
		}
	}

	console.log(users.sort(byField('name')));
	console.log(users.sort(byField('age')));
}