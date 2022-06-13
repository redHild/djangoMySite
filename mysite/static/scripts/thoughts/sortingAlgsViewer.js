
// sorting algs

function* selection_sort(arr) {
    var n = arr.length;

    // One by one move boundary of unsorted subarray
    for (var i = 0; i < n-1; i++) {
        // Find the minimum element in unsorted array
        var min_idx = i;
        for (var j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
                checked_item = j;
                yield;
            }

        }

        // Swap the found minimum element with the first
        // element
        var temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
    console.log("complete");
}

function* bubble_sort(arr) {
    var n = arr.length;
    for (var i = 0; i < n-1; i++)
        for (var j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // swap arr[j+1] and arr[j]
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
            checked_item = j;
            yield;
        }
    console.log("complete");
}

function* insertion_sort(arr) {
    var n = arr.length;
    for (var i = 1; i < n; ++i) {
        var key = arr[i];
        var j = i - 1;

        /* Move elements of arr[0..i-1], that are
           greater than key, to one position ahead
           of their current position */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            checked_item = j;
            yield;
        }
        arr[j + 1] = key;
    }
    console.log("complete");
}

function merge(arr, l, m, r) {
    // Find sizes of two subarrays to be merged
    var n1 = m - l + 1;
    var n2 = r - m;

    /* Create temp arrays */
    var L = [n1];
    var R = [n2];

    /*Copy data to temp arrays*/
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    /* Merge the temp arrays */

    // Initial indexes of first and second subarrays
    var i = 0, j = 0;

    // Initial index of merged subarry array
    var k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    /* Copy remaining elements of L[] if any */
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    /* Copy remaining elements of R[] if any */
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// Main function that sorts arr[l..r] using
// merge()
function merge_sort(arr, l, r) {
    if (l < r) {
        // Find the middle point
        var m = l + (r-l)/2;

        // Sort first and second halves
        merge_sort(arr, l, m);
        merge_sort(arr, m + 1, r);

        // Merge the sorted halves
        merge(arr, l, m, r);
    }
}

// other functions

function shuffle(array) {
    for(var i = array.length; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * i);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}


class points {
    list = [];
    spd = 10;
    rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

    constructor(amt) {
        for(var i = 1; i <= amt; i++) this.list.push(i);
        this.list = shuffle(this.list);
    }

    points() {
        for(var i = 0; i < this.list.length; i++) {
            this.setPointColor(i);
            rect((i / this.list.length) * scr_width, (scr_height - (scr_height * (this.list[i] / this.list.length))) - 5, 5, 5, 5);
        }
    }

    bars() {
        for(var i = 0; i < this.list.length; i++) {
            this.setPointColor(i);
            rect((i / this.list.length) * scr_width, scr_height, scr_width / this.list.length , -scr_height * (this.list[i] / this.list.length));
        }
    }

    spiral() {

    }

    setPointColor(i) {
        switch(document.getElementById('colors').value) {
            case 'bw':
                fill('black');
                stroke('white');
                strokeWeight(1);
                break;
            case 'wb':
                fill('white');
                stroke('black');
                strokeWeight(1);
                break;
            case 'cb':
                break;
            case 'cw':
                break;
        }
        if(i == checked_item + 1) fill("red");
    }

    show() {
        switch(document.getElementById("vis").value) {
            case "points":
                obj.points();
                break;
            case "bars":
                obj.bars();
                break;
            case "spiral":
                obj.spiral();
        }
    }

}


// main code

var scr_width = 800;
var scr_height = 800;

var obj;

var t;

var checked_item;

let sorter;

function setup() {
	var canvas = createCanvas(scr_width, scr_height);
	canvas.parent('player');
	frameRate(int(t));

    t = document.getElementById("pSpd").value;

	obj = new points(document.getElementById("pAoi").value);

    sorter = sorts_do[document.getElementById("srt").value](obj.list);

}

var sorts_desc = {
    "selection":"Selection sort compares all values to every other value to place.<br><br>Worst: n^2<br>Best: n^2<br>Avg: n^2<br>Space: 1",
    "bubble":"Bubble sort compares adjacent values and swaps them, if it reaches the end, it checks for completion, otherwise it tries again.<br><br>Worst: n^2<br>Best: n<br>Avg: n^2<br>Space: 1",
    "insertion":"Insertion sort compares all previous items to the next value and places that value appropriately into the previous values.<br><br>Worst: n^2<br>Best: n<br>Avg: n^2<br>Space: 1"
};

var sorts_do = {
    "selection": selection_sort,
    "bubble": bubble_sort,
    "insertion": insertion_sort
};

function draw() {
	background((document.getElementById('colors').value[1] === 'w') ? 'white': 'black');

    document.getElementById("tAoi").innerHTML = document.getElementById("pAoi").value;
    document.getElementById("tSpd").innerHTML = document.getElementById("pSpd").value;
    document.getElementById("sort_desc").innerHTML = sorts_desc[document.getElementById("srt").value];

    t = document.getElementById("pSpd").value;

	frameRate(int(t));

    if(sorter.next().done) {
        setup();
    }

    obj.show();

}