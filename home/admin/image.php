<?php
error_reporting(E_ALL);
//$image1 = imagecreatefromjpeg('../textures/pano8.jpg');
//$image2 = imagecreatefromjpeg('../textures/pano9.jpg');
gc_enable();
set_time_limit(600000);
$image1 = imagecreatefromjpeg('cats.jpg');
$image2 = imagecreatefromjpeg('cats2.jpg');
$time = microtime(true);
$ih = new IntegralHistogram();

$res = $ih->search($image1, $image2, 1);
var_dump($res);
$time2 = microtime(true);
echo memory_get_usage()."<br>";
echo memory_get_peak_usage();
echo "<br>TIME:" . ($time2-$time);


class IntegralHistogram {


    function __construct() {
        $this->bit = 2;
        $this->bins = 4;//1 << $this->bit;
        $this->bins2 = $this->bins * $this->bins;
        $this->bins3 = 4;
        $this->nbit = 8 - $this->bit;
        $this->target = array_fill( 0, $this->bins3, 0 );
        $this->max = 255. / $this->bins3;
    }

    public function bin($pixelColor)
    {


        $r = $pixelColor >> 16 & 0xFF;
        $g = $pixelColor >> 8 & 0xFF;
        $b = $pixelColor & 0xFF;

        $s = 0.2126 * $r + 0.7152 * $g + 0.0722 * $b;
        return intval($s/$this->max);

        $x1 = $r >> $this->nbit;
        $x2 = ($g >> $this->nbit)  * $this->bins;
        $x3 = ($b >> $this->nbit) * $this->bins2;
        $s = $x1 + $x2 + $x3;

        unset($r);
        unset($g);
        unset($b);
        unset($x1);
        unset($x2);
        unset($x3);
        return $s;
        //return (($pixelColor >> 16 & 0xFF) >> (8 - $this->bit)) + (($pixelColor >> 8 & 0xFF) >> (8 - $this->bit)) * $this->bins + (($pixelColor & 0xFF) >> (8 - $this->bit)) * $this->bins * $this->bins;
    }


    public function createFromImage($image)
    {
        $colors = array_fill(0, $this->bins3, 0);

        $width = imagesx($image);
        $height = imagesy($image);

        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $pixelColor = imagecolorat($image, $x, $y);
                $colors[$this->bin($pixelColor)]++;
            }
        }
        $norm = $width * $height;
        $n = $this->bins3;
        for ($i = 0; $i < $n; $i++) {
            $colors[$i] = (floatval($colors[$i]) / $norm);
        }
        return $colors;
    }

    public function getPixels($image) {
        $width = imagesx($image);
        $height = imagesy($image);
        $pixels = [];
        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $pixels[] = imagecolorat($image, $x, $y);
            }
        }
        return $pixels;
    }

    public function createHistograms($imgSrcWidth, $imgSrcHeight)
    {
        $n = $this->bins3;
        //$histograms = array_fill( 0, $imgSrcHeight*$imgSrcWidth, array_fill(0, $n, 0));
        //return $histograms;
        return [];
    }

    public function propagation($hists, $imgWidth, $imgHeight, $pxlArray)
    {
        $count = $this->bins3;
        $hists[0][$this->bin($pxlArray[0])] = 1;
        for ($i = 1; $i < $imgWidth; $i++) {
            /*for ($k = 0; $k < $count; $k++) {
                unset($hists[$i][$k]);
                $hists[$i][$k] = $hists[$i - 1][$k];
            }
            unset($k);*/
            $hists[$i] = $hists[$i - 1];
            if ( !isset($hists[$i][$this->bin($pxlArray[$i])]))
                $hists[$i][$this->bin($pxlArray[$i])] = 1;
            else
                $hists[$i][$this->bin($pxlArray[$i])]++;
        }

        for ($j = 1; $j < $imgHeight; $j++) {
            $jw = $j * $imgWidth;
            $pjw = ($j - 1) * $imgWidth;
            $hists[$jw] = $hists[$pjw];
            if ( !isset($hists[$jw][$this->bin($pxlArray[$jw])]))
                $hists[$jw][$this->bin($pxlArray[$jw])] = 1;
            else
                $hists[$jw][$this->bin($pxlArray[$jw])]++;
            for ($i = 1; $i < $imgWidth; $i++) {

                $left = $jw + ($i - 1);
                $top = $pjw + ($i);
                $top_left = $pjw + ($i - 1);
                $v = $jw + $i;

                $hists[$v] = $hists[$left];

                foreach ($hists[$top] as $a => $b) {
                    if (!isset($hists[$v][$a]))
                        $hists[$v][$a] = $b;
                    else
                        $hists[$v][$a] += $b;
                }

                foreach ($hists[$top_left] as $a => $b) {
                    if (!isset($hists[$v][$a]))
                        $hists[$v][$a] = -$b;
                    else
                        $hists[$v][$a] -= $b;
                }


                $iColor = $this->bin($pxlArray[$v]);

                if ( !isset($hists[$v][$iColor]))
                    $hists[$v][$iColor] = 1;
                else
                    $hists[$v][$iColor]++;

                unset($v);
                unset($iColor);
                unset($left);
                unset($top);
                unset($top_left);
                unset($k);

            }




        }
        unset($count);

        return $hists;
    }

    public function search($imageSrc, $imageTarget, $scale)
    {
        $this->target = $this->createFromImage($imageTarget);
        $sWidth = imagesx($imageSrc);
        $sHeight = imagesy($imageSrc);
        $tWidth = imagesx($imageTarget);
        $tHeight = imagesy($imageTarget);

        $intHists  = $this->createHistograms($sWidth, $sHeight);

        $pixels = $this->getPixels($imageSrc);
        $intHists = $this->propagation($intHists, $sWidth, $sHeight, $pixels);

        $minDistance = -1;
        $bestI = -1;
        $bestJ = -1;
        $bestW = 0;
        $bestH = 0;

        if (intval($tWidth / $scale) > 1) {
            $minW = intval($tWidth / $scale);
        } else {
            $minW = 2;
        }
        if (intval($tHeight * $minW / $tWidth) > 1) {
            $minH = intval($tHeight * $minW / $tWidth);
        } else {
            $minH = 2;
        }

        for ($j = 0; $j < $sHeight; $j += 2) {
            for ($i = 0; $i < $sWidth; $i += 2) {
                $rectWidth = $minW - 1;
                $rectHeight = $minH - 1;

                for (; (($rectWidth + $i) < $sWidth) && (($rectHeight + $j) < $sHeight);) {



                    $distance = $this->intersection($intHists[($j + $rectHeight) * $sWidth + ($i + $rectWidth)], $intHists[($j + $rectHeight) * $sWidth + $i],
                        $intHists[($j * $sWidth) + ($i + $rectWidth)], $intHists[($j * $sWidth) + $i], $rectHeight * $rectWidth);
                    if ($minDistance == -1 || $distance < $minDistance) {
                        $minDistance = $distance;
                        $bestI = $i;
                        $bestJ = $j;
                        $bestW = $minW;
                        $bestH = $minH;
                    }


                    $rectWidth += $minW;
                    $rectHeight = intval($tHeight * $rectWidth / $tWidth);


                }
            }
        }




        return ["distance" => $minDistance, "x" => $bestI, "y" => $bestJ, "w" => $bestW, "h" => $bestH];
    }

    public function intersection($currentHist, $leftHist, $upHist, $up_leftHist, $norm)
    {

        $distance = 0;
        $n = $this->bins3;
        for ($i = 0; $i < $n; $i++) {
            $intersection = 0;
            if (isset($currentHist[$i]))  $intersection += $currentHist[$i];
            if (isset($leftHist[$i]))  $intersection -= $leftHist[$i];
            if (isset($upHist[$i]))  $intersection -= $upHist[$i];
            if (isset($up_leftHist[$i]))  $intersection += $up_leftHist[$i];
            $intersection = floatval($intersection) / $norm;

            $distance += abs($intersection - $this->target[$i]);
        }
        return $distance;
    }
}