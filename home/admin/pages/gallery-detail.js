$(function() {
    //var grid = new DataTablesGrid("grid");
    //grid.load("php/?controller=Gallery;getData");
    $.ajax({
        url: "php/?controller=Gallery;getGalleryDetail;" + $("#gallery-container").attr("data-id"),
        dataType: "json",
        context: this
    }).done(function(response) {
        $.each(response, function(key, value) {
            $("#gallery-container").append(' \
                <div class="col-lg-3 col-md-3"> \
                    <div class="media" data-id="' + value["id"] + '"> \
                        <img src="../objects/' + value["thumbnail"] + '" data-img="../objects/' + value["source"] + '" style="cursor: pointer; width: 100%;" /> \
                    </div> \
                </div>');
        });
        $("#gallery-container img").click(function() {
            $("#gallery-modal .modal-body").html("<img src='" + $(this).attr("data-img") + "' style='max-height: 100%; max-width: 100%;'>");
            $("#gallery-modal").modal();
        });
        $("#edit-gallery").click(function() {
            if($(this).attr("mode") != 1) {
                $(this).attr("mode", 1);
                $(this).html('<i class="fa fa-check"></i> Fine');
            } else {
                $(this).attr("mode", 0);
                $(this).html('<i class="fa fa-edit"></i> Modifica');
            }
            $("#gallery-container .media").toggleClass("remove");
            $("#gallery-container .media.remove").click(function() {
                $.ajax({
                    url: "php/?controller=Gallery;removeMedia;" + $("#gallery-container").attr("data-id") + "," + $(this).attr("data-id"),
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
});