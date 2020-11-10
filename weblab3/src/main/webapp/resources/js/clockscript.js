function printClockBackground() {
    const canvasHTML = document.getElementById('canvasBackground');
    const contextHTML = canvasHTML.getContext('2d');
    //Расчет координат центра и радиуса часов
    const radiusClock = canvasHTML.width / 2 - 10;
    const xCenterClock = canvasHTML.width / 2;
    const yCenterClock = canvasHTML.height / 2;

    //Заливка экрана.
    contextHTML.fillStyle = "#002d88";
    contextHTML.fillRect(0, 0, canvasHTML.width, canvasHTML.height);

    //Рисуем контур часов
    contextHTML.strokeStyle = "#ffffff";
    contextHTML.beginPath();
    contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2 * Math.PI, true);
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем рисочки часов
    const radiusNum = radiusClock - 10;
    let radiusPoint;
    for (let tm = 0; tm < 60; tm++) {
        contextHTML.beginPath();
        if (tm % 5 === 0) {
            radiusPoint = 5;
        } else {
            radiusPoint = 2;
        } //для выделения часовых рисочек
        const xPointM = xCenterClock + radiusNum * Math.cos(-6 * tm * (Math.PI / 180) + Math.PI / 2);
        const yPointM = yCenterClock - radiusNum * Math.sin(-6 * tm * (Math.PI / 180) + Math.PI / 2);
        contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2 * Math.PI, true);
        contextHTML.stroke();
        contextHTML.closePath();
    }

    //Оцифровка циферблата часов

    for (let th = 1; th <= 12; th++) {
        contextHTML.beginPath();
        contextHTML.font = 'bold 25px sans-serif';
        contextHTML.fillStyle = "#00f9ff";
        let xText = xCenterClock + (radiusNum - 30) * Math.cos(-30 * th * (Math.PI / 180) + Math.PI / 2);
        let yText = yCenterClock - (radiusNum - 30) * Math.sin(-30 * th * (Math.PI / 180) + Math.PI / 2);
        if (th <= 9) {
            contextHTML.fillText(th, xText - 5, yText + 10);
        } else {
            contextHTML.fillText(th, xText - 15, yText + 10);
        }
        contextHTML.fill();
        contextHTML.closePath();
    }

    //Рисуем центр часов
    contextHTML.beginPath();
    contextHTML.strokeStyle = "#000000";
    contextHTML.fillStyle = "#ffffff";
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2 * Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();
}

function printHourHands() {
    const canvasHTML = document.getElementById('canvasFront');
    const contextHTML = canvasHTML.getContext('2d');
    const radiusClock = canvasHTML.width / 2 - 10;
    const radiusNum = radiusClock - 10; //Радиус расположения рисочек
    const xCenterClock = canvasHTML.width / 2;
    const yCenterClock = canvasHTML.height / 2;
    const lengthSeconds = radiusNum - 10;
    const lengthMinutes = radiusNum - 15;
    const lengthHour = lengthMinutes / 1.5;
    const d = new Date();                //Получаем экземпляр даты
    const t_sec = 6 * d.getSeconds();                           //Определяем угол для секунд
    const t_min = 6 * (d.getMinutes() + (1 / 60) * d.getSeconds()); //Определяем угол для минут
    const t_hour = 30 * (d.getHours() + (1 / 60) * d.getMinutes()); //Определяем угол для часов

    //Рисуем секунды
    contextHTML.beginPath();
    contextHTML.lineWidth = 3;
    contextHTML.strokeStyle = "#ffc80a";
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthSeconds * Math.cos(Math.PI / 2 - t_sec * (Math.PI / 180)),
        yCenterClock - lengthSeconds * Math.sin(Math.PI / 2 - t_sec * (Math.PI / 180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем минуты
    contextHTML.beginPath();
    contextHTML.strokeStyle = "#000000";
    contextHTML.lineWidth = 5;
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthMinutes * Math.cos(Math.PI / 2 - t_min * (Math.PI / 180)),
        yCenterClock - lengthMinutes * Math.sin(Math.PI / 2 - t_min * (Math.PI / 180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем часы
    contextHTML.lineWidth = 8;
    contextHTML.beginPath();
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthHour * Math.cos(Math.PI / 2 - t_hour * (Math.PI / 180)),
        yCenterClock - lengthHour * Math.sin(Math.PI / 2 - t_hour * (Math.PI / 180)));
    contextHTML.stroke();
    contextHTML.closePath();
}

function clear() {
    const canvasHTML = document.getElementById('canvasFront');
    const contextHTML = canvasHTML.getContext('2d');
    contextHTML.clearRect(0, 0, canvasHTML.width, canvasHTML.height);
}


window.onload = function () {
    printClockBackground();
    printHourHands();
    window.setInterval(
        function () {
            clear();
            printHourHands();
        }
        , 13000);
};