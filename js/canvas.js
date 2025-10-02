var size = 500; //size of canvas    //TODO set up spacing relative to size... spacing has to be a factor of size
var spacing = 20;//spacing
var ticks;

var items = [];//array holding each cell... 1 if try, 0 if false;
for (var i = 0; i < size / spacing; i++) {
        var temp2 = [];
        for (var j = 0; j < size / spacing; j++) {
                temp2.push(false);
        };
        items.push(temp2);
};

temporaryItems = [];    //holds temporary arrow during
for (var i = 0; i < size / spacing; i++) {
        var temp2 = [];
        for (var j = 0; j < size / spacing; j++) {
                temp2.push(false);
        };
        temporaryItems.push(temp2);
};

var canvas = document.querySelector('canvas');

canvas.width = size;
canvas.height = size;

var c = canvas.getContext('2d');
c.fillstyle = "blue";

function calculateOffSet(element_, x_, y_) {
        //one to one mapping of canvas to x_, y_ position... TODO safety mechanism do not exceed...TODO not necesary? using offsetX
        const rect = element_.getBoundingClientRect();//get information about canvas
        var newX = x_;
        if (rect.x != 0 && rect.left != 0) { newX = newX + (rect.x / rect.left) - 1 };
        var newY = y_;
        if (rect.y != 0 && rect.top != 0) { newY = newY + (rect.y / rect.top) - 1 };
        if (isNaN(newX)) { newX = 0; };
        if (isNaN(newY)) { newY = 0; };
        return { x: newX, y: newY };
};

function sumOfNeighbors(x_, y_) {
        var living = 0;
        for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                        if ((x_ + i >= 0 && x_ + i < items[0].length) && (y_ + j >= 0 && y_ + j < items[0].length)) {
                                if (i == 0 && j == 0) {
                                        continue;
                                };
                                if (items[x_ + i][y_ + j] == true) {
                                        living = living + 1
                                };
                        };
                };
        };
        return living;
};

function render() {
        //render current items inside items
        for (var i = 0; i < size / spacing; i++) {
                for (var j = 0; j < size / spacing; j++) {
                        if (items[i][j] == true) {
                                c.fillStyle = "red";
                                c.fillRect(i * spacing, j * spacing, spacing - 1, spacing - 1);
                        } else {
                                c.clearRect(i * spacing, j * spacing, spacing - 1, spacing - 1); //clear if box is empty
                        };
                };
        };
};


for (var i = spacing; i < canvas.width + spacing; i = i + spacing) {    //TODO change width and height indepentetly...done?

        var temp0 = calculateOffSet(canvas, i - spacing, 0);
        var temp1 = calculateOffSet(canvas, i - spacing, canvas.width);

        c.beginPath();//vertical line
        c.moveTo(temp0.x, temp0.y);
        c.lineTo(temp1.x, temp1.y);
        c.strokeStyle = "blue";
        c.stroke();

        c.beginPath();//horizontal line
        c.moveTo(temp0.y, temp0.x);
        c.lineTo(temp1.y, temp1.x);
        c.strokeStyle = "blue";
        c.stroke();
};

canvas.addEventListener('mousedown', function (event) {    //add or remove cell from input
        var newX = Math.floor(event.offsetX / spacing);
        var newY = Math.floor(event.offsetY / spacing);
        items[newX][newY] = !items[newX][newY];
        if (items[newX][newY] == true) {
                console.log(sumOfNeighbors(newX, newY));
        };
        render();
});

function conway() {
        var counter = 0;
        for (var i = 0; i < items[0].length; i++) {   //one generation... game rule
                for (var j = 0; j < items[0].length; j++) {
                        if (items[i][j] == true && sumOfNeighbors(i, j) < 2) {
                                //items[i][j] = false;
                                temporaryItems[i][j] = false;
                        } else if (items[i][j] == true && (sumOfNeighbors(i, j) == 2 || sumOfNeighbors(i, j) == 3)) {
                                //items[i][j] = true;
                                temporaryItems[i][j] = true;
                        } else if (items[i][j] == true && sumOfNeighbors(i, j) > 3) {
                                //items[i][j] = false;
                                temporaryItems[i][j] = false;
                        } else if (items[i][j] == false && sumOfNeighbors(i, j) == 3) {
                                //items[i][j] = true;
                                temporaryItems[i][j] = true;
                        };
                };
        };
        for (var i = 0; i < items[0].length; i++) { //update population
                for (var j = 0; j < items[0].length; j++) {
                        items[i][j] = temporaryItems[i][j];
                        if (items[i][j] == true) {
                                counter = counter + 1;
                        };
                        temporaryItems[i][j] = false;
                };
        };
        render();
        if (counter == 0) {
                clearInterval(ticks);
        };
};

function start() {
    clearInterval(ticks);
    ticks = setInterval(conway, 2000);
};

function stop() {
    clearInterval(ticks);
}

function clean() {
        console.log("clear")
        clearInterval(ticks);
        //TODO clear canvas and clear items
        for (var i = 0; i < size / spacing; i++) {
                for (var j = 0; j < size / spacing; j++) {
                        items[i][j] = false;
                        temporaryItems[i][j] = false;
                        c.clearRect(i * spacing, j * spacing, spacing - 1, spacing - 1); //clear if box is empty
                };
        };
};
