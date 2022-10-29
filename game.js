var bear;
var bees;
var updateTimer;
var lastStingTime;
//take start time
lastStingTime = new Date();

function Bear(){
    this.dBear = 100;
    this.HTMLElement = document.getElementById("bear");
    this.id = this.HTMLElement.id;
    this.x = this.HTMLElement.offsetLeft;
    this.y = this.HTMLElement.offsetTop;

    this.move = function(xDir,yDir){
        this.fitBounds();
        this.x += this.dBear * xDir;
        this.y += this.dBear * yDir;
        this.display();
    }

    this.display = function(){
        //adjust the position of bee and display it
        this.fitBounds(); //add this to adjust to bounds
        this.HTMLElement.style.left = this.x +"px";
        this.HTMLElement.style.top = this.y + "px";
        this.HTMLElement.style.display = "block";
    }

    this.fitBounds = function(){
        let parent = this.HTMLElement.parentElement;
        let iw = this.HTMLElement.offsetWidth;
        let ih = this.HTMLElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        if (this.x < 0) 
            this.x = 0;
        if (this.x >w -iw) 
            this.x = w - iw;
        if (this.y < 0) 
            this.y = 0;
        if (this.y > h-ih) 
            this.y = h - ih;

    }
}

function setSpeed(){
    bear.dBear = document.getElementById("speedBear").value;
}

function start(){
    //create bear
    bear  = new Bear();

    //Add an event listner to the keypress event.
    document.addEventListener("keydown",moveBear,false);
    
    //create new array for bees
    bees = new Array();

    //create bees
    makeBees();

    //moveBees
    updateBees();
}

// Handle keyboard events
// to move the bear
function moveBear(e){
    //codes of the four keys
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;

    if (e.keyCode == KEYRIGHT){
        bear.move(1,0);
    } //right key
    if (e.keyCode == KEYLEFT){
        bear.move(-1,0);
    } //left key

    if (e.keyCode == KEYUP){
        bear.move(0,-1);
    } //up key
    if(e.keyCode == KEYDOWN){
        bear.move(0,1)
    } //down key
}

class Bee {
    constructor(beeNumber){
        //this HTML element corresponding to the IMG of the bee
        this.HTMLElement = createBeeImg(beeNumber);
        //fits HTML ID
        this.id  = this.HTMLElement.id;
        //the left postion (x)
        this.x = this.HTMLElement.offsetLeft;
        //the top position (y)
        this.y = this.HTMLElement.offsetTop;

        this.move = function(dx,dy) {
            //moves the bees by dx,dy
            this.x += dx;
            this.y += dy;
            this.display();

        }

        this.display = function(){
            //adjust positon of bee and display it
            this.fitBounds(); // add this to adjust to bounds
            this.HTMLElement.style.left = this.x +"px";
            this.HTMLElement.style.top = this.y + "px";
            this.HTMLElement.style.display = "block";
        }

        this.fitBounds = function() {
            //check and make sure the bee stays in the board space
            let parent = this.HTMLElement.parentElement;
            let iw = this.HTMLElement.offsetWidth;
            let ih = this.HTMLElement.offsetHeight;
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;
            if (this.x < 0)
                this.x = 0;
            if (this.x > w - iw)
                this.x = w - iw;
            if (this.y < 0)
                this.y = 0;
            if (this.y > h -ih)
                this.y = h -ih;
        }
    }
}

function getRandomInt(n){
    return Math.floor(Math.random() * n);
}

function restart(){
    location.reload();;
}


function createBeeImg(wNum){
    //get dimension and position of board div
    let boardDiv = document.getElementById("board");
    let boardDivW = boardDiv.offsetWidth;
    let boardDivH = boardDiv.offsetHeight;
    let boardDIvX = boardDiv.offsetLeft;
    let boardDivY = boardDiv.offsetTop;
    //create the IMG element
    let img = document.createElement("img");
    img.setAttribute("src","images/bee.gif");
    img.setAttribute("width","100");
    img.setAttribute("alt","A bee!");
    img.setAttribute("id","bee" + wNum);
    img.setAttribute("class","bee"); //set class of html tag img
    //add the IMG element to the DOM as a child of the board div
    img.style.position = "absolute"
    boardDiv.appendChild(img);
    //set initial postion
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivH);
    img.style.left = (boardDIvX + x) + "px";
    img.style.top = (y) + "px";
    //return the img object
    return img;
}

function makeBees(){
    //get number of bees specified by the user
    let nbBees = document.getElementById("nbBees").value;
    nbBees = Number(nbBees); //try converting the content of the input to a number
    if (isNaN(nbBees)){
        window.alert("Invalid Number of Bees");
        return;
    }
    //create bees
    let i = 1;
    while (i <= nbBees){
        var num = i;
        var bee = new Bee(num); //create object and its IMG element
        bee.display(); //display the bee
        bees.push(bee); //add the bee object to the bees array
        i++;
    }
}

function moveBees(){
    //get speed input field value
    let speed = document.getElementById("speedBees").value;
    //move each bee to a random location.
    for (let i = 0; i < bees.length; i++){
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx,dy);
        isHit(bees[i],bear);//we add this to count stings
    }
}

function addBee(){
    var bee = new Bee(1);
    bee.display;
    bees.push(bee);
}

function updateBees(){ //update loop for game
    //move the bees randomly
    moveBees();
    //use a fixed update period
    let period = document.getElementById("periodTimer").value; //modify this to control refresh period
    if (hits.innerHTML >= 1000){
        alert("Game Over");
    }
    else{
        //update the timer for the next move
        updateTimer = setTimeout("updateBees()",period);
    }
}

function isHit(defender,offender){
    if (overlap(defender,offender)){
        let score = hits.innerHTML;
        score = Number(score) + 1; //increment the score
        hits.innerHTML = score; //display the new score
        //Calculate longest duration
        let newStingTime = new Date();
        let thisDuration = newStingTime - lastStingTime;
        lastStingTime = newStingTime;
        let longestDuration = Number(duration.innerHTML);
        if (longestDuration == 0){
            longestDuration = thisDuration;
        } else {
            if (longestDuration < thisDuration)
            longestDuration = thisDuration;
        }
        document.getElementById("duration").innerHTML = longestDuration;
    } 
}

function overlap(element1,element2){
    //consider the two rectangles wrapping the two elements
    //rectangle of the first element
    left1 = element1.HTMLElement.offsetLeft;
    top1 = element1.HTMLElement.offsetTop;
    right1 =element1.HTMLElement.offsetLeft + element1.HTMLElement.offsetWidth;
    bottom1 = element1.HTMLElement.offsetTop + element1.HTMLElement.offsetHeight;
    //rectangle of the second element
    left2 = element2.HTMLElement.offsetLeft; //e2x
    top2 = element2.HTMLElement.offsetTop; //e2y
    right2 = element2.HTMLElement.offsetLeft + element2.HTMLElement.offsetWidth;
    bottom2 = element2.HTMLElement.offsetTop + element2.HTMLElement.offsetHeight;
    //calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1,right2) - Math.max(left1,left2));
    y_intersect = Math.max(0,Math.min(bottom1,bottom2) - Math.max(top1,top2));
    intersectArea = x_intersect * y_intersect;
    //if intersection is nill no hit
    if (intersectArea == 0 || isNaN(intersectArea)){
        return false;
    }
    return true;
}
