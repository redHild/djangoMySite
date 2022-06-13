
class WaterGun {
    w = 10;
    h = 5;

    max_water_dist = 300;
    water_dist = 0;
    water_speed = 10;

    theta = 0;

    render() {
        let x = player.x - mouseX;
        let y = player.y - mouseY;

        this.theta = Math.atan2(y, x);
        fill('rgb(150, 150, 150)');
        stroke(0);
        push();
        translate(player.x, player.y);
        rotate(this.theta);
        rect(0,0,this.w,this.h);
        pop();
        push();
        translate(player.x, player.y);
        rotate(this.theta);
        rect(this.w*.5, 0,this.h,this.w);
        pop();
    }

    render_stream() {
        if(mouseIsPressed) this.water_dist += (this.water_dist + this.water_speed > this.max_water_dist) ? 0: this.water_speed;
        else if(this.water_dist > 0) this.water_dist -= this.water_speed;
        else return;

        let goX = -(Math.cos(this.theta) * this.water_dist);
        let goY = (Math.tan(this.theta) * goX);

        fill('rgba(5, 56, 107, .4)');
        stroke('rgba(5, 56, 107, .7)');
        strokeWeight(10);
        push();
        translate(player.x, player.y);
        curve(0, 0, 0, 0, goX, goY, 180, 180);
        pop();
        strokeWeight(1);

        for(i = Math.random(); i < 1; i+=Math.random()) {
            let tgoX = -(Math.cos(this.theta) * (this.water_dist * i));
            let tgoY = (Math.tan(this.theta) * tgoX);
            particles.push(new Particle(6, 6, 10, 0, .01, player.x + tgoX, player.y + tgoY, "rgba(5, 56, 107,"));
        }
        for(i = 0; i < 2; i++) particles.push(new Particle(6, 6, 20, 0, .01, player.x + goX, player.y + goY, "rgba(5, 56, 107,"));

    }

}
