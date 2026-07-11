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

// 🐱 SEVİMLİ TURUNCU YAVRU KEDİ

function createCuteCat(color = 0xff8c32){

    const cat = new THREE.Group();


    // Gövde
    const body = new THREE.Mesh(
        new THREE.SphereGeometry(1.2,32,32),
        new THREE.MeshStandardMaterial({
            color:color,
            roughness:0.8
        })
    );

    body.scale.set(
        1,
        0.9,
        1.3
    );

    cat.add(body);



    // Kafa
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(1,32,32),
        new THREE.MeshStandardMaterial({
            color:color,
            roughness:0.8
        })
    );

    head.position.y=1.5;

    cat.add(head);



    // Kulak yapma
    function ear(x){

        const e = new THREE.Mesh(
            new THREE.ConeGeometry(
                0.35,
                0.7,
                20
            ),
            new THREE.MeshStandardMaterial({
                color:color
            })
        );


        e.position.set(
            x,
            2.35,
            0
        );


        e.rotation.x=-0.2;

        return e;

    }


    cat.add(ear(-0.45));
    cat.add(ear(0.45));




    // Göz yapma
    function eye(x){

        const e = new THREE.Mesh(

            new THREE.SphereGeometry(
                0.25,
                32,
                32
            ),

            new THREE.MeshStandardMaterial({
                color:0x000000,
                emissive:0x222222
            })

        );


        e.position.set(
            x,
            1.65,
            -0.9
        );


        return e;

    }


    cat.add(eye(-0.35));
    cat.add(eye(0.35));



    // Burun
    const nose =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            0.12,
            20,
            20
        ),

        new THREE.MeshStandardMaterial({
            color:0xff9bb5
        })

    );


    nose.position.set(
        0,
        1.35,
        -1
    );


    cat.add(nose);




    // Kuyruk
    const tail =
    new THREE.Mesh(

        new THREE.TorusGeometry(
            0.55,
            0.12,
            16,
            50,
            Math.PI
        ),

        new THREE.MeshStandardMaterial({
            color:color
        })

    );


    tail.position.set(
        0,
        0.4,
        1.2
    );


    tail.rotation.x=Math.PI/2;


    cat.add(tail);



    // Patiler
    function paw(x,z){

        const p =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.3,
                20,
                20
            ),

            new THREE.MeshStandardMaterial({
                color:color
            })

        );


        p.position.set(
            x,
            -0.8,
            z
        );


        return p;

    }


    cat.add(paw(-0.5,-0.8));
    cat.add(paw(0.5,-0.8));



    return cat;

}



// Kediyi oluştur

const cat1 = createCuteCat();

cat1.position.set(
    0,
    1,
    2
);


cat1.scale.set(
    0.8,
    0.8,
    0.8
);


scene.add(cat1);

// 💗 Kedinin boynuna "yu" yazısı

const tagCanvas = document.createElement("canvas");
const tagCtx = tagCanvas.getContext("2d");

tagCanvas.width = 256;
tagCanvas.height = 128;


tagCtx.fillStyle = "#ffffff";
tagCtx.font = "bold 80px Arial";
tagCtx.textAlign = "center";
tagCtx.fillText(
    "yu",
    128,
    85
);


const tagTexture =
new THREE.CanvasTexture(tagCanvas);


const yuTag =
new THREE.Sprite(
    new THREE.SpriteMaterial({
        map:tagTexture,
        transparent:true
    })
);


yuTag.scale.set(
    0.45,
    0.22,
    1
);


yuTag.position.set(
    0,
    1.15,
    -1.05
);


cat1.add(yuTag);



// 🐱 Kedi animasyon değişkeni

let catBreath = 0;



// animate fonksiyonunun içine ekle:
// (renderer.render'dan hemen önce)

catBreath += 0.03;

if(cat1){

    cat1.scale.y =
    0.8 + Math.sin(catBreath)*0.015;

    cat1.rotation.y =
    Math.sin(catBreath)*0.05;

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
