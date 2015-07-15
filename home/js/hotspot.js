var rightPosition = true;
var zoomEnabled = true;
var hotspotArray = [];
var indent = 0;
var angle = 0;


function getHotspot() {
    cleanUpMarkers();
    var hotspotArray = getContent("hotspot", panoId);
    for (var i = 0; i < hotspotArray.length; i++) {
        var hotspot = hotspotArray[i];
        var position = new THREE.Vector3(parseInt(hotspot['xPosition']*210), parseInt(hotspot['yPosition']), parseInt(hotspot['zPosition']*210));
        var finalPosition = new THREE.Vector3(parseInt(hotspot['xPositionFinal']*210), parseInt(hotspot['yPositionFinal']), parseInt(hotspot['zPositionFinal']*210));
        makeHotspot(finalPosition, hotspot['IdHotspot'], position);
    }
}

function cleanUpHotSpotContent() {
    while (objects.length > 0) {
        var objectToRemove = objects.pop();
        scene.remove(objectToRemove);
    }
    while (cssObjects.length > 0) {
        var cssObjectToRemove = cssObjects.pop();
        cssScene.remove(cssObjectToRemove);
    }
    element.width = 0;
    element.height = 0;
    element.src = "";
    zoomEnabled = true;
}

function cleanUpMarkers() {
    while (markers.length > 0) {
        var obj = markers.pop();
        scene.remove(obj);
    }
}


function portal(html, hotspotPosition, width, height, leftOrRight, color, resolution, type) {
    var clickable = html.split("?")[0];
    if (clickable !== "null") {
        zoomEnabled = false;
        if (fov < 40)
            resetZoom();
        var planeMaterial = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1});

        //determina la dimensione del box nero
        //ATTENZIONE!!! la dimensione del box nero non viene modificata insieme alla dimensione del contenuto!
        var xDimension = 500;
        var yDimension = 300;
        var planeGeometry = new THREE.PlaneBufferGeometry(xDimension, yDimension);
        //larghezza del semicerchio nella cornice
        var inside = 42; //15
        //altezza del semicerchio nella cornice
        var radius = 70;
        //larghezza della cornice attaccata alla sfera, deve essere più larga perché ha l'incavatura
        var corniceLarga = 50; //25
        //larghezza degli altri lati della cornice
        var cornice = 20;
        var frame = makeBordoPannello(xDimension, yDimension, radius, inside, corniceLarga, cornice, color);

        objects.push(frame);

        planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.position.set(hotspotPosition.x, hotspotPosition.y, hotspotPosition.z);


        elementExternaLink.href = html;
        elementExternaLink.target = "_blank";
        elementExternaLink.innerHTML = "<img src='images/external_link.png' width='16' height='auto'/>";
        elementExternaLink.position = "absolute";
        hotspotExternalMesh = new THREE.CSS3DObject(elementExternaLink);


        planeMesh.url = html;

        var distance = (xDimension / 2) - 7;

        planeMesh.lookAt(new THREE.Vector3(0, 0, 0));
        if (leftOrRight === "left") {
            planeMesh.translateX(-distance);
        } else {
            planeMesh.translateX(distance);
        }
        planeMesh.lookAt(new THREE.Vector3(0, 0, 0));

        hotspotExternalMesh.position.set(planeMesh.position.x, planeMesh.position.y - (yDimension / 2) - 10, planeMesh.position.z);
        hotspotExternalMesh.rotation.set(planeMesh.rotation.x, planeMesh.rotation.y, planeMesh.rotation.z);

        cssScene.add(hotspotExternalMesh);
        cssObjects.push(hotspotExternalMesh);



        //inseimento del contenitore nero
        objects.push(planeMesh);
        scene.add(planeMesh);

        //prelevo l'oggetto selezionato
        element.src = html;

        //in base alla risoluzione di cui ho bisogno determino la dimensione dell'oggetto. Aumento o diminuisco i margini, includendo o escludendo altro contenuto
        element.width = (xDimension * resolution) + "px";
        element.height = (yDimension * resolution) + "px";
        element.position = "absolute";

        //aggiungo l'elemento al cssObject
        cssObject = new THREE.CSS3DObject(element);

        //adattamento delle dimensioni, ridimensionando anche il contenuto


        cssObject.scale.setX(cssObject.scale.x / resolution);
        cssObject.scale.setY(cssObject.scale.y / resolution);


        /*
         Il parametro risoluzione serve a far visualizzare più o meno contenuto:
         1 il contenuto sarà delle dimensioni originali;
         2 viene incluso il doppio del contenuto;
         0.5 viene incluso la metà del contenuto;
         */

        cssObject.position.set(planeMesh.position.x, planeMesh.position.y+2, planeMesh.position.z);
        cssObject.rotation.set(planeMesh.rotation.x, planeMesh.rotation.y, planeMesh.rotation.z);


        //inserimento dell'oggetto all'interno del riquadro nero
        cssScene.add(cssObject);
        cssObjects.push(cssObject);

        var response = XYZtoLonLat(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z);
        smoothLonLatTransition(response[0], response[1], 3);
        frame.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z);

        if (leftOrRight === "left") {
            frame.rotation.set(planeMesh.rotation.x, planeMesh.rotation.y + Math.PI, planeMesh.rotation.z);
        } else {
            frame.rotation.set(planeMesh.rotation.x, planeMesh.rotation.y, planeMesh.rotation.z);
        }
        window.frame = frame;
        scene.add(frame);
    }
}

function smoothZRotationTransition(object, rotationDelta, step) {
    var stepsNeeded = Math.abs(Math.floor(rotationDelta / step));
    var stepsDone = 0;
    var actualTransition = function () {
        if (stepsDone < stepsNeeded) {
            stepsDone++;
            if (rotationDelta > 0) {
                object.rotation.z += step;
            }
            else
                object.rotation.z -= step;
            requestAnimationFrame(actualTransition);
        }
    }
    //actualTransition();
    object.rotation.z += rotationDelta;
}

function rotate(angle) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].hotspotId === interactiveObject.hotspotId) {
            smoothZRotationTransition(markers[i], angle, Math.PI / 12);
        }
    }
}

function search(name) {
    for (var i = 0; i < hotspotArray.length; i++) {
        if (hotspotArray[i]['Name'] === name) {
            return hotspotArray[i];
        }
    }
}

function searchHotspot(panoId) {
    for (var i = 0; i < hotspotArray.length; i++) {
        if (hotspotArray[i]["IdPanorama"] === panoId.toString()) {
            return hotspotArray[i];
        }
    }
}

function restoreHotspotPosition(hotspotId) {
    var found = false;
    var i = 0;
    while (i < markers.length & !found) {
        if (markers[i].name === "Sphere" & markers[i].hotspotId === hotspotId)
            found = true;
        else
            i++;
    }
    if (selectedFrame !== undefined)
        selectedFrame.position.set(markers[i].position.x, markers[i].position.y, markers[i].position.z);
}

function restoreHotspotRotation() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].initialRotation != undefined) {
            markers[i].rotation.z = markers[i].initialRotation;
        }
    }
}

function rotateToHotspotPosition() {
    var hotspotInfo = searchHotspot(panoId);
    if (hotspotInfo !== undefined) {
        var response = XYZtoLonLat(hotspotInfo["xPosition"], hotspotInfo["yPosition"], hotspotInfo["zPosition"]);
        smoothLonLatTransition(response[0], response[1], 3);
    }
}

function indentRight(indent) {
    interactiveObject.position.z -= indent * Math.cos(angle);
    interactiveObject.position.x += indent * Math.sin(angle);
}

function indentLeft(indent) {
    interactiveObject.position.z += indent * Math.cos(angle);
    interactiveObject.position.x -= indent * Math.sin(angle);
}

function manageHotspot() {

    cleanUpHotSpotContent();
    restoreHotspotRotation();
    hotspotArray = getContent("hotspotInfo", interactiveObject.hotspotId);

    indent = 15;
    if (interactiveObject.position.x >= 0) {
        angle = Math.atan(interactiveObject.position.z / interactiveObject.position.x);
        indent = -indent;
    }
    else {
        angle = Math.atan((interactiveObject.position.z / interactiveObject.position.x) + Math.PI);
    }
    switch (interactiveObject.name) {
        case "Gallery":
            if (rightPosition || selectedFrame !== interactiveObject) {
                rotate(Math.PI / 2);
                rightPosition = false;
                var hotspotInfo = search("Gallery");
                portal(hotspotInfo['Source'] + "?id=" + hotspotInfo['IdName'], interactiveObject.position, hotspotInfo["Width"], hotspotInfo["Height"], "left", 0xfcd402, 1.87, "Gallery");
                //indentRight(indent);
                selectedFrame = interactiveObject;
            }
            else {
                //indentLeft(indent);
                rightPosition = true;
                selectedFrame = undefined;
                //rotate(-Math.PI / 2);
                //rotateToHotspotPosition();
                var response = XYZtoLonLat(interactiveObject.position.x, interactiveObject.position.y, interactiveObject.position.z);
                smoothLonLatTransition(response[0], response[1], 3);
            }
            break;
        case "PDF":
            if (rightPosition || selectedFrame !== interactiveObject) {
                //if (rightPosition)
                //    rotate(-Math.PI / 2);
                rightPosition = false;
                var hotspotInfo = search("PDF");
                var pdfSource = getContent("pdf", hotspotInfo['IdName']); //FIXME Meglio passare id
                portal(hotspotInfo['Source'] + "?id=" + pdfSource, interactiveObject.position, hotspotInfo["Width"], hotspotInfo["Height"], "left", 0xe1235e, 2, "PDF");
                //indentLeft(indent);
                selectedFrame = interactiveObject;
            }
            else {
                //indentRight(indent);
                rightPosition = true;
                selectedFrame = undefined;
                //rotate(Math.PI / 2);
                //cleanUpHotSpotContent(interactiveObject.hotspotId);
                //rotateToHotspotPosition();
                var response = XYZtoLonLat(interactiveObject.position.x, interactiveObject.position.y, interactiveObject.position.z);
                smoothLonLatTransition(response[0], response[1], 3);
                //selectedFrame = undefined;
            }
            break;
        case "Panorama":
            if (!rightPosition || selectedFrame !== interactiveObject) {

                rightPosition = true;
                var hotspotInfo = search("Panorama");
                portal(hotspotInfo['Source'] + "?id=" + hotspotInfo['IdName'], interactiveObject.position, hotspotInfo["Width"], hotspotInfo["Height"], "right", /*0x00acec*/ 0x1AA4D3, 1, "Panorama");
                selectedFrame = interactiveObject;
                //indentLeft(indent);
            }
            else {
                //indentRight(indent);
                rightPosition = false;
                selectedFrame = undefined;
                //rotate(Math.PI / 2);
                //cleanUpHotSpotContent(interactiveObject.hotspotId);
                //rotateToHotspotPosition();
                var response = XYZtoLonLat(interactiveObject.position.x, interactiveObject.position.y, interactiveObject.position.z);
                smoothLonLatTransition(response[0], response[1], 3);
                //selectedFrame = undefined;
            }
            break;
        case "Object":
            if (!rightPosition || selectedFrame !== interactiveObject) {
                rotate(Math.PI / 2);
                rightPosition = true;
                var hotspotInfo = search("Object");
                portal(hotspotInfo['Source'] + "?id=" + hotspotInfo['IdName'], interactiveObject.position, hotspotInfo["Width"], hotspotInfo["Height"], "right", 0xa1cc3a, 1, "Object");
                //indentRight(indent);
                selectedFrame = interactiveObject;

            }
            else {
                //indentLeft(indent);
                rightPosition = false;
                selectedFrame = undefined;
                //rotate(-Math.PI / 2);
                //selectedFrame = undefined;
                //cleanUpHotSpotContent(interactiveObject.hotspotId);
                //rotateToHotspotPosition();
                var response = XYZtoLonLat(interactiveObject.position.x, interactiveObject.position.y, interactiveObject.position.z);
                smoothLonLatTransition(response[0], response[1], 3);
            }
            break;

    }
}

function makeHotspot(position, id, initialPosition) {
    var pts = [];
    var detail = 0.5;
    var radius = 24;
    var radius2 = 14;

    hotspotArray = getContent("hotspotInfo", id);
    var sourceArray = new Array();
    while (hotspotArray.length > 0) {
        var element = hotspotArray.pop();
        if (element['IdPanorama'] == panoId) {
            var name = element['Name'];
            sourceArray[name] = element['Source'];
        }
    }

    for (var i = 0; i <= radius2; i += detail)
        pts.push(new THREE.Vector3(radius - (radius2 / 2) + i, 0, -(radius2 / 2)));

    for (var i = 0; i <= radius2; i += detail)
        pts.push(new THREE.Vector3(radius + (radius2 / 2), 0, -(radius2 / 2) + i));

    for (var i = 0; i <= radius2; i += detail)
        pts.push(new THREE.Vector3(radius + (radius2 / 2) - i, 0, (radius2 / 2)));

    for (var i = 0; i <= radius2; i += detail)
        pts.push(new THREE.Vector3(radius - (radius2 / 2), 0, (radius2 / 2) - i));

    var torusGeometry = new THREE.LatheGeometry(pts, 12, 0, Math.PI * 165 / 360);

    /*var arcShape = new THREE.Shape();
     arcShape.moveTo( 0, 0 );
     arcShape.arc( 0, 0, radius, 0, Math.PI * 170 / 360, true );

     var holePath = new THREE.Path();
     holePath.moveTo( 0, 0 );
     holePath.arc( 0, 0, radius2, 0, Math.PI * 170 / 360, true );
     arcShape.holes.push( holePath );

     var extrudeSettings = {
     amount : 2,
     steps: 100,
     bevelThickness: 0,
     bevelSize: 0
     };

     var torusGeometry = new THREE.ExtrudeGeometry(arcShape, extrudeSettings);*/

    var light = new THREE.PointLight( 0x555555, 5, radius*2 );
    light.position.set( position.x, position.y, position.z );
    light.name = "Light"
    light.hotspotId = id;
    markers.push(light);
    scene.add(light);


    if (sourceArray['Panorama'] !== null) {
        var materials1 =
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/pano_icon_vertical.png')
            });

    }
    else {
        var materials1 = [
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/NoPanorama.png')
            })
        ];
    }



    var torusMaterial = materials1;//new THREE.MeshFaceMaterial(materials1);
    var torus1 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus1.position.set(position.x, position.y, position.z);

    torus1.lookAt(new THREE.Vector3(0, 0, 0));

    torus1.rotation.z = torus1.rotation.z - Math.PI / 4 + Math.PI * 5 / 360;
    torus1.initialRotation = torus1.rotation.z;
    torus1.name = "Panorama";
    torus1.type = "Hotspot";
    torus1.hotspotId = id;
    markers.push(torus1);
    scene.add(torus1);

    if (sourceArray['Gallery'] !== null) {
        var materials2 = [
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/gallery_icon_horizontal.png')
            })
        ];
    }
    else {
        var materials2 = [
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/NoGallery.png')
            })
        ];
    }
    var torusMaterial = new THREE.MeshFaceMaterial(materials2);
    var torus2 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus2.position.set(position.x, position.y, position.z);

    torus2.lookAt(new THREE.Vector3(0, 0, 0));

    torus2.rotation.z = torus2.rotation.z + Math.PI / 4 + Math.PI * 5 / 360;
    torus2.initialRotation = torus2.rotation.z;
    torus2.name = "Gallery";
    torus2.type = "Hotspot";
    torus2.hotspotId = id;
    markers.push(torus2);
    scene.add(torus2);

    if (sourceArray['PDF'] !== null) {
        var materials3 = [
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/pdf_icon_horizontal_reflected.png')
            })
        ];
    }
    else {
        var materials3 = [
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/NoPDF.png')
            })
        ];
    }
    var torusMaterial = new THREE.MeshFaceMaterial(materials3);
    var torus3 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus3.position.set(position.x, position.y, position.z);
    torus3.lookAt(new THREE.Vector3(0, 0, 0));
    torus3.rotation.z = torus3.rotation.z + Math.PI * 3 / 4 + Math.PI * 5 / 360;
    torus3.initialRotation = torus3.rotation.z;
    torus3.name = "PDF";
    torus3.type = "Hotspot";
    torus3.hotspotId = id;
    markers.push(torus3);
    scene.add(torus3);

    if (sourceArray['Object'] !== null) {
        var materials4 = [
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/3d_icon_horizontal.png')
            })
        ];
    }
    else {
        var materials4 = [
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/NoObject.png')
            })
        ];
    }
    var torusMaterial = new THREE.MeshFaceMaterial(materials4);
    var torus4 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus4.position.set(position.x, position.y, position.z);
    torus4.lookAt(new THREE.Vector3(0, 0, 0));
    torus4.rotation.z = torus4.rotation.z + Math.PI * 5 / 4 + Math.PI * 5 / 360;
    torus4.initialRotation = torus4.rotation.z;
    torus4.name = "Object";
    torus4.type = "Hotspot";
    torus4.hotspotId = id;
    markers.push(torus4);
    scene.add(torus4);
//Crea il centro dell'hotspot, quello con quattro frecce.
    var arrowPts = [];

    var m = 0.6;
//lunghezza del corpo della freccia
    var l = m + 4;
//larghezza della freccia
    var f = m + 2.5;
//lunghezza totale della freccia
    var p = m + l + 3;
//colore della freccia;
    arrowColor = 0xeeeeee;
//i quattro blocchi seguenti sono le quattro frecce
    arrowPts.push(new THREE.Vector2(-m, -m)); //i punti isolati sono i punti di congiunzione tra le frecce.
    arrowPts.push(new THREE.Vector2(-l, -m));
    arrowPts.push(new THREE.Vector2(-l, -f));
    arrowPts.push(new THREE.Vector2(-p, 0));
    arrowPts.push(new THREE.Vector2(-l, f));
    arrowPts.push(new THREE.Vector2(-l, m));
    arrowPts.push(new THREE.Vector2(-m, m));
    arrowPts.push(new THREE.Vector2(-m, l));
    arrowPts.push(new THREE.Vector2(-f, l));
    arrowPts.push(new THREE.Vector2(0, p));
    arrowPts.push(new THREE.Vector2(f, l));
    arrowPts.push(new THREE.Vector2(m, l));
    arrowPts.push(new THREE.Vector2(m, m));
    arrowPts.push(new THREE.Vector2(l, m));
    arrowPts.push(new THREE.Vector2(l, f));
    arrowPts.push(new THREE.Vector2(p, 0));
    arrowPts.push(new THREE.Vector2(l, -f));
    arrowPts.push(new THREE.Vector2(l, -m));
    arrowPts.push(new THREE.Vector2(m, -m));
    arrowPts.push(new THREE.Vector2(m, -l));
    arrowPts.push(new THREE.Vector2(f, -l));
    arrowPts.push(new THREE.Vector2(0, -p));
    arrowPts.push(new THREE.Vector2(-f, -l));
    arrowPts.push(new THREE.Vector2(-m, -l));
//ritorno al punto di partenza
    arrowPts.push(new THREE.Vector2(-m, -m));
    var arrowShape = new THREE.Shape(arrowPts);
    var arrowSettings = {amount: 2};
    arrowSettings.bevelEnabled = false;
    arrowSettings.bevelSegments = 2;
    arrowSettings.steps = 2;
    var arrowGeometry = new THREE.ExtrudeGeometry(arrowShape, arrowSettings);
    var arrow = new THREE.Mesh(arrowGeometry, new THREE.MeshLambertMaterial({color: arrowColor}));
    scene.add(arrow);
    markers.push(arrow);
    arrow.name = "Sphere"; //"Arrow"?
    arrow.hotspotId = id;
    arrow.position.set(position.x, position.y, position.z);
    arrow.lookAt(new THREE.Vector3(0, 0, 0));


    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });

    var dist = distance(position, initialPosition);

    var radius = 10;
    var segments = 32;

    var circleGeometry = new THREE.CircleGeometry( radius, segments );
    var circle = new THREE.Mesh( circleGeometry, material );
    circle.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    circle.lookAt(new THREE.Vector3(0, 0, 0));
    circle.translateZ(-220);
    circle.name = "Circle";
    circle.hotspotId = id;
    if (dist == 0)
        circle.visible = false;
    scene.add( circle );
    markers.push(circle);

    var material2 = new THREE.MeshBasicMaterial({
        color: 0x000000
    });

    var radius2 = 12;
    var segments2 = 32;

    var circleGeometry2 = new THREE.CircleGeometry( radius2, segments2 );
    var circle2 = new THREE.Mesh( circleGeometry2, material2 );
    circle2.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
    circle2.lookAt(new THREE.Vector3(0, 0, 0));
    circle2.translateZ(-240);
    circle2.name = "Circle2";
    circle2.hotspotId = id;
    if (dist == 0)
        circle2.visible = false;
    scene.add( circle2 );
    markers.push(circle2);

    var lineMaterial = new THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 8, gapSize: 8});
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(circle.position.x, circle.position.y, circle.position.z));
    geometry.vertices.push(new THREE.Vector3(position.x, position.y, position.z));
    geometry.computeLineDistances();
    var line = new THREE.Line(geometry, lineMaterial, THREE.LineStrip);
    line.name = "Line";
    line.hotspotId = id;
    if (dist == 0)
        line.visible = false;
    scene.add(line);
    markers.push(line);







    //arrow.rotation.y = angolo;
    //arrow.rotation.y = arrow.rotation.y + Math.PI / 2 + Math.atan(parseFloat(arrow.position.z) / parseFloat(arrow.position.x)); //FIXME
}

function endDragHotspot(hotspotId, position) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].hotspotId === hotspotId && markers[i].name == "Line") {
            $.ajax({
                url: "admin/php/?controller=Panorama;updatePanoramaHotspotXYZ;" + panoId + "," + hotspotId + "," + markers[i].geometry.vertices[1].x/210 + "," + markers[i].geometry.vertices[1].y/210 + "," + markers[i].geometry.vertices[1].z/210,
                dataType: "json",
                context: this
            }).done(function(response) {
            });
        }
    }

}

function dragHotspot(hotspotId, position) {
    var vector = new THREE.Vector3();

    vector.set(
        position.x,
        position.y,
        0.5 );

    vector.unproject(camera);

    var dir = vector.sub( camera.position ).normalize();

    var distance = 210;

    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    //pos.y = 0;

    cleanUpHotSpotContent();
    restoreHotspotRotation();
    selectedFrame = undefined;

    var diffX = 0;
    var diffZ = 0;

    for (var i = 0; i < markers.length; i++) {
        if (markers[i].hotspotId === hotspotId && markers[i].name == "Line") {
            diffX = Math.abs(pos.x - markers[i].geometry.vertices[0].x);
            diffZ = Math.abs(pos.z - markers[i].geometry.vertices[0].z);
        }
    }

    for (var i = 0; i < markers.length; i++) {
        if (markers[i].hotspotId === hotspotId) {
            if (markers[i].name != "Circle" && markers[i].name != "Circle2" && markers[i].name != "Line") {
                markers[i].position.set(pos.x, pos.y, pos.z);

                if (markers[i].name != "Light") {
                    markers[i].lookAt(new THREE.Vector3(0, 0, 0));
                    if (markers[i].name == "Object") {
                        markers[i].rotation.z = markers[i].rotation.z + Math.PI * 5 / 4 + Math.PI * 5 / 360;
                    } else if (markers[i].name == "PDF") {
                        markers[i].rotation.z = markers[i].rotation.z + Math.PI * 3 / 4 + Math.PI * 5 / 360;
                    } else if (markers[i].name == "Gallery") {
                        markers[i].rotation.z = markers[i].rotation.z + Math.PI / 4 + Math.PI * 5 / 360;
                    } else if (markers[i].name == "Panorama") {
                        markers[i].rotation.z = markers[i].rotation.z - Math.PI / 4 + Math.PI * 5 / 360;
                    }
                }
            } else if (markers[i].name == "Line") {
                if (diffX > 50 || diffZ > 50) {
                    markers[i].visible = true;
                } else {
                    markers[i].visible = true;
                }
                markers[i].geometry.vertices[1].set(pos.x, pos.y, pos.z);
                markers[i].geometry.verticesNeedUpdate = true;
            } else if (markers[i].name == "Circle" || markers[i].name == "Circle2") {
                if (diffX > 50 || diffZ > 50) {
                    markers[i].visible = true;
                } else {
                    markers[i].visible = true;
                }
            }
        }
    }
}


function makeBordoPannello(width, height, radius, inside, corniceLarga, cornice, color) {
    var californiaPts = [];
    var detail = .1;

    //di seguito vengono creati dei punti, sotto forma di Vector2, che vengono accorpati all'interno del vettore californiaPts.
    //i punti vengono poi uniti tra loro da californiaShape, che crea la cornice.
    //gli angoli esterni sono arrotondati, la loro posizione originale è ( +/- (width/2) +/- cornice , +/- (height/2) +/- cornice)

    //punti esterni
    //angolo in basso a sinistra
    for (var rot = 0.0; rot < 1.6; rot = rot + 0.1) {
        californiaPts.push(new THREE.Vector2(-width / 2 - corniceLarga + 20 * (1 - Math.sin(rot)), -height / 2 - cornice + 20 * (1 - Math.cos(rot))));
    }

    //crea il foro semicircolare nella cornice
    var alpha = Math.acos((radius - inside) / radius);
    for (var angle = -alpha; angle < alpha + detail; angle += detail) {
        californiaPts.push(new THREE.Vector2(-width / 2 - (radius - inside) + Math.cos(angle) * radius - corniceLarga, Math.sin(angle) * radius));
    }

    //angolo in alto a sinistra
    for (var rot = 0.0; rot < 1.6; rot = rot + 0.1) {
        californiaPts.push(new THREE.Vector2(-width / 2 - corniceLarga + 20 * (1 - Math.cos(rot)), height / 2 + cornice - 20 * (1 - Math.sin(rot))));
    }

    //angolo in alto  a destra
    for (var rot = 0.0; rot < 1.6; rot = rot + 0.1) {
        californiaPts.push(new THREE.Vector2(width / 2 + cornice - 20 * (1 - Math.sin(rot)), height / 2 + cornice - 20 * (1 - Math.cos(rot))));
    }

    //angolo in basso a destra
    for (var rot = 0.0; rot < 1.6; rot = rot + 0.1) {
        californiaPts.push(new THREE.Vector2(width / 2 + cornice - 20 * (1 - Math.cos(rot)), -height / 2 - cornice + 20 * (1 - Math.sin(rot))));
    }

    //punto che collega la cornice esterna con quella interna, in mezzo al bordo inferiore della cornice esterna
    californiaPts.push(new THREE.Vector2(0.00001, -height / 2 - cornice));
    //punto che collega la cornice esterna con quella interna, in mezzo al bordo inferiore della cornice interna
    californiaPts.push(new THREE.Vector2(0.00001, -height / 2));

    //punti interni
    californiaPts.push(new THREE.Vector2(width / 2, -height / 2)); //angolo in basso a destra
    californiaPts.push(new THREE.Vector2(width / 2, height / 2)); //angolo in alto a destra
    californiaPts.push(new THREE.Vector2(-width / 2, height / 2)); //angolo in alto a sinistra
    californiaPts.push(new THREE.Vector2(-width / 2, -height / 2)); //angolo in basso a sinistra

    //ritorna al punto di chiusura della cornice, in mezzo al bordo inferiore.
    californiaPts.push(new THREE.Vector2(0, -height / 2));
    californiaPts.push(new THREE.Vector2(0, -height / 2 - cornice));

    //chiude tornando al punto di origine
    californiaPts.push(new THREE.Vector2(-width / 2 - cornice + 20, -height / 2 - cornice));

    var californiaShape = new THREE.Shape(californiaPts);
    var extrudeSettings = {amount: 2};
    extrudeSettings.bevelEnabled = false;
    extrudeSettings.bevelSegments = 2;
    extrudeSettings.steps = 2;
    var geometry = new THREE.ExtrudeGeometry(californiaShape, extrudeSettings);
    return new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: color, opacity: 0.7, transparent: true}));
}

function distance (v1, v2)
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt(dx*dx+dy*dy+dz*dz);
}