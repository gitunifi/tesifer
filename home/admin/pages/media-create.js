$(function() {
    $("#media-create").click(function() {
        if ($("#media-file").val() != "") {
            $("#media-form").submit();
        } else {
            alert("Selezionare un' immagine da caricare");
        }
    });
});