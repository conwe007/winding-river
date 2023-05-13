import {ctx, canvas} from '../main.js';
import {randomInt, randomRGB} from './utilities.js';
import Cell from './cell.js';

const NUM_ROWS = 128;
const NUM_COLS = 128;

const Z_DEFAULT = 100;
const Z_RANGE = 10;


export default class Grid
{
    constructor()
    {
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

        // x and y indexes of leading river cell
        this.index_x_river = randomInt(0, NUM_COLS - 1);
        this.index_y_river = randomInt(0, NUM_ROWS - 1);
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
        const z_max = Number.MAX_SAFE_INTEGER;

        let z_lowest = z_max;

        let z_left = z_max;
        let z_right = z_max;
        let z_up = z_max;
        let z_down = z_max;

        // bounds checking, do not let the river flow off-grid
        if(this.index_x_river > 0)
        {
            z_left = this.cells[this.index_x_river - 1][this.index_y_river + 0].z;
        }
        if(this.index_x_river < NUM_COLS - 1)
        {
            z_right = this.cells[this.index_x_river + 1][this.index_y_river + 0].z;
        }
        if(this.index_y_river > 0)
        {
            z_up = this.cells[this.index_x_river + 0][this.index_y_river - 1].z;
        }
        if(this.index_y_river < NUM_ROWS - 1)
        {
            z_down = this.cells[this.index_x_river + 0][this.index_y_river + 1].z;
        }

        // determine lowest z direction
        if(z_left < z_lowest)
        {
            if(this.cells[this.index_x_river - 1][this.index_y_river + 0].isGround())
            {
                z_lowest = z_left;
            }
        }
        if(z_up.z < z_lowest)
        {
            if(this.cells[this.index_x_river + 0][this.index_y_river - 1].isGround())
            {
                z_lowest = z_up;
            }
        }
        if(z_right < z_lowest)
        {
            if(this.cells[this.index_x_river + 1][this.index_y_river + 0].isGround())
            {
                z_lowest = z_right;
            }
        }
        if(z_down < z_lowest)
        {
            if(this.cells[this.index_x_river + 0][this.index_y_river + 1].isGround())
            {
                z_lowest = z_down;
            }
        }

        // set coordinates of leading river cell to lowest z direction
        if(z_lowest == z_left)
        {
            this.index_x_river--;
        }
        else if(z_lowest == z_right)
        {
            this.index_x_river++
        }
        else if(z_lowest == z_up)
        {
            this.index_y_river--;
        }
        else if(z_lowest == z_down)
        {
            this.index_y_river++;
        }

        this.cells[this.index_x_river][this.index_y_river].setRiver();
        console.log(this.cells[this.index_x_river][this.index_y_river].toString());
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
