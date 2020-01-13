<?php

$cadena = "host='localhost' port='5432' dbname='postgres' user='postgres' password='837640'";
$conection = pg_pconnect($cadena)
    or die("no se conecto a la bd ");
