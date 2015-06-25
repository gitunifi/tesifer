var lat = 0;
var lng = 0;
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
                zoom: 18
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            $.each(response, function(key, value) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(value['lat'],value['lng']),
                    map: map,
                    draggable:true,
                    icon: key == response.length-1 ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" : null,
                    title: 'Ultimo panorama inserito'
                });

                var infowindow = new google.maps.InfoWindow({
                    content: "<div style='width: 500px;'><img src='../textures/" + value['panorama'] + "' width='100%' height='auto'></div><a href='?page=panorama-edit&id=" + value['id'] + "' class='btn btn-success' style='margin-top: 5px; padding: 3px 9px;'><i class='fa fa-edit'></i> Modifica</a> <button type='button' data-id='" + value['id'] + "' id='panorama-remove" + value['id'] + "' class= 'btn btn-danger' style='margin-top: 5px; padding: 3px 9px;'><i class='fa fa-trash'></i> Elimina</button>"
                });

                google.maps.event.addListener(marker, 'click', function() {
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
                });
            });



            /*google.maps.event.addListener(marker, 'dragend', function(e) {
                lat = e.latLng.lat();
                lng = e.latLng.lng();
            });*/
        }
    });
}
google.maps.event.addDomListener(window, 'load', initialize);