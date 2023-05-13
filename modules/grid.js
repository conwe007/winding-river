import {ctx, canvas} from '../main.js';
import {randomInt, randomRGB} from './utilities.js';
import Cell from './cell.js';
import River from './river.js';

const NUM_ROWS = 128;
const NUM_COLS = 128;

const Z_DEFAULT = 100;
const Z_RANGE = 10;


export default class Grid
{
    constructor()
    {
        this.river = [];
        this.cells = [];

        for(let index_col = 0; index_col < NUM_COLS; index_col++)
        {
            this.cells[index_col] = [];

            for(let index_row = 0; index_row < NUM_ROWS; index_row++)
            {
                const cell_width = canvas.width / NUM_COLS;
                const cell_height = canvas.height / NUM_ROWS;
                const cell_x = index_col * cell_width;
                const cell_y = index_row * cell_height;

                this.cells[index_col][index_row] = new Cell(cell_x, cell_y, Z_DEFAULT, cell_width, cell_height);
            }
        }

        // set the first node of the river as a random cell in the top row
        this.river.push(this.cells[randomInt(0, NUM_COLS - 1)][0]);
        this.river[0].setRiver();
    }

    // set all cells to random z height and set colors
    initialize()
    {
        let z_min = Z_DEFAULT + Z_RANGE;
        let z_max = Z_DEFAULT - Z_RANGE;

        for(let index_col = 0; index_col < NUM_COLS; index_col++)
        {
            for(let index_row = 0; index_row < NUM_ROWS; index_row++)
            {
                // each cell is set to height Z_DEFAULT +/- Z_RANGE
                this.cells[index_col][index_row].z = Z_DEFAULT + randomInt(-1 * Z_RANGE, Z_RANGE);

                if(this.cells[index_col][index_row].z < z_min)
                {
                    z_min = this.cells[index_col][index_row].z;
                }

                if(this.cells[index_col][index_row].z > z_max)
                {
                    z_max = this.cells[index_col][index_row].z;
                }
            }
        }
        console.log(z_min + ',' + z_max);

        for(let index_col = 0; index_col < NUM_COLS; index_col++)
        {
            for(let index_row = 0; index_row < NUM_ROWS; index_row++)
            {
                this.cells[index_col][index_row].setColor(z_min, z_max);
                console.log(this.cells[index_col][index_row].red + ',' + this.cells[index_col][index_row].green + ',' + this.cells[index_col][index_row].blue);
            }
        }
    }



    draw()
    {
        for(let index_col = 0; index_col < NUM_COLS; index_col++)
        {
            for(let index_row = 0; index_row < NUM_ROWS; index_row++)
            {
                this.cells[index_col][index_row].draw();
            }
        }
    }



    toString()
    {

    }
}
