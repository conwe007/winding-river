// helper function, returns random int between max and min
function randomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// helper function, generates random color
function randomRGB()
{
    return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
}

export {randomInt, randomRGB};
