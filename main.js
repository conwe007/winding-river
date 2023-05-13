import Cell from './modules/cell.js';
import Grid from './modules/grid.js';

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let counter = 0;

function loop()
{
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    

    counter++;
    if(counter > 1000)
    {

        counter = 0;
    }

    requestAnimationFrame(loop);
}

loop();

export {ctx, width, height};
