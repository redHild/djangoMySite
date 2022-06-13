
function doEvaluate() {
	eq = document.getElementById("eq");
	out = document.getElementById("out");
	if(eq.value==='') {
		out.innerHTML = "<strong style='background-color:rgba(255,255,0,.95);'> Caution: Nothing typed yet...</strong>";
		return;
	}
	if(eq.value.match(/[a-z]/i)) {
		out.innerHTML = "<strong style='background-color:rgba(255,0,0,.95);'> ERROR: Numbers and operators ('+','-','*','/') allowed.</strong>";
		return;
	}
	allow = /^[0-9\ \-\+\/\*\.]+$/;
	if (!allow.test(eq.value)) {
		out.innerHTML = "<strong style='background-color:rgba(255,0,0,.95);'> ERROR: No special characters except for 0 - 9 and '.' for decimals as well as + - / *.</strong>";
		return;
	}
	vals = eq.value.split(" ");
	if(vals.includes('')) {
		out.innerHTML = "<strong style='background-color:rgba(255,0,0,.95);'> ERROR: Found too many spaces somewhere.</strong>";
		return;
	}
	rvals = [];
	for (i = vals.length - 1; i >= 0; i--) {
		if(rvals[i] != ' ') rvals.push(vals[i]);
	}
	res = 0;
	steps = ""
	while(rvals.length > 1) {
		sk = 0;
		for( i = 0; i < rvals.length - 1; i++) {
			if (['+','-','/','*'].includes(rvals[i])) {
				sk = i - 2;
				break;
			}
		}
		steps += " ";
		for (j = rvals.length - 1; j >= 0; j--) {
			steps += (j == sk || j == sk+1 || j== sk+2)? "<strong style='background-color:rgba(255,180,0,.5);'>" + rvals[j] + " </strong>": rvals[j] + " ";
		}
		switch(rvals[sk+2]) {
			case '+':
				res = parseFloat(rvals[sk+1]) + parseFloat(rvals[sk]);
				steps += " — " + rvals[sk+1] + " + " + rvals[sk] + " = " + res + "<br>";
				break;
			case '-':
				res = parseFloat(rvals[sk+1]) - parseFloat(rvals[sk]);
				steps += " — " + rvals[sk+1] + " - " + rvals[sk] + " = " + res + "<br>";
				break;
			case '*':
				res = parseFloat(rvals[sk+1]) * parseFloat(rvals[sk]);
				steps += " — " + rvals[sk+1] + " * " + rvals[sk] + " = " + res + "<br>";
				break;
			case '/':
				res = parseFloat(rvals[sk+1]) / parseFloat(rvals[sk]);
				steps += " — " + rvals[sk+1] + " / " + rvals[sk] + " = " + res + "<br>";
				break;
		}
		rvals.splice(sk,2)
		rvals[sk] = res
	}
	steps += "Final Answer = " + res;
	out.innerHTML = steps;
}