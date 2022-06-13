let start_boid_num = navigator.userAgent.includes("Mobile")?25:50;

if(navigator.userAgent.includes("Mobile")) alert("on mobile!");

function setup() {
    createCanvas(windowWidth, windowHeight);

    // init boids

    flock = new Flock();
    // Add an initial set of boids into the system
    for (let i = 0; i < start_boid_num; i++) {
      let b = new Boid(Math.random() * width,Math.random() * height);
      flock.addBoid(b);
    }
    // init Game

    player = new Player(width / 2, height / 2);
    watergun = new WaterGun();

    // define game buffers

    //BoidsBuffer = createGraphics(windowWidth, windowHeight);
    //GameBuffer = createGraphics(windowWidth, windowHeight);

    rectMode(CENTER);

    frameRate(60);

    fullscreen();
}

function background_handler() {
    let c1 = color(92, 219, 149);
    let c2 = color(55, 150, 131);
    
    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }
}

function draw() {

    // background
    background_handler();

    // inputs
    check_inputs();

    // drawing and updates
    drawGame();
    drawBoids();
}

// all game inputs below the main draw function

function check_inputs() {

    spd = keyIsDown(16)? 1: 0;

    if(keyIsDown(87)) {
        player.move("up", spd);
    } else if(keyIsDown(83)) {
        player.move("down", spd);
    } if(keyIsDown(65)) {
        player.move("left", spd);
    } else if(keyIsDown(68)) {
        player.move("right", spd);
    }
}