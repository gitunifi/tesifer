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
		
		$sql = "select IdHotspot, Subject, IdPanorama, xPosition, yPosition, zPosition from Hotspot, HotspotNelPanorama  WHERE Hotspot.ID = HotspotNelPanorama.IdHotspot and (";
			
		
		for ($k = 0; $k < $num_word; $k++)
		{	
			if ($k == 0)
				$sql .= "Subject Like '%".$pieces[$k]."%'";
			elseif ($pieces[$k] != "" && $pieces[$k] != null)
				$sql .= " OR Subject Like '%".$pieces[$k]."%'";
		}
		$sql .= ")";
		//echo $sql;
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

