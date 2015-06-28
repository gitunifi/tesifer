<div id="panorama-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=panorama">Panorama</a> / Aggiungi un panorama <button type="submit" id="panorama-create" class="btn btn-success" style="float:right"><i class="fa fa-check"></i> Aggiungi</button>
        </h1>
    </div>
    <form id="panorama-form" role="form" action="php/?controller=Panorama;addPanorama" method="post" enctype="multipart/form-data">
        <div class="form-group">
            <label>Seleziona il panorama da caricare</label>
            <input id="panorama-file" type="file" name="userfile" />
            <input type="hidden" value="" id="lat-pos" name="lat" />
            <input type="hidden" value="" id="lng-pos" name="lng" />
        </div>
    </form>
</div>
<div id="map-canvas" style="height: 400px;"></div>