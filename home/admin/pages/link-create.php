<div id="link-container" class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><a href="?page=collegamenti">Collegamenti</a> / Crea collegamento <button id="link-save" type="button" class="btn btn-success" style="float:right;"><i class="fa fa-check"></i> Crea</button></h1>
    </div>
    <div class="col-xs-12">
        <div>Spostare le barre verticali lungo le direzioni stradali.</div>
        <div>Fissata una direzione stradale, le barre <span class="blue"></span> indicano un verso, le barre <span class="red"></span> indicano il verso opposto.</div>
        <div>Legenda:</div>
        <ul style="list-style: none; padding-left: 15px;">
            <li><span class="blue"></span> Panorama <b style="font-size: 15px;">1</b>: Verso della strada che porta al panorama <b>2</b></li>
            <li><span class="blue"></span> Panorama <b style="font-size: 15px;">2</b>: Stesso verso della strada</li>
        </ul>
        <ul style="list-style: none; padding-left: 15px;">
            <li><span class="red"></span> Panorama <b style="font-size: 15px;">2</b>: Verso della strada che porta al panorama <b>1</b></li>
            <li><span class="red"></span> Panorama <b style="font-size: 15px;">1</b>: Stesso verso della strada</li>

        </ul>
    </div>
    <div class="col-xs-12 col-md-6">
        <div>Panorama <b style="font-size: 15px;">1</b>: <span class="panorama1"></span></div>
        <div id="drag1-wrapper" data-id="<?php echo $params["id1"]; ?>" style="height: 300px; border: 1px solid #eee;">
            <div id="drag11" class="draggable" style="display: inline-block; height: 100%; width: 6px; background-color: #0080c0; border: 0px solid; cursor: pointer;">
            </div>
            <div id="drag12" class="draggable" style="display: inline-block; height: 100%; width: 6px; background-color: #f00; border: 0px solid; cursor: pointer;">
            </div>
        </div>
    </div>
    <div class="col-xs-12 col-md-6">
        <div>Panorama <b style="font-size: 15px;">2</b>: <span class="panorama2"></span></div>
        <div id="drag2-wrapper" data-id="<?php echo $params["id2"]; ?>" style="height: 300px; border: 1px solid #eee;">
            <div id="drag21" class="draggable" style="display: inline-block; height: 100%; width: 6px; background-color: #0080c0; border: 0px solid; cursor: pointer;">
            </div>
            <div id="drag22" class="draggable" style="display: inline-block; height: 100%; width: 6px; background-color: #f00; border: 0px solid; cursor: pointer;">
            </div>
        </div>
    </div>
</div>