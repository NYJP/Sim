var x = Math.round(window.innerWidth * - Math.min(window.innerHeight * 0.08,window.innerWidth * 0.08));
var y = Math.round(window.innerHeight * - Math.min(window.innerHeight * 0.08,window.innerWidth * 0.08));
var root = document.documentElement;

updatesq();

$(window).resize(function() {
    updatesq();
});

function updatesq(){
    x = Math.round(window.innerWidth - 2 * Math.min(window.innerHeight * 0.08,window.innerWidth * 0.08));
    y = Math.round(window.innerHeight - 2 * Math.min(window.innerHeight * 0.08,window.innerWidth * 0.08));
    root.style.setProperty('--x', String(x) + 'px');
    root.style.setProperty('--y', String(y) + 'px');
    root.style.setProperty('--top', String(Math.round(Math.min(window.innerHeight * 0.05,window.innerWidth * 0.05))) + 'px');

    document.querySelector('#window').innerHTML = String(x) + ' ' + String(y);
}