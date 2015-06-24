$(function() {
    $("#document-create").click(function() {
        if ($("#document-file").val() != "") {
            $("#document-form").submit();
        } else {
           alert("Selezionare un documento");
        }
    });
});