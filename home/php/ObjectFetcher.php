<?php

class ObjectFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT * FROM Oggetto WHERE ID='" . $thingToFetch . "'");

        $all = array();
        while ($row = mysqli_fetch_array($result)) {
            array_push($all, $row);
        }
        return json_encode($all);
    }

}
