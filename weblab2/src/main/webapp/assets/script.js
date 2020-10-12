'use strict'



function toHtmlTable(jsonResponse) {
    let x = jsonResponse.x;
    let y = jsonResponse.y;
    let r = jsonResponse.r;
    let result = jsonResponse.result;
    let current_time = jsonResponse.current_time;
    let time = jsonResponse.time;
    let str = "<tr class=\""+ result + "\"><td>" + x + "</td><td>" + y + "</td><td>" + r + "</td><td>" + result + "</td><td>" + current_time + "</td><td>" + time + "</td></tr>";
    $('.result_table').append(str);
}



function choosen_y() {
    const field = $('#y_field');
    const fieldValue = field.val();
    const validationResult = fieldValue.match(/^([-]?(((0{1}|[1-2]){1}(\.[0-9]+)?)|3(\.0+)?)|[3-4]{1}(\.[0-9]+)?|5(\.0+)?)$/);
    if (validationResult !== null && validationResult[0] !== '-0') {
        field.removeClass();
        return true;
    } else {
        field.addClass('invalid_input');
        return false;
    }
}

function choosen_r() {
    const field = $('#r_field');
    const fieldValue = field.val();
    const validationResult = fieldValue.match(/^(([2-4]{1}(\.[0-9]+)?)|5(\.0+)?)$/);
    if (validationResult !== null) {
        field.removeClass();
        return true;
    } else {
        field.addClass('invalid_input');
        return false;
    }
}


function submitValidate() {
    const xFieldIsSelected = ($('#x_field').val() !== "");
    const yFieldIsValid = choosen_y();
    const rFieldIsValid = choosen_r();
    return (xFieldIsSelected && yFieldIsValid && rFieldIsValid);
}

$(document).ready(function () {



    $("#form").submit(function (event) {

        if (submitValidate()) {
            console.log("valid input data")
            const xVal = $('#x_field').val();
            const yVal = $('#y_field').val();
            const rVal = $('#r_field').val();
            alert(xVal + " " + yVal+ " " + rVal);
        } else {
            console.log("invalid form input data");
            event.preventDefault();
        }
    });
});






