<script src="components/jquery/dist/jquery.min.js"></script>
<div id="popUpLogin" class="popUp">
    <div id="formAutenticazione" class="formAutenticazione">
        <h3>Effettua il login</h3>
        <form method="post" id="formLogin" class="formLogin" onsubmit="login();return false;">
            <input type="hidden" value="login" name="action">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" name="username" placeholder="Inserisci il tuo Username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Inserisci la password">
            </div>
            <p style="display: none;" class="bg-danger errLogin">Password o Username errati!</p>
            <input id="btnLogin" class="btn btn-primary btn-lg btn-block btnLogin" type="submit" value="Login">
        </form>
    </div>
</div>

<script>
    function login(){
        if($("#username").val().trim() != "" && $("#password").val().trim() != ""){
            $.post( "index.php", {username: $("#username").val(), password: $("#password").val()},function( ok ) {
                if(ok == "false"){
                    $(".errLogin").css({"display":"inherit"});
                    setTimeout(function() {$(".errLogin").hide();}, 6000);
                } else {
                   // location.href = "index.php";
                }
            }, "json");
        } else {
            $(".errLogin").css({"display":"inherit"});
            setTimeout(function() {$(".errLogin").hide();}, 6000);
        }
    }
</script>