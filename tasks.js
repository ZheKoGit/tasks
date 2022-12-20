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

{
	function makeCounter() {
		let count = 0;

		function counter() {
			return count++;
		}

		counter.set = function (value) {
			return count = value;
		}

		counter.decrease = function () {
			return count--;
		}

		return counter;
	}

	let counter = makeCounter();

	alert(counter()); // 0
	alert(counter()); // 1

	counter.set(10); // установить новое значение счётчика

	alert(counter()); // 10

	counter.decrease(); // уменьшить значение счётчика на 1

	alert(counter()); // 10 (вместо 11)
}

{
	let num = 0;
	function printNumbers(from, to) {
		if (num === 0) num = from;
		if (num <= to) {
			console.log(num);
			num++;
		}
	}

	setInterval(printNumbers, 1000, 1, 5)
	setTimeout(function func() {
		printNumbers(1, 5);
		setTimeout(func, 1000, 1, 5);
	}, 1000)
}

{
	function threeInOne(arr) {
		let arrNew = [];
		let a = 0;
		let b = 3;

		for (let i = 0; i < arr.length / 3; i++) {
			arrNew.push(arr.slice(a, b));
			let sum = arrNew[i].reduce((prev, item) => prev + item, 0);
			arrNew.splice(i, 1, sum);
			a = b;
			b = a + 3;
		}

		return arrNew;
	}

	threeInOne([1, 2, 3, 4, 5, 6, 7, 8, 9])
}

{
	function work(a, b) {
		alert(a + b);
	}

	function spy(func) {

		function f() {
			f.calls.push([...arguments]);
			return func.apply(this, arguments);
		}
		f.calls = [];
		return f;
	}

	work = spy(work);

	work(1, 2); // 3
	work(4, 5); // 9

	for (let args of work.calls) {
		alert('call:' + args.join()); // "call:1,2", "call:4,5"
	}
}

{
	function f(x) {
		alert(x);
	}

	// my code
	function delay(f, ms) {
		return function func(...args) {

			setTimeout(function () {
				f.apply(this, args);
			}, ms)
		}
	}

	let f1000 = delay(f, 1000);
	let f1500 = delay(f, 10500);

	f1000("test"); // показывает "test" после 1000 мс
	f1500("test"); // показывает "test" после 1500 мс
}

{
	function sortIt(arr) {
		let obj = {}
		for (let i = 0; i < arr.length; i++) {

			if (obj[arr[i]] === undefined) obj[arr[i]] = 0;
			obj[arr[i]]++;
		}

		let newArr = arr.slice();
		return newArr.sort(function (a, b) {

			if (obj[a] === obj[b]) return b - a;

			return (obj[a] > obj[b]) ? 1 : -1;
		});
	}
}