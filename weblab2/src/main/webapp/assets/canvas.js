

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
    const space = 5;
    const canvas = document.getElementById("canvasGraph");
    const rect = canvas.getBoundingClientRect()
    const wight = rect.width;
    const height = rect.height;
    const canvasCtx = canvas.getContext('2d');
    const border = wight/12;
    const rHalfLen = wight/6;
    canvasCtx.strokeStyle = 'black';
    canvasCtx.fillStyle = '#3FDAFF';
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
    canvasCtx.closePath();
    canvasCtx.beginPath();
    canvasCtx.moveTo(border, height/2);
    canvasCtx.lineTo(wight - border, height/2);
    canvasCtx.moveTo(wight/2, border);
    canvasCtx.lineTo(wight/2, height-border);
    canvasCtx.stroke();
    canvasCtx.fillStyle = 'black';
    printLines(wight, height, rHalfLen, canvasCtx);
    canvasCtx.font = "16px sans-serif";
    canvasCtx.textAlign = "left";
    canvasCtx.textBaseline = "middle";

    canvasCtx.fillText("-R/2", wight/2 + 5, height/2 + rHalfLen);
    canvasCtx.fillText("R/2", wight/2 + 5, height/2 - rHalfLen);
    canvasCtx.fillText("-R", wight/2 + 5, height/2 + rHalfLen * 2);
    canvasCtx.fillText("R", wight/2 + 5, height/2 - rHalfLen * 2);

    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "bottom";
    canvasCtx.fillText("R/2", wight/2 + rHalfLen, height/2);
    canvasCtx.fillText("-R/2", wight/2 - rHalfLen, height/2);
    canvasCtx.fillText("R", wight/2 + rHalfLen * 2, height/2);
    canvasCtx.fillText("-R", wight/2 - rHalfLen * 2, height/2);

    canvasCtx.closePath();
}

function printLines(width, height, rHalfLen, canvasCtx) {
    let posX = width/2 - rHalfLen*2;
    let posY  = height/2 + rHalfLen*2;
    for(let j = 0; j<2; j++) {
        for(let i = 0; i<2; i++) {
            canvasCtx.moveTo(posX + i*rHalfLen, height/2 -3);
            canvasCtx.lineTo(posX + i*rHalfLen, height/2 + 3);
            canvasCtx.stroke();
            canvasCtx.moveTo(width/2 - 3, posY - i*rHalfLen);
            canvasCtx.lineTo(width/2 + 3, posY - i*rHalfLen);
            canvasCtx.stroke();
        }
        posX += rHalfLen * 3;
        posY -= rHalfLen * 3;
    }
}

function printPoint(x, y, requestR, result) {
    const currentR = $('#r_field').val();
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
        x: (x * (wight/6) / (r/2) + (wight/2)),
        y: height - (y * (height/6) / (r/2) + (height/2))
    }
}

function draw(x, y, requestR, currentR, result, canvasCtx) {
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, 3, 0, Math.PI*2, true);
    // console.log(typeof requestR + " " + typeof currentR + " :" + requestR + ", " + currentR);
    canvasCtx.fillStyle = (requestR === Number(currentR))?(result ? "#1dc41e" : "#FF4E14"):"rgba(133,133,133,0.5)";
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

