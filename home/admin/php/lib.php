<?php

class Gallery {
    public function getData() {
        return Db::fetchAll("
            SELECT *
            FROM Media
            JOIN Gallery
            ON Gallery.IdMedia = Media.ID
            ORDER BY Media.Id DESC
        ");
    }
}
