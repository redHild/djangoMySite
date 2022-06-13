

let particles = [];
let player;
let watergun;

function drawGame() {
    //background('rgba(47, 227, 41, .5)');
    player.render();
    watergun.render();
    watergun.render_stream();
    for(var p in particles) {
        particles[p].show();
        particles[p].update();
        if(particles[p].a <= 0) particles.splice(p, 1);
    }
}