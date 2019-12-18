<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>
<?php    
    $login_normal = "user";
	$login_admin = "admin";
	$password = "ajax";
    if( isset($_POST['username']) && isset($_POST['password']) ){
 
        if($_POST['username'] == $login_normal && $_POST['password'] == $password){
            session_start();
            $_SESSION['user'] = $login_normal;
            echo $_SESSION['user'];
            return;
        }
    else if ($_POST['username'] == $login_admin && $_POST['password'] == $password){
            session_start();
            $_SESSION['user'] = $login_admin;
            echo $_SESSION['user'];
            return;
	   }
        else{
            echo "Failed";
            return;
        }
    }
?>