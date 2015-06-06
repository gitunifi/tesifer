<?php

class Db {

    public static $con;


    public static function connect() {
        if (!isset(self::$con))
            self::$con = mysqli_connect("localhost", "tesifer", "t3s1f3r", "tesifer");
    }

    public static function fetchAll($query) {
        self::connect();
        $result = mysqli_query(self::$con, $query);
        $all = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($all, $row);
        }
        self::close();
        return $all;
    }

    public static function close() {
        mysqli_close(self::$con);
    }

}
