$(function() {
    $.ajax({
        url: "php/?controller=Hotspots;getHotspots",
        dataType: "json",
        context: this
    }).done(function(response) {
        $.each(response, function(key, value) {
            $("#hotspot-container").append(' \
                <div class="col-lg-4 col-md-6"> \
                    <div class="panel panel-green" data-id="' + value["id"] + '"> \
                        <div class="remove-btn hide"><i class="fa fa-times"></i></div> \
                        <div class="panel-heading"> \
                            <div class="row"> \
                                <div class="col-xs-3"> \
                                    <i class="fa fa-cube fa-3x"></i> \
                                </div> \
                                <div class="col-xs-9 text-right"> \
                                    <h4 class="hotspot-subject">' + value["subject"] + '</h4> \
                                </div> \
                            </div> \
                        </div> \
                        <a target="_blank" href="?page=hotspot-detail&id=' + value["id"] + '"> \
                            <div class="panel-footer"> \
                                <span class="pull-left">Visualizza</span> \
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span> \
                                <div class="clearfix"></div> \
                            </div> \
                        </a> \
                    </div> \
                </div>');
        });
    });

    $("#hotspot-edit").click(function() {
        if($(this).attr("mode") != 1) {
            $(this).attr("mode", 1);
            $(this).html('<i class="fa fa-check"></i> Fine');
        } else {
            $(this).attr("mode", 0);
            $(this).html('<i class="fa fa-edit"></i> Modifica');
        }
        $("#hotspot-container .panel .remove-btn").toggleClass("hide");
        $("#hotspot-container .panel .remove-btn").click(function() {
            $modal = $("#hotspot-modal");
            $modal.find(".modal-header").attr("data-id", $(this).parent().attr("data-id")).find("#hotspot-remove-name").html($(this).parent().find(".hotspot-subject").html());
            $modal.find("#confirm-hotspot-remove").off('click').click(function() {
                $.ajax({
                    url: "php/?controller=Hotspots;removeHotspot;" + $modal.find(".modal-header").attr("data-id"),
                    dataType: "json",
                    context: this
                }).done(function(response) {
                    if(response && response.success == true) {
                        $(".panel[data-id='" + $("#hotspot-modal .modal-header").attr("data-id") + "']").parent().remove();
                    } else {
                        alert("Si è verificato un errore");
                    }
                    $("#hotspot-modal").modal('hide');
                });
            });
            $modal.modal();
        });
    });
});