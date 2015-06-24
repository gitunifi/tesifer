$(function() {
    //var grid = new DataTablesGrid("grid");
    //grid.load("php/?controller=Gallery;getData");
    $.ajax({
        url: "php/?controller=Gallery;getMediaExcept;" + $("#gallery-container").attr("data-id"),
        dataType: "json",
        context: this
    }).done(function(response) {
        $.each(response, function(key, value) {
            $("#gallery-container").append(' \
                <div class="col-lg-3 col-md-3"> \
                    <div class="media" data-id="' + value["id"] + '"> \
                        <img src="../objects/' + value["thumbnail"] + '" data-img="../objects/' + value["source"] + '" style="cursor: pointer; width: 100%;" /> \
                    </div>    \
                </div>');
        });
        $("#gallery-container .media").click(function() {
            $(this).toggleClass("checked");
        });
    });

    $("#create-gallery").click(function() {
        var ids = [];
        $("#gallery-container .media.checked").each(function(key, value) {
            ids.push($(this).attr("data-id"));
        });
        if (ids.length > 0) {
            $.ajax({
                url: "php/?controller=Gallery;updateGallery;" + $("#gallery-container").attr("data-id"),
                dataType: "json",
                context: this,
                type: "POST",
                data: "ids=" + ids.join()
            }).done(function(response) {
                if(response && response.success == true) {
                    location.href = "?page=galleria";
                } else {
                    alert("Si è verificato un errore");
                }
            });
        } else {
            alert("Seleziona almeno un immagine");
        }
    });
});