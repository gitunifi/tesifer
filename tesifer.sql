-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generato il: Gen 31, 2014 alle 17:30
-- Versione del server: 5.5.32
-- Versione PHP: 5.3.10-1ubuntu3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tesifer`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `Collegamento`
--

CREATE TABLE IF NOT EXISTS `Collegamento` (
  `IdCalling` int(11) NOT NULL,
  `IdCalled` int(11) NOT NULL,
  `Latitude` double NOT NULL,
  `Longitude` double NOT NULL,
  `LatitudeOnLoad` double NOT NULL,
  `LongitudeOnLoad` double NOT NULL,
  `ZoomNext` int(11) NOT NULL,
  PRIMARY KEY (`IdCalling`,`IdCalled`),
  KEY `IdCalled` (`IdCalled`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `Collegamento`
--

INSERT INTO `Collegamento` (`IdCalling`, `IdCalled`, `Latitude`, `Longitude`, `LatitudeOnLoad`, `LongitudeOnLoad`, `ZoomNext`) VALUES
(1, 2, 0, 284, -2, 50, 61),
(2, 1, -1, 229, -2, 106, 50),
(2, 3, -2, 50, 2, 173, 61),
(3, 2, 0, 345, -1, 229, 65),
(3, 4, 2, 173, 4, 51, 47),
(4, 3, -4, 222, 0, 345, 65),
(4, 5, 4, 51, 1, 50, 61),
(5, 4, 0, 230, -4, 222, 61),
(5, 6, 1, 50, 4, 230, 65),
(6, 5, 0, 43, 0, 230, 51),
(6, 7, 4, 230, 7, 228, 65),
(7, 6, 2, 36, 0, 43, 51),
(7, 8, 7, 228, 2, 43, 61),
(8, 7, 3, 220, 2, 36, 47),
(8, 9, 2, 43, -1, 277, 56),
(9, 8, 0, 95, 3, 220, 61),
(9, 10, -1, 277, -1, 166, 65),
(10, 9, 0, 345, 0, 95, 56),
(10, 11, -1, 166, 3, 194, 65),
(11, 10, 0, 1, 0, 345, 65),
(11, 12, 3, 194, 1, 314, 50),
(12, 11, 2, 127, 0, 1, 65);

-- --------------------------------------------------------

--
-- Struttura della tabella `Gallery`
--

CREATE TABLE IF NOT EXISTS `Gallery` (
  `IdGallery` int(11) NOT NULL,
  `IdMedia` int(11) NOT NULL,
  PRIMARY KEY (`IdGallery`,`IdMedia`),
  KEY `IdMedia` (`IdMedia`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `Gallery`
--

INSERT INTO `Gallery` (`IdGallery`, `IdMedia`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17);

-- --------------------------------------------------------

--
-- Struttura della tabella `Hotspot`
--

CREATE TABLE IF NOT EXISTS `Hotspot` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MarkerSource` varchar(300) NOT NULL,
  `Subject` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dump dei dati per la tabella `Hotspot`
--

INSERT INTO `Hotspot` (`ID`, `MarkerSource`, `Subject`) VALUES
(1, 'marker.obj', 'Facciata di San Leonardo'),
(2, 'marker.obj', 'Test');

-- --------------------------------------------------------

--
-- Struttura della tabella `HotspotInfo`
--

CREATE TABLE IF NOT EXISTS `HotspotInfo` (
  `HotspotId` int(11) NOT NULL,
  `Name` varchar(300) NOT NULL,
  `IdName` int(11) DEFAULT NULL,
  `Source` varchar(300) DEFAULT NULL,
  `Height` float DEFAULT NULL,
  `Width` float DEFAULT NULL,
  PRIMARY KEY (`HotspotId`,`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `HotspotInfo`
--

INSERT INTO `HotspotInfo` (`HotspotId`, `Name`, `IdName`, `Source`, `Height`, `Width`) VALUES
(1, 'Gallery', 1, 'gallery.html', 300, 400),
(1, 'Object', 4, 'Object.html', 400, 400),
(1, 'Panorama', 13, 'AlonePano.html', 400, 400),
(1, 'PDF', 1, 'pdf/web/viewer.html', 400, 400),
(2, 'Gallery', NULL, NULL, NULL, NULL),
(2, 'Object', NULL, NULL, NULL, NULL),
(2, 'Panorama', 1, 'AlonePano.html', 400, 400),
(2, 'PDF', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `HotspotNelPanorama`
--

CREATE TABLE IF NOT EXISTS `HotspotNelPanorama` (
  `IdPanorama` int(11) NOT NULL,
  `IdHotspot` int(11) NOT NULL,
  `xPosition` double NOT NULL,
  `yPosition` double NOT NULL,
  `zPosition` double NOT NULL,
  PRIMARY KEY (`IdPanorama`,`IdHotspot`),
  KEY `IdHotspot` (`IdHotspot`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `HotspotNelPanorama`
--

INSERT INTO `HotspotNelPanorama` (`IdPanorama`, `IdHotspot`, `xPosition`, `yPosition`, `zPosition`) VALUES
(11, 1, -3, 0, 210),
(12, 2, 3, 0, 210);

-- --------------------------------------------------------

--
-- Struttura della tabella `Media`
--

CREATE TABLE IF NOT EXISTS `Media` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Source` varchar(300) NOT NULL,
  `Title` varchar(300) DEFAULT NULL,
  `Thumbnail` varchar(300) NOT NULL,
  `Width` int(11) DEFAULT NULL,
  `Height` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dump dei dati per la tabella `Media`
--

INSERT INTO `Media` (`ID`, `Source`, `Title`, `Thumbnail`, `Width`, `Height`) VALUES
(1, 'Ferrovie3_Complete_T1.jpg', NULL, 'Ferrovie3_Complete_T1.jpg', NULL, NULL),
(2, 'Ferrovie3_Complete_T2.jpg', NULL, 'Ferrovie3_Complete_T2.jpg', NULL, NULL),
(3, 'Ferrovie3_Complete_T3.jpg', NULL, 'Ferrovie3_Complete_T3.jpg', NULL, NULL),
(4, 'Ferrovie3_Complete_T4.jpg', NULL, 'Ferrovie3_Complete_T4.jpg', NULL, NULL),
(5, 'Ferrovie3_Complete_T5.jpg', NULL, 'Ferrovie3_Complete_T5.jpg', NULL, NULL),
(6, 'Ferrovie3_Complete_T6.jpg', NULL, 'Ferrovie3_Complete_T6.jpg', NULL, NULL),
(7, 'Ferrovie3_Complete_T7.jpg', NULL, 'Ferrovie3_Complete_T7.jpg', NULL, NULL),
(8, 'Ferrovie3_Complete_T8.jpg', NULL, 'Ferrovie3_Complete_T8.jpg', NULL, NULL),
(9, 'Ferrovie3_Complete_T9.jpg', NULL, 'Ferrovie3_Complete_T9.jpg', NULL, NULL),
(10, 'Ferrovie3_Complete_T10.jpg', NULL, 'Ferrovie3_Complete_T10.jpg', NULL, NULL),
(11, 'Ferrovie3_Complete_T11.jpg', NULL, 'Ferrovie3_Complete_T11.jpg', NULL, NULL),
(12, 'Ferrovie3_Complete_T12.jpg', NULL, 'Ferrovie3_Complete_T12.jpg', NULL, NULL),
(13, 'Ferrovie3_Complete_T13.jpg', NULL, 'Ferrovie3_Complete_T13.jpg', NULL, NULL),
(14, 'Ferrovie3_Complete_T14.jpg', NULL, 'Ferrovie3_Complete_T14.jpg', NULL, NULL),
(15, 'Ferrovie3_Complete_T15.jpg', NULL, 'Ferrovie3_Complete_T15.jpg', NULL, NULL),
(16, 'Ferrovie3_Complete_T16.jpg', NULL, 'Ferrovie3_Complete_T16.jpg', NULL, NULL),
(17, 'itinerario2.mp4', NULL, 'playButton.png', 500, 500);

-- --------------------------------------------------------

--
-- Struttura della tabella `Oggetto`
--

CREATE TABLE IF NOT EXISTS `Oggetto` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Object` varchar(300) NOT NULL,
  `MTL` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dump dei dati per la tabella `Oggetto`
--

INSERT INTO `Oggetto` (`ID`, `Object`, `MTL`) VALUES
(1, 'corrimano.obj', 'corrimano.mtl'),
(2, 'mobile.obj', 'mobile.mtl'),
(3, 'pulpito.obj', 'pulpito.mtl'),
(4, 'Facciata.obj', 'lj.mtl');

-- --------------------------------------------------------

--
-- Struttura della tabella `Panorama`
--

CREATE TABLE IF NOT EXISTS `Panorama` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Panorama` varchar(300) NOT NULL,
  `EarthLatitude` double DEFAULT NULL,
  `EarthLongitude` double DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dump dei dati per la tabella `Panorama`
--

INSERT INTO `Panorama` (`ID`, `Panorama`, `EarthLatitude`, `EarthLongitude`) VALUES
(1, 'pano1.jpg', 43.760828, 11.254903),
(2, 'pano2.jpg', 43.760704, 11.254951),
(3, 'pano3.jpg', 43.760587, 11.254989),
(4, 'pano4.jpg', 43.760432, 11.255053),
(5, 'pano5.jpg', 43.760328, 11.25508),
(6, 'pano6.jpg', 43.760254, 11.255085),
(7, 'pano7.jpg', 43.760173, 11.255085),
(8, 'pano8.jpg', 43.760049, 11.25508),
(9, 'pano9.jpg', 43.759964, 11.255075),
(10, 'pano10.jpg', 43.759886, 11.255069),
(11, 'pano11.jpg', 43.759801, 11.255053),
(12, 'pano12.jpg', 43.759735, 11.255021),
(13, 'pano13.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `PDF`
--

CREATE TABLE IF NOT EXISTS `PDF` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Source` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dump dei dati per la tabella `PDF`
--

INSERT INTO `PDF` (`ID`, `Source`) VALUES
(1, 'CAT_Formella04.pdf');

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `HotspotInfo`
--
ALTER TABLE `HotspotInfo`
  ADD CONSTRAINT `HotspotInfo_ibfk_1` FOREIGN KEY (`HotspotId`) REFERENCES `Hotspot` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
