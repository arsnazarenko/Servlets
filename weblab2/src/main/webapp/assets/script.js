'use strict'

// $(document).ready(function() {
//     if (localStorage.getItem("result") != null) {
//         console.log("local storage data loaded")
//         let localData = JSON.parse(localStorage.getItem("result"));
//         localData.map(item => toHtmlTable(item));
//     }
// });

//
// function addToStorage(item) {
//     let localData = localStorage.getItem("result");
//     localData = localData ? JSON.parse(localData) : [];
//     localData.push(item);
//     localStorage.setItem("result", JSON.stringify(localData));
// }

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



// function choosen_x(x) {
//     const field = $('#x_field');
//     if (field.val() === x) {
//         field.val("");
//         $('#x' + x).removeClass('selected');
//     } else {
//         if (field.val() !== "") {
//             $('#x' + field.val()).removeClass('selected');
//         }
//         field.val(x);
//         $('#x' + x).addClass('selected');
//     }
// }


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
            console.log("request to script.php")
            const xVal = $('#x_field').val();
            const yVal = $('#y_field').val();
            const rVal = $('#r_field').val();
            alert(xVal + " " + yVal+ " " + rVal);
        } else {
            event.preventDefault();
            console.log("invalid form input data");
        }
    });
});






