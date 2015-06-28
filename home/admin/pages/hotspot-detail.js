$(function() {
    $("#gallery-add").click(function() {
        $("#gallery-modal").modal();
    });
    $("#object-add").click(function() {
        $("#object-modal").modal();
    });
    $("#document-add").click(function() {
        $("#document-modal").modal();
    });
    $("#internal-add").click(function() {
        $("#internal-modal").modal();
    });

    var galleryid = "";
    var documentid = "";
    var objectid = "";
    var internalid = "";

    $.ajax({
        url: "php/?controller=Hotspots;getHotspot;" + $("#hotspot-container").attr("data-id"),
        dataType: "json",
        context: this
    }).done(function(hotspot) {
        if (hotspot) {
            if (hotspot.info && hotspot.info.subject) {
                $("#hotspot-name").val(hotspot.info.subject);
                $("#hotspot-title").html(hotspot.info.subject);
            }

            if (hotspot.detail && hotspot.detail.length > 0) {
                $.each(hotspot.detail, function(key, value) {
                    if (value["subject"] == "Gallery") galleryid = value["id"];
                    else if (value["subject"] == "Object") objectid = value["id"];
                    else if (value["subject"] == "PDF") documentid = value["id"];
                    else if (value["subject"] == "Panorama") internalid = value["id"];
                });
            }
        }
        $.ajax({
            url: "php/?controller=Gallery;getGallery",
            dataType: "json",
            context: this
        }).done(function (response) {
            $.each(response, function (key, value) {
                var text = "nessun immagine";
                if (value["numero"] == 1) text = "1 immagine";
                else if (value["numero"] > 1) text = value["numero"] + " immagini";
                $("#gallery-modal-container").append(' \
                    <div class="col-lg-4 col-md-6"> \
                        <div class="panel panel-green"> \
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
                            <a data-id="' + value["idgallery"] + '"> \
                                <div class="panel-footer"> \
                                    <span class="pull-left">Seleziona</span> \
                                    <span class="pull-right"><i class="fa fa-check"></i></span> \
                                    <div class="clearfix"></div> \
                                </div> \
                            </a> \
                        </div> \
                    </div>');

                if (value["idgallery"] == galleryid) {
                    $("#gallery-add").attr("data-id", galleryid).find("h3").html("Galleria " + galleryid);
                    $("#gallery-add .remove-btn").removeClass("hide");
                    $("#gallery-add .remove-btn").off('click').click(function (e) {
                        e.stopPropagation();
                        $(this).addClass("hide");
                        $(this).parent().attr("data-id", "");
                        $(this).parent().find("h3").html('<i class="fa fa-plus"></i> Galleria');
                    });
                    $("#gallery-modal").modal('hide');
                }
            });
            $("#gallery-modal-container a").click(function (e) {
                e.preventDefault();
                $("#gallery-add").attr("data-id", $(this).attr("data-id")).find("h3").html("Galleria " + $(this).attr("data-id"));
                $("#gallery-add .remove-btn").removeClass("hide");
                $("#gallery-add .remove-btn").off('click').click(function (e) {
                    e.stopPropagation();
                    $(this).addClass("hide");
                    $(this).parent().attr("data-id", "");
                    $(this).parent().find("h3").html('<i class="fa fa-plus"></i> Galleria');
                });
                $("#gallery-modal").modal('hide');
                return false;
            });
        });

        $.ajax({
            url: "php/?controller=Objects;getObjects",
            dataType: "json",
            context: this
        }).done(function (response) {
            $.each(response, function (key, value) {
                $("#object-modal-container").append(' \
                    <div class="col-lg-4 col-md-6"> \
                        <div class="panel panel-purple"> \
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
                            <a data-id="' + value["id"] + '" data-title="' + value["object"] + '"> \
                                <div class="panel-footer"> \
                                    <span class="pull-left">Seleziona</span> \
                                    <span class="pull-right"><i class="fa fa-check"></i></span> \
                                    <div class="clearfix"></div> \
                                </div> \
                            </a> \
                        </div> \
                    </div>');
                if (value["id"] == objectid) {
                    $("#object-add").attr("data-id", objectid).find("h3").html(value["object"]);
                    $("#object-add .remove-btn").removeClass("hide");
                    $("#object-add .remove-btn").off('click').click(function (e) {
                        e.stopPropagation();
                        $(this).addClass("hide");
                        $(this).parent().attr("data-id", "");
                        $(this).parent().find("h3").html('<i class="fa fa-plus"></i> Oggetto');
                    });
                    $("#object-modal").modal('hide');
                }
            });
            $("#object-modal-container a").click(function (e) {
                e.preventDefault();
                $("#object-add").attr("data-id", $(this).attr("data-id")).find("h3").html($(this).attr("data-title"));
                $("#object-add .remove-btn").removeClass("hide");
                $("#object-add .remove-btn").off('click').click(function (e) {
                    e.stopPropagation();
                    $(this).addClass("hide");
                    $(this).parent().attr("data-id", "");
                    $(this).parent().find("h3").html('<i class="fa fa-plus"></i> Oggetto');
                });
                $("#object-modal").modal('hide');
                return false;
            });
        });

        $.ajax({
            url: "php/?controller=Documents;getDocuments",
            dataType: "json",
            context: this
        }).done(function (response) {
            $.each(response, function (key, value) {
                $("#document-modal-container").append(' \
                    <div class="col-lg-4 col-md-6"> \
                        <div class="panel panel-red"> \
                            <div class="panel-heading"> \
                                <div class="row"> \
                                    <div class="col-xs-3"> \
                                        <i class="fa fa-file-pdf-0 fa-3x"></i> \
                                    </div> \
                                    <div class="col-xs-9 text-right"> \
                                        <h4>' + value["source"] + '</h4> \
                                    </div> \
                                </div> \
                            </div> \
                            <a data-id="' + value["id"] + '" data-title="' + value["source"] + '"> \
                                <div class="panel-footer"> \
                                    <span class="pull-left">Seleziona</span> \
                                    <span class="pull-right"><i class="fa fa-check"></i></span> \
                                    <div class="clearfix"></div> \
                                </div> \
                            </a> \
                        </div> \
                    </div>');
                if (value["id"] == documentid) {
                    $("#document-add").attr("data-id", documentid).find("h3").html(value["source"]);
                    $("#document-add .remove-btn").removeClass("hide");
                    $("#document-add .remove-btn").off('click').click(function (e) {
                        e.stopPropagation();
                        $(this).addClass("hide");
                        $(this).parent().attr("data-id", "");
                        $(this).parent().find("h3").html('<i class="fa fa-plus"></i> Documento');
                    });
                    $("#document-modal").modal('hide');
                }
            });
            $("#document-modal-container a").click(function (e) {
                e.preventDefault();
                $("#document-add").attr("data-id", $(this).attr("data-id")).find("h3").html($(this).attr("data-title"));
                $("#document-add .remove-btn").removeClass("hide");
                $("#document-add .remove-btn").off('click').click(function (e) {
                    e.stopPropagation();
                    $(this).addClass("hide");
                    $(this).parent().attr("data-id", "");
                    $(this).parent().find("h3").html('<i class="fa fa-plus"></i> Documento');
                });
                $("#document-modal").modal('hide');
                return false;
            });
        });

        $.ajax({
            url: "php/?controller=Internal;getInternals",
            dataType: "json",
            context: this
        }).done(function(response) {
            $.each(response, function(key, value) {
                $("#internal-modal-container").append(' \
                <div class="col-lg-4 col-md-6"> \
                    <div class="panel panel-brown"> \
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
                        <a data-id="' + value["id"] + '" data-title="' + value["panorama"] +'"> \
                            <div class="panel-footer"> \
                                <span class="pull-left">Seleziona</span> \
                                <span class="pull-right"><i class="fa fa-check"></i></span> \
                                <div class="clearfix"></div> \
                            </div> \
                        </a> \
                    </div> \
                </div>');

                if (value["id"] == internalid) {
                    $("#internal-add").attr("data-id", internalid).find("h3").html(value["panorama"]);
                    $("#internal-add .remove-btn").removeClass("hide");
                    $("#internal-add .remove-btn").off('click').click(function (e) {
                        e.stopPropagation();
                        $(this).addClass("hide");
                        $(this).parent().attr("data-id", "");
                        $(this).parent().find("h3").html('<i class="fa fa-plus"></i> Interno');
                    });
                    $("#internal-modal").modal('hide');
                }
            });
            $("#internal-modal-container a").click(function(e) {
                e.preventDefault();
                $("#internal-add").attr("data-id", $(this).attr("data-id")).find("h3").html($(this).attr("data-title"));
                $("#internal-add .remove-btn").removeClass("hide");
                $("#internal-add .remove-btn").off('click').click(function(e) {
                    e.stopPropagation();
                    $(this).addClass("hide");
                    $(this).parent().attr("data-id", "");
                    $(this).parent().find("h3").html('<i class="fa fa-plus"></i> Interno');
                });
                $("#internal-modal").modal('hide');
                return false;
            });
        });

        $("#update-hotspot").click(function () {
            if ($("#hotspot-name").val().trim() != "") {
                var title = $("#hotspot-name").val().trim();
                var galleryid = $("#gallery-add").attr("data-id");
                var objectid = $("#object-add").attr("data-id");
                var documentid = $("#document-add").attr("data-id");
                var internalid = $("#internal-add").attr("data-id");
                $.ajax({
                    url: "php/?controller=Hotspots;updateHotspot;" + $("#hotspot-container").attr("data-id"),
                    dataType: "json",
                    context: this,
                    type: "POST",
                    data: "title=" + title + "&gallery=" + galleryid + "&object=" + objectid + "&document=" + documentid + "&internal=" + internalid
                }).done(function (response) {
                    if (response && response.success == true) {
                        location.href = "?page=hotspot";
                    } else {
                        alert("Si è verificato un errore");
                    }
                });
            }
        });
    });
});