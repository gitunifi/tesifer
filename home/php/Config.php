<?php

class Config {

    private static $configuration;
    private static $amIInitialized = false;

    public static function getConfiguration() {
        self::$configuration = array(
            "db_name" => "tesifer",
            "user" => "tesifer",
            "password" => "t3s1f3r",
            "host" => "localhost"
        );;
        return self::$configuration;
    }

}
