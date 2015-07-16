var currentColor = 0;
function getRandomColor() {
    var colors = ['blue', 'green', 'red', 'purple', 'gray', 'brown'];
    if (currentColor >= colors.length) currentColor = 0;
    currentColor++;
    return colors[currentColor-1];
}
$(document).ready(function() {
    $("#hotspot-add").click(function() {
        $("#hotspot-modal").modal();
    });

    $.ajax({
        url: "php/?controller=Panorama;getPanoramaHotspots;" + $("#drag1-wrapper").attr("data-id"),
        dataType: "json",
        context: this
    }).done(function(response) {
        if (response) {
            $.each(response, function(key, value) {
                if ($("#thumbnail-hotspot" + value['id']).size() == 0) {
                    var color = getRandomColor();
                    $("#hotspot-add").parent().before(' \
                    <div class="col-xs-6 col-md-3"> \
                        <div class="thumbnail" id="thumbnail-hotspot' + value['id'] + '" data-id="' + value['id'] + '" align="center" style="background-color: #f5f5f5; cursor: pointer;"> \
                            <div class="remove-btn"><i class="fa fa-times"></i></div> \
                            <h3 style="margin: 0px;"><i class="fa fa-certificate" style="color: ' + color + ';"></i> ' + value['subject'] + '</h3> \
                        </div> \
                    </div> \
                ');
                    $("#thumbnail-hotspot" + value['id'] + " .remove-btn").off('click').click(function (e) {
                        e.stopPropagation();
                        $.ajax({
                            url: "php/?controller=Panorama;removePanoramaHotspot;" + $("#drag1-wrapper").attr("data-id") + "," + $(this).parent().attr("data-id"),
                            dataType: "json",
                            context: this
                        }).done(function(response) {
                            if(response && response.success == true) {
                                $("#drag-hotspot" + $(this).parent().attr("data-id")).remove();
                                $(this).parent().parent().remove();
                            }
                        });
                    });

                    $("#drag1-wrapper").append(' \
                        <div id="drag-hotspot' + value['id'] + '" class="draggable drag-hotspot" data-id="' + value['id'] + '" align="center" style="position: absolute !important; display: inline-block; height: 50px; width: 50px; font-size: 50px; color: #0080c0; border: 0px solid; cursor: pointer;"><i class="fa fa-certificate" style="color: ' + color + ';"></i></div> \
                    ');

                    $("#drag-hotspot" + value['id']).draggable({ containment: "#drag1-wrapper", scroll: false });
                    $("#drag-hotspot" + value['id']).css("left", (parseInt(value['angolo']) * $("#drag1-wrapper").width() / 360) + "px");
                    $("#drag-hotspot" + value['id']).css("top", ((parseInt(value['angoloY'])+60) * $("#drag1-wrapper").height() / 120) + "px");
                }
            });
        }
    });


    $.ajax({
        url: "php/?controller=Hotspots;getHotspots",
        dataType: "json",
        context: this
    }).done(function(response) {
        $.each(response, function(key, value) {
            $("#hotspot-modal-container").append(' \
                <div class="col-lg-4 col-md-6"> \
                    <div class="panel panel-green"> \
                        <div class="panel-heading"> \
                            <div class="row"> \
                                <div class="col-xs-3"> \
                                    <i class="fa fa-cube fa-3x"></i> \
                                </div> \
                                <div class="col-xs-9 text-right"> \
                                    <h4>' + value["subject"] + '</h4> \
                                </div> \
                            </div> \
                        </div> \
                        <a data-id="' + value["id"] + '" data-title="' + value["subject"] +'"> \
                            <div class="panel-footer"> \
                                <span class="pull-left">Seleziona</span> \
                                <span class="pull-right"><i class="fa fa-check"></i></span> \
                                <div class="clearfix"></div> \
                            </div> \
                        </a> \
                    </div> \
                </div>');
        });
        $("#hotspot-modal-container a").click(function(e) {
            e.preventDefault();
            if ($("#thumbnail-hotspot" + $(this).attr("data-id")).size() == 0) {
                var color = getRandomColor();
                $("#hotspot-add").parent().before(' \
                    <div class="col-xs-6 col-md-3"> \
                        <div class="thumbnail" id="thumbnail-hotspot' + $(this).attr("data-id") + '" data-id="' + $(this).attr("data-id") + '" align="center" style="background-color: #f5f5f5; cursor: pointer;"> \
                            <div class="remove-btn"><i class="fa fa-times"></i></div> \
                            <h3 style="margin: 0px;"><i class="fa fa-certificate" style="color: ' + color + ';"></i> ' + $(this).attr("data-title") + '</h3> \
                        </div> \
                    </div> \
                ');
                $("#thumbnail-hotspot" + $(this).attr("data-id") + " .remove-btn").off('click').click(function (e) {
                    e.stopPropagation();
                    $.ajax({
                        url: "php/?controller=Panorama;removePanoramaHotspot;" + $("#drag1-wrapper").attr("data-id") + "," + $(this).parent().attr("data-id"),
                        dataType: "json",
                        context: this
                    }).done(function(response) {
                        if(response && response.success == true) {
                            $("#drag-hotspot" + $(this).parent().attr("data-id")).remove();
                            $(this).parent().parent().remove();
                        }
                    });

                });

                $("#drag1-wrapper").append(' \
                    <div id="drag-hotspot' + $(this).attr("data-id") + '" class="draggable drag-hotspot" data-id="' + $(this).attr("data-id") + '" align="center" style="position: absolute !important; display: inline-block; height: 50px; width: 50px; font-size: 50px; color: #0080c0; border: 0px solid; cursor: pointer;"><i class="fa fa-certificate" style="color: ' + color + ';"></i></div> \
                ');
                $("#drag-hotspot" + $(this).attr("data-id")).css("left", 0);
                $("#drag-hotspot" + $(this).attr("data-id")).css("top", 0);
                $("#drag-hotspot" + $(this).attr("data-id")).draggable({ containment: "#drag1-wrapper", scroll: false });
            }
            $("#hotspot-modal").modal('hide');
            return false;
        });
    });



    $.ajax({
        url: "php/?controller=Panorama;getPanorama;" + $("#drag1-wrapper").attr("data-id"),
        dataType: "json",
        context: this
    }).done(function(response) {
        if(response && response.panorama) {
            $("#drag1-wrapper").css("background-image", "url('../textures/" +  response.panorama + "')").css("background-size", "100% 100%").css("background-repeat", "no-repeat");
            $(".panorama1").html(response.panorama);
        } else {
            alert("Si è verificato un errore");
        }
    });

    $("#link-save").click(function() {
        $(".drag-hotspot").each(function(index, value) {
            var left = parseFloat($(this).css("left")) * 360 / ($("#drag1-wrapper").width());
            var top = (parseFloat($(this).css("top")) * 120 / ($("#drag1-wrapper").height())) - 60;
            $.ajax({
                url: "php/?controller=Panorama;addPanoramaHotspot;" + $("#drag1-wrapper").attr("data-id") + "," + $(this).attr("data-id") + "," + left + "," + top,
                dataType: "json",
                context: this
            }).done(function(response) {
                location.reload();
            });
        });
    });
});