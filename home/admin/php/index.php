<?php

require "db.php";
require "lib.php";

$controller = "";
if ($_GET["controller"]) {
    $controller = $_GET["controller"];
}

$chunks = explode(";", $controller);

if (count ($chunks) < 2) exit;

$class_name = $chunks[0];
$method_name = $chunks[1];
$params = isset($chunks[2]) ? explode(",", $chunks[2]) : [];

$instance = new $class_name();
echo json_encode(call_user_method_array($method_name, $instance, $params));