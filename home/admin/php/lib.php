<?php

class Links
{
    public function getPanoramas($panorama1, $panorama2)
    {
        $result = ["panorama1" => "", "panorama2" => ""];
        $p1 = Db::fetchAll(sprintf("
            SELECT p.panorama
            FROM panorama p
            WHERE p.id = '%d'
        ", $panorama1));
        if (isset($p1[0])) $result["panorama1"] = $p1[0]["panorama"];

        $p2 = Db::fetchAll(sprintf("
            SELECT p.panorama
            FROM panorama p
            WHERE p.id = '%d'
        ", $panorama2));
        if (isset($p2[0])) $result["panorama2"] = $p2[0]["panorama"];

        return $result;
    }

    public function getLinks()
    {
        return Db::fetchAll("
            SELECT c.idcalling, c.idcalled, p1.earthlatitude lat1, p1.earthlongitude lng1, p2.earthlatitude lat2, p2.earthlongitude lng2, p1.panorama panorama1, p2.panorama panorama2
            FROM collegamento c, panorama p1, panorama p2
            WHERE c.idcalling = p1.id and c.idcalled = p2.id and c.idcalling < c.idcalled
        ");
    }

    public function getLink($panorama1, $panorama2)
    {
        $result = ["forward" => [], "backward" => []];
        $p1 = Db::fetchAll(sprintf("
            SELECT c.idcalling, c.longitude as angle_before_tran, c.longitudeonload as angle_after_tran, p.panorama
            FROM collegamento c, panorama p
            WHERE c.idcalling = '%d' and c.idcalled = '%d' and c.idcalling = p.id
        ", $panorama1, $panorama2));
        if (isset($p1[0])) $result["forward"] = $p1[0];

        $p2 = Db::fetchAll(sprintf("
            SELECT c.idcalling, c.longitude as angle_before_tran, c.longitudeonload as angle_after_tran, p.panorama
            FROM collegamento c, panorama p
            WHERE c.idcalling = '%d' and c.idcalled = '%d' and c.idcalling = p.id
        ", $panorama2, $panorama1));
        if (isset($p2[0])) $result["backward"] = $p2[0];

        return $result;
    }

    public function addLink($panorama1, $panorama2, $angleBeforeTranForward, $angleAfterTranForward, $angleBeforeTranBackward, $angleAfterTranBackward)
    {
        $result = [
            "success" => false
        ];
        Db::insert(sprintf("
            INSERT INTO collegamento VALUES ('%d', '%d', 0, '%d', 0, '%d', 60);
        ", $panorama1, $panorama2, round($angleBeforeTranForward), round($angleAfterTranForward)));

        Db::insert(sprintf("
            INSERT INTO collegamento VALUES ('%d', '%d', 0, '%d', 0, '%d', 60);
        ", $panorama2, $panorama1, round($angleBeforeTranBackward), round($angleAfterTranBackward)));
        $result["success"] = true;
        return $result;
    }

    public function updateLink($panorama1, $panorama2, $angleBeforeTranForward, $angleAfterTranForward, $angleBeforeTranBackward, $angleAfterTranBackward)
    {
        $result = [
            "success" => false
        ];
        Db::update(sprintf("
            UPDATE collegamento set longitude = '%d', longitudeonload = '%d' where idcalling = '%d' and idcalled = '%d';
        ", round($angleBeforeTranForward), round($angleAfterTranForward), $panorama1, $panorama2));
        Db::update(sprintf("
            UPDATE collegamento set longitude = '%d', longitudeonload = '%d' where idcalling = '%d' and idcalled = '%d';
        ", round($angleBeforeTranBackward), round($angleAfterTranBackward), $panorama2, $panorama1));
        $result["success"] = true;
        return $result;
    }
}

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

class Internal
{
    public function getInternals()
    {
        return Db::fetchAll("
            SELECT id, panorama
            FROM Panorama
            WHERE earthlatitude is null
            ORDER BY id desc
        ");
    }

    public function addInternal()
    {
        $uploaddir = '../../textures/';
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
                    INSERT INTO Panorama(panorama) VALUES ('%s');
                ", $nfile));
            }
        }
        header("location: ../?page=internal");
        exit;
    }

    public function removeInternal($id)
    {
        $result = [
            "success" => false
        ];

        if ($id > 0) {
            $source = Db::fetchAll(sprintf("
                SELECT panorama
                FROM panorama
                where id = '%d'
            ", $id));

            Db::delete(sprintf("
                DELETE FROM panorama WHERE id = '%d';
            ", $id));

            if (isset($source[0])) {
                unlink("../../textures/" . $source[0]['panorama']);
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

    public function getPanorama($id)
    {
        $panorama = Db::fetchAll(sprintf("
            SELECT id, panorama, earthlatitude lat, earthlongitude as lng
            FROM Panorama
            WHERE id = '%d'
        ", $id));
        if (isset($panorama[0])) return $panorama[0];

        return null;
    }

    public function addPanorama()
    { error_reporting(E_ALL);
        $uploaddir = '../../textures/';
        $file = basename($_FILES['userfile']['name']);
        $nfile = $file;
        $i = 1;
        $uploadfile = $uploaddir . $nfile;
        while (file_exists($uploadfile) && $i < 10000) {
            $nfile = str_replace(".", $i . ".", $file);
            $uploadfile = $uploaddir . $nfile;
            $i++;
        }

        $lat = "";
        $lng = "";
        if (isset($_POST['lat'])) $lat = $_POST["lat"];
        if (isset($_POST['lng'])) $lng = $_POST["lng"];

        $id = 0;
        if(!file_exists($uploadfile) && $lat != "" && $lng != "") {
            if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
                Db::insert(sprintf("
                    INSERT INTO Panorama(panorama, earthlatitude, earthlongitude) VALUES ('%s', '%s', '%s');
                ", $nfile, $lat, $lng));

                $aid = Db::fetchAll("
                    SELECT max(id) as id
                    FROM Panorama
                ");

                if (isset($aid[0])) $id = $aid[0]["id"];
            }
        }

        if ($id == 0) {
            header("location: ../?page=panorama");
        } else {
            header("location: ../?page=panorama-detail&id=" . $id);
        }
        exit;
    }

    public function updatePanorama($id, $lat, $lng) {
        $result = [
            "success" => true
        ];
        Db::update(sprintf("
            UPDATE panorama set earthlatitude = '%s', earthlongitude = '%s' where id = '%d';
        ", $lat, $lng, $id));
        return $result;
    }

    public function getPanoramaHotspots($panorama)
    {
        return Db::fetchAll(sprintf("
            SELECT h.id, h.subject, p.xPosition x, p.yPosition y, p.zPosition z, p.angolo, p.angoloY
            FROM HotspotNelPanorama p, Hotspot h
            WHERE p.idhotspot = h.id and p.idpanorama = '%d'
            ORDER BY h.id
        ", $panorama));
    }

    public function addPanoramaHotspot($panorama, $hotspot, $left, $top)
    {
        $left = doubleval($left);
        $result = [
            "success" => false
        ];
        $exists = Db::fetchAll(sprintf("
            SELECT *
            FROM HotspotNelPanorama p
            WHERE p.idpanorama = '%d' and p.idhotspot = '%d'
        ", $panorama, $hotspot));

        if (isset($exists[0])) {
            Db::update(sprintf("
                UPDATE HotspotNelPanorama set xPosition = '%s', yPosition = '%s', zPosition = '%s', xPositionFinal = '%s', yPositionFinal = '%s', zPositionFinal = '%s', angolo = '%s', angoloY = '%s' where idpanorama = '%d' and idhotspot = '%d';
            ", cos(deg2rad($left)), 0, sin(deg2rad($left)), cos(deg2rad($left)), 0, sin(deg2rad($left)), $left, $top, $panorama, $hotspot));
        } else {
            Db::insert(sprintf("
                INSERT INTO HotspotNelPanorama VALUES ('%d', '%d', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');
            ", $panorama, $hotspot, cos(deg2rad($left)), 0, sin(deg2rad($left)), cos(deg2rad($left)), 0, sin(deg2rad($left), $left, $top)));
        }

        $result["success"] = true;
        return $result;
    }

    public function updatePanoramaHotspotXYZ($panorama, $hotspot, $x, $y, $z)
    {
        $result = [
            "success" => false
        ];


        Db::update(sprintf("
            UPDATE HotspotNelPanorama set xPositionFinal = '%s', yPositionFinal = '%s', zPositionFinal = '%s' where idpanorama = '%d' and idhotspot = '%d';
        ", $x, $y, $z, $panorama, $hotspot));


        $result["success"] = true;
        return $result;
    }

    public function removePanorama($id) {
        $result = [
            "success" => false
        ];

        if ($id > 0) {
            $source = Db::fetchAll(sprintf("
                SELECT panorama
                FROM panorama
                where id = '%d'
            ", $id));

            Db::delete(sprintf("
                DELETE FROM Panorama WHERE id = '%d';
            ", $id));

            Db::delete(sprintf("
                DELETE FROM HotspotNelPanorama WHERE idpanorama = '%d';
            ", $id));

            Db::delete(sprintf("
                DELETE FROM Collegamento WHERE idcalling = '%d' OR idcalled = '%d';
            ", $id, $id));

            if (isset($source[0])) {
                unlink("../../textures/" . $source[0]['panorama']);
            }

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

    public function getHotspot($id)
    {
        $result = [
            "info" => [],
            "detail" => []
        ];
        $info = Db::fetchAll(sprintf("
            SELECT id, subject
            FROM Hotspot
            WHERE id = '%s'
        ", $id));
        if (isset($info[0]))
            $result["info"] = $info[0];

        $result["detail"] = Db::fetchAll(sprintf("
            SELECT name subject, idname id
            FROM HotspotInfo
            WHERE hotspotid = '%s'
        ", $id));

        return $result;
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
        $internalid = "";
        if (isset($_POST["title"])) $title = $_POST["title"];
        if (isset($_POST["gallery"])) $galleryid = $_POST["gallery"];
        if (isset($_POST["object"])) $objectid = $_POST["object"];
        if (isset($_POST["document"])) $documentid = $_POST["document"];
        if (isset($_POST["internal"])) $internalid = $_POST["internal"];

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

                if ($internalid != "" && intval($internalid) != 0) {
                    Db::insert(sprintf("
                        INSERT INTO hotspotinfo(hotspotid, name, idname, source, height, width) VALUES ('%d', 'Panorama', '%d', 'AlonePano.html', 400, 400);
                    ", $id, $internalid));
                }
            }

            $result["success"] = true;
        }

        return $result;
    }

    public function updateHotspot($id)
    {
        $result = [
            "success" => false
        ];
        $title = "";
        $galleryid = "";
        $objectid = "";
        $documentid = "";
        $internalid = "";
        if (isset($_POST["title"])) $title = $_POST["title"];
        if (isset($_POST["gallery"])) $galleryid = $_POST["gallery"];
        if (isset($_POST["object"])) $objectid = $_POST["object"];
        if (isset($_POST["document"])) $documentid = $_POST["document"];
        if (isset($_POST["internal"])) $internalid = $_POST["internal"];

        if ($id > 0) {
            if ($title != "") {
                Db::update(sprintf("
                    UPDATE hotspot set subject = '%s' where id = '%d';
                ", $title, $id));
            }

            if ($galleryid != "" && intval($galleryid) != 0) {
                $query = Db::fetchAll(sprintf("
                    SELECT *
                    FROM HotspotInfo
                    WHERE hotspotid = '%d' and name = 'Gallery'
                ", $id));

                if ($query && count($query) > 0) {
                    Db::update(sprintf("
                        UPDATE hotspotinfo set idname = '%d' where hotspotid = '%d' and name = 'Gallery';
                    ", $galleryid, $id));
                } else {
                    Db::insert(sprintf("
                        INSERT INTO hotspotinfo(hotspotid, name, idname, source, height, width) VALUES ('%d', 'Gallery', '%d', 'gallery.html', 300, 400);
                    ", $id, $galleryid));
                }
            } else {
                Db::delete(sprintf("
                    DELETE FROM hotspotinfo where hotspotid = '%d' and name = 'Gallery';
                ", $id));
            }

            if ($objectid != "" && intval($objectid) != 0) {
                $query = Db::fetchAll(sprintf("
                    SELECT *
                    FROM HotspotInfo
                    WHERE hotspotid = '%d' and name = 'Object'
                ", $id));

                if ($query && count($query) > 0) {
                    Db::update(sprintf("
                        UPDATE hotspotinfo set idname = '%d' where hotspotid = '%d' and name = 'Object';
                    ", $objectid, $id));
                } else {
                    Db::insert(sprintf("
                        INSERT INTO hotspotinfo(hotspotid, name, idname, source, height, width) VALUES ('%d', 'Object', '%d', 'Object.html', 400, 400);
                    ", $id, $objectid));
                }
            } else {
                Db::delete(sprintf("
                    DELETE FROM hotspotinfo where hotspotid = '%d' and name = 'Object';
                ", $id));
            }

            if ($documentid != "" && intval($documentid) != 0) {
                $query = Db::fetchAll(sprintf("
                    SELECT *
                    FROM HotspotInfo
                    WHERE hotspotid = '%d' and name = 'PDF'
                ", $id));

                if ($query && count($query) > 0) {
                    Db::update(sprintf("
                        UPDATE hotspotinfo set idname = '%d' where hotspotid = '%d' and name = 'PDF';
                    ", $documentid, $id));
                } else {
                    Db::insert(sprintf("
                        INSERT INTO hotspotinfo(hotspotid, name, idname, source, height, width) VALUES ('%d', 'PDF', '%d', 'pdf/web/viewer.html', 600, 600);
                    ", $id, $documentid));
                }
            } else {
                Db::delete(sprintf("
                    DELETE FROM hotspotinfo where hotspotid = '%d' and name = 'PDF';
                ", $id));
            }

            if ($internalid != "" && intval($internalid) != 0) {
                $query = Db::fetchAll(sprintf("
                    SELECT *
                    FROM HotspotInfo
                    WHERE hotspotid = '%d' and name = 'Panorama'
                ", $id));

                if ($query && count($query) > 0) {
                    Db::update(sprintf("
                        UPDATE hotspotinfo set idname = '%d' where hotspotid = '%d' and name = 'Panorama';
                    ", $internalid, $id));
                } else {
                    Db::insert(sprintf("
                        INSERT INTO hotspotinfo(hotspotid, name, idname, source, height, width) VALUES ('%d', 'Panorama', '%d', 'AlonePano.html', 400, 400);
                    ", $id, $internalid));
                }
            } else {
                Db::delete(sprintf("
                    DELETE FROM hotspotinfo where hotspotid = '%d' and name = 'Panorama';
                ", $id));
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

