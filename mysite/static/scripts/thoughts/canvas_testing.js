CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};

// canvas drawing problem

function toHex(d) {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}

var canvas = document.getElementById("testingCanvas");
var context = canvas.getContext("2d");

var s = 10;

var showColor = document.getElementById("colorShow");

var mouseClicked = false, mouseReleased = true, r = "00", g = "00", b = "00";

function rField() {
	r = toHex(document.getElementById("rChange").value);
	if(r.length==1) r = "0"+r;
	showColor.setAttribute("style","width:25px;height:25px;background-color: #"+r+g+b+";");
}

function gField() {
	g = toHex(document.getElementById("gChange").value);
	if(g.length==1) g = "0"+g;
	showColor.setAttribute("style","width:25px;height:25px;background-color: #"+r+g+b+";");
}

function bField() {
	b = toHex(document.getElementById("bChange").value);
	if(b.length==1) b = "0"+b;
	showColor.setAttribute("style","width:25px;height:25px;background-color: #"+r+g+b+";");
}

function sField() {
	s = document.getElementById("scalePoint").value;
	document.getElementById("showScale").innerHTML = s;
}

function onMouseDown(e) {
    mouseClicked = true;
}

function onMouseUp(e) {
    mouseClicked = false;
}

function onMouseMove(e) {
    if (mouseClicked) {
        context.beginPath();
		var rect = canvas.getBoundingClientRect();
		var mx = e.clientX - rect.left;
		var my = e.clientY - rect.top;
		context.fillStyle = "#"+r+g+b;
        context.arc(mx, my, s / 2, 0, Math.PI * 2);
        context.lineWidth = s;
        context.strokeStyle = "#"+r+g+b;
        context.stroke();
    }
}

document.getElementById("showScale").innerHTML = s;

document.addEventListener("mousedown", onMouseDown, false);
document.addEventListener("mouseup", onMouseUp, false);
document.addEventListener("mousemove", onMouseMove, false);

// cardioid problem

var cdCanvas = document.getElementById("cardioidCanvas");
var cdContext = cdCanvas.getContext("2d");

var amtPoints = 20; 
var size = 250;
var multiplier = 2;
var textPoints = [];
var points = [];
var xo = 300, yo = 300;

function drawCardioid(e) {
	// clear screen
	cdContext.clear();
	
	amtPoints = document.getElementById("pointsChange").value;
	document.getElementById("showPoints").innerHTML = amtPoints;
	
	multiplier = document.getElementById("multChange").value;
	document.getElementById("showMult").innerHTML = multiplier;
	
	cdContext.font = "8px Arial";
	
	points = [];
	textPoints = [];
	for(var i = 0; i < amtPoints; i++){ 
		points.push([
		xo + size * (Math.cos(2 * Math.PI * i / amtPoints)),
		yo + size * (Math.sin(2 * Math.PI * i / amtPoints))]);
		textPoints.push([
		xo + (size + 20) * (Math.cos(2 * Math.PI * i / amtPoints)),
		yo + (size + 20) * (Math.sin(2 * Math.PI * i / amtPoints))]);
	}
	cdContext.moveTo(points[0][0], points[0][1])
	for(var i = 0; i < amtPoints; i++) {
		var otherPoint = (i * multiplier) % amtPoints;
		cdContext.strokeStyle = "#000000";
		cdContext.beginPath();
		cdContext.moveTo(points[i][0], points[i][1]);
		cdContext.lineTo(points[otherPoint][0], points[otherPoint][1]);
		cdContext.moveTo(points[i][0], points[i][1]);
		if(document.getElementById("showBorder").checked) cdContext.lineTo(points[(i+1)%amtPoints][0], points[(i+1)%amtPoints][1]);
        cdContext.stroke();
		cdContext.fillStyle = "#FF0000";
		if(document.getElementById("showText").checked) cdContext.fillText(i, textPoints[i][0], textPoints[i][1]);
	}
	
}

drawCardioid();
