<?php
include('baseDatos.php');


if (isset($_GET['region'])) {
    $base = '"Desis"';
    $tabla = '"regiones"';
    $tablaComuna = '"comunas"';
    $tablaProvincias = '"provincias"';
    $id = '"id"';
    $region_id = '"region_id"';
    $regiones = '"region"';
    $comuna = '"comuna"';
    $provincia_id = '"provincia_id"';

    $region = $_GET['region'];

    $query = "SELECT $id from $base.$tabla where $regiones = '$region'";
    $result = pg_query($conection, $query);
    $result = pg_fetch_result($result, 0, 0);
    //var_dump($result);
    // $result = $result . str_replace('$result', 'Resource id #', '');

    if (!$result) {
        die('error en la query armando' . pg_last_error($conection));
    } else {
        $query2 = "SELECT $id FROM $base.$tablaProvincias WHERE $region_id = '$result'";
        $result2 = pg_query($conection, $query2);
        $result2 = pg_fetch_result($result2, 0, 0);

        if (!$result2) {
            die('error en la query armando2' . pg_last_error($conection));
        } else {
            $query3 = "SELECT $comuna FROM $base.$tablaComuna WHERE $provincia_id = '$result2'";
            $result3 = pg_query($conection, $query3);
            $json = array();
            while ($row = pg_fetch_array($result3)) {
                $json[] = array(
                    'comuna' => $row['comuna']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }
    }
}
