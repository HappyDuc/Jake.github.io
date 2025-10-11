class CelestialBody {
    constructor(name, x, y, xvel, yvel, radius, colour, mass, element, planetCollection) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.xvel = xvel;
        this.yvel = yvel;
        this.radius = radius;
        this.colour = colour;
        this.mass = mass;
        this.element = element;
        planetCollection.push(this);
    }
}

const AU = 149.6e6 * 1000;
const G = 6.67428e-11;
const SCALE = 250 / AU;
const TIMESTEP = 3600*24;

window.onload=function () {
    planets = []
    //                                 Name,        X,              Y, XVel,    YVel,           Radius, Colour,     Mass,               Element,                            Planet Collection
    const sol =     new CelestialBody("Sol",        0,              0, 0,       0,              30,     0xFF0,      1.98892 * 10**30,   document.getElementById("sol"),     planets)
    const earth =   new CelestialBody("Earth",      -1*AU,          0, 0,       29.783 * 1000,  16,     0x4C0,      5.9742 * 10**24,    document.getElementById("earth"),   planets);
    const mars =    new CelestialBody("Mars",       -1.524*AU,      0, 0,       24.077 * 1000,  12,     0x4C0,      6.39 * 10**23,      document.getElementById("earth"),   planets);
    const mercury = new CelestialBody("Mercury",    0.387*AU,       0, 0,       -47.4 * 1000,  8,       0x4C0,      3.30 * 10**23,      document.getElementById("earth"),   planets);
    const venus =   new CelestialBody("Venus",      0.723*AU,       0, 0,       -35.02 * 1000,  14,     0x4C0,      4.8685 * 10**24,    document.getElementById("earth"),   planets);
    //setInterval(function() {
    console.log("Working")
    //}, 10)
}
