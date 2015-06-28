$(function() {
    //var grid = new DataTablesGrid("grid");
    //grid.load("php/?controller=Gallery;getData");
    $.ajax({
        url: "php/?controller=Gallery;getGallery",
        dataType: "json",
        context: this
    }).done(function(response) {
        $.each(response, function(key, value) {
            var text = "nessun immagine";
            if (value["numero"] == 1) text = "1 immagine";
            else if (value["numero"] > 1) text = value["numero"] + " immagini";
            $("#gallery-container").append(' \
                <div class="col-lg-4 col-md-6"> \
                    <div class="panel panel-yellow"> \
                        <div class="panel-heading"> \
                            <div class="row"> \
                                <div class="col-xs-3"> \
                                    <i class="fa fa-picture-o fa-3x"></i> \
                                </div> \
                                <div class="col-xs-9 text-right"> \
                                    <h4>Galleria ' + value["idgallery"] + ' (' + text + ') </h4> \
                                </div> \
                            </div> \
                        </div> \
                        <a href="?page=gallery-detail&id=' + value["idgallery"] + '"> \
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
});