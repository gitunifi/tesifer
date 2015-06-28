var lat = 0;
var lng = 0;
var markers = [];
var currentMarker = null;
var map;
var mapOptions;
var setMarker = false;

function calculateLink() {
    /*if (currentMarker != null) {
        var min = 0;
        var imin = -1;
        $.each(markers, function(index, value) {
            var distance = Math.sqrt(Math.pow(currentMarker.getPosition().lat() - value.getPosition().lat(), 2) + Math.pow(currentMarker.getPosition().lng() - value.getPosition().lng(), 2));
            console.log(distance);
            if (distance < min || imin == -1) {
                min = distance;
                imin = index;
            }
        });
        $.each(markers, function(index, value) {
            if (imin == index) {
                value.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
            } else {
                value.setIcon(null);
            }
        });
    }*/
}


function initialize() {
    $("#panorama-create").click(function() {
        if ($("#panorama-file").val() != "" && setMarker) {
            $("#lat-pos").val(currentMarker.getPosition().lat());
            $("#lng-pos").val(currentMarker.getPosition().lng());
            $("#panorama-form").submit();
        } else {
            alert("Selezionare un Panorama e le coordinate");
        }
    });

    $.ajax({
        url: "php/?controller=Panorama;getPanoramas",
        dataType: "json",
        context: this
    }).done(function(response) {
        if (response && response.length > 0) {
            lat = parseFloat(response[response.length-1]['lat']);
            lng = parseFloat(response[response.length-1]['lng']);
            mapOptions = {
                center: { lat: lat, lng: lng},
                zoom: 18
            };
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            currentMarker = new google.maps.Marker({
                draggable:true,
                icon: "images/marker_blue.png",
                title: "Nuovo panorama"
            });

            google.maps.event.addListener(currentMarker, 'dragend', function(e) {
                setMarker = true;
                calculateLink();
            });


            google.maps.event.addListener(map, 'click', function(e) {
                setMarker = true;
                currentMarker.setPosition(e.latLng);
                currentMarker.setMap(map);
                calculateLink();
            });


            $.each(response, function(key, value) {
                var marker =new google.maps.Marker({
                    position: new google.maps.LatLng(value['lat'],value['lng']),
                    map: map,
                    //icon: key == response.length-1 ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : null,
                    title: value['panorama']
                });
                markers.push(marker);

                var infowindow = new google.maps.InfoWindow({
                    content: "<div style='width: 500px;'><img src='../textures/" + value['panorama'] + "' width='100%' height='auto'></div>"
                });

                /*google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                    $("#panorama-remove" + value['id']).off('click').click(function() {
                        $modal = $("#panorama-modal");
                        $modal.find(".modal-body").attr("data-id", value['id']).find(".img-content").html("<img src='../textures/" + value['panorama'] + "' width='100%' height='auto'>");
                        $modal.find("#confirm-panorama-remove").off('click').click(function() {
                            $.ajax({
                                url: "php/?controller=Panorama;removePanorama;" + $modal.find(".modal-body").attr("data-id"),
                                dataType: "json",
                                context: this
                            }).done(function(response) {
                                if(response && response.success == true) {

                                } else {
                                    alert("Si è verificato un errore");
                                }
                            });
                        });
                        $modal.modal();

                    });
                });*/
            });



            /*google.maps.event.addListener(marker, 'dragend', function(e) {
             lat = e.latLng.lat();
             lng = e.latLng.lng();
             });*/
        }
    });
}
google.maps.event.addDomListener(window, 'load', initialize);