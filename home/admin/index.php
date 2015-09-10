<?php

session_start();

if (!isset($_SESSION["logged"])) {
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        if ($_POST["username"] == "tesifer" && $_POST["password" == "tesifer"]) {
            $_SESSION["logged"] = "1";
            echo "true";
            exit;
        } else {
            echo "false";
            exit;
        }
    } else {
        header("Location: login.php");
        exit;
    }
}

$page = "home";
if (isset($_GET['page'])) {
    $page = $_GET['page'];
}

$params = array();
foreach($_GET as $key => $param) {
    if ($key != "page") {
        $params[$key] = $param;
    }
}
?>
<html>
<head>
    <link href="components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">
    <link href="components/sbadmin/timeline.css" rel="stylesheet" type="text/css">
    <link href="components/datatables/media/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css">
    <link href="components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet" type="text/css">
    <link href="main.css" rel="stylesheet" type="text/css">
    <link href="components/sbadmin/sb-admin-2.css" rel="stylesheet" type="text/css">
    <link href="components/morrisjs/morris.css" rel="stylesheet">
    <link href="components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="components/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">
    <script src="components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA2ZOOm3ssYsWpjsDlm9V78vWXD9pVd2ro">
    </script>
</head>
<body>
<div id="wrapper">
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <div class="navbar-brand">Tesifer</div>
        </div>
        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">
                    <li>
                        <a href="?page=home"><i class="fa fa-dashboard fa-fw"></i> Home</a>
                        <hr>
                        <a href="?page=panorama"><i class="fa fa-globe fa-fw"></i> Panorama</a>
                        <a href="?page=collegamenti"><i class="fa fa-map-marker fa-fw"></i> Collegamenti</a>
                        <a href="?page=hotspot"><i class="fa fa-thumb-tack fa-fw"></i> Hotspot</a>
                        <hr>
                        <a href="?page=internal"><i class="fa fa-globe fa-fw"></i> Interni</a>
                        <a href="?page=galleria"><i class="fa fa-picture-o fa-fw"></i> Galleria</a>
                        <a href="?page=oggetti"><i class="fa fa-cube fa-fw"></i> Oggetti</a>
                        <a href="?page=documenti"><i class="fa fa-file-pdf-o fa-fw"></i> Documenti</a>

                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div id="page-wrapper">

        <?php

        if (file_exists("pages/" . $page . ".php"))
        {
            include "pages/" . $page . ".php";
        }

        if (file_exists("pages/" . $page . ".js"))
        {
            echo "<script>";
            include "pages/" . $page . ".js";
            echo "</script>";
        }

        ?>

    </div>

</div>

<!-- jQuery -->


<!-- Bootstrap Core JavaScript -->
<script src="components/jquery-ui/jquery-ui.min.js"></script>

<script src="components/bootstrap/dist/js/bootstrap.min.js"></script>

<!-- Metis Menu Plugin JavaScript -->
<script src="components/metisMenu/dist/metisMenu.min.js"></script>

<script src="components/datatables/media/js/jquery.dataTables.min.js"></script>
<script src="components/datatables-responsive/js/dataTables.responsive.js"></script>

<script src="components/sbadmin/sb-admin-2.js"></script>

<script src="components/datatablecomponent.js"></script>

</body>
</html>