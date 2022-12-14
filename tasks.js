{
	function sum(a) {
		return function (b) {
			return a + b;
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

{
	function infiniteLoop(arr, d, n) {
		let num;
		if (d === 'left') {
			for (let j = 0; j < n; j++) {
				for (let i = 0; i < arr.length; i++) {
					if (i === 0) {
						num = arr[i].shift();
						arr[arr.length - 1].push(num);
					} else {
						num = arr[i].shift();
						arr[i - 1].push(num);
					}
				}
			}
		}

		if (d === 'right') {
			for (let j = 0; j < n; j++) {
				for (let i = arr.length - 1; i >= 0; i--) {
					if (i === arr.length - 1) {
						num = arr[i].pop();
						arr[0].unshift(num);
					} else {
						num = arr[i].pop();
						arr[i + 1].unshift(num);
					}
				}
			}
		}
		return arr;
	}
	console.log(infiniteLoop([[2, 0, 8, 7], [5, 9, 0, 2, 1, 0], [9, 7, 5, 7]], "left", 8));
}