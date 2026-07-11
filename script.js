const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050816);
scene.fog = new THREE.Fog(0x050816, 20, 80);


// Kamera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 14);


// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);



// Ay ışığı
const moonLight = new THREE.DirectionalLight(
    0xbfd7ff,
    1.5
);

moonLight.position.set(
    -5,
    10,
    -5
);

scene.add(moonLight);


// Ortam ışığı
const ambient = new THREE.AmbientLight(
    0x445577,
    1
);

scene.add(ambient);



// 🌕 Ay

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(2,32,32),
    new THREE.MeshBasicMaterial({
        color:0xffffdd
    })
);

moon.position.set(
    -7,
    8,
    -12
);

scene.add(moon);



// ⭐ Yıldızlar

const starsGeometry =
new THREE.BufferGeometry();


let stars = [];


for(let i=0;i<400;i++){

    stars.push(
        (Math.random()-0.5)*80,
        Math.random()*40,
        -Math.random()*60
    );

}


starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        stars,
        3
    )
);


const starsMaterial =
new THREE.PointsMaterial({

    color:0xffffff,
    size:0.12

});


const starField =
new THREE.Points(
    starsGeometry,
    starsMaterial
);


scene.add(starField);



// 🌱 Zemin

const ground =
new THREE.Mesh(

    new THREE.PlaneGeometry(
        80,
        80
    ),

    new THREE.MeshStandardMaterial({
        color:0x182b18
    })

);


ground.rotation.x=-Math.PI/2;

ground.receiveShadow=true;

scene.add(ground);



// 🌲 Ağaç oluşturma

function createTree(x,z){

    const trunk =
    new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.25,
            0.35,
            3
        ),

        new THREE.MeshStandardMaterial({
            color:0x4b2b15
        })

    );


    trunk.position.set(
        x,
        1.5,
        z
    );


    scene.add(trunk);



    const leaves =
    new THREE.Mesh(

        new THREE.ConeGeometry(
            1.5,
            3.5,
            16
        ),

        new THREE.MeshStandardMaterial({
            color:0x123d20
        })

    );


    leaves.position.set(
        x,
        4,
        z
    );


    scene.add(leaves);

}



createTree(-8,-5);
createTree(7,-8);
createTree(10,-2);
createTree(-12,-10);



// Animasyon

function animate(){

    requestAnimationFrame(animate);


    starField.rotation.y += 0.0005;


    renderer.render(
        scene,
        camera
    );

}


animate();



// Ekran boyutu

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


});
// 🐱 İlk kedi yükleme

const loader = new THREE.GLTFLoader();

let cat1;


loader.load(
    "models/cat1.glb",

    function(gltf){

        cat1 = gltf.scene;

        cat1.scale.set(
            1.5,
            1.5,
            1.5
        );


        cat1.position.set(
            0,
            0,
            2
        );


        cat1.rotation.y = Math.PI;


        cat1.traverse(
            function(obj){

                if(obj.isMesh){

                    obj.castShadow = true;

                }

            }
        );


        scene.add(cat1);



        // 🐾 Boyundaki yu yazısı

        const canvas =
        document.createElement("canvas");

        const ctx =
        canvas.getContext("2d");


        canvas.width=256;
        canvas.height=128;


        ctx.fillStyle="#ffdddd";
        ctx.font="bold 80px Arial";
        ctx.textAlign="center";
        ctx.fillText(
            "yu",
            128,
            85
        );


        const texture =
        new THREE.CanvasTexture(canvas);



        const tag =
        new THREE.Sprite(
            new THREE.SpriteMaterial({
                map:texture
            })
        );


        tag.scale.set(
            0.5,
            0.25,
            1
        );


        tag.position.set(
            0,
            1.5,
            0.5
        );


        cat1.add(tag);


    }
);
