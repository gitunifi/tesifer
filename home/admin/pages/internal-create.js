$(function() {
    $("#internal-create").click(function() {
        if ($("#internal-file").val() != "") {
            $("#internal-form").submit();
        } else {
            alert("Selezionare un Panorama interno");
        }
    });
});