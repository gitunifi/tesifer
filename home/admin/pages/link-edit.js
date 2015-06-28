var angleBeforeTranBackward = 0;
var angleBeforeTranForward = 0;
var angleAfterTranBackward = 0;
var angleAfterTranForward = 0;
$(window).resize(function() {
    var left11 = angleBeforeTranForward * ($("#drag1-wrapper").width()-6) / 360;
    var left12 = angleAfterTranBackward * ($("#drag1-wrapper").width()-6) / 360;
    var left21 = angleAfterTranForward * ($("#drag2-wrapper").width()-6) / 360;
    var left22 = angleBeforeTranBackward * ($("#drag2-wrapper").width()-6) / 360;
    $("#drag11").css("left",  (left11-3) + "px");
    $("#drag12").css("left",  (left12-3) + "px");
    $("#drag21").css("left",  (left21-3) + "px");
    $("#drag22").css("left",  (left22-3) + "px");
});
$(document).ready(function() {
    $( "#drag11" ).draggable({ containment: "#drag1-wrapper", scroll: false, axis: "x",
        stop: function() {
            angleBeforeTranForward = (parseFloat($( "#drag11").css("left")) + 3) * 360 / ($("#drag1-wrapper").width()-6);
        }
    });
    $( "#drag12" ).draggable({ containment: "#drag1-wrapper", scroll: false, axis: "x",
        stop: function() {
            angleAfterTranBackward = (parseFloat($( "#drag12").css("left")) + 3) * 360 / ($("#drag1-wrapper").width()-6);
        }
    });
    $( "#drag21" ).draggable({ containment: "#drag2-wrapper", scroll: false, axis: "x",
        stop: function() {
            angleAfterTranForward = (parseFloat($( "#drag21").css("left")) + 3) * 360 / ($("#drag2-wrapper").width()-6);
        }
    });
    $( "#drag22" ).draggable({ containment: "#drag2-wrapper", scroll: false, axis: "x",
        stop: function() {
            angleBeforeTranBackward = (parseFloat($( "#drag22").css("left")) + 3) * 360 / ($("#drag2-wrapper").width()-6);
        }
    });
    $.ajax({
        url: "php/?controller=Links;getLink;" + $("#drag1-wrapper").attr("data-id") + "," + $("#drag2-wrapper").attr("data-id"),
        dataType: "json",
        context: this
    }).done(function(response) {
        if(response && response.forward && response.forward.panorama && response.backward && response.backward.panorama) {
            $("#drag1-wrapper").css("background-image", "url('../textures/" +  response.forward.panorama + "')").css("background-size", "100% 100%").css("background-repeat", "no-repeat");
            $("#drag2-wrapper").css("background-image", "url('../textures/" +  response.backward.panorama + "')").css("background-size", "100% 100%").css("background-repeat", "no-repeat");
            angleBeforeTranForward = response.forward.angle_before_tran;
            angleAfterTranForward = response.forward.angle_after_tran;
            angleBeforeTranBackward = response.backward.angle_before_tran;
            angleAfterTranBackward = response.backward.angle_after_tran;

            var left11 = angleBeforeTranForward * ($("#drag1-wrapper").width()-6) / 360;
            var left12 = angleAfterTranBackward * ($("#drag1-wrapper").width()-6) / 360;
            var left21 = angleAfterTranForward * ($("#drag2-wrapper").width()-6) / 360;
            var left22 = angleBeforeTranBackward * ($("#drag2-wrapper").width()-6) / 360;
            $(".panorama1").html(response.forward.panorama);
            $(".panorama2").html(response.backward.panorama);
            $("#drag11").css("left",  (left11-3) + "px");
            $("#drag12").css("left",  (left12-3) + "px");
            $("#drag21").css("left",  (left21-3) + "px");
            $("#drag22").css("left",  (left22-3) + "px");
        } else {
            alert("Si è verificato un errore");
        }
    });

    $("#link-save").click(function() {
        $.ajax({
            url: "php/?controller=Links;updateLink;" + $("#drag1-wrapper").attr("data-id") + "," + $("#drag2-wrapper").attr("data-id") + "," + angleBeforeTranForward + "," + angleAfterTranForward + "," + angleBeforeTranBackward + "," + angleAfterTranBackward,
            dataType: "json",
            context: this
        }).done(function(response) {
            location.reload();
        });
    });
});