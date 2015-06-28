<div id="hotspot-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header">Panorama <a href="?page=panorama-create" class="btn btn-success" style="float:right;"><i class="fa fa-plus"></i> Aggiungi nuovo</a> <button type="button" id="panorama-edit" state="0" class="btn btn-success" style="float:right; margin-right: 5px;"><i class="fa fa-edit"></i> Modifica</button></h1>
    </div>
</div>
<div id="modificaEnabled" class="hide" style="background-color: rgb(29, 94, 168); color: white; padding: 5px 10px; font-size: 14px;">Puoi ora spostare i panorami</div>
<div id="map-canvas" style="height: 600px;"></div>
<div id="panorama-modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Sei sicuro di voler eliminare questo panorama?</h4>
            </div>
            <div class="modal-body" style="padding: 0px;">
                <div style="padding: 10px;">La rimozione di questo panorama comportera' lo shift dei collegamenti fra panorama e la dissociazione con i punti di interesse</div>
                <div class="img-content"></div>
            </div>
            <div class="modal-footer">
                <button id="confirm-panorama-remove" type="button" class="btn btn-danger"><i class="fa fa-trash"></i> Elimina</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Annulla</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->