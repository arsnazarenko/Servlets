/**
 * Функции
 */
function calculateAge(year) {
    return 2018 - year;
}

console.log(calculateAge(2000));

/**
 * Функции высшего порядка - функции которые принимают как аргумент
 * или взвращают тоже функции
 */
function showMsg(name, status, callback) {
    if (callback && typeof callback === 'function') {
        callback();
    } else {
        console.log(`Hello ${name}, your status is ${status}`)
    }
}

showMsg("John", "Admin", () => {
    console.log('Hello message is not supported')
})


const names = ['Denis', 'Ivan', 'Vlad', 'Senya'];

//функция высшего порядка
function mapArray(arr, func) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(func(arr[i]));
    }
    return res;
}

//calabck function
function nameLength(el) {
    return el.length;
}

const result = mapArray(names, nameLength);
console.log(result);

//анонимная callback функция
const upRes = mapArray(names, function (el) {
    return el.toUpperCase();
});
console.log(upRes);

//вовращение функции
function greeting(firstName) {
    return function (lastName) {
        return `Hello, ${firstName} ${lastName}`;
    }
}

//получаем возвращаемую функцию
const testGreeting = greeting('Arseniy');
//вызываем ее
const msg = testGreeting('Nazarenko');
console.log(msg);


//аналогичный синтаксис
const fullName = greeting('Denis')('Nikolaev');
console.log(fullName);


function question(job) {
    const jobDictionary = {
        developer: "что такое JavaScript",
        teacher: "какой предмет вы ведете"
    };

    return function (name) {
        return `${name}, ${jobDictionary[job]}?`;
    }
}

const developerQusetion = question('developer');
console.log(developerQusetion("Denis"));

const res = question('teacher')("Artem");
console.log(res);


function bind(context, fn) {
    return function (...args) {
        fn.apply(context, args);
    }
}


const person = {
    name: 'Arseniy',
    age: 19,
    edu: 'ITMO'
}

function logPerson() {
    console.log(`Person ${this.name}, ${this.age}, ${this.edu}`)
}


bind(person, logPerson)();


/**
 * Классы JavaScript
 */
class Animal {
    static type = "ANIMAL";

    constructor(options) {
        this.name = options.name;
        this.age = options.age;
        this.hasTail = options.hasTail;

    }

    voice() {
        console.log('I am Animal!');
    }
}

//прототип Object
const animal = new Animal({
    name: 'Animal',
    age: 5,
    hasTail: true
})
//прототип Animal <-- Object
const animal2 = {
    name: 'Animal',
    age: 5,
    hasTail: true
}


class Cat extends Animal {
    static type = "CAT";

    constructor(options) {
        super(options);
        this.color = options.color;
    }

    //переопределили метод
    voice() {
        super.voice();
        console.log('I am cat');
    }

    //геттеры - обращаемся как к полю ageInfo
    get ageInfo() {
        return this.age * 7;
    }

    //сеттеры - обращаемся как к функции ageInfo(8)
    set ageInfo(newAge) {
        this.age = newAge;
    }
}

//прототип Cat <-- Animal <-- Object
const cat = new Cat({
    name: 'Cat',
    age: 7,
    hasTail: true,
    color: 'black'
})


class Component {
    constructor(selector) {
        // $ - переменная, содержащая какую-то DOM ноду
        this.$el = document.querySelector(selector);
    }

    hide() {
        this.$el.style.display = 'none';
    }

    show() {
        this.$el.style.display = 'block';
    }
}

class Box extends Component {
    constructor(options) {
        super(options.selector);
        this.$el.style.width = this.$el.style.height = options.size + 'px';
        this.$el.style.background = options.color;
    }
}

class Circle extends Box {
    constructor(options) {
        super(options);
        this.$el.style.borderRadius = '50%';
    }
}

const box1 = new Box({
    selector: '#box1',
    size: 100,
    color: 'red'
})

const box2 = new Box({
    selector: '#box2',
    size: 200,
    color: 'blue'
})

const circle1 = new Circle({
    selector: '#circle1',
    size: 50,
    color: 'green'
})


/**
 * Асинхронность
 * timeOut с 0 секундами сразу же добавляется в очередь (CallbackQueue) как и все асинхронные функции
 * а затем добавляется в CallStack
 * поэтому сначала выполняются функции console.log('Start') и console.log('Start 2') т к они обычные
 * и сразу добавляются в CallStack
 * затем функция console.log('End'), и уже потом выполнится функция с таймаутом 0,
 * c таймаутом 2 и таймаутом 5
 */

function timeoutLog(sec) {
    console.log(`timeout ${sec} sec`);
}

function asyncGuide1() {

    console.log('Start 1');   //1

    console.log('Start 2'); //2

    setTimeout(function () {    //6
        timeoutLog(5);
    }, 5000);

    setTimeout(function () {    //5
        timeoutLog(2);
    }, 2000);

    setTimeout(function () {    //4
        timeoutLog(0);
    }, 0);

    console.log('End 1');  //3

}


function asyncGuide2() {
    //эмуляция работы с базой данных
//Проблема: большая вложенность
    console.log('Request data...');
    setTimeout(() => {
        console.log('Preparing data...');
        const backendData = {
            server: 'aws',
            port: '2000',
            status: 'working'
        }

        setTimeout(() => {
            backendData.modified = true;
            console.log('Data received', backendData);

        }, 2000);
    }, 2000);

}
function asyncGuide3() {
    //Создали промис, в который поместили асинхронную задачу
    const p = new Promise((resolve, reject) => {
        //асинхронный код
        //***************
        setTimeout(() => {
            console.log('Request data...');
            const backendData = {
                server: 'aws',
                port: '2000',
                status: 'working'
            }
            // удачное завершение выолпнения, туда передаем данные
            resolve(backendData);
        }, 2000);
        //***************
    })
//callBack вызывается тогда, когда выполнится асинхронный код
    p.then((data) => {
        //еще один callBack
        return new Promise((resolve, reject) => {
            //асинхронный код
            //***************
            setTimeout(() => {
                data.modified = true;
                // resolve(data);
                reject(data);
            }, 2000);
            //***************
        });
    }).then(clientData => {
        console.log('Data recieved', clientData);
        clientData.fromPromise = true;
        return clientData;
    }).then(() => {
        console.log('modified data');
    }).catch(err => console.error('Error: ', err))

}


// asyncGuide1()
// asyncGuide2()
// asyncGuide3()

/**
 * Наглядный пример
 */

function myAsyncFunction(url) {
    console.log('send request and waiting....')
    //функция с двумя функциями колбэками на два исхода: успешный и с ошибкой
    return new Promise((resolve, reject) => {   //асинхронный запрос на сервер
        const xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://httpbin.org/anything');
        //просто навесили функции, которые изменят статус promis'a
        xhr.onload = () => resolve(xhr.responseText); //при успешном ответе меняем статус промиса
        xhr.onerror = () => reject(xhr.statusText); //при ошибке меняет статус на ошибочный
        xhr.send(); //отправили запрос
    });
}

myAsyncFunction()
    //response - объект ответа, полученный с сервера
    .then(response => {
        console.log('Response: ', response)
        return new Promise(resolve => {
            //делаем каку. то долгую асинхронную обработку запроса
            const newData = response.toUpperCase();
            resolve(newData);
        })
    })
    .then( newData => {console.log('ResponseData: ', newData)})
    //error - объект ошибки, полученной с сервера
    .catch(error => {
        console.log('Error: ', error)
    })

/**
 * то же самое с использованием
 * Async Await
 */

/*
async перед функцией означает, что внутри можно использовать await
и то что любой return будет возвращать promise

 */
async function myNewAsyncFunction() {
    try {
        /* await ожидается выполнения promis, и а переменную слева возвращает
        результат, переданный в reject() или resolve()
        */
        const response = await myAsyncFunction();   //esponseText
        const handlingResponse = await new Promise((resolve, reject) => {   //responseText to upper text
            const newData = response.toUpperCase();
            resolve(newData);
        });
        return handlingResponse;
    } catch (e) {
        console.error(e);
    }
}
myNewAsyncFunction().then(console.log);
/**
 * Интересная задача с замыканиями
 *
 * sum(1)(2)(3)(4)....
 */




function sum(num) {
    let res = num;
    function f(b) {
        res += b;
        console.log(res);
        return f;
    }

    console.log(res)
    return f;
}
sum(1)(2)(3)(4)(5);




