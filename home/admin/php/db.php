<?php

class Db {

    public static $con;
    public static $isconnect = false;


    public static function connect() {
        if (!self::$isconnect)
            self::$con = mysqli_connect("localhost", "tesifer", "t3s1f3r", "tesifer");
        self::$isconnect = true;
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

    public static function insert($query) {
        self::connect();
        $insert = mysqli_query(self::$con, $query);
        self::close();
        return $insert;
    }

    public static function delete($query) {
        self::connect();
        $delete = mysqli_query(self::$con, $query);
        self::close();
        return $delete;
    }

    public static function close() {
        mysqli_close(self::$con);
        self::$isconnect = false;
    }

}
