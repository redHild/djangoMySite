// objects

class Particle {

	constructor(_pHv, _pVv, _pSize, _pGrv, _pDec, _x, _y, _rgb) {
        this.pSize = _pSize;
        this.pGrv = _pGrv;
        this.pDec = _pDec;
        this.rgb = _rgb;
		this.x = _x;
		this.y = _y;
		this.a = .5;
		let hVal = map(_pHv,0,100,0,25.0);
		let vVal = map(_pVv,0,100,0,25.0);
		this.vx = random(-hVal,hVal);
		this.vy = random(-vVal,-0.5);
	}
	show() {
		fill(this.rgb + this.a + ")");
		noStroke();
        push();
        translate(this.x, this.y);
        circle(0, 0, this.pSize);
        pop();
	}
	update() {
		this.vy -= map(this.pGrv,-10,10,-1.2,1.2);
		this.x += this.vx;
		this.y += this.vy;
		this.a -= this.pDec;
	}
}