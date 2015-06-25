$(function() {
    $.ajax({
        url: "php/?controller=Objects;getObjects",
        dataType: "json",
        context: this
    }).done(function(response) {
        $.each(response, function(key, value) {
            $("#object-container").append(' \
                <div class="col-lg-4 col-md-6"> \
                    <div class="panel panel-purple" data-id="' + value["id"] + '"> \
                        <div class="remove-btn hide"><i class="fa fa-times"></i></div> \
                        <div class="panel-heading"> \
                            <div class="row"> \
                                <div class="col-xs-3"> \
                                    <i class="fa fa-cube fa-3x"></i> \
                                </div> \
                                <div class="col-xs-9 text-right"> \
                                    <h4>' + value["object"] + '</h4> \
                                </div> \
                            </div> \
                        </div> \
                        <a target="_blank" href="../Object.html?id=' + value["id"] + '"> \
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

    $("#object-edit").click(function() {
        if($(this).attr("mode") != 1) {
            $(this).attr("mode", 1);
            $(this).html('<i class="fa fa-check"></i> Fine');
        } else {
            $(this).attr("mode", 0);
            $(this).html('<i class="fa fa-edit"></i> Modifica');
        }
        $("#object-container .panel .remove-btn").toggleClass("hide");
        $("#object-container .panel .remove-btn").click(function() {
            $.ajax({
                url: "php/?controller=Objects;removeObject;" + $(this).parent().attr("data-id"),
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