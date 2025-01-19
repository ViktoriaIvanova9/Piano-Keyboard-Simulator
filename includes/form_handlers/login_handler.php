<?php

if(isset($_POST["login_button"])) 
{
    $username = $_POST['login_username'];
    $_SESSION["login_username"] = $username;
    
    $password = md5($_POST["login_password"]);

    $check_database_query = mysqli_query($db_connection, "SELECT * FROM users WHERE username='$username'");
    $check_login_query = mysqli_num_rows($check_database_query);

    if($check_login_query == 1)
    {
        $row = mysqli_fetch_array($check_database_query);
        $username = $row["username"];

        $_SESSION["username"] = $username;

        header("Location: index.php");
        exit();
    }
}
?>