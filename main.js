import Cell from './modules/cell.js';
import Grid from './modules/grid.js';

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let counter = 0;

const grid = new Grid();
grid.initialize();


function loop()
{
    

    grid.draw();

    counter++;
    if(counter > 1000)
    {

        counter = 0;
    }

    requestAnimationFrame(loop);
}

loop();

export {ctx, canvas};
