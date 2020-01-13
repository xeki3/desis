<?php
include('baseDatos.php');

$query = 'SELECT "region" from "Desis"."regiones"';
$result = pg_query($conection, $query);

if (!$result) {
    die('error en la query armando' . pg_last_error($conection));
} else {
    $json = array();
    while ($row = pg_fetch_array($result)) {
        $json[] = array(
            'region' => $row['region']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
