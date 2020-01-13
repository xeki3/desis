<?php
include('baseDatos.php');


$base = '"Desis"';
$tabla = '"votantes"';
$search = $_POST['aliass'];

if (!empty($search)) {
    $query = "SELECT aliass FROM $base.$tabla WHERE aliass LIKE '$search'";
    $result = pg_query($conection, $query);
    if (!$result) {
        die('query error ' . pg_last_error($conection));
        return false;
    }
    $dev = pg_num_rows($result);
    if ($dev > 0) {
        echo 'true';
    } else {
        echo 'false';
    }
}
