//1

let string = 'On offering to help the blind man, the man who then stole his car, had not, at that precise moment, had any evil intention, quite the contrary, what he did was nothing more than obey those feelings of generosity and altruism which, as everyone knows, are the two best traits of human nature and to be found in much more hardened criminals than this one, a simple car-thief without any hope of advancing in his profession, exploited by the real owners of this enterprise, for it is they who take advantage of the needs of the poor.';
let wordsList = (str, subStr) => {
  let reg = new RegExp('\\.|,|\\?|!|:|;|"', 'gui');
  let arr = str.replace(reg, '').toLowerCase().split(' ').filter((arrItem) => arrItem.indexOf(subStr) > -1);
  let res = new Set();
  arr.forEach((arrItem) => {
    res.add(arrItem);
  });
  return res;
};

console.log(wordsList(string, 'man'));

//2

let date = new Date();
let getLocalDate = (date, isSeconds = false, isISO = false) => {
  const reg = new RegExp(':\\d{2}$', 'gui');
  let res;
  if (!isISO) res = isSeconds ? date.toLocaleString() : date.toLocaleString().replace(reg, '');
  else {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 9 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 9 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 9 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds =
      date.getSeconds() < 9 ? `0${date.getSeconds()}` : date.getSeconds();
    res = isSeconds ? `${year}-${month}-${day}, ${hour}:${minutes}:${seconds}` : `${year}-${month}-${day}, ${hour}:${minutes}`;
  }
  return res;
};

console.log(getLocalDate(date)); 
console.log(getLocalDate(date, true)); 
console.log(getLocalDate(date, false, true)); 
console.log(getLocalDate(date, true, true)); 
console.log(getLocalDate(new Date(123456))); 
console.log(getLocalDate(new Date(123456), true)); 
console.log(getLocalDate(new Date(123456), false, true)); 
console.log(getLocalDate(new Date(123456), true, true)); 
console.log(getLocalDate(new Date(123456)) === '01.01.1970, 03:02');
console.log(getLocalDate(new Date(123456), true) === '01.01.1970, 03:02:03');
console.log(getLocalDate(new Date(123456), false, true) === '1970-01-01, 03:02');
console.log(getLocalDate(new Date(123456), true, true) === '1970-01-01, 03:02:03');
console.log(getLocalDate(new Date(1999999123456)) === '18.05.2033, 06:18');
console.log(getLocalDate(new Date(1999999123456), true) === '18.05.2033, 06:18:43');
console.log(getLocalDate(new Date(1999999123456), false, true) === '2033-05-18, 06:18');
console.log(getLocalDate(new Date(1999999123456), true, true) === '2033-05-18, 06:18:43');

//3

let getWeekDay = (d) => {
    const date = new Date(d);
    const days = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
    return days[date.getDay()];
  };
  
  console.log(getWeekDay('2019-01-30'));
  console.log(getWeekDay('2019-07-16')); 
  console.log(getWeekDay('2019-07-27'));

//4

let getLocalDay = (d) => {
    const date = new Date(d);
    let day = date.getDay();
    if (day === 0) day = 7;
    return day;
  };
  
  console.log(getLocalDay('2019-07-16')); 
  console.log(getLocalDay('2019-07-25')); 
  console.log(getLocalDay('2019-07-27'));

//5

let getDateAgo = (d, days) => {
    const date = new Date(d);
    date.setDate(date.getDate() - days);
    return date.toLocaleString().replace(/(\d.*),\s+(\d.*)/gu, '$1');
  };
  
  console.log(getDateAgo('2019-01-29', 1)); 
  console.log(getDateAgo('2019-01-29', 2)); 
  console.log(getDateAgo('2019-01-29', 365));

//6

let Car = function (engine, model, name, year) {
    this.engine = engine;
    this.model = model;
    this.name = name;
    this.year = year;
  };
  Object.defineProperties(Car.prototype, {
    used: {
      get() {
        const yearNow = new Date().getFullYear();
        return yearNow - this.year > 1 ? 'used' : 'new';
      },
      set(value) {
        const yearNow = new Date().getFullYear();
        if (value === 'new' && this.year < yearNow) this.year = yearNow;
      }
    }
  });
  Car.prototype.info = function () {
    return `${this.name} ${this.model}, ${this.engine}cc, year ${this.year}, ${this.used}`;
  };
  let car = new Car(2000, 'Lacetti', 'Chevrolet', 2010);
  let car2 = new Car(5000, 'FX50 AWD', 'Infinite', 2019);
  
  console.log(car.info()); 
  car.used = 'new';
  console.log(car.info()); 
  car.used = 'used';
  console.log(car.info()); 
  console.log(car2.info()); 
  car.used = 'used';
  console.log(car2.info()); 

//7

let testPerformance = (iterations, func) => {
    let time = Date.now();
    if (typeof func === 'function') for (let i = iterations; i--;) func();
    return Date.now() - time;
  };
  function test1() {
    let str = string;
    while (str.indexOf('o') !== -1) str = str.replace('o', '');
    while (str.indexOf('a') !== -1) str = str.replace('a', '');
    while (str.indexOf('e') !== -1) str = str.replace('e', '');
    while (str.indexOf('u') !== -1) str = str.replace('u', '');
    while (str.indexOf('i') !== -1) str = str.replace('i', '');
  }
  function test2() {
    const reg = new RegExp('[oaeui]', 'gui');
    string.replace(reg, '');
  }
  
  console.log(testPerformance(100, test1));
  console.log(testPerformance(100, test2));
  console.log(testPerformance(100, 12345));