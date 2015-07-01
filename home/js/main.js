var isUserInteracting = false;
var isRightClick = false;
var doubleRightClick = false;
var noZoomLevel = 70;

function mod(num, mod) {
    var remain = num % mod;
    return (remain >= 0 ? remain : remain + mod);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(camera.target);
    renderer.render(scene, camera);
    if (typeof rendererCSS !== "undefined") {
        rendererCSS.render(cssScene, camera);
    }
}

function whichTransitionDirection() {
    var i = 0;
    var found = false;
    while (i < ZoomArray.length && !found) {
        if (Math.abs(lat - ZoomArray[i]['Latitude']) < 20 && Math.abs(lon - ZoomArray[i]['Longitude']) < 20) {
            found = true;
            return i;
        }
        i++;
    }
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    if (event.which === 3) {
        isRightClick = true;
    }
    isUserInteracting = true;
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
    projector.unprojectVector(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    if (typeof markers != "undefined" && markers !== undefined) {
        var intersects = raycaster.intersectObjects(markers, true);
        if (intersects[0] !== undefined) {
            interactiveObject = intersects[0].object;
            onMouseDownObjectXRotation = interactiveObject.rotation.x;
            onMouseDownObjectYRotation = interactiveObject.rotation.y;
            onMouseDownObjectZRotation = interactiveObject.rotation.z;
            manageHotspot();
        }
    }

    if (typeof planeMesh != "undefined" && planeMesh !== undefined) {
        var intersects = raycaster.intersectObject(planeMesh, true);
        if (intersects[0] !== undefined && selectedFrame !== undefined) {
            window.open(intersects[0].object.url);
        }
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (typeof rendererCSS != "undefined")
        rendererCSS.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    event.preventDefault();
    if (isUserInteracting && interactiveObject === undefined) {
        lon = mod(((onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon), 360);
        var rawLat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
        lat = Math.max(rawLat, latLimit);
    }
    if (typeof sprite != "undefined") {
        sprite.position.set(event.clientX, event.clientY - 20, 0);
    }

    if (typeof mouse != "undefined") {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
}

function onDocumentMouseUp(event) {
    event.preventDefault();
    isRightClick = false;
    isUserInteracting = false;
    interactiveObject = undefined;
}

function onDocumentMouseWheel(event) {
    event.preventDefault();
    if (zoomEnabled) {
        if (!amILoading) {
            //var previousFov = fov;
            var delta;
            if (event.wheelDeltaY) {
                delta = event.wheelDeltaY;
            } else if (event.wheelDelta) {
                delta = event.wheelDelta;
            } else if (event.detail) {
                delta = event.detail;
            }
            var sub = fov - Math.min((delta * 0.05), 2);
            var zoom = maxZoom;
            var indice = whichTransitionDirection();
            if (indice !== undefined & delta > 0) {
                zoom = ZoomArray[indice]['ZoomNext'];
            }
            if (zoom <= sub && sub <= minZoom) {
                if (event.wheelDeltaY) {
                    fov -= Math.min((delta * 0.05), 2);
                } else if (event.wheelDelta) {
                    fov -= Math.min((delta * 0.05), 2);
                } else if (event.detail) {
                    fov += Math.min((delta * 1.0), 2);
                }

                if (planeMesh !== undefined) {
                    planeMesh.scale.x = fov / noZoomLevel;
                    planeMesh.scale.y = fov / noZoomLevel;
                }
                camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
                render();
            }
            if (sub < zoom & delta > 0) {
                getNewPanorama(panoId);
            }
            //Zoom Previous
            if (delta < 0 & fov > 69.) { // 69. FIXME
                var previousPanoArray = getContent("previousPano", panoId);
                while (previousPanoArray.length > 0) {
                    var candidatePreviousPano = previousPanoArray.pop();
                    if (Math.abs(lat - candidatePreviousPano['LatitudeOnLoad']) < 20 &
                        Math.abs(lon - candidatePreviousPano['LongitudeOnLoad']) < 20) {
                        load(candidatePreviousPano['IdCalling'], candidatePreviousPano['Latitude'], candidatePreviousPano['Longitude']);
                    }
                }
            }

        }
    }
}

function onDocumentDoubleclick(event) {
    if (typeof zoomEnabled === "undefined" || zoomEnabled) {
        var predefinedZoom = Math.floor(((minZoom - maxZoom) / 3) * 1000) / 1000;
        var zoom = maxZoom;
        var indice = whichTransitionDirection();
        if (indice !== undefined) {
            zoom = ZoomArray[indice]['ZoomNext'];
        }
        var newFov = fov - predefinedZoom;
        if (zoom < newFov && newFov < minZoom) {
            fov -= predefinedZoom;
            camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
            render();
        }
        else {
            var found = getNewPanorama(panoId);
            if (!found) {
                fov = 70;
                camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
                render();
            }
        }
        if (typeof planeMesh !== "undefined" && planeMesh !== undefined) {
            planeMesh.scale.x = fov / noZoomLevel;
            planeMesh.scale.y = fov / noZoomLevel;
        }
    }
}

function onDocumentRightClick(event) {
    isRightClick = true;
    event.preventDefault();
    if (typeof zoomEnabled === "undefined" || zoomEnabled) {
        if (doubleRightClick === true) {
            var predefinedZoom = Math.floor(((minZoom - maxZoom) / 3) * 1000) / 1000;
            var newFov = fov + predefinedZoom;
            if (maxZoom < newFov && newFov < minZoom) {
                fov += predefinedZoom;
                camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
            }
            else {
                fov = 70;
                camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
            }
        }
        doubleRightClick = true;
        setTimeout(function () {
            doubleRightClick = false;
        }, 500);
    }
}

function printLonLatInfo() {
    console.log("Longitude: " + lon);
    console.log("Latitude: " + lat);
}

function isZoomIn(previousFov, fov) {
    return previousFov > fov ? true : false;
}


function XYZtoLonLat(x, y, z) {
    var lonLat = [];
    lonLat[1] = Math.acos(y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))) - Math.PI / 2;
    lonLat[1] *= 180 / Math.PI;
    lonLat[1] = Math.max(lonLat[1], latLimit); //BOH
    if (x >= 0)
        lonLat[0] = Math.atan(z / x);
    else
        lonLat[0] = Math.atan(z / x) + Math.PI;
    lonLat[0] *= 180 / Math.PI;
    //lonLat[0] = mod(lonLat[0], 360); //BOH
    return lonLat;
}

function zoomIn() {
    var predefinedZoom = 10;
    var newFov = fov - predefinedZoom;
    if (maxZoom <= newFov && newFov <= minZoom) {
        fov -= predefinedZoom;
        camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
    }
}

function zoomOut() {
    var predefinedZoom = 10;
    var newFov = fov + predefinedZoom;
    if (maxZoom <= newFov && newFov <= minZoom) {
        fov += predefinedZoom;
        camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
    }
}

function resetZoom() {
    fov = 70;
    camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
}

