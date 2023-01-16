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

	let f1000 = delay(alert, 1000);
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

	sortIt([1, 3, 3, 5, 2, 2, 4, 6, 6, 7, 7, 7]);
}

{
	function isolateIt(arr) {

		return arr.map(function (e) {
			let divider = e.length / 2;

			return (e.length % 2) ?
				e.slice(0, Math.floor(divider)) + '|' + e.slice(Math.ceil(divider)) :
				e.slice(0, divider) + '|' + e.slice(divider);
		})
	}

	isolateIt(["abcdhj", "efghk"]);
}

{
	function mirrorImage(arr) {
		let a, b;

		let isTrue = arr.some((elem, i) => {
			a = arr[i];
			b = String(arr[i + 1]).split('');

			let arrNum = [];
			for (let i = b.length - 1; i >= 0; i--) {
				arrNum.push(b[i]);
			}

			return a === +arrNum.join('');
		})

		if (isTrue) return [a, +b.join('')];
		return [-1, -1];
	}
	mirrorImage([454, 86, 57, 75, 16, 88]);
}

{
	/*
	---HTML---
	<br> Мяч не должен выходить за границы поля.

	<div id="field">
	  <img src="https://ru.js.cx/clipart/ball.svg" id="ball"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
			. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
	</div>
	*/

	/*
	---CSS---
	body {
		height: 2000px;
}

	#field {
		position: relative;
			 width: 200px;
		height: 150px;
		border: 10px solid black;
		background-color: #00FF00;
		overflow: hidden;
	}

	#ball {
		position: absolute;
		width: 40px;
		height: 40px;
		transition: all 1s;
}
	*/

	const field = document.querySelector('#field');
	const ball = field.querySelector('#ball');

	field.addEventListener('click', (e) => {
		let x = e.x - field.offsetLeft - field.clientLeft + window.pageXOffset;
		let y = e.y - field.offsetTop - field.clientTop + window.pageYOffset;
		setCoordBall(x, y)
	})

	function setCoordBall(x, y) {
		let xCentrBell = ball.offsetWidth / 2;
		let yCentrBell = ball.offsetHeight / 2;

		let xBall = x - xCentrBell;
		let yBall = y - yCentrBell;

		if (x < xCentrBell) xBall = 0;
		if (x > field.clientWidth - xCentrBell) xBall = field.clientWidth - xCentrBell * 2;
		if (y < yCentrBell) yBall = 0;
		if (y > field.clientHeight - yCentrBell) yBall = field.clientHeight - yCentrBell * 2;

		ball.style.left = xBall + 'px';
		ball.style.top = yBall + 'px';
	}
}

{
	/*
	---HTML---
	<div class='select-wrapp'>
  <div class='select'>
  <div class='arrows-wrapp'><div class='arrows'>▶ ▼</div></div> Сладости (нажми меня)!</div>
  <ul class='list'>
	 <li>Пирожное</li>
	 <li>Пончик</li>
	 <li>Мёд</li>
  </ul>
</div>
	*/

	/*
	---CSS---
	.select {
  display: flex;
  align-items: center;
  width: 200px;
  cursor: pointer;
}

.arrows-wrapp {
  position: relative;
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  white-space: nowrap;
  overflow: hidden;
  color: green;
}

.arrows {
  position: absolute;
  top: -6px;
  left: 1px;
}

.list {
  display: none;
  margin: 0;
  padding-left: 20px;
  list-style: none;
}
	*/
	const selectWrapp = document.querySelector('.select-wrapp');
	const select = selectWrapp.querySelector('.select');

	select.addEventListener('click', () => {
		const arrows = selectWrapp.querySelector('.arrows');
		const list = selectWrapp.querySelector('.list');
		if (list.style.display === 'none' || list.style.display === '') {
			arrows.style.left = -17 + 'px';
			list.style.display = 'block';
		} else {
			arrows.style.left = 1 + 'px';
			list.style.display = 'none';
		}
	})
}

{
	/*
	<button class="remove-button">[x]</button>

  <div>
	 <div class="pane">
		<h3>Лошадь</h3>
		<p>Домашняя лошадь — животное семейства непарнокопытных, одомашненный и единственный сохранившийся подвид дикой лошади, вымершей в дикой природе, за исключением небольшой популяции лошади Пржевальского.</p>
	 </div>
	 <div class="pane">
		<h3>Осёл</h3>
		<p>Домашний осёл (лат. Equus asinus asinus), или ишак, — одомашненный подвид дикого осла (Equus asinus), сыгравший важную историческую роль в развитии хозяйства и культуры человека и по-прежнему широко в хозяйстве многих развивающихся стран.</p>
	 </div>
	 <div class="pane">
		<h3>Кошка</h3>
		<p>Кошка, или домашняя кошка (лат. Felis silvestris catus), — домашнее животное, одно из наиболее популярных(наряду с собакой) «животных-компаньонов». Являясь одиночным охотником на грызунов и других мелких животных, кошка — социальное животное, использующее для общения широкий диапазон звуковых сигналов.</p>
	 </div>
  </div>
	*/
	/*
	body {
  margin: 10px auto;
  width: 470px;
}

h3 {
  margin: 0;
  padding-bottom: .3em;
  font-size: 1.1em;
}

p {
  margin: 0;
  padding: 0 0 .5em;
}

.pane {
  position: relative;
  background: #edf5e1;
  padding: 10px 20px 10px;
  border-top: solid 2px #c4df9b;
}

.remove-button {
  display: none;
  position: absolute;
  top: 0;
  font-size: 110%;
  color: darkred;
  right: 10px;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
}
	*/
	const btn = document.querySelector('.remove-button');
	const panels = document.querySelectorAll('.pane');

	for (let pane of panels) {
		const newBtn = btn.cloneNode(true);
		newBtn.style.display = 'block';
		newBtn.onclick = () => clearPane(pane);
		pane.append(newBtn);

	}

	function clearPane(elem) {
		elem.remove();
	}
}