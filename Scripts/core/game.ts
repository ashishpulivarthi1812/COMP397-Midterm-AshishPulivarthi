/// <reference path = "_reference.ts" />

// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "1", src: "assets/images/one.png" },
    { id: "2", src: "assets/images/two.png" },
    { id: "3", src: "assets/images/three.png" },
    { id: "4", src: "assets/images/four.png" },
    { id: "5", src: "assets/images/five.png" },
    { id: "6", src: "assets/images/six.png" },
    { id: "rollButton", src: "assets/images/roll.png" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];


// Game Variables
var diceLabel1: createjs.Text; // create a reference
var diceLabel2: createjs.Text; // create a reference
var sum: createjs.Text; // create a reference
//var rollButton: createjs.Bitmap;
var dice1: objects.Button;
var dice2: objects.Button;
var rollButton: objects.Button;


// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this); 
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 

    // calling main game function
    main();
}

// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    stage.update();

    stats.end(); // end measuring
}

// Callback function that allows me to respond to button click events
function rollButtonClicked(event: createjs.MouseEvent) {

    createjs.Sound.play("clicked");

    var rand1 = Math.floor((Math.random() * 6)+1);
    var rand2 = Math.floor((Math.random() * 6) + 1);
    var total = rand1 + rand2;


    stage.removeAllChildren();

    swapImage(1, rand1);
    swapImage(2, rand2);

    

    sum = new createjs.Text("sum: " + total.toString(), "40px Consolas", "#000000");
    sum.regX = sum.getMeasuredWidth() * 0.5;
    sum.regY = sum.getMeasuredHeight() * 0.5;
    sum.x = 150;
    sum.y = 260;
    stage.addChild(sum);

    rollButton = new objects.Button(assets.getResult("rollButton"), 160, 350);
    stage.addChild(rollButton);
    rollButton.on("click", rollButtonClicked);

}

function swapImage(dice:number, num:number) {
  
        
    if (dice == 1) {
        var bmp = new objects.Button(assets.getResult(num.toString()), 100, 150);
        diceLabel1 = new createjs.Text(num.toString(), "40px Consolas", "#000000");
        diceLabel1.regX = diceLabel1.getMeasuredWidth() * 0.5;
        diceLabel1.regY = diceLabel1.getMeasuredHeight() * 0.5;
        diceLabel1.x = 100;
        diceLabel1.y = 200;
        
        stage.addChild(diceLabel1);
        stage.addChild(bmp);
        
    } else {
        
        var bmp = new objects.Button(assets.getResult(num.toString()), 200, 150);
        diceLabel2 = new createjs.Text(num.toString(), "40px Consolas", "#000000");
        diceLabel2.regX = diceLabel2.getMeasuredWidth() * 0.5;
        diceLabel2.regY = diceLabel2.getMeasuredHeight() * 0.5;
        diceLabel2.x = 200;
        diceLabel2.y = 200;
        
        stage.addChild(diceLabel2);
        stage.addChild(bmp);
    }
       
}



// Our Main Game Function
function main() {
    //console.log("Game is Running");
    diceLabel1 = new createjs.Text("1", "40px Consolas", "#000000");
    diceLabel1.regX = diceLabel1.getMeasuredWidth() * 0.5;
    diceLabel1.regY = diceLabel1.getMeasuredHeight() * 0.5;
    diceLabel1.x = 100;
    diceLabel1.y = 200;
    stage.addChild(diceLabel1);

    diceLabel2 = new createjs.Text("1", "40px Consolas", "#000000");
    diceLabel2.regX = diceLabel2.getMeasuredWidth() * 0.5;
    diceLabel2.regY = diceLabel2.getMeasuredHeight() * 0.5;
    diceLabel2.x = 200;
    diceLabel2.y = 200;
    stage.addChild(diceLabel2);

    sum = new createjs.Text("sum: 0", "40px Consolas", "#000000");
    sum.regX = sum.getMeasuredWidth() * 0.5;
    sum.regY = sum.getMeasuredHeight() * 0.5;
    sum.x = 150;
    sum.y = 260;
    stage.addChild(sum);
        
    dice1 = new objects.Button(assets.getResult("1"), 100, 150);
    stage.addChild(dice1);

    dice2 = new objects.Button(assets.getResult("1"), 200, 150);
    stage.addChild(dice2);

    rollButton = new objects.Button(assets.getResult("rollButton"), 160, 350);
    stage.addChild(rollButton);
    rollButton.on("click", rollButtonClicked);
}

// Finite State Machine used to change Scenes
function changeScene(): void {
    
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.PLAY:
            // show the PLAY scene
            stage.removeAllChildren();
            play = new scenes.Play();
            currentScene = play;
            console.log("Starting PLAY Scene");
            break;
        case config.Scene.END:
            // show the END scene
            stage.removeAllChildren();
            end = new scenes.End();
            currentScene = end;
            console.log("Starting END Scene");
            break;
    }

    console.log(currentScene.numChildren);
}