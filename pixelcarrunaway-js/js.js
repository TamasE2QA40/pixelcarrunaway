class Object{
    constructor(color, x, y)
    {
        this.color = color;
        this.x = x;
        this.y = y;

    }
}
var colors = ["Red", "Police", "Blue"];
var roadspeed = 5;
var rspeed = 2;
var lspeed = 6;
var playerspeed = 3;
var width = 80;
var height = 168;
var player = null;
var cars = new Array(4);
for(let i = 0; i < cars.length; i++)
{
    cars[i] = new Object(colors[0], 0, 0);
    setRandom(i);
}
const redinvimg = document.getElementById("Red_inv");
const blueinvimg = document.getElementById("Blue_inv");
const policeinvimg = document.getElementById("Police_inv");
const redimg = document.getElementById("Red");
const blueimg = document.getElementById("Blue");
const policeimg = document.getElementById("Police");
var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageplayer = document.getElementById("Player");
const road1img = document.getElementById("Road1");
const road2img = document.getElementById("Road2");
const music = document.getElementById("Music");
var roadwidth = 500;
var roadheight = 600;
var road1 = new Object("Road1", 0, 0);
var road2 = new Object("Road2", 0, -600);
var mainTimer = null;
var scoreTimer = null;
var health = 3;
var score = 0;
var collided = 0;
var over = false;
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;



window.addEventListener("keydown", function(e){

    if(e.key == "ArrowUp")
    {
        moveUp = true;
    }
    if(e.key == "ArrowDown")
    {
        moveDown = true;
    }
    if(e.key == "ArrowLeft")
    {
        moveLeft = true;
    }
    if(e.key == "ArrowRight")
    {
        moveRight = true;
    }
}, false)

window.addEventListener("keyup", function(e){

    if(e.key == "ArrowUp")
    {
        moveUp = false;
    }
    if(e.key == "ArrowDown")
    {
        moveDown = false;
    }
    if(e.key == "ArrowLeft")
    {
        moveLeft = false;
    }
    if(e.key == "ArrowRight")
    {
        moveRight = false;
    }

}, false)



document.getElementById('start').addEventListener('click', startUp);
document.getElementById('restart').addEventListener('click', restartUp);
function startUp()
{
   
    
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("hp").innerHTML = "Health: " + health;
    document.getElementById("score").innerHTML = "Score: " + score;
    player = new Object("Black", 260, 420);
    mainTimer = setInterval(mainTimerfunction, 20);
    scoreTimer = setInterval(scoreTimerFunction, 1000);
    music.play();
    
}

function restartUp()
{
    if(over == true)
    {
        health = 3;
        score = 0;
        document.getElementById("hp").innerHTML = "Health: " + health;
        document.getElementById("score").innerHTML = "Score: " + score;
        player = new Object("Black", 260, 420);
        mainTimer = setInterval(mainTimerfunction, 20);
        scoreTimer = setInterval(scoreTimerFunction, 1000);
        for(let i = 0; i < cars.length; i++)
        {
           setRandom(i);
        }
        over = false;
        document.getElementById("restart").style.opacity = 0.6;
        document.getElementById("restart").style.cursor = "not-allowed";
        music.play();
    }
    
}

function mainTimerfunction()
{
    
    if(health > 0)
    {
        
        if(isCollide() == true)
        {   
            if(health > 1)
            {
                cars[collided].y = 600;
            }
            health -= 1;
            document.getElementById("hp").innerHTML = "Health: " + health;
        }
        
        if(moveUp)
        {
            player.y -= playerspeed;
           
        }
        if(moveDown)
        {
            player.y += playerspeed;
       
        }
        if(moveLeft)
        {
            player.x -= playerspeed;                
        }
        if(moveRight)
        {
            player.x += playerspeed;               
        }
        if(player.x < 0)
        {
            player.x = 0;           
        }
        if(player.y < 0)
        {
           player.y = 0;
            
        }
        if(player.x + width > canvas.width)
        {
            player.x  = canvas.width - width;
                
        }
        if(player.y + height > canvas.height)
        {
            player.y = canvas.height - height;
            
       }
       for(let i=0; i < cars.length; i++)
       {
            if(i < 2)
            {
                cars[i].y += lspeed;
            
            }
            else
            {
                cars[i].y += rspeed;
            }
        }
        road1.y += roadspeed;
        road2.y += roadspeed;
        sendBack();
        update();   
    }
    else
    {
        document.getElementById("hp").innerHTML = "Health: 0 GAME OVER!";
        over = true;
        document.getElementById("restart").style.opacity = 1;
        document.getElementById("restart").style.cursor = "pointer";
        clearInterval(mainTimer);
        clearInterval(scoreTimer);
        music.pause();
    }
}

function scoreTimerFunction()
{
    if(player.x + 40 < roadwidth / 2)
    {
        score +=2;
    }
    else
    {
        score++;
    }
    document.getElementById("score").innerHTML = "Score: "+ score;
}

function update(){
    ctx.clearRect(0,0, canvas.width, canvas.height);  
    ctx.drawImage(road1img, road1.x, road1.y, roadwidth, roadheight);
    ctx.drawImage(road2img, road2.x, road2.y, roadwidth, roadheight);
    ctx.drawImage(imageplayer, player.x, player.y, width, height);
    render();
}

function render(){

    for(let i = 0; i < cars.length; i++)
    {
        if( i < 2 )
            {
                if(cars[i].color == "Blue")
                {
                    ctx.drawImage(blueinvimg, cars[i].x, cars[i].y, width, height);
                }
                if(cars[i].color == "Red")
                {
                    ctx.drawImage(redinvimg, cars[i].x, cars[i].y, width, height);
                }
                if(cars[i].color == "Police")
                {
                    ctx.drawImage(policeinvimg, cars[i].x, cars[i].y, width, height);
                }
            }
        else
        {
            if(cars[i].color == "Blue")
                {
                    ctx.drawImage(blueimg, cars[i].x, cars[i].y, width, height);
                }
                if(cars[i].color == "Red")
                {
                    ctx.drawImage(redimg, cars[i].x, cars[i].y, width, height);
                }
                if(cars[i].color == "Police")
                {
                    ctx.drawImage(policeimg, cars[i].x, cars[i].y, width, height);
                }
        }
    }
}

function sendBack()
{
    if(road1.y == 600)
    {
        road1.y = -600;
    }
    if(road2.y == 600)
    {
         road2.y = -600;
    }
    for(let i=0; i < cars.length; i++ )
        {
            if(cars[i].y >= 600)
            {
                setRandom(i);
            }
        }
}

function setRandom(i)
{
    let x = 0;
    let y = 0;
    let c = 0;
    switch(i)
    {
        case 0:
            x = Math.floor(Math.random() * 41);
            y = Math.floor(Math.random() * 601) - 1000;
            c = Math.floor(Math.random() * 3);
            cars[i].x = x;
            cars[i].y = y;
            cars[i].color = colors[c];
            break;
        case 1 :
            x = Math.floor(Math.random() * 21) + 130 ;
            y = Math.floor(Math.random() * 601 )- 1000;
            c = Math.floor(Math.random() * 3);
            cars[i].x = x;
            cars[i].y = y;
            cars[i].color = colors[c];
            break;

        case 2:
            x = Math.floor(Math.random() * 31) + 260;
            y = Math.floor(Math.random() * 601) - 1000;
            c = Math.floor(Math.random() * 3);
            cars[i].x = x;
            cars[i].y = y;
            cars[i].color = colors[c];
            break;
        case 3 :
            x = Math.floor(Math.random() * 40) + 380;
            y = Math.floor(Math.random() * 601) - 1000;
            c = Math.floor(Math.random() * 3);
            cars[i].x = x;
            cars[i].y = y;
            cars[i].color = colors[c];
            break;
    }
}

function isCollide()
{
    for(let i = 0; i < cars.length; i++)
    {
        if(((cars[i].y <= player.y) && (player.y <= cars[i].y + height)) && ((cars[i].x <= player.x) && (player.x <= cars[i].x + width)) || 
        ((cars[i].y <= player.y + height) && (player.y + height <= cars[i].y + height)) && ((cars[i].x <= player.x) && (player.x <= cars[i].x + width)) || 
        ((cars[i].y <= player.y) && (player.y <= cars[i].y + height)) && ((cars[i].x <= player.x + width) && (player.x + width <= cars[i].x + width)) || 
        ((cars[i].y <= player.y + height) && (player.y + height <= cars[i].y + height)) && ((cars[i].x <= player.x + width) && (player.x + width <= cars[i].x + width))) 
        {
            collided = i;
            return true;
            
        }
        
    }
    return false;
}

