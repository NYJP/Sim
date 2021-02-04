var x = 0;
var y = 0;
var root = document.documentElement;

$(window).resize(function() {
    updatesq();
});

function updatesq(){
    x = Math.round(window.innerWidth - 2 * Math.min(window.innerHeight * 0.08,window.innerWidth * 0.08));
    y = Math.round(window.innerHeight - 2 * Math.min(window.innerHeight * 0.08,window.innerWidth * 0.08));
    root.style.setProperty('--top', String(Math.round(Math.min(window.innerHeight * 0.05,window.innerWidth * 0.05))) + 'px');
    root.style.setProperty('--buttonx', String(x) + 'px');
    root.style.setProperty('--buttony', String(y) + 'px');
    root.style.setProperty('--buttonw', String(Math.min(window.innerHeight * 0.08,window.innerWidth * 0.08)) + 'px');
    canvas.height = y;
    canvas.width = x;
    loadmap();
}

var map = [];
var mapx = 0;
var mapy = 0;
var isheld = false;
var level = 25; //increases by 25 every 'day'

var canvas = document.getElementById("window");
var ctx = canvas.getContext("2d");

for (var i=0; i<530; i++){
    var row = [];
    for (var l=0; l<530; l++){
        if ((i == 0 || i == 529) && l%23 == 0 && l != 0 && l != 529) row.push([0,255,0]);
        else if ((l == 0 || l == 529) && i%23 == 0 && i != 0 && i != 529) row.push([0,255,0]);
        else if (i > 15 && i < 514 && l > 15 && l < 514) row.push(Math.floor(Math.random() * level));
        else row.push(1);
    }
    map.push(row);
}



document.querySelectorAll('.dirbuttons').forEach(function(element){
    element.addEventListener("mousedown",function(){
        if (!isheld){
            isheld = true;
            holddown(element);
            element.addEventListener("mouseup",function(){
                isheld = false;
            })
        }
    })
    
    
})

function holddown(element){
    if (element.id == 'down'){
        if (mapy+10 > 529-Math.round(y/10)) mapy = 530-Math.round(y/10);
        else mapy+=10;
    }
    else if (element.id == 'up'){
        if (mapy-10 < 0) mapy = 0;
        else mapy-=10;
    }
    else if (element.id == 'right'){
        if (mapx+10 > 529-Math.round(x/10)) mapx = 530-Math.round(x/10);
        else mapx+=10;
    }
    else if (element.id == 'left'){
        if (mapx-10 < 0) mapx = 0;
        else mapx-=10;
    }
    loadmap()

    if (isheld){
        setTimeout(function(){
            holddown(element);
        }, 30);
    }
}

function loadmap(){
    console.log(canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var Y=0; Y < y; Y += 10){
        for (var X=0; X < x; X += 10){
            if (map[Y/10 + mapy][X/10 + mapx] == 0) ctx.fillStyle = 'rgb(255,0,0)';
            else if (map[Y/10 + mapy][X/10 + mapx] < 10000) ctx.fillStyle = 'rgb(255,255,255)';
            else ctx.fillStyle = 'rgb(' + String(map[Y/10 + mapy][X/10 + mapx][0]) + ',' + String(map[Y/10 + mapy][X/10 + mapx][1]) + ',' + String(map[Y/10 + mapy][X/10 + mapx][2]) + ')';
            ctx.fillRect(X,Y,10,10);
        }
    }
}

updatesq();

console.log(map);