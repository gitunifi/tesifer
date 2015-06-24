$(function() {
    $.ajax({
        url: "php/?controller=Documents;getDocuments",
        dataType: "json",
        context: this
    }).done(function(response) {
        $.each(response, function(key, value) {
            $("#document-container").append(' \
                <div class="col-lg-4 col-md-6"> \
                    <div class="panel panel-red" data-id="' + value["id"] + '"> \
                        <div class="panel-heading"> \
                            <div class="row"> \
                                <div class="col-xs-3"> \
                                    <i class="fa fa-file-pdf-o fa-3x"></i> \
                                </div> \
                                <div class="col-xs-9 text-right"> \
                                    <h4>' + value["source"] + '</h4> \
                                </div> \
                            </div> \
                        </div> \
                        <a target="_blank" href="../pdf/web/viewer.html?id=' + value["source"] + '"> \
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

    $("#document-edit").click(function() {
        if($(this).attr("mode") != 1) {
            $(this).attr("mode", 1);
            $(this).html('<i class="fa fa-check"></i> Fine');
        } else {
            $(this).attr("mode", 0);
            $(this).html('<i class="fa fa-edit"></i> Modifica');
        }
        $("#document-container .panel").toggleClass("remove");
        $("#document-container .panel.remove").click(function() {
            $.ajax({
                url: "php/?controller=Documents;removeDocument;" + $(this).attr("data-id"),
                dataType: "json",
                context: this
            }).done(function(response) {
                if(response && response.success == true) {
                    $(this).parent().remove();
                } else {
                    alert("Si è verificato un errore");
                }
            });
        });
    });
});