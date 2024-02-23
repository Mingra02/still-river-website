<?php
session_start(); 

$_SESSION = array();

session_destroy();

header("Location: https://www.the-still-river.com/");
exit();
?>
