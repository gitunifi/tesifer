$(function() {
    $.ajax({
        url: "php/?controller=Internal;getInternals",
        dataType: "json",
        context: this
    }).done(function(response) {
        $.each(response, function(key, value) {
            $("#internal-container").append(' \
                <div class="col-lg-4 col-md-6"> \
                    <div class="panel panel-brown" data-id="' + value["id"] + '"> \
                        <div class="remove-btn hide"><i class="fa fa-times"></i></div> \
                        <div class="panel-heading"> \
                            <div class="row"> \
                                <div class="col-xs-3"> \
                                    <i class="fa fa-globe fa-3x"></i> \
                                </div> \
                                <div class="col-xs-9 text-right"> \
                                    <h4>' + value["panorama"] + '</h4> \
                                </div> \
                            </div> \
                        </div> \
                        <a target="_blank" href="../Alonepano.html?id=' + value["id"] + '"> \
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

    $("#internal-edit").click(function() {
        if($(this).attr("mode") != 1) {
            $(this).attr("mode", 1);
            $(this).html('<i class="fa fa-check"></i> Fine');
        } else {
            $(this).attr("mode", 0);
            $(this).html('<i class="fa fa-edit"></i> Modifica');
        }
        $("#internal-container .panel .remove-btn").toggleClass("hide");
        $("#internal-container .panel .remove-btn").click(function() {
            $.ajax({
                url: "php/?controller=Internal;removeInternal;" + $(this).parent().attr("data-id"),
                dataType: "json",
                context: this
            }).done(function(response) {
                if(response && response.success == true) {
                    $(this).parent().parent().remove();
                } else {
                    alert("Si è verificato un errore");
                }
            });
        });
    });
});