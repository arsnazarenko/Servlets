<?php
    function check_valid($x, $y, $r) {
        if (check_x($x) && check_y($y) && check_r($r)) {
            return true;
        }
        return false;
    }

function check_x($x) {
    return in_array($x, array('-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'));
}

function check_y($y) {
    if(preg_match("/^[-]?(((0{1}|[1-4]){1}(\.[0-9]+)?)|5(\.0+)?)$/", $y) and $y !== "-0") {
        return true;
    }
    return false;
}

function check_r($r) {
    if(preg_match("/^(([1-3]{1}(\.[0-9]+)?)|4(\.0+)?)$/", $r)) {
        return true;
    }
    return false;
}

function check_in_area($x, $y, $r) {
    if ( ($x >= -$r && $x <= 0 && $y >= -$r/2 && $y <= 0) ||
        ($x <= 0 && $y >= 0 && $y - (($x+$r)/2) == 0) ||
        ($y >= 0 && $x >= 0 && ($x*$x + $y*$y <= $r*$r))
    ) {
        return true;
    }
    return false;
}

header('Content-Type: application/json');
date_default_timezone_set('Europe/Moscow');
$currentTime = date("H:i:s");
$start = microtime(true);

$x = $_POST['xValue'];
$y = $_POST['yValue'];
$r = $_POST['rValue'];


if (!check_valid($x, $y, $r)) {
    http_response_code(400);
    return;
}

$result = check_in_area($x, $y, $r) ? 'true' : 'false';
$time = number_format(microtime(true) - $start, 5) . "sec";

$new_x = ($x - floor($x) ? number_format($x, 5) : $x);
$new_y = ($y - floor($y) ? number_format($y, 5) : $y);
$new_r = ($r - floor($r) ? number_format($r, 5) : $r);

$response = '{"x":"'. $new_x .'","y":"' . $new_y . '","r":"' . $new_r . '","result":"' . $result . '","current_time":"' . $currentTime . '","time":"' . $time . '"}';
echo $response;
?>

