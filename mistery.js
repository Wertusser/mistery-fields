var camera, scene, renderer;
var plain_fill, plain_stroke, geometry_plain, totems = [];
var idea_knot, idea_body;

var s = new SimplexNoise();
var offset = 0.005;
var cylinder_offset = 0.25;

init();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    scene.fog = new THREE.Fog(0xf1f1f1, 0.015, 200);

    camera.position.z = 200;
    camera.position.y = 50;

    renderer = new THREE.WebGLRenderer({antialias: false, alpha: true});
    renderer.setClearColor(0xf1f1f1, 1);

    renderer.setSize($(document).width(), $(document).height());
    document.getElementById('mistery').appendChild(renderer.domElement);

    makeWave();
    // makeIdea();

    setInterval(update, 1000 / 60);
    window.addEventListener('resize', onWindowResize, false);
}

function update() {
    updateWave();
    updateTotems();
    // updateIdea();
    makeTotem();
    offset += 0.005;
    renderer.render(scene, camera);
}

function makeWave() {
    geometry_plain = new THREE.PlaneGeometry(600, 300, 80, 80);
    var material_plain_fill = new THREE.MeshBasicMaterial({color: 0x000000});
    var material_plain_stroke = new THREE.MeshBasicMaterial({color: 0x0f0f0f, wireframe: true, transparent: true});
    plain_fill = new THREE.Mesh(geometry_plain, material_plain_fill);
    plain_stroke = new THREE.Mesh(geometry_plain, material_plain_stroke);
    scene.add(plain_fill);
    scene.add(plain_stroke);
    plain_fill.rotation.x = -Math.PI / 2;
    plain_stroke.rotation.x = -Math.PI / 2;
}

function makeIdea() {
    // torus knot
    var material_idea = new THREE.MeshNormalMaterial({morphTargets: true});
    var geometry_knot_idea = new THREE.TorusKnotGeometry(11, 3, 100, 16, 3, 4);
    var geometry_body_idea = new THREE.OctahedronGeometry(10, 1);
    idea_knot = new THREE.Mesh(geometry_knot_idea, material_idea);
    idea_body = new THREE.Mesh(geometry_body_idea, material_idea);
    scene.add(idea_knot);
    scene.add(idea_body);
    idea_knot.position.y = 50;
    idea_knot.position.z = -50;
    idea_body.position.y = 50;
    idea_body.position.z = -50;
}

function makeTotem() {
    if (getRandomFloat(1, 1000) > 995) {
        var geometry_cylinder = new THREE.CylinderGeometry(15, 15, getRandomInt(100, 150), getRandomInt(4, 21));
        var material_cylinder = new THREE.MeshBasicMaterial({color: 0x121212, fog: true});
        var totem = new THREE.Mesh(geometry_cylinder, material_cylinder);
        scene.add(totem);
        if (Math.random() > 0.5) {
            totem.position.x = getRandomInt(-300, -50);
        } else {
            totem.position.x = getRandomInt(50, 300);
        }
        totem.position.y = 50;
        totem.position.z = -150;
        totems.push(totem);
    }
}

function updateWave() {
    for (var i = 0; i < geometry_plain.vertices.length; i++) {
        var v = geometry_plain.vertices[i];
        v.z = s.noise2D(v.x / 40.0, v.y / 40.0 + offset) * 10.0;
    }
    plain_fill.geometry.verticesNeedUpdate = true;
    plain_stroke.geometry.verticesNeedUpdate = true;
}

function updateTotems() {

    if (totems.length === 0) {
        return;
    }
    for (var i = 0; i <= totems.length; i++) {
        if (!totems[i]) {
            continue;
        }
        totems[i].position.z += cylinder_offset;
        if (totems[i].position.z > 190) {
            scene.remove(totems[i]);
            totems.splice(i, 1);
        }
    }
}

function updateIdea() {
    idea_knot.rotation.x += 0.05 * Math.sin(offset);
    idea_knot.rotation.y += 0.05 * Math.cos(offset);
    idea_knot.rotation.z += 0.05 * Math.atan(offset);
    idea_knot.position.z -= 0.1;

    idea_body.rotation.x += 0.05 * Math.sin(offset);
    idea_body.rotation.y += 0.05 * Math.cos(offset);
    idea_body.rotation.z += 0.05 * Math.atan(offset);
    idea_body.position.z -= 0.1;

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight / 3);

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;

}
