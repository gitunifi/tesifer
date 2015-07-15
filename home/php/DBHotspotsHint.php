<?php

define("HOST", "localhost");
define("USER", "tesifer");
define("PASSWORD", "t3s1f3r");
define("DB", "tesifer");

class Autocomplete
{
    public $term;
    public $conn;

    public function __construct()
    {
        $this->dbConnect();
        $this->term = mysqli_real_escape_string($this->conn, $_GET['term']);

    }

    private function dbConnect()
    {
        $this->conn = mysqli_connect(HOST,USER,PASSWORD) OR die("Connessione non riuscita");
        mysqli_select_db($this->conn, DB) OR die("Impossibile selezionare il database");
    }

    public function printResult()
    {
        $pieces = explode(" ", $this->term);
        $num_word = count($pieces);

        $sql = "
			SELECT DISTINCT hp.IdHotspot, h.Subject, hp.IdPanorama, hp.xPosition, hp.yPosition, hp.zPosition, p.Source
			FROM
			 	HotspotNelPanorama hp,
				Hotspot h
			LEFT JOIN
				HotspotInfo hi
			ON
				h.id = hi.hotspotid AND
				hi.name = 'PDF'
			LEFT JOIN
				PDF p
			ON
				hi.idname = p.id
			WHERE
				h.ID = hp.IdHotspot and (p.contenuto like '%" . $this->term . "%' ";


        for ($k = 0; $k < $num_word; $k++)
        {
            $splits = str_split($pieces[$k], 2);
            foreach ($splits as $split) {
                if ($split != "" && $split != null)
                    $sql .= " OR h.Subject Like '%" . $split . "%'";
            }
        }

        $sql .= ")";

        //"Subject Like '%$this->term%'"



//$sql = "select ID from Panorama where Panorama Like '$this->term%'";


        $res = mysqli_query($this->conn, $sql);

        $arr = array();
        $i = 0;
        echo "[";
        while ($row = mysqli_fetch_array($res)){
            $arr['value'] = $row['Subject'];
            $arr['idPan']= $row['IdPanorama'];
            $arr['idx']= $row['xPosition'];
            $arr['idy']= $row['yPosition'];
            $arr['idz']= $row['zPosition'];
            $arr['idHot']= $row['IdHotspot'];
            $arr['source']= $row['Source'];
            if ($i == 0)
                echo json_encode($arr);
            else
                echo ",".json_encode($arr);
            $i++;
        }
        echo "]";
    }
}


$autocomplete = new Autocomplete();
$autocomplete->printResult();
?>

