var lat = 0;
var lng = 0;
var markers = [];
var links = [];
var firstlinkMarker = {
    markerid: -1,
    panoramaid : -1
};
var secondlinkMarker = {
    markerid: -1,
    panoramaid : -1
};
var edit = false;
function reloadMarkers() {
    $.each(markers, function(key, value) {
       if (edit == false) {
           value.setIcon(null);
       } else {
           if (key != firstlinkMarker.markerid && key != secondlinkMarker.markerid) {
               value.setIcon(null);
           } else {
                value.setIcon("images/marker_blue.png");
           }
       }
    });
}

function initialize() {
    $.ajax({
        url: "php/?controller=Panorama;getPanoramas",
        dataType: "json",
        context: this
    }).done(function(response) {
        if (response && response.length > 0) {
            lat = parseFloat(response[response.length-1]['lat']);
            lng = parseFloat(response[response.length-1]['lng']);
            var mapOptions = {
                center: { lat: lat, lng: lng},
                zoom: 20
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            $.each(response, function(key, value) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value['lat'],value['lng']),
                    map: map,
                    title: value['panorama']
                });
                markers.push(marker);

                var infowindow = new google.maps.InfoWindow({
                    content: "<div style='width: 500px;'><img src='../textures/" + value['panorama'] + "' width='100%' height='auto'></div><button type='button' data-marker='" + key + "' data-id='" + value['id'] + "' class='link-marker btn btn-success' style='margin-top: 5px; padding: 3px 9px;'><i class='fa fa-check'></i> Imposta</button>"
                });

                google.maps.event.addListener(marker, 'click', function() {
                    if (edit) {
                        infowindow.open(map,marker);
                        $(".link-marker").off('click').click(function() {
                            var markerid = $(this).attr("data-marker");
                            var panoramaid = $(this).attr("data-id");
                            if (firstlinkMarker.markerid == -1) {
                                firstlinkMarker.markerid = markerid;
                                firstlinkMarker.panoramaid = panoramaid;
                                $("#link-create").html('<i class="fa fa-times"></i> Annulla');
                            } else if (secondlinkMarker.markerid == -1 && firstlinkMarker.markerid != markerid) {
                                secondlinkMarker.markerid = markerid;
                                secondlinkMarker.panoramaid = panoramaid;
                                $("#link-create").html('<i class="fa fa-check"></i> Crea');
                            } else if (firstlinkMarker.markerid != markerid && secondlinkMarker.markerid != markerid) {
                                firstlinkMarker.markerid = secondlinkMarker.markerid;
                                firstlinkMarker.panoramaid = secondlinkMarker.panoramaid;

                                secondlinkMarker.markerid = markerid;
                                secondlinkMarker.panoramaid = panoramaid;
                                $("#link-create").html('<i class="fa fa-check"></i> Crea');
                            } else if (firstlinkMarker.markerid == markerid) {
                                firstlinkMarker.markerid = secondlinkMarker.markerid;
                                firstlinkMarker.panoramaid = secondlinkMarker.panoramaid;

                                secondlinkMarker.markerid = -1;
                                secondlinkMarker.panoramaid = -1;
                                $("#link-create").html('<i class="fa fa-times"></i> Annulla');
                            } else if (secondlinkMarker.markerid == markerid) {
                                secondlinkMarker.markerid = -1;
                                secondlinkMarker.panoramaid = -1;
                                $("#link-create").html('<i class="fa fa-times"></i> Annulla');
                            }
                            infowindow.close();
                            reloadMarkers();
                        });
                    } else {
                        reloadMarkers();
                    }
                });
            });

            $.ajax({
                url: "php/?controller=Links;getLinks",
                dataType: "json",
                context: this
            }).done(function(response) {
                $.each(response, function(key, value) {
                    var link = new google.maps.Polyline({
                        path: [
                            new google.maps.LatLng(value.lat1, value.lng1),
                            new google.maps.LatLng(value.lat2, value.lng2)
                        ],
                        strokeColor: "#0080c0",
                        strokeOpacity: 1.0,
                        strokeWeight: 5,
                        map: map
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: "<div style='width: 500px;'><table width='100%'><tr><td width='40%'><img src='../textures/" + value['panorama1'] + "' width='100%' height='auto'></td><td align='center'><i class='fa fa-long-arrow-left'></i><br><br><i class='fa fa-long-arrow-right'></i></td><td width='40%'><img src='../textures/" + value['panorama2'] + "' width='100%' height='auto'></td></tr></table></div><a target='_blank' href='?page=link-edit&id1=" + value['idcalling'] + "&id2=" + value['idcalled'] + "' class='btn btn-success' style='margin-top: 5px; padding: 3px 9px;'><i class='fa fa-edit'></i> Modifica</a>"
                    });
                    google.maps.event.addListener(link, 'click', function() {
                        infowindow.setPosition(new google.maps.LatLng(value.lat1, value.lng1));
                        infowindow.open(map);
                    });
                    links.push(link);
                });
            });

        }
    });


    $("#link-create").click(function() {
        if($(this).attr("mode") != 1) {
            $(this).attr("mode", 1);
            edit = true;
            $(this).html('<i class="fa fa-times"></i> Annulla');
        } else {
            if (firstlinkMarker.markerid != -1 && secondlinkMarker.markerid != -1) {
                location.href = "?page=link-create&id1=" + firstlinkMarker.markerid + "&id2=" + secondlinkMarker.markerid;
            } else {
                $(this).attr("mode", 0);
                $(this).html('<i class="fa fa-edit"></i> Aggiungi nuovo');
            }
            edit = false;
        }
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
