$(function() {
    $("#object-create").click(function() {
        if ($("#object-file").val() != "" && $("#object-file2").val() != "") {
            $("#object-form").submit();
        } else {
            alert("Selezionare un file .obj e un file .mtl");
        }
    });
});