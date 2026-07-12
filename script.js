// =====================================================
// LOVE HEART
// Bölüm 1
// =====================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const yu = document.getElementById("yu");
const tap = document.getElementById("tap");

const WORD = "I love you";
const TOTAL = 850;

let points = [];

let startTime = performance.now();

let visibleCount = 0;

let yuVisible = false;

function resize() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

window.addEventListener("resize", () => {

    resize();

    createHeart();

});

resize();
// =====================================================
// LOVE HEART
// Bölüm 2
// =====================================================

function heartPoint(t){

    return{

        x:16*Math.pow(Math.sin(t),3),

        y:
            13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t)

    };

}

function createHeart(){

    points=[];

    const scale=Math.min(canvas.width,canvas.height)/42;

    for(let i=0;i<TOTAL;i++){

        const t=Math.random()*Math.PI*2;

        const p=heartPoint(t);

        const depth=Math.random();

        points.push({

            x:canvas.width/2+p.x*scale*depth,

            y:canvas.height/2-p.y*scale*depth,

            visible:false,

            alpha:0,

            targetAlpha:1,

            size:12+Math.random()*3,

            // Her yazı farklı anda görünecek
            delay:Math.random()*8,

            fadeSpeed:0.025+Math.random()*0.015

        });

    }

}

createHeart();
// =====================================================
// LOVE HEART
// Bölüm 3
// =====================================================

function update(){

    const elapsed=(performance.now()-startTime)/1000;

    // İlk başta çok yavaş, sonra hafif hızlanır
    const revealChance=Math.min(0.0015+elapsed*0.0025,0.025);

    let visible=0;

    for(const p of points){

        if(!p.visible){

            if(elapsed>=p.delay && Math.random()<revealChance){

                p.visible=true;

            }

        }

        if(p.visible){

            visible++;

            p.alpha+=
                (p.targetAlpha-p.alpha)
                *p.fadeSpeed;

        }

    }

    // Kalp tamamen oluştuktan sonra yu gelsin
    if(!yuVisible && visible===points.length){

        yuVisible=true;

        setTimeout(()=>{

            yu.style.opacity=1;

        },1000);

    }

} 
// =====================================================
// LOVE HEART
// Bölüm 4
// =====================================================

function draw(){

    requestAnimationFrame(draw);

    update();

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.textAlign="center";
    ctx.textBaseline="middle";

    ctx.fillStyle="#ff4d6d";

    for(const p of points){

        if(!p.visible) continue;

        ctx.globalAlpha=p.alpha;

        ctx.font=`${p.size}px Arial`;

        ctx.fillText(

            WORD,

            p.x,

            p.y

        );

    }

    ctx.globalAlpha=1;

}

draw(); 
