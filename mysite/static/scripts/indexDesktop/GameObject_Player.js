

class Player {
    x = 0;
    y = 0;

    walk_spd = 1;
    run_spd  = 2.5;
    
    w = 25;
    h = 40;

    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    render() {
        fill('rgb(237, 245, 225)');
        stroke(0);
        push();
        translate(this.x, this.y);
        circle(0, 0, this.w);
        pop();
    }

    move(dir, spd) {
        spd = spd == 1? this.run_spd: this.walk_spd;
        switch(dir) {
            case "up":
                this.y -= spd;
                break;
            case "down":
                this.y += spd;
                break;
            case "left":
                this.x -= spd;
                break;
            case "right":
                this.x += spd;
                break;
        }
    }

}

