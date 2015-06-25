<div id="object-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=oggetti">Oggetti</a> / Aggiungi oggetto
        </h1>
    </div>
    <form id="object-form" role="form" action="php/?controller=Objects;addObject" method="post" enctype="multipart/form-data">
        <div class="form-group">
            <label>Seleziona il file .obj da caricare</label>
            <input id="object-file" type="file" name="userfileobj" />
            <br>
            <label>Seleziona il file .mtl da caricare</label>
            <input id="object-file2" type="file" name="userfilemtl" />
        </div>
        <button type="submit" id="object-create" class="btn btn-success" style="float:right"><i class="fa fa-check"></i> Aggiungi</button>
    </form>
</div>