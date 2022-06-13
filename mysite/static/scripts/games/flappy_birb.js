
function genPipeVal() {
    return (Math.random() * (scr_height - (ground * 4))) + (ground * 2);
}

class cloud {
    x = 800;
    y = Math.random() * scr_height;
    r = Math.random();
    size = map(this.r, 0, 1, 100, 200);
    speed = map(this.r, 0, 1, 0.01, 0.1);

    constructor(_x) {
        this.starter(_x);
    }

    starter(_x) {
        this.x = _x;
        this.y = Math.random() * scr_height;
        this.r = Math.random();
        this.size = map(this.r, 0, 1, 100, 200);
        this.speed = map(this.r, 0, 1, 0.1, 0.2);
    }

    draw() {
        fill(color(colors["cloud"]));
        noStroke();
        ellipse(this.x, this.y, this.size, this.size * 0.66);
    }

    update() {
        this.x -= this.speed;
        if(this.x < -this.size/2) this.starter(1000);
    }
}

class pipe {
    center = 0;
    x = 0;
    h = 150;
    w = 100;

    constructor(_center, _x) {
        this.center = _center;
        this.x = scr_width + _x;
    }

    draw() {
        // draw two pipes
        // top pipe
        stroke(20);
        rect(this.x, 0, this.w, (scr_height - this.center) - (this.h / 2));

        // bottom pipe
        rect(this.x, (scr_height - this.center) + (this.h / 2), this.w, scr_height);
    }

    update() {
        if(this.x < -(this.w + 10))  {
            this.x = scr_width;
            this.center = genPipeVal();
            score += 1;
            high_score = (score>high_score)?score:high_score;
        }
        else this.x -= 3;
        if(this.x > 25 && this.x < 100) {
            if(Math.abs(this.center - bird) > 60)
                setup();
        }
    }
}

var bird;
var bird_speed;
var pipes;
var clouds;
var ground;

var scr_height;
var scr_width;

var score = 0;
var high_score = 0;

var PAUSED = true;

// color pallet
colors = {
    "sky"    : "#34344A",
    "ground" : "#CC5A71",
    "bird"   : "#F0F757",
    "pipe"   : "#80475E",
    "cloud"  : "#C89B7B"
}

function setup() {

    PAUSED = true;

    score = 0;

    scr_height = 600;
    scr_width = 800;

    var canvas = createCanvas(scr_width, scr_height);
	canvas.parent('player');
    bird = scr_height / 2;
    bird_speed = 0;
    pipes = [new pipe(scr_height / 2, 800), new pipe(genPipeVal(), 1200)];

    clouds = [];
    for(var i = 0; i < 25; i++) {
        clouds.push(new cloud(Math.random() * scr_width));
    }

    ground = scr_height / 8;
}

function draw() {
    // basic things first
    background(colors["sky"]);

    for(i in clouds) clouds[i].draw();

    fill(color(colors["ground"]));
    rect(0, scr_height - ground, scr_width, ground);

    // draw and update the bird
    // draw the bird
    fill(color(colors["bird"]));
    circle(150, scr_height - bird, 50);

    fill(color(colors["pipe"]));
    for(i in pipes) {
        pipes[i].draw();
    }


    textAlign(LEFT);
    textSize(32);
    fill(color("white"));
    text("Score: " + score + "\t\tHigh Score: " + high_score, 10, 40);

    // update things
    if(!PAUSED) {
        bird_speed -= 0.3;
        bird += bird_speed;
        if(bird <= ground) setup();
        for(i in pipes) pipes[i].update();
        for(i in clouds) clouds[i].update();
    } else {
        fill(255, 255, 255, 50);
        rect(-10,-10,scr_width+10,scr_height+10);

        textAlign(CENTER);
        textSize(64);
        fill(color("white"));
        text("- Pause -", scr_width / 2, scr_height / 2);
    }

    //else {
    //    fill(color(colors['sky']));
    //    rect(0, 0, scr_width, scr_height);
    //    text('PAUSED', 50, 50);
    //}

}


function keyPressed() {
    if(PAUSED) {
        if(keyCode === 32) {
            PAUSED = !PAUSED;
        }
    } else {
        if(keyCode === 32) {
            PAUSED = !PAUSED;
        }
    }
}

function mousePressed() {
    if(mouseX > 0 && mouseX < scr_width+1 && mouseY > 0 && mouseY < scr_height+1) {
        if(PAUSED) PAUSED = !PAUSED;
        bird_speed = 5;
    } else PAUSED = true;
}