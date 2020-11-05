function canvasSubmit(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const r = document.getElementById("shotForm:r_value").value;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(x, y, r);
    if (inCanvasArea(x, y, canvas)) {
        const requestCoord = toRadiusCoordinate(x, y, r, canvas);
        console.log(requestCoord.x + ", " + requestCoord.y + ", " + r);
        document.getElementById("canvasForm:x_value_canvas").value = requestCoord.x;
        document.getElementById("canvasForm:y_value_canvas").value = requestCoord.y;
        document.getElementById("canvasForm:r_value_canvas").value = r;
        document.getElementById("canvasForm:canvasButton").click()
    }
}

function toRadiusCoordinate(x, y, r, canvas) {
    const rect = canvas.getBoundingClientRect()
    const wight = rect.width;
    const height = rect.height;
    const x_coord = Math.round(((x - wight / 2) / (wight / 6)) * (r / 2) * 1000) / 1000;
    const y_coord = Math.round(((-(y - height / 2) / (height / 6)) * (r / 2)) * 1000) / 1000;
    return {
        x: (x_coord === 0) ? 0 : x_coord,
        y: (y_coord === 0) ? 0 : y_coord
    }
}



function drawGraph() {
    const canvas = document.getElementById("canvasGraph");
    const rect = canvas.getBoundingClientRect()
    const wight = rect.width;
    const height = rect.height;
    const canvasCtx = canvas.getContext('2d');
    const border = wight / 12;
    const rHalfLen = wight / 6;
    canvasCtx.strokeStyle = 'black';
    canvasCtx.fillStyle = '#3FDAFF';
    canvasCtx.rect(wight / 2 - rHalfLen * 2, height / 2, rHalfLen * 2, rHalfLen * 2);
    canvasCtx.fill();
    const circle = new Path2D();
    circle.moveTo(wight / 2, height / 2);
    circle.arc(wight / 2, height / 2, rHalfLen * 2, Math.PI, Math.PI * 3 / 2, false);
    canvasCtx.fill(circle);
    canvasCtx.beginPath();
    canvasCtx.moveTo(wight / 2, height / 2);
    canvasCtx.lineTo(wight / 2, height / 2 - 2 * rHalfLen);
    canvasCtx.lineTo(wight / 2 + rHalfLen, height / 2);
    canvasCtx.fill();
    canvasCtx.closePath();
    canvasCtx.beginPath();
    canvasCtx.moveTo(border, height / 2);
    canvasCtx.lineTo(wight - border, height / 2);
    canvasCtx.moveTo(wight / 2, border);
    canvasCtx.lineTo(wight / 2, height - border);
    canvasCtx.stroke();
    canvasCtx.fillStyle = 'black';
    printLines(wight, height, rHalfLen, canvasCtx);
    canvasCtx.font = "16px sans-serif";
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "middle";

    canvasCtx.fillText("-R/2", wight / 2 + 5, height / 2 + rHalfLen);
    canvasCtx.fillText("R/2", wight / 2 + 5, height / 2 - rHalfLen);
    canvasCtx.fillText("-R", wight / 2 + 5, height / 2 + rHalfLen * 2);
    canvasCtx.fillText("R", wight / 2 + 5, height / 2 - rHalfLen * 2);

    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "bottom";
    canvasCtx.fillText("R/2", wight / 2 + rHalfLen, height / 2);
    canvasCtx.fillText("-R/2", wight / 2 - rHalfLen, height / 2);
    canvasCtx.fillText("R", wight / 2 + rHalfLen * 2, height / 2);
    canvasCtx.fillText("-R", wight / 2 - rHalfLen * 2, height / 2);

    canvasCtx.closePath();
}

function printLines(width, height, rHalfLen, canvasCtx) {
    let posX = width / 2 - rHalfLen * 2;
    let posY = height / 2 + rHalfLen * 2;
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 2; i++) {
            canvasCtx.moveTo(posX + i * rHalfLen, height / 2 - 3);
            canvasCtx.lineTo(posX + i * rHalfLen, height / 2 + 3);
            canvasCtx.stroke();
            canvasCtx.moveTo(width / 2 - 3, posY - i * rHalfLen);
            canvasCtx.lineTo(width / 2 + 3, posY - i * rHalfLen);
            canvasCtx.stroke();
        }
        posX += rHalfLen * 3;
        posY -= rHalfLen * 3;
    }
}

function printPoint(x, y, requestR, result) {
    console.log(x + ",  " + y + ", " + requestR);
    const currentR = document.getElementById('shotForm:r_value').value;
    const canvas = document.getElementById("canvasPoint");
    const canvasCtx = canvas.getContext('2d');
    const pointCoordinate = toElementCoordinate(x, y, currentR, canvas);
    if (inCanvasArea(pointCoordinate.x, pointCoordinate.y, canvas)) {
        draw(pointCoordinate.x, pointCoordinate.y, requestR, currentR, result, canvasCtx);
    }

}


function toElementCoordinate(x, y, r, canvas) {
    const rect = canvas.getBoundingClientRect()
    const wight = rect.width;
    const height = rect.height;
    return {
        x: (x * (wight / 6) / (r / 2) + (wight / 2)),
        y: height - (y * (height / 6) / (r / 2) + (height / 2))
    }
}

function draw(x, y, requestR, currentR, result, canvasCtx) {
    canvasCtx.beginPath();
    canvasCtx.strokeStyle = 'black';
    canvasCtx.arc(x, y, 3, 0, Math.PI * 2, true);
    // canvasCtx.fillStyle = (requestR === Number(currentR)) ? (result ? "#1dc41e" : "#FF4E14") : "rgba(133,133,133,0.5)";
    if (requestR === Number(currentR)) {
        canvasCtx.fillStyle = result ? "#1dc41e" : "#FF4E14";
        canvasCtx.stroke();
    } else {
        canvasCtx.fillStyle = "rgba(133,133,133,0.5)";
    }
    canvasCtx.fill();
    canvasCtx.closePath();
}


function clear() {
    const canvas = document.getElementById("canvasPoint");
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

function inCanvasArea(x, y, canvas) {
    const rect = canvas.getBoundingClientRect()
    const width = rect.width;
    const height = rect.height;
    const widthBorder = width / 12;
    const heightBorder = height / 12;
    return ((x > widthBorder && x < width - widthBorder) && (y > heightBorder && y < height - heightBorder))
}

