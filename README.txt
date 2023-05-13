this program simulates a river cutting a path through a topology of cells

each cell has a height, which represents hills, etc.

the river starts on one cell at the top of the grid and continues to flow towards
adjacent cells with the least height that are not already occupied by the river

if the river cannot find an adjacent cell with lower height,
the river level rises until an adjacent cell has lower height than the current cell + river level

the river terminates when it reaches a cell at the bottom of the grid

