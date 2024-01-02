const canciones = [
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
    { cancion: 'Titulo de la cancion', titulo: '/musicas/cancion.mp3' },
];

function getRandomQuote() {
    const index = Math.floor(Math.random() * canciones.length);
    console.log(canciones[index].titulo);
    return index;
}

const index = getRandomQuote();

const audio = document.getElementById("myAudio");

const cancion = canciones[index];

audio.src = cancion.titulo;
audio.play();

const scene = new THREE.Scene();
const light = new THREE.DirectionalLight(0x000000, 1);
light.position.set(0, 0, 0);
light.castShadow = true;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.00001, 1000);
camera.position.z = 100;
camera.position.x = 140;
camera.position.y = 0;

// Create the renderer and set its size
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight / 1.1);
renderer.autoClear = false;
renderer.shadowMap.enabled = true;
camera.castShadow = true;



// Attach the renderer to the container element
document.getElementById("container").appendChild(renderer.domElement);



// Load the font JSON file
var loader = new THREE.FontLoader();
loader.load('optimer_bold.typeface.json', function (font) {



    // Escucha el evento 'timeupdate' en el elemento de audio
    audio.addEventListener('timeupdate', function () {
        // Obtén el volumen actual de la canción
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        const volume2 = Math.max(...dataArray) / 255;


        // Calcula el tamaño de la geometría de texto según el volumen
        const textGeometrySize = (volume2 * 2.5) ** 3;

        // Actualiza la geometría de texto
        textGeometry = new THREE.TextGeometry(cancion.cancion, {
            font: font,
            size: textGeometrySize,
            height: 0.5
        });
        textMesh.geometry = textGeometry;
    });

    // Crea un AnalyserNode para analizar el volumen de la canción
    const context = new AudioContext();
    const source = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 2048;

    // Crea la geometría de texto inicial
    let textGeometry = new THREE.TextGeometry(cancion.cancion, {
        font: font,
        size: 5,
        height: 0.5
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    scene.add(textMesh);

    scene.add(light);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('texture.jpg')

    for (let i = 0; i < 10; i++) {
        const sphere2 = new THREE.SphereGeometry(3, 32, 32);
        const material2 = new THREE.MeshBasicMaterial({ map: texture });
        const mesh2 = new THREE.Mesh(sphere2, material2);

        // Asignar diferentes posiciones y ángulos de rotación a cada esfera
        mesh2.position.x = 20 * Math.sin(i * Math.PI / 5);
        mesh2.position.y = 20 * Math.cos(i * Math.PI / 5);
        mesh2.rotation.y = i * Math.PI / 5;

        scene.add(mesh2);
    }

    function animate() {
        requestAnimationFrame(animate);

        // Hacer que las esferas giren alrededor del texto
        scene.children.forEach(mesh => {
            mesh.position.x = 80 * Math.sin(mesh.rotation.y) + 135;
            mesh.position.y = 15 * Math.cos(mesh.rotation.x) +10;
            mesh.rotation.y += 0.000001;
            textMesh.position.x = 0;
            textMesh.position.y = 0;
            textMesh.rotation.y = 0;
        });

        renderer.render(scene, camera);
    }



    animate();

    function animate2() {
        requestAnimationFrame(animate2);

        // Hacer que las esferas giren alrededor del texto
        scene.children.forEach(mesh2 => {
            mesh2.position.x = 200 * Math.sin(mesh2.rotation.y) + 150;
            mesh2.position.y = 70 * Math.cos(mesh2.rotation.y);
            mesh2.rotation.y += 0.01;
            textMesh.position.x = 0;
            textMesh.position.y = 0;
            textMesh.rotation.y = 0;
        });

        renderer.render(scene, camera);
    }

    animate2();

    function animate3() {
        requestAnimationFrame(animate3);

        // Hacer que las esferas giren alrededor del texto
        scene.children.forEach(mesh => {
            mesh.position.x = 25 * Math.sin(mesh.rotation.y) + 135;
            mesh.position.y = 25 * Math.cos(mesh.rotation.y) - 30;
            mesh.rotation.x += 0.000001;
            textMesh.position.x = 0;
            textMesh.position.y = 0;
            textMesh.rotation.y = 0;
        });

        renderer.render(scene, camera);
    }



    animate3();

});

