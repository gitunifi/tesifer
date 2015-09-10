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
                if(ok == false){
                    $(".errLogin").css({"display":"inherit"});
                    setTimeout(function() {$(".errLogin").hide();}, 6000);
                } else {
                    location.href = "index.php";
                }
            }, "json");
        } else {
            $(".errLogin").css({"display":"inherit"});
            setTimeout(function() {$(".errLogin").hide();}, 6000);
        }
    }
</script>
<style>
    body {
        padding-top: 0px;
        background-color: white !important;
        font-family: Helvetica Neue, Segoe UI;
        font-weight: 200;
    }

    .navbar-nav>li>a {
        line-height: 20px;
        padding: 5px 8px;
    }

    #content {
        padding: 0px;
    }

    #frame {
        border: 0px solid;
    }

    .navbar-nav.navbar-right:last-child { margin-right: 0px !important; }

    .dropdown-toggle {
        height: 30px;

    }

    .dropdown-toggle span {
        margin-top: 7px;
    }

    #sublinks {
        margin: 0px;
    }

    #sublinks a {
        border-radius: 0px;
    }

    #sublinks .btn-group {
        margin-bottom: 0px !important;
    }

    #header {
        width: 120px;
        margin-bottom: 0px;
        min-height: 44px;
    }

    .sidebar {
        width: 265px;
        padding: 0px;
        background: rgb(110,128,140);
    }

    .content {
        margin-left: 120px;
    }

    .sidebar h3, .sidebar .form-group{
        padding: 10px;
        color: white;
        font-weight: 300;
    }
    .sidebar .nav > li > a i{font-size: 16px;}
    .sidebar .nav>li>a {
        padding: 6px 6px;
        color: #FFFFFF;
        font-size: 16px;
        padding: 10px;
    }
    .sidebar .nav>li>a:hover, .sidebar .nav>li>a:focus{
        background: rgb(86,154,249);
        border-radius: 3px;
        color: #FFFFFF;
    }

    .btn {
        padding: 4px 6px;
    }

    .logo {
        position: absolute;
        width: 100%;
        z-index: 100;
    }

    .logo h2{
        font-weight: 100;
        color: white;
        background-color: rgb(86,154,249);
        padding: 20px;
        text-align: center;
        margin-top: 0px;
    }

    .corpo{
        /*position: fixed;*/
        /*left: 265px;*/
        /*bottom: 0px;*/
        /*top: 0px;*/
        /*right: 0px;*/
        margin-left: 265px;
    }

    .messaggio{
        width: 80%;
        margin: auto;
        border: 1px solid;
        border-color: rgb(86,154,249);
        border-radius: 7px;
        margin-top: 1%;
    }

    .messaggio h2{
        margin: 0px;
        font-weight: 200;
        color: rgb(86,154,249);
        text-align: center;
        background-color: rgba(86, 154, 249, 0.1);
        padding: 15px;
    }

    .formAutenticazione, .formModificaCopertina{
        border: 1px solid;
        border-color: rgb(86,154,249);
        border-radius: 7px;
        position: absolute;
        width: 450px;
        top: 22%;
        left: 50%;
        margin: 0 0 0 -225px;
        background-color: white;
    }

    .formModificaCopertina{top: 15%;}

    .popUp{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,0.7);
        z-index: 100;
    }

    .formAggiunta{
        margin: auto;
        border: 1px solid;
        border-color: rgb(86,154,249);
        border-radius: 7px;
        margin-top: 1%;
    }

    #formAggiuntaTemplate, #formAggiuntaLista {
        max-width: 98%;
        width: 885px;
    }
    #formAggiuntaNewsletter{
        width: 650px;
        max-width: 98%;
    }

    .formAggiunta .title, .liste .titoloTab h3, .formAutenticazione h3, .modal-header, .box .title{
        margin: 0px;
        font-weight: 200;
        color: rgb(86,154,249);
        text-align: center;
        background-color: rgba(86, 154, 249, 0.1);
        padding: 15px;
        border-bottom: 1px solid;
        border-color: rgb(226,227,228);
    }

    .modal-title{
        font-weight: 200;
        color: rgb(86,154,249);
    }

    .formAggiunta form, .formAggiuntaCategoria form, .formAutenticazione form, .box .corpoBox{padding: 15px;}

    .btn.btn-primary{
        background: rgb(86,154,249);
        border-color: rgb(86,154,249);
    }

    .btn.btn-success {
        background: #56DB56;
        border-color: #56DB56;
    }

    .btn-primary:hover{
        background: rgba(86, 154, 249, 0.8);
        border-color: rgba(86, 154, 249, 0.8);
    }

    .btn.btn-success:hover {
        background: rgba(84, 215, 85, 0.74);
        border-color: rgba(84, 215, 85, 0.74);
    }

    .bg-danger{
        padding: 7px;
        margin-top: 10px;
        border-radius: 3px;
        border: 1px solid;
        border-color: rgba(255, 0, 0, 0.4);
        background-color: rgba(255, 0, 0, 0.06);
        color: rgba(255, 0, 0, 0.4);
        font-weight: 500;
        text-align: center;
    }

    .bg-success{
        padding: 7px;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 3px;
        border: 1px solid;
        border-color: rgba(40, 219, 40, 1);
        background-color: rgba(28, 184, 28, 0.13);
        color: rgba(40, 219, 40, 1);
        font-weight: 400;
        text-align: center;
        width: 80%;
        /*min-width: 500px;*/
    }

    #progressbox {
        border: 1px solid #0099CC;
        padding: 1px;
        position:relative;
        /*width:400px;*/
        border-radius: 3px;
        /*margin: 10px;*/
        /*display:none;*/
        text-align:left;
    }
    #progressbar {
        height:20px;
        border-radius: 3px;
        background-color: rgb(86,154,249);
        width:1%;
    }
    #statustxt {
        top:3px;
        left:50%;
        position:absolute;
        display:inline-block;
        color: #000000;
    }

    .linkHome:hover{text-decoration: none;}

    .categorieTop, .homeBox {
        margin: auto;
        width: 100%;
        display: inline-block;
    }

    .categoriaTop, .boxHome{
        width: 300px;
        margin: auto;
        float: left;
        text-align: center;
        border: 1px solid;
        border-color: rgb(86,154,249);
        border-radius: 7px;
        margin-left: 10px;
        margin-top: 40px;
        margin-right: 10px;
    }

    .categoriaTop .title, .boxHome .title{
        background-color: rgba(86, 154, 249, 0.1);
        padding: 10px;
        border-bottom: 1px solid;
        border-color: rgb(226,227,228);
    }
    .categoriaTop .title h3, .boxHome .title h3{
        margin: 0px;
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 200;
        color: rgb(86,154,249);
        text-align: center;
        font-size: 20px;
    }

    .imgBook {
        width: 70px;
        margin-top: -45px;
    }

    .btnVisualizzaCateg, .boxHome .btn{
        margin: 10px;
        width: 278px !important;
    }

    .categoriaTop label, .boxHome label{
        font-weight: 200;
        margin: 0px;
        margin-top: 10px;
    }

    .liste, .box{
        /*width: 750px;
        max-width: 98%;*/
        width: 98%;
        margin: auto;
        border: 1px solid;
        border-color: rgb(86,154,249);
        border-radius: 7px;
        margin-top: 1%;
    }

    /*#listaNewsletter{ width: 1160px; }*/
    .listeUtenti{ /*min-width: 1000px;*/ margin-bottom: 1%;}

    .liste table{
        width: 100%;
    }
    .liste table td{
        text-align: center;
        padding: 10px;
        font-weight: 200;
    }

    .liste table .listaTitoli{
        border-bottom: 1px solid;
        border-color: rgb(238, 238, 238);
        background-color: rgb(238, 238, 238);
    }

    .liste table .listaTitoli td{
        font-weight: 400;
    }

    .imgTable{width: 25px;}

    .divCentratore, .dettaglioCentratore {
        max-width: 960px;
        margin: auto;
        display: flex;
    }
    .homeCentratore{ max-width: 640px; margin: auto; display: block;}

    .dettaglioCentratore{max-width: 90%;}

    @media only screen and (max-width: 1225px) {
        .divCentratore{ max-width: 640px; margin: auto; }
    }
    @media only screen and (max-width: 905px) {
        .divCentratore{ max-width: 310px; margin: auto; }
    }

    hr{margin:20px;}

    #menuLeft{width: 90% !important; margin: auto !important;}

    #visualizzaButton, #deleteButton{
        background: none;
        border: none;
    }
    .modal-dialog{ max-width: 98%; }
    #visualizzaDialog{ width: 890px; }
    #impUtentiDialog{ width: 550px; }

    .btn-small{
        background-color: white !important;
        color: rgb(112, 116, 120) !important;
        height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        border-color: rgb(232, 232, 232) !important;
    }

    .note-help{ display: none; }

    .note-style .btn-small, .note-fontname .btn-small, .note-fontsize .btn-small, .note-height .btn-small, .note-table .btn-small, .note-help .btn-small{ border-radius: 6px !important; }
    .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle){ border-top-left-radius: 6px !important; border-bottom-left-radius: 6px !important; }
    .btn-group>.btn:last-child:not(:first-child), .btn-group>.dropdown-toggle:not(:first-child), .btn-group>.btn-group:last-child>.btn:first-child{ border-top-right-radius: 6px !important; border-bottom-right-radius: 6px !important; }

    .caret{margin: 0px !important;}

    .note-editor {
        border: 1px solid #E2E7EB !important;
        border-radius: 3px !important;
    }

    .note-editor .note-toolbar, .note-editor .note-statusbar .note-resizebar {
        border-color: #E2E7EB !important;
    }

    /*.update, .opzioni, .stato, .template {
      width: 500px;
      max-width: 98%;
      float: left;
    }

    .stato, .template{width: 300px;}

    .opzioni, .update{
      margin-left: 1%;
    }*/

    .contenutoTable{
        max-height: 85%;
        overflow: auto;
    }

    .progressBarDiv{
        height: 40px;
        width: 80%;
        margin: auto;
        border: 1px solid;
        border-color: rgb(86,154,249);
        border-radius: 7px;
        padding: 3px;
    }

    .progressBar{
        height: 100%;
        width: 1%;
        background-color: rgb(86, 154, 249);
        border-radius: 7px;
    }

    .testoProgress{
        position: absolute;
        z-index: 2;
        margin-top: 5px;
        text-align: center;
        font-size: 16px;
    }

    .labelProgressBar{
        width: 80%;
        margin: auto;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .spinner, .spinner-small {
        border-top: 2px solid #569AF9 !important;
    }

    #page-loader {
        background-color: rgba(0,0,0,0.7) !important;
        z-index: 100 !important;
    }

    .btn .fa{
        float: left;
        margin: 2px;
    }

    .stato .corpoBox{ font-size: 15px; }
    .stato .corpoBox hr{
        margin: 0px;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    b{font-weight: 400;}

    /*.statoTemplate{
        width: 300px;
        margin: auto;
        margin-top: 1%;
        margin-left: 1%;
    }*/
    /*.stato, .template{margin: 0px}*/

    .confermaDialog{ width: 435px; }

    .confermaDialog h4{
        font-size: 18px;
        text-align: center;
        font-weight: 300;
    }

    .confermaDialog .btnConf{
        width: 48%;
    }

    .cursor{cursor: pointer;}

    .dropdown-toggle span {
        margin-top: 7px !important;
    }

    .testQuery {
        color: #fff !important;
        background: #f59c1a;
        border-color: #f59c1a;
    }

    .testQuery:hover {
        background: #c47d15;
        border-color: #c47d15;
    }

    .testQueryDialog{ width: 80%; }

    .logoutNav{ margin-top: 40px !important; }

    .dettagliOpzioni{
        max-width: 98%;
        margin: auto;
        border: 1px solid rgb(86,154,249);
        margin-top: 1%;
        border-radius: 7px;
        height: 483px;
    }

    .stato-template, .info{
        border-right: 1px solid rgb(86,154,249);
        padding: 0px !important;
    }

    .stato-template, .info, .opzioni{
        padding: 0px !important;
    }

    .info .formAggiunta .title, .opzioni .box .title{ padding: 10px; }

    .stato-template, .info, .opzioni {
        height: 100%;
    }

    .stato, .template{
        margin: 0px !important;
        border: none;
        width: 100%;
    }
    .template{
        border-top: 1px solid;
        border-radius: 0px;
        border-color: #569AF9;
    }
    .info .formAggiunta, .opzioni .box {
        width: 100%;
        border: none;
        padding: 0px;
        margin: 0px;
    }

    .pulsantiAggiuntivi{
        margin-bottom: 5px;
        height: 30px;
    }
    .pulsantiAggiuntivi .btn {
        width: 180px;
        float: right;
    }

    .listaModal {
        border: none;
        margin: 0px;
    }
</style>