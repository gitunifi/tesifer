<div id="internal-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=internal">Interni</a> / Aggiungi un panorama interno
        </h1>
    </div>
    <form id="internal-form" role="form" action="php/?controller=Internal;addInternal" method="post" enctype="multipart/form-data">
        <div class="form-group">
            <label>Seleziona il panorama interno da caricare</label>
            <input id="internal-file" type="file" name="userfile" />
        </div>
        <button type="submit" id="internal-create" class="btn btn-success" style="float:right"><i class="fa fa-check"></i> Aggiungi</button>
    </form>
</div>