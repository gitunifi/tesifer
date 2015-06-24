<div id="document-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=documenti">Documenti</a> / Aggiungi documento
        </h1>
    </div>
    <form id="document-form" role="form" action="php/?controller=Documents;addDocument" method="post" enctype="multipart/form-data">
        <div class="form-group">
            <label>Seleziona il file da caricare</label>
            <input id="document-file" type="file" name="userfile" />
        </div>
        <button type="submit" id="document-create" class="btn btn-success" style="float:right"><i class="fa fa-check"></i> Aggiungi</button>
    </form>
</div>