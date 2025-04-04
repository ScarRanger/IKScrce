// Get the container element
const container = document.getElementById('solar-container');

if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.z = 10;
    controls.update();

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    // 1. Celestial Sphere
    const celestialSphereGeometry = new THREE.SphereGeometry(8, 32, 32);
    const celestialSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, wireframe: true });
    const celestialSphere = new THREE.Mesh(celestialSphereGeometry, celestialSphereMaterial);
    scene.add(celestialSphere);

    // 2. Local Celestial Horizon (Plane)
    // const horizonGeometry = new THREE.PlaneGeometry(10, 10);
    // const horizonMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
    // const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
    // horizon.rotation.x = Math.PI / 2;
    // scene.add(horizon);

    // 3. Celestial Equator (CircleGeometry)
    const equatorGeometry = new THREE.CircleGeometry(5, 64);
    const equatorMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
    const equator = new THREE.Mesh(equatorGeometry, equatorMaterial);
    equator.rotation.x = Math.PI / 2;
    scene.add(equator);

    // 4. Ecliptic (Rotated CircleGeometry)
    const eclipticTilt = 23.5 * Math.PI / 180;
    const eclipticGeometry = new THREE.CircleGeometry(5, 64);
    const eclipticMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
    const ecliptic = new THREE.Mesh(eclipticGeometry, eclipticMaterial);
    ecliptic.rotation.x = Math.PI / 2;
    const eclipticPivot = new THREE.Object3D();
    eclipticPivot.rotation.z = eclipticTilt;
    eclipticPivot.add(ecliptic);
    scene.add(eclipticPivot);

    // 5. Celestial Poles (Spheres)
    const poleGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const northPoleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const northCelestialPole = new THREE.Mesh(poleGeometry, northPoleMaterial);
    northCelestialPole.position.y = 4;
    scene.add(northCelestialPole);

    const southPoleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const southCelestialPole = new THREE.Mesh(poleGeometry, southPoleMaterial);
    southCelestialPole.position.y = -4;
    scene.add(southCelestialPole);

    // 6. Zenith (Sphere)
    const zenithGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const zenithMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const zenith = new THREE.Mesh(zenithGeometry, zenithMaterial);
    zenith.position.z = 4;
    scene.add(zenith);

    // 7. Nadir (Sphere)
    const nadirGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const nadirMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const nadir = new THREE.Mesh(nadirGeometry, nadirMaterial);
    nadir.position.z = -4;
    scene.add(nadir);

    // 8. First Point of Aries (Sphere)
    const ariesGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const ariesMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
    const firstPointOfAries = new THREE.Mesh(ariesGeometry, ariesMaterial);
    // Simplified placement - needs accurate intersection calculation
    firstPointOfAries.position = new THREE.Vector3(Math.cos(0) * 5, 0, Math.sin(0) * 5);
    scene.add(firstPointOfAries);

    // 9. Celestial Object (Example Star)
    const starGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(3, 2, 3);
    scene.add(star);


    const loader = new THREE.FontLoader();

    loader.load('font.json', function (font) {
        const labelMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

        function createLabel(text, position) {
            const textGeometry = new THREE.TextGeometry(text, {
                font: font,
                size: 0.3,
                height: 0.05,
                curveSegments: 12,
                bevelEnabled: false,
            });
            const textMesh = new THREE.Mesh(textGeometry, labelMaterial);
            textMesh.position.copy(position);
            scene.add(textMesh);
            return textMesh;
        }

        // Labels for Points
        const zenithLabel = createLabel("Zenith (Z)", new THREE.Vector3(0, 0, 4.2)); // Adjust position
        const nadirLabel = createLabel("Nadir (Z')", new THREE.Vector3(0, 0, -4.2)); // Adjust position
        const ncpLabel = createLabel("North Celestial Pole (P)", new THREE.Vector3(0, 4.2, 0)); // Adjust position
        const scpLabel = createLabel("South Celestial Pole (P')", new THREE.Vector3(0, -4.2, 0)); // Adjust position
        const ariesLabel = createLabel("First Point of Aries ", new THREE.Vector3(5.2, 0, 0)); // Adjust position
        const libraLabel = createLabel("First Point of Libra ", new THREE.Vector3(-5.2, 0, 0)); // Adjust position

        // Labels for Circles (approximate positions - you might need to adjust based on your circle geometry)
        const equatorLabel = createLabel("Celestial Equator", new THREE.Vector3(0, 0, 5.5)); // Adjust position
        equatorLabel.rotation.y = Math.PI / 2;

        const eclipticLabel = createLabel("Ecliptic", new THREE.Vector3(3, 1, 4.5)); // Adjust position and rotation
        eclipticLabel.rotation.y = Math.PI / 4;

        const horizonLabel = createLabel("Local Celestial Horizon", new THREE.Vector3(5.5, 0, 0)); // Adjust position
        horizonLabel.rotation.y = Math.PI / 2;

        const meridianLabel = createLabel("Local Celestial Meridian", new THREE.Vector3(0, 2, 4.5)); // Adjust position
        meridianLabel.rotation.x = Math.PI / 4;

        const hourCircleLabel = createLabel("Hour Circle", new THREE.Vector3(1, 3, 3)); // Adjust position and rotation

        const azimuthCircleLabel = createLabel("Azimuth Circle", new THREE.Vector3(3, 0, 3)); // Adjust position and rotation

        // Function to make labels face the camera (optional)
        function updateLabels() {
            const cameraWorldPosition = new THREE.Vector3();
            camera.getWorldPosition(cameraWorldPosition);

            zenithLabel.lookAt(cameraWorldPosition);
            nadirLabel.lookAt(cameraWorldPosition);
            ncpLabel.lookAt(cameraWorldPosition);
            scpLabel.lookAt(cameraWorldPosition);
            ariesLabel.lookAt(cameraWorldPosition);
            libraLabel.lookAt(cameraWorldPosition);
            equatorLabel.lookAt(cameraWorldPosition);
            eclipticLabel.lookAt(cameraWorldPosition);
            horizonLabel.lookAt(cameraWorldPosition);
            meridianLabel.lookAt(cameraWorldPosition);
            hourCircleLabel.lookAt(cameraWorldPosition);
            azimuthCircleLabel.lookAt(cameraWorldPosition);
        }

        function createLine(points, color, dashed = false) {
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: color });
            if (dashed) {
                material.linewidth = 2; // Adjust as needed
                material.dashSize = 0.1;
                material.gapSize = 0.1;
                material.scale = 1;
                material.dashed = true;
            }
            const line = new THREE.Line(geometry, material);
            return line;
        }

        // Local Celestial Meridian (Solid White)
        const meridianPoints = [
            new THREE.Vector3(0, 4.2, 0),     // North Celestial Pole (slightly offset)
            new THREE.Vector3(0, 0, 4.2),     // Zenith (slightly offset)
            new THREE.Vector3(0, -4.2, 0),    // South Celestial Pole (slightly offset)
            new THREE.Vector3(0, 0, -4.2),    // Nadir (slightly offset)
            new THREE.Vector3(0, 4.2, 0),     // Close the loop
        ];
        const meridianLine = createLine(meridianPoints, 0xffffff);
        scene.add(meridianLine);

        // Hour Circles (Dashed Light Gray)
        const numHourCircles = 3;
        for (let i = 0; i < numHourCircles; i++) {
            const angle = (i / numHourCircles) * 2 * Math.PI;
            const radius = 4; // Radius of the celestial sphere

            // Point on the Celestial Equator
            const equatorPoint = new THREE.Vector3(
                radius * Math.cos(angle),
                0,
                radius * Math.sin(angle)
            );

            const hourCirclePoints = [
                new THREE.Vector3(0, 4.2, 0),     // North Celestial Pole
                equatorPoint,
                new THREE.Vector3(0, -4.2, 0),    // South Celestial Pole
            ];
            const hourCircleLine = createLine(hourCirclePoints, 0xd3d3d3, true); // Light Gray, Dashed
            scene.add(hourCircleLine);
        }

        // Line connecting Zenith and Nadir (Solid - reusing createLine)
        const zenithNadirPoints = [
            new THREE.Vector3(0, 0, 4.2),
            new THREE.Vector3(0, 0, -4.2),
        ];
        const zenithNadirLine = createLine(zenithNadirPoints, 0xffa500); // Example color: Orange
        scene.add(zenithNadirLine);

        // Line connecting North and South Celestial Poles (Solid - reusing createLine)
        const poleToPolePoints = [
            new THREE.Vector3(0, 4.2, 0),
            new THREE.Vector3(0, -4.2, 0),
        ];
        const poleToPoleLine = createLine(poleToPolePoints, 0x0000ff); // Example color: Blue
        scene.add(poleToPoleLine);

        // --- Celestial Sphere Border (Wireframe) ---
        // const wireframeGeometry = new THREE.WireframeGeometry(celestialSphereGeometry);
        // const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff }); // Cyan color
        // const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        // scene.add(wireframe);

        // --- Define North and South Celestial Pole Positions ---
        const ncpPosition = northCelestialPole.position;
        const scpPosition = southCelestialPole.position;

        // --- Create the Diameter-Defined Sphere ---
        const sphereCenter = new THREE.Vector3().addVectors(ncpPosition, scpPosition).multiplyScalar(0.5);
        const sphereRadius = ncpPosition.distanceTo(scpPosition) / 2;

        const diameterSphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
        const diameterSphereMaterial = new THREE.MeshBasicMaterial({
            color: 0xff00ff, // Magenta or any visible color for the wireframe
            transparent: true,
            opacity: 0.3,
            wireframe: true,
            side: THREE.DoubleSide // Ensure visibility from both inside and outside
        });
        const diameterSphere = new THREE.Mesh(diameterSphereGeometry, diameterSphereMaterial);
        diameterSphere.position.copy(sphereCenter);
        scene.add(diameterSphere);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            updateLabels(); // Call this function in the animation loop if you want labels to always face the camera
            renderer.render(scene, camera);
        }

        animate();
    });
}

window.addEventListener('resize', () => {
    if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
}, false);