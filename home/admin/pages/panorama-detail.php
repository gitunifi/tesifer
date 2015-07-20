<div id="link-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=panorama">Panorama</a> / Modifica panorama <button id="link-save" type="button" class="btn btn-success" style="float:right;"><i class="fa fa-save"></i> Salva</button> <a href="../index.html?id=<?php echo $params["id"]; ?>" target="_blank" class="btn btn-primary" style="float:right; margin-right: 5px;"><i class="fa fa-eye"></i> Visualizza</a> </h1>
    </div>
    <div class="col-xs-6 col-md-3">
        <div id="hotspot-add" class="thumbnail" align="center" style="background-color: #f5f5f5; cursor: pointer;">
            <div class="remove-btn hide"><i class="fa fa-times"></i></div>
            <h3 style="margin: 0px;"><i class="fa fa-plus"></i> Hotspot</h3>
        </div>
    </div>
    <div class="col-xs-12">
        <div>Panorama <b style="font-size: 15px;">1</b>: <span class="panorama1"></span></div>
        <div id="drag1-wrapper" data-id="<?php echo $params["id"]; ?>" style="height: 300px; border: 1px solid #eee; position: relative;">
        </div>
    </div>
</div>
<div id="hotspot-modal" class="modal fade">
    <div class="modal-dialog" style="width: 80%;">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Seleziona il punto di interesse da includere</h4>
            </div>
            <div class="modal-body" >
                <div id="hotspot-modal-container" class="row">
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->