'use strict'

$(document).ready(function () {
    setListeners();
    drawGraph();
    setStartRvalue();
    setCanvasClickListener();
    printOnGraph();
});
function setStartRvalue() {
    const rInput = document.getElementById('shotForm:r_value');
    rInput.value = 1;
}

function setCanvasClickListener() {
    let canvas = document.getElementById("canvasPoint");
    canvas.addEventListener('click', function(e) {
        canvasSubmit(canvas, e)
    });
}

function sliderChangeValue() {
    const rInput = document.getElementById('shotForm:r_value');
    const sliderElement = document.getElementById('shotForm:r_value_slider_handle');
    rInput.value = Math.round(Number(sliderElement.getAttribute('aria-valuenow'))) / 2;
    clear();
    printOnGraph();
}
function setListeners() {
    const links = document.getElementsByClassName("x_link");
    for (let a of links) {
        a.onclick = function (event) {
            event.preventDefault();
            const id = 'shotForm:x_value';
            const x = this.innerHTML;
            const field = document.getElementById(id);
            if (field.value === x) {
                field.value = "";
                document.getElementById('shotForm:x' + x).classList.remove('selected');
            } else {
                if (field.value !== "") {
                    document.getElementById('shotForm:x' + field.value).classList.remove('selected');
                }
                field.value = x;
                document.getElementById('shotForm:x' + x).classList.add("selected");
            }
        };
    }
}






