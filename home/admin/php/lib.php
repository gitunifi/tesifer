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

class Documents
{
    public function getDocuments()
    {
        return Db::fetchAll("
            SELECT id, source
            FROM PDF
            ORDER BY id desc
        ");
    }

    public function addDocument()
    {
        $uploaddir = '../../pdf/web/';
        $file = basename($_FILES['userfile']['name']);
        $nfile = $file;
        $i = 1;
        $uploadfile = $uploaddir . $nfile;
        while (file_exists($uploadfile) && $i < 10000) {
            $nfile = str_replace(".", $i . ".", $file);
            $uploadfile = $uploaddir . $nfile;
            $i++;
        }
        if(!file_exists($uploadfile)) {
            if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
                Db::insert(sprintf("
                    INSERT INTO PDF(source) VALUES ('%s');
                ", $nfile));
            }
        }
        header("location: ../?page=documenti");
        exit;
    }

    public function removeDocument($id)
    {
        $result = [
            "success" => false
        ];

        if ($id > 0) {
            $source = Db::fetchAll(sprintf("
                SELECT source
                FROM pdf
                where id = '%d'
            ", $id));

            Db::delete(sprintf("
                DELETE FROM PDF WHERE id = '%d';
            ", $id));

            if (isset($source[0])) {
                unlink("../../pdf/web/" . $source[0]['source']);
            }

            $result = [
                "success" => true
            ];
        }

        return $result;
    }
}

class Panorama
{
    public function getPanoramas()
    {
        return Db::fetchAll("
            SELECT id, panorama, earthlatitude lat, earthlongitude as lng
            FROM Panorama
            WHERE earthlatitude is not null AND earthlongitude is not null
            ORDER BY id

        ");
    }

    public function removePanorama($id)
    {
        $result = [
            "success" => false
        ];

        if ($id > 0) {
            /*Db::delete(sprintf("
                DELETE FROM Panorama WHERE id = '%d';
            ", $id));

            Db::delete(sprintf("
                DELETE FROM HotspotNelPanorama WHERE idpanorama = '%d';
            ", $id));

            Db::delete(sprintf("
                DELETE FROM Collegamento WHERE idcalling = '%d' OR idcalled = '%d';
            ", $id, $id));*/

            $result = [
                "success" => true
            ];
        }

        return $result;
    }
}


class Objects
{
    public function getObjects()
    {
        return Db::fetchAll("
            SELECT id, object, mtl
            FROM Oggetto
            ORDER BY id desc
        ");
    }

    public function addObject()
    {
        $uploaddir = '../../objects/';
        $file = basename($_FILES['userfileobj']['name']);
        $nfile = $file;
        $i = 1;
        $uploadfile = $uploaddir . $nfile;
        while (file_exists($uploadfile) && $i < 10000) {
            $nfile = str_replace(".", $i . ".", $file);
            $uploadfile = $uploaddir . $nfile;
            $i++;
        }

        $file2 = basename($_FILES['userfilemtl']['name']);
        $nfile2 = $file2;
        $i = 1;
        $uploadfile2 = $uploaddir . $nfile2;
        while (file_exists($uploadfile2) && $i < 10000) {
            $nfile2 = str_replace(".", $i . ".", $file2);
            $uploadfile2 = $uploaddir . $nfile2;
            $i++;
        }
        if(!file_exists($uploadfile) && !file_exists($uploadfile2)) {
            if (move_uploaded_file($_FILES['userfileobj']['tmp_name'], $uploadfile) && move_uploaded_file($_FILES['userfilemtl']['tmp_name'], $uploadfile2)) {
                Db::insert(sprintf("
                    INSERT INTO Oggetto(object, mtl) VALUES ('%s', '%s');
                ", $nfile, $nfile2));
            }
        }
        header("location: ../?page=oggetti");
        exit;
    }

    public function removeObject($id)
    {
        $result = [
            "success" => false
        ];

        if ($id > 0) {
            $source = Db::fetchAll(sprintf("
                SELECT object, mtl
                FROM oggetto
                where id = '%d'
            ", $id));

            Db::delete(sprintf("
                DELETE FROM oggetto WHERE id = '%d';
            ", $id));

            if (isset($source[0])) {
                unlink("../../objects/" . $source[0]['object']);
                unlink("../../objects/" . $source[0]['mtl']);
            }

            $result = [
                "success" => true
            ];
        }

        return $result;
    }
}

class Hotspots
{
    public function getHotspots()
    {
        return Db::fetchAll("
            SELECT id, subject
            FROM Hotspot
            ORDER BY id desc
        ");
    }

    public function addHotspot()
    {
        $result = [
            "success" => false
        ];
        $title = "";
        $galleryid = "";
        $objectid = "";
        $documentid = "";
        if (isset($_POST["title"])) $title = $_POST["title"];
        if (isset($_POST["gallery"])) $galleryid = $_POST["gallery"];
        if (isset($_POST["object"])) $objectid = $_POST["object"];
        if (isset($_POST["document"])) $documentid = $_POST["document"];

        if ($title != "") {
            Db::insert(sprintf("
                    INSERT INTO hotspot(markersource, subject) VALUES ('marker.obj', '%s');
                ", $title));

            $query = Db::fetchAll("
                SELECT id
                FROM Hotspot
                ORDER BY id desc
                LIMIT 1
            ");

            $id = 0;
            if (isset($query[0])) $id = $query[0]["id"];

            if ($id > 0) {
                if ($galleryid != "" && intval($galleryid) != 0) {
                    Db::insert(sprintf("
                        INSERT INTO hotspotinfo(hotspotid, name, idname, source, height, width) VALUES ('%d', 'Gallery', '%d', 'gallery.html', 300, 400);
                    ", $id, $galleryid));
                }

                if ($objectid != "" && intval($objectid) != 0) {
                    Db::insert(sprintf("
                        INSERT INTO hotspotinfo(hotspotid, name, idname, source, height, width) VALUES ('%d', 'Object', '%d', 'Object.html', 400, 400);
                    ", $id, $objectid));
                }

                if ($documentid != "" && intval($documentid) != 0) {
                    Db::insert(sprintf("
                        INSERT INTO hotspotinfo(hotspotid, name, idname, source, height, width) VALUES ('%d', 'PDF', '%d', 'pdf/web/viewer.html', 600, 600);
                    ", $id, $documentid));
                }
            }

            $result["success"] = true;
        }

        return $result;
    }

    public function removeHotspot($id)
    {
        $result = [
            "success" => false
        ];

        if ($id > 0) {

            Db::delete(sprintf("
                DELETE FROM HotspotNelPanorama WHERE idhotspot = '%d';
            ", $id));

            Db::delete(sprintf("
                DELETE FROM HotspotInfo WHERE hotspotid = '%d';
            ", $id));


            Db::delete(sprintf("
                DELETE FROM Hotspot WHERE id = '%d';
            ", $id));

            $result = [
                "success" => true
            ];
        }

        return $result;
    }
}

