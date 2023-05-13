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
        this.river.unshift(this.cells[randomInt(0, NUM_COLS - 1)][randomInt(0, NUM_COLS - 1)]);
        this.river[0].setRiver();
        console.log(this.river[0].toString());
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

        for(let index_col = 0; index_col < NUM_COLS; index_col++)
        {
            for(let index_row = 0; index_row < NUM_ROWS; index_row++)
            {
                this.cells[index_col][index_row].setColor(z_min, z_max);
            }
        }
    }

    setNextRiverNode()
    {
        // last node of the current river
        const river_tail_index_x = Math.round(this.river[0].x / this.river[0].width);
        const river_tail_index_y = Math.round(this.river[0].y / this.river[0].height);
        const cell_max_z = new Cell();
        cell_max_z.z = Number.MAX_SAFE_INTEGER;

        let cell_lowest = null;
        let cell_left = null;
        let cell_right = null;
        let cell_up = null;
        let cell_down = null;

        if(river_tail_index_x <= 0)
        {
            cell_left = cell_max_z;
        }
        else
        {
            cell_left = this.cells[river_tail_index_x - 1][river_tail_index_y + 0];
        }
        
        if(river_tail_index_x >= NUM_COLS)
        {
            cell_right = cell_max_z;
        }
        else
        {
            cell_right = this.cells[river_tail_index_x + 1][river_tail_index_y + 0];
        }

        if(river_tail_index_y <= 0)
        {
            cell_up = cell_max_z;
        }
        else
        {
            cell_up = this.cells[river_tail_index_x + 0][river_tail_index_y - 1];
        }

        if(river_tail_index_y >= NUM_ROWS)
        {
            cell_down = cell_max_z;
        }
        else
        {
            cell_down = this.cells[river_tail_index_x + 0][river_tail_index_y + 1];
        }

        cell_lowest = cell_max_z;

        if(cell_left.isGround() && cell_left.z < cell_lowest)
        {
            cell_lowest = cell_left;
        }
        if(cell_up.isGround() && cell_up.z < cell_lowest)
        {
            cell_lowest = cell_up;
        }
        if(cell_right.isGround() && cell_right.z < cell_lowest)
        {
            cell_lowest = cell_right;
        }
        if(cell_down.isGround() && cell_down.z < cell_lowest)
        {
            cell_lowest = cell_down;
        }


        // // handle cases on the edge of the grid
        // if(river_tail.x <= 0)
        // {
        //     if(river_tail.y <= 0)
        //     {

        //     }
        //     else if(river_tail.y >= 0)
        //     {

        //     }
        //     else
        //     {

        //     }
        // }
        // else if(river_tail.x >= NUM_COLS)
        // {

        // }
        // else
        // {
        //     // find the lowest adjacent cell
        //     const cell_left = this.cells[river_tail.x - 1][river_tail.y + 0];
        //     const cell_right = this.cells[river_tail.x + 1][river_tail.y + 0];
        //     const cell_up = this.cells[river_tail.x + 0][river_tail.y - 1];
        //     const cell_down = this.cells[river_tail.x + 0][river_tail.y + 1];

        //     cell_lowest = cell_left;

        //     if(cell_up.isGround() && cell_up.z < cell_lowest)
        //     {
        //         cell_lowest = cell_up;
        //     }
        //     if(cell_up.isGround() && cell_right.z < cell_lowest)
        //     {
        //         cell_lowest = cell_right;
        //     }
        //     if(cell_up.isGround() && cell_down.z < cell_lowest)
        //     {
        //         cell_lowest = cell_down;
        //     }
        // }

        this.river.unshift(cell_lowest);
        this.river[0].setRiver();
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
