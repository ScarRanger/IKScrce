function initCelestialSphere() {
    const container = document.getElementById('solar-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Translucent Sphere
    const sphereGeometry = new THREE.SphereGeometry(100, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000088,
        shininess: 30,
        specular: 0x222222,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2
    });
    const celestialSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(celestialSphere);

    // Shaded Parts (using partial spheres)
    const shadedGeometry1 = new THREE.SphereGeometry(100, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2); // Top half
    const shadedMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffffcc, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
    const shadedPart1 = new THREE.Mesh(shadedGeometry1, shadedMaterial1);
    scene.add(shadedPart1);

    const shadedGeometry2 = new THREE.SphereGeometry(100, 64, 64, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2); // Bottom half
    const shadedMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffcc, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
    const shadedPart2 = new THREE.Mesh(shadedGeometry2, shadedMaterial2);
    scene.add(shadedPart2);

    // Lines
    function addLine(color, points, dashed = false) {
        const material = new THREE.LineBasicMaterial({ color: color, linewidth: 1 });
        if (dashed) {
            material.linewidth = 2;
            material.dashSize = 3;
            material.gapSize = 3;
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        if (dashed) {
            line.computeLineDistances();
        }
        scene.add(line);
    }

    // Celestial Equator (Dashed Blue)
    const equatorPoints = [];
    for (let i = 0; i <= 360; i += 1) {
        let rad = THREE.MathUtils.degToRad(i);
        equatorPoints.push(new THREE.Vector3(100 * Math.cos(rad), 0, 100 * Math.sin(rad)));
    }
    addLine(0x0000ff, equatorPoints, true);

    // Ecliptic (Orange)
    const eclipticPoints = [];
    for (let i = 0; i <= 360; i += 1) {
        let rad = THREE.MathUtils.degToRad(i);
        eclipticPoints.push(new THREE.Vector3(100 * Math.cos(rad), 23.5, 100 * Math.sin(rad)));
    }
    addLine(0xffa500, eclipticPoints);

    addLine(0xff0000, [new THREE.Vector3(-100, 0, 0), new THREE.Vector3(100, 0, 0)]);
    addLine(0xff0000, [new THREE.Vector3(0, -100, 0), new THREE.Vector3(0, 100, 0)]);
    addLine(0x00ff00, [new THREE.Vector3(-100, 50, 0), new THREE.Vector3(100, 50, 0)]);
    addLine(0x00ff00, [new THREE.Vector3(0, -50, 100), new THREE.Vector3(0, 50, 100)]);
    addLine(0x00ffff, [new THREE.Vector3(-100, -50, 0), new THREE.Vector3(100, -50, 0)]);
    addLine(0x00ffff, [new THREE.Vector3(0, -50, -100), new THREE.Vector3(0, 50, -100)]);

    // Labels with always visible
    const addLabel = (text, position) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = 'Bold 16px Arial';
        context.fillStyle = 'white';
        context.fillText(text, 0, 16);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(material);
        sprite.position.set(position.x, position.y, position.z);
        sprite.scale.set(25, 12, 1);

        // Make labels always face the camera
        sprite.onBeforeRender = function(renderer, scene, camera) {
            sprite.lookAt(camera.position);
        };

        scene.add(sprite);
    };

    addLabel('Zenith', { x: 0, y: 110, z: 0 });
    addLabel('Nadir', { x: 0, y: -110, z: 0 });
    addLabel('Celestial Equator', { x: 100, y: 0, z: 0 });
    addLabel('Ecliptic', { x: -100, y: 23.5, z: 0 });
    addLabel('Local Horizon', { x: 0, y: 0, z: 100 });
    addLabel('North Celestial Pole', { x: 0, y: 100, z: 0 });
    addLabel('South Celestial Pole', { x: 0, y: -100, z: 0 });
    addLabel('Azimuth', { x: 110, y: 0, z: 0 });
    addLabel('Altitude', { x: 0, y: 110, z: 0 });
    addLabel('Right Ascension', { x: 100, y: 50, z: 0 });
    addLabel('Declination', { x: 0, y: 50, z: 100 });
    addLabel('Galactic Latitude', { x: 100, y: -50, z: 0 });
    addLabel('Galactic Longitude', { x: 0, y: 50, z: -100 });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    camera.position.z = 150;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

document.addEventListener("DOMContentLoaded", initCelestialSphere);
