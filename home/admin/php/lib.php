<?php

class Gallery
{
    public function getGallery()
    {
        return Db::fetchAll("
            SELECT idgallery, count(*) as numero
            FROM Gallery
            GROUP BY idgallery
            ORDER BY idgallery
        ");
    }

    public function getGalleryDetail($id)
    {
        return Db::fetchAll(sprintf("
            SELECT m.id, m.source, m.thumbnail
            FROM
                Gallery g,
                Media m
            WHERE
                g.idmedia = m.id AND
                g.idgallery = '%d'
        ", $id));
    }

    public function createGallery()
    {
        $result = [
            "success" => false
        ];
        if (isset($_POST["ids"])) {
            $ids = explode(",", $_POST["ids"]);
            $max = Db::fetchAll("
                    SELECT max(idgallery) as maxid
                    FROM Gallery g
                ");
            $max = $max[0]["maxid"] + 1;
            foreach ($ids as $id) {
                Db::insert(sprintf("
                    INSERT INTO gallery VALUES ('%d', '%d');
                ", $max, $id));
            }
            $result["success"] = true;
        }
        return $result;
    }

    public function updateGallery($idgallery)
    {
        $result = [
            "success" => false
        ];
        if (isset($_POST["ids"])) {
            $ids = explode(",", $_POST["ids"]);
            foreach ($ids as $id) {
                Db::insert(sprintf("
                    INSERT INTO gallery VALUES ('%d', '%d');
                ", $idgallery, $id));
            }
            $result["success"] = true;
        }
        return $result;
    }

    public function removeMedia($idgallery, $idmedia)
    {
        $result = [
            "success" => false
        ];

        if ($idgallery > 0 && $idmedia > 0) {
            Db::delete(sprintf("
                DELETE FROM gallery WHERE idgallery = '%d' and idmedia = '%d';
            ", $idgallery, $idmedia));

            $result = [
                "success" => true
            ];
        }

        return $result;
    }

    public function getMediaExcept($idgallery)
    {
        return Db::fetchAll(sprintf("
            SELECT m.id, m.source, m.thumbnail
            FROM Media m
            WHERE m.id not in (SELECT g.idmedia FROM Gallery g WHERE g.idgallery = '%s')
            ORDER BY m.id DESC
        ", $idgallery));
    }

    public function getMedia()
    {
        return Db::fetchAll("
            SELECT m.id, m.source, m.thumbnail
            FROM Media m
            ORDER BY m.id DESC
        ");
    }
}

