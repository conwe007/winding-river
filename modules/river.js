import Cell from './cell.js';

export default class River
{
    constructor(cell)
    {
        this.cells = [];
        this.cells.unshift(cell);
        cell.setRiver();
    }

    add(cell)
    {
        this.cells.unshift(cell);
        cell.setRiver();
    }

    toString()
    {

    }
}
