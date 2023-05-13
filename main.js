import Cell from './modules/cell.js';
import Grid from './modules/grid.js';

const TIME_DELAY = 333;

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;//window.innerWidth;
canvas.height = 1024;//window.innerHeight;

ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let counter = 0;

const grid = new Grid();
grid.initialize();
grid.draw();


function loop()
{
    const time_start = Date.now();

    grid.setNextRiverNode();
    grid.draw();

    counter++;
    if(counter > 1000)
    {

        counter = 0;
    }

    while(Date.now() < time_start + TIME_DELAY);

    requestAnimationFrame(loop);
}

loop();

export {ctx, canvas};
