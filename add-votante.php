<?php

include('baseDatos.php');

if (isset($_POST['nombre'])) {

    $base = '"Desis"';
    $tabla = '"votantes"';

    $nombre = $_POST['nombre'];
    $aliass = $_POST['aliass'];
    $rut = $_POST['rut'];
    $email = $_POST['email'];
    $region = $_POST['region'];
    $comuna = $_POST['comuna'];
    $candidato = $_POST['candidato'];
    $nosotros = $_POST['nosotros'];

    if (isset($_POST['nombre'])) {
        $query = "SELECT nombreyapellido FROM $base.$tabla WHERE nombreyapellido LIKE '$nombre'";
        $result = pg_query($conection, $query);
        if (!$result) {
            die('query error ' . pg_last_error($conection));
            return false;
        }
        $dev = pg_num_rows($result);
        if ($dev > 0) {
            echo 'El usuario ya existe';
        } else if (isset($_POST['aliass'])) {
            $query = "SELECT aliass FROM $base.$tabla WHERE aliass LIKE '$aliass'";
            $result2 = pg_query($conection, $query);
            if (!$result2) {
                die('query error ' . pg_last_error($conection));
                return false;
            }
            $dev2 = pg_num_rows($result2);
            if ($dev2 > 0) {
                echo 'El alias ya existe';
            } else {
                $query = "INSERT into $base.$tabla(nombreyapellido, aliass, rut, email, region, comuna, candidato, nosotros) VALUES ('$nombre','$aliass','$rut','$email','$region','$comuna','$candidato','$nosotros')";
                $result = pg_query($conection, $query);
                if (!$result) {
                    die('query failed');
                } else {
                    echo 'Agregado Satisfactoriamente';
                }
            }
        }
    }
}
