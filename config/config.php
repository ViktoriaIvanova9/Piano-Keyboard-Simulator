<?php
ob_start();
session_start();

$db_connection = mysqli_connect("localhost", "root", "", "piano-simulator");

if(mysqli_connect_errno())
{
    echo "Failed to connect!" . mysqli_connect_errno();
}
?>