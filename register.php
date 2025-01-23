<?php
require "./config/config.php";
require "./includes/form_handlers/register_handler.php";
require "./includes/form_handlers/login_handler.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Piano-Keyboard-Simulator</title>
    <link rel="stylesheet" type="text/css" href="./assets/css/register_styles.css?v=1.0">
    <script src="./assets/javascript/register_actions.js?v=1.0" defer></script>
</head>
<body>
    <!-- <h1>
        Welcome to Piano Keyboard!<br>
    </h1> -->
    <div class="container">

        <div class="tabs">
            <div class="tab active" id="login-tab">Login</div>
            <div class="tab" id="register-tab">Register</div>
        </div>

        <div class=forms-container>
            <!-- Login form -->
            <form class="user-form active" id="login-form" action="register.php" method="POST">
                <input type="username" name="login_username" placeholder="Потребителско име" value="<?php
                if(isset($_SESSION["user_name"])) {
                    echo $_SESSION["user_name"];
                }
                ?>" required>

                <input type="password" name="login_password" placeholder="Парола" value="<?php
                if(isset($_SESSION["password"])) {
                    echo $_SESSION["password"];
                }
                ?>" required>

                <button type="login" name="login_button">Вход</button>
            </form>

            <!-- Register form -->
            <form class="user-form" id="register-form" action="register.php" method="POST">
                <input type="name" name="first_name" placeholder="Име" value="<?php
                if(isset($_SESSION["first_name"])) {
                    echo $_SESSION["first_name"];
                }
                ?>" required>

                <input type="name" name="last_name" placeholder="Фамилия" value="<?php
                if(isset($_SESSION["last_name"])) {
                    echo $_SESSION["last_name"];
                }
                ?>" required>

                <input type="username" name="user_name" placeholder="Потребителско име" value="<?php
                if(isset($_SESSION["user_name"])) {
                    echo $_SESSION["user_name"];
                }
                ?>" required>

                <input type="password" name="password" placeholder="Парола" value="<?php
                if(isset($_SESSION["password"])) {
                    echo $_SESSION["password"];
                }
                ?>" required>

                <input type="password" name="confirm_pass" placeholder="Потвърдете парола" value="<?php
                if(isset($_SESSION["confirm_pass"])) {
                    echo $_SESSION["confirm_pass"];
                }
                ?>" required>

                <input type="email" name="email_address" placeholder="Имейл адрес" value="<?php
                if(isset($_SESSION["email_address"])) {
                    echo $_SESSION["email_address"];
                }
                ?>" required>
                <?php if(in_array("Email already in use!", $error_msgs)) echo "Email already in use!"; ?>

                <button type="register" name="register_button">Регистрирай ме!</button>
            </form>

        <div>
    <div>

</body>
</html>