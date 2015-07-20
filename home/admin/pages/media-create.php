<div id="media-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=galleria">Galleria</a> / Aggiungi media
        </h1>
    </div>
    <form id="media-form" role="form" action="php/?controller=Gallery;addMedia" method="post" enctype="multipart/form-data">
        <div class="form-group">
            <label>Seleziona l'immagine da caricare</label>
            <input id="media-file" type="file" name="userfilemedia" />
        </div>
        <button type="submit" id="media-create" class="btn btn-success" style="float:right"><i class="fa fa-check"></i> Aggiungi</button>
    </form>
</div>