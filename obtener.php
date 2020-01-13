<?php
include('baseDatos.php');

$query = 'SELECT * from "Desis"."candidatos"';
$result = pg_query($conection, $query);

if (!$result) {
    die('error en la query armando' . pg_last_error($conection));
} else {
    $json = array();
    while ($row = pg_fetch_array($result)) {
        $json[] = array(
            'nombreyapellido' => $row['nombreyapellido']
        );
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
