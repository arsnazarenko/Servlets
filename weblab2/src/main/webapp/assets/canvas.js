

function canvasSubmit(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const r = $('#r_field').val();

    if (!(choosen_r())) {
        alert('choose R!!!!')
    } else {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log(x, y, r);
        if(inCanvasArea(x, y, canvas)) {
            const requestCoord =  toRadiusCoordinate(x, y, r, canvas);
            console.log(requestCoord.x + ", " + requestCoord.y + ", " + r);
            $('#hidden_x').val(requestCoord.x);
            $('#hidden_y').val(requestCoord.y);
            $('#hidden_r').val(r);
            $('#hidden_form').submit();
        }
    }
}

function toRadiusCoordinate(x, y, r, canvas) {
    const rect = canvas.getBoundingClientRect()
    const wight = rect.width;
    const height = rect.height;
    const x_coord = Math.round(((x - wight/2) / (wight/6)) * (r/2) * 1000) / 1000;
    const y_coord = Math.round(((-(y - height/2) / (height/6)) * (r/2)) * 1000)/1000;
    return {
        x: (x_coord === 0)?0:x_coord,
        y: (y_coord === 0)?0:y_coord
    }
}


function setLastR(r) {
    $('#r_field').val(r);
}

function drawGraph() {
    const canvas = document.getElementById("canvasGraph");
    const rect = canvas.getBoundingClientRect()
    const wight = rect.width;
    const height = rect.height;
    const canvasCtx = canvas.getContext('2d');
    const border = wight/12;
    const rHalfLen = wight/6;
    canvasCtx.strokeStyle = 'black';
    canvasCtx.fillStyle = 'blue';
    canvasCtx.rect(wight/2 - rHalfLen*2, height/2, rHalfLen*2, rHalfLen*2);
    canvasCtx.fill();
    const circle = new Path2D();
    circle.moveTo(wight/2, height/2);
    circle.arc(wight/2, height/2, rHalfLen, Math.PI , Math.PI*3/2, false);
    canvasCtx.fill(circle);
    canvasCtx.beginPath();
    canvasCtx.moveTo(wight/2, height/2);
    canvasCtx.lineTo(wight/2, height/2 + rHalfLen);
    canvasCtx.lineTo(wight/2 + rHalfLen, height/2);
    canvasCtx.fill();
    canvasCtx.moveTo(border, height/2);
    canvasCtx.lineTo(wight - border, height/2);
    canvasCtx.moveTo(wight/2, border);
    canvasCtx.lineTo(wight/2, height-border);
    canvasCtx.stroke();
    canvasCtx.closePath();
}

function printPoint(x, y, requestR, result) {
    const currentR = $('#r_field').val();
    const canvas = document.getElementById("canvasPoint");
    const canvasCtx = canvas.getContext('2d');
    console.log(canvasCtx);
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
        x: (x * (wight/6) / (r/2) + (wight/2)),
        y: height - (y * (height/6) / (r/2) + (height/2))
    }
}

function draw(x, y, requestR, currentR, result, canvasCtx) {
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, 4, 0, Math.PI*2, true);
    // console.log(typeof requestR + " " + typeof currentR + " :" + requestR + ", " + currentR);
    canvasCtx.fillStyle = (requestR === Number(currentR))?(result ? "#21FF22" : "#FF4E14"):"rgba(133,133,133,0.5)";
    canvasCtx.fill();
    canvasCtx.closePath();
}

function inCanvasArea(x, y, canvas) {
    const rect = canvas.getBoundingClientRect()
    const width = rect.width;
    const height = rect.height;
    const widthBorder = width / 12;
    const heightBorder = height / 12;
    return ((x > widthBorder && x < width - widthBorder) && (y > heightBorder && y < height - heightBorder))
}

// const test = toElementCoordinate(0, 0, canvas);
// console.log(test.x + ", " + test.y);
// printPoint(ctx, test.x, test.y);
// const test2 = toRadiusCoordinate(test.x, test.y, canvas);
// console.log(test2.x + ", " + test2.y);

// function printForm() {
//     this.event.preventDefault();
//     const y = document.getElementById('y_field').value;
//     const x = document.getElementById('x_field').value;
//     const r = document.getElementById('r_field').value;
//     const coords = toElementCoordinate(x, y, r, canvas);
//     printPoint(ctx, coords.x, coords.y);
//     p_array.forEach((item) => {
//         const coords = toElementCoordinate(item.x, item.y, r, canvas);
//         printPoint(ctx, coords.x, coords.y);
//     })
// }
