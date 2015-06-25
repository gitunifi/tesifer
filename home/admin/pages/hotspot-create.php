<div id="gallery-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=hotspot">Punti di interesse</a> / Crea punto <button type="button" id="create-hotspot" class="btn btn-success" style="float:right"><i class="fa fa-check"></i> Crea</button>
            <br><small style="font-size: 16px; margin-top: 5px;">Inserisci un titolo e seleziona i vari componenti del punto di interese</small>
        </h1>
    </div>
    <div class="col-xs-12">
        <label>Titolo punto di interesse</label><br>
        <input type="text" id="hotspot-name" size="200" style="width: 400px;"/>
    </div>
    <div class="col-xs-12">
        <div style="margin-bottom: 5px;"><b>Composizione</b></div>
    </div>
    <div class="col-xs-6 col-md-3">
        <div id="gallery-add" class="thumbnail" align="center" style="background-color: #f5f5f5; cursor: pointer;">
            <div class="remove-btn hide"><i class="fa fa-times"></i></div>
            <h3 style="margin: 0px;"><i class="fa fa-plus"></i> Galleria</h3>
        </div>
    </div>
    <div class="col-xs-6 col-md-3">
        <div id="object-add" class="thumbnail" align="center" style="background-color: #f5f5f5; cursor: pointer;">
            <div class="remove-btn hide"><i class="fa fa-times"></i></div>
            <h3 style="margin: 0px;"><i class="fa fa-plus"></i> Oggetto</h3>
        </div>
    </div>
    <div class="col-xs-6 col-md-3">
        <div id="document-add" class="thumbnail" align="center" style="background-color: #f5f5f5; cursor: pointer;">
            <div class="remove-btn hide"><i class="fa fa-times"></i></div>
            <h3 style="margin: 0px;"><i class="fa fa-plus"></i> Documento</h3>
        </div>
    </div>
    <div class="col-xs-6 col-md-3">
        <div id="panorama-add" class="thumbnail" align="center" style="background-color: #f5f5f5; cursor: pointer;">
            <div class="remove-btn hide"><i class="fa fa-times"></i></div>
            <h3 style="margin: 0px;"><i class="fa fa-plus"></i> Interno</h3>
        </div>
    </div>
</div>
<div id="gallery-modal" class="modal fade">
    <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Seleziona la galleria da includere</h4>
            </div>
            <div class="modal-body" >
                <div id="gallery-modal-container" class="row">
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div id="object-modal" class="modal fade">
    <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Seleziona l'oggetto da includere</h4>
            </div>
            <div class="modal-body" >
                <div id="object-modal-container" class="row">
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div id="document-modal" class="modal fade">
    <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Seleziona il documento da includere</h4>
            </div>
            <div class="modal-body" >
                <div id="document-modal-container" class="row">
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->