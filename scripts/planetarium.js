const AU = 149.6e6 * 1000;
const G = 6.67428e-11;
const SCALE = 500 / AU;
//const TIMESTEP = 3600 * 6;
const TIMESTEP = 3600 * 24;
const RIGHT = true;
const LEFT = false;

class CelestialBody {
  constructor(
    name,
    x,
    y,
    xvel,
    yvel,
    radius,
    colour,
    mass,
    element,
    isShip,
    bodyCollection
  ) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.xvel = xvel;
    this.yvel = yvel;
    this.radius = radius;
    this.colour = colour;
    this.mass = mass;
    this.element = element;
    this.isShip = isShip;
    if (!isShip) {
      this.element.style.backgroundColor = this.colour;
      this.element.style.width = radius / 2;
      this.element.style.height = radius / 2;
      bodyCollection.push(this);
    }
  }

  attraction(other) {
    var other_x = other.x;
    var other_y = other.y;
    var distance_x = other_x - this.x;
    var distance_y = other_y - this.y;
    var distance = Math.sqrt(distance_x ** 2 + distance_y ** 2);

    //if other.sun:
    //    self.distance_to_sun = distance

    var force = (G * this.mass * other.mass) / distance ** 2;
    var theta = Math.atan2(distance_y, distance_x);
    var force_x = Math.cos(theta) * force;
    var force_y = Math.sin(theta) * force;
    return [force_x, force_y];
  }

  update_position(planets) {
    var total_fx = 0;
    var total_fy = 0;
    for (const planet of planets) {
      if (this === planet) {
        continue;
      }

      var [fx, fy] = this.attraction(planet);
      total_fx += fx;
      total_fy += fy;
    }

    this.xvel += (total_fx / this.mass) * TIMESTEP;
    this.yvel += (total_fy / this.mass) * TIMESTEP;
    this.x += this.xvel * TIMESTEP;
    this.y += this.yvel * TIMESTEP;
    //this.orbit.append((this.x, this.y));
  }
}

class Ship extends CelestialBody {
  constructor(
    name,
    x,
    y,
    xvel,
    yvel,
    radius,
    colour,
    mass,
    element,
    isShip,
    bodyCollection
  ) {
    super(name,
    x,
    y,
    xvel,
    yvel,
    radius,
    colour,
    mass,
    element,
    isShip,
    bodyCollection);
    this.image = document.getElementById("shipImage");
    this.angle = 0;
    }
    rotate(dir) {
      this.angle += (dir ? 2 : -2);
      if (this.angle < 0) {
        this.angle = 360 - this.angle;
      } else if (this.angle > 360) {
        this.angle = this.angle - 360
      }
    }
}

window.onload = function () {
  bodies = [];
  /*
  Name
  X
  Y
  XVel
  YVel
  Radius
  Colour
  Mass
  Element
  Planet Collection
  */
  const sol = new CelestialBody(
    "Sol",
    0,
    0,
    0,
    0,
    350,
    "#FD0",
    1.98892 * 10 ** 30,
    document.getElementById("sol"),
    false,
    bodies
  );
  const earth = new CelestialBody(
    "Earth",
    -1 * AU,
    0,
    0,
    29.783 * 1000,
    160,
    "#4C0",
    5.9742 * 10 ** 24,
    document.getElementById("earth"),
    false,
    bodies
  );
  const mars = new CelestialBody(
    "Mars",
    -1.524 * AU,
    0,
    0,
    24.077 * 1000,
    120,
    "#A40",
    6.39 * 10 ** 23,
    document.getElementById("mars"),
    false,
    bodies
  );
  const mercury = new CelestialBody(
    "Mercury",
    0.387 * AU,
    0,
    0,
    -47.4 * 1000,
    80,
    "#999",
    3.3 * 10 ** 23,
    document.getElementById("mercury"),
    false,
    bodies
  );
  const venus = new CelestialBody(
    "Venus",
    0.723 * AU,
    0,
    0,
    -35.02 * 1000,
    140,
    "#DB9",
    4.8685 * 10 ** 24,
    document.getElementById("venus"),
    false,
    bodies
  );
  const ship = new Ship(
    "Spaceship",
    AU,
    0,
    0,
    -35.02 * 1000,
    0,
    "#FFF",
    4.8685 * 10 ** 24,
    this.document.getElementById("spaceship"),
    true,
    bodies
  )

  const keys = {};
  document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
  });

  // Listen for key releases
  document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
  });

  setInterval(function () {
    for (const body of bodies) {
      body.update_position(bodies);
      body.element.style.left =
        body.x * SCALE + window.innerWidth / 2 - body.radius / 4;
      body.element.style.top =
        body.y * SCALE + window.innerHeight / 2 - body.radius / 4;
    }

    if (keys["ArrowLeft"] || keys["a"]) {
      ship.rotate(LEFT);
    }
    if (keys["ArrowRight"] || keys["d"]) {
      ship.rotate(RIGHT);
    }
    if (keys["ArrowUp"] || keys["w"]) {
      ship.image.src="../assets/images/spaceship_with_flame.png";
      var vector = Math.tan(ship.angle);
      console.log(vector);
      ship.y = ship.y + (SCALE * vector);
      ship.x = ship.x + (SCALE / vector);
    } else {
      ship.image.src="../assets/images/spaceship_no_flame.png";
    }
    ship.element.style.left =
      ship.x * SCALE + window.innerWidth / 2 - (25 / 2);
    ship.element.style.top =
      ship.y * SCALE + window.innerHeight / 2 - (88/2);
    ship.element.style.transform = `rotate(${ship.angle}deg)`;
  }, 17);
};
