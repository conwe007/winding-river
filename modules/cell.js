import {ctx, canvas} from '../main.js';

const STATE_ERROR = -1;
const STATE_GROUND = 0;
const STATE_RIVER = 1;

const COLOR_GROUND_RED_MIN = 8;
const COLOR_GROUND_GREEN_MIN = 5;
const COLOR_GROUND_BLUE_MIN = 3;
const COLOR_GROUND_RED_MAX = 83;
const COLOR_GROUND_GREEN_MAX = 51;
const COLOR_GROUND_BLUE_MAX = 30;
const COLOR_GROUND_RED_RANGE = COLOR_GROUND_RED_MAX - COLOR_GROUND_RED_MIN;
const COLOR_GROUND_GREEN_RANGE = COLOR_GROUND_GREEN_MAX - COLOR_GROUND_GREEN_MIN;
const COLOR_GROUND_BLUE_RANGE = COLOR_GROUND_BLUE_MAX - COLOR_GROUND_BLUE_MIN;

const COLOR_RIVER_RED = 0;
const COLOR_RIVER_GREEN = 150;
const COLOR_RIVER_BLUE = 255;

export default class Cell
{
    constructor(x, y, z, width, height)
    {
        this.x = x;
        this.y = y;
        this.z = z;

        this.width = width;
        this.height = height;

        this.red = COLOR_GROUND_RED_MIN;
        this.green = COLOR_GROUND_GREEN_MIN;
        this.blue = COLOR_GROUND_BLUE_MIN;

        this.state = STATE_GROUND;
    }


    isNew()
    {
        return this.state == STATE_ERROR;
    }

    isGround()
    {
        return this.state == STATE_GROUND;
    }

    isRiver()
    {
        return this.state == STATE_RIVER;
    }

    setGround()
    {
        this.state = STATE_GROUND;
    }

    setRiver()
    {
        this.state = STATE_RIVER;
    }


    // sets the color based on where the tile lays between the minimum and maximum z dimension
    setColor(z_min, z_max)
    {
        if(this.state == STATE_GROUND)
        {
            const z_range = z_max - z_min;
            this.red = COLOR_GROUND_RED_MIN + Math.floor((this.z - z_min) * COLOR_GROUND_RED_RANGE / z_range);
            this.green = COLOR_GROUND_GREEN_MIN + Math.floor((this.z - z_min) * COLOR_GROUND_GREEN_RANGE / z_range);
            this.blue = COLOR_GROUND_BLUE_MIN + Math.floor((this.z - z_min) * COLOR_GROUND_BLUE_RANGE / z_range);
        }
        else if(this.state == STATE_RIVER)
        {
            this.red = COLOR_RIVER_RED;
            this.green = COLOR_RIVER_GREEN;
            this.blue = COLOR_RIVER_BLUE;
        }
    }

    draw()
    {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(${this.red}, ${this.green}, ${this.blue})';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    toString()
    {

    }
}
