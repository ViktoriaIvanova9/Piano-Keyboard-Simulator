<?php

$name = "";
$surname = "";
$username = "";
$password = "";
$password_confirm = "";
$email = "";

$error_msgs = array();

if(isset($_POST["register_button"]))
{
    // Име
    $name = strip_tags($_POST["first_name"]);
    $name = str_replace(" ", "", $name);
    $_SESSION["first_name"] = $name;

    // Фамилия
    $surname = strip_tags($_POST["last_name"]);
    $surname = str_replace(" ", "", $surname);
    $_SESSION["last_name"] = $surname;

    // Потребителско име
    $username = strip_tags($_POST["user_name"]);
    $username = str_replace(" ", "", $username);
    $_SESSION["user_name"] = $username;

    // Парола
    $password = strip_tags($_POST["password"]);
    $_SESSION["password"] = $password;

    // Потвърди парола
    $password_confirm = strip_tags($_POST["confirm_pass"]);
    $_SESSION["confirm_pass"] = $password_confirm;

    // Имейл
    $email = strip_tags($_POST["email_address"]);
    $email = str_replace(" ", "", $email);
    $_SESSION["email_address"] = $email;


    // Validate username
    $username_exists_check = mysqli_query($db_connection, "SELECT username FROM users WHERE username='$username'");
    $num_same_username_rows = mysqli_num_rows($username_exists_check);
    if($num_same_username_rows > 0)
    {
        array_push($error_msgs, "Username already in use!");
    }

    // Validate password
    if($password != $password_confirm)
    {
        array_push($error_msgs, "Passwords does not match!");
    }

    // Validate email
    if(filter_var($email, FILTER_VALIDATE_EMAIL))
    {
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);

        $email_exists_check = mysqli_query($db_connection, "SELECT email FROM users WHERE email='$email'");
        $num_same_email_rows = mysqli_num_rows($email_exists_check);
        if($num_same_email_rows > 0)
        {
            array_push($error_msgs, "Email already in use!");
        }
    }
    else
    {
        array_push($error_msgs,"Invalid email!");
    }

    if(empty($error_msgs))
    {
        $password = md5($password);

        $query = mysqli_query($db_connection, "INSERT INTO users VALUES ('', '$name', '$surname', '$username', '$password', '$email')");

        $_SESSION["first_name"] = "";
        $_SESSION["last_name"] = "";
        $_SESSION["user_name"] = "";
        $_SESSION["password"] = "";
        $_SESSION["confirm_pass"] = "";
        $_SESSION["email_address"] = "";

    }

}

?>