<div id="gallery-container" data-id="<?php echo $params["id"] ?>" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=galleria">Galleria</a> / Galleria <?php echo $params["id"]; ?> <button type="button" id="edit-gallery" class="btn btn-success" style="float:right"><i class="fa fa-edit"></i> Modifica</button> <a href="?page=gallery-update&id=<?php echo $params["id"]; ?>" class="btn btn-success" style="float:right; margin-right: 5px;"><i class="fa fa-plus"></i> Aggiungi</a></h1>
    </div>
</div>
<div id="gallery-modal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body" style="padding: 0;">
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->