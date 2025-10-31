document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const spotlightCenterX = (mouseX / window.innerWidth) * 100;
  const spotlightCenterY = (mouseY / window.innerHeight) * 100;

  const revealedArea = document.querySelector(".revealedArea");
  revealedArea.style.background = `radial-gradient(
        circle 50vh at ${spotlightCenterX}% ${spotlightCenterY}%, transparent 10%, rgba(0, 0, 0, 0.98)
    )`;
});

class FloatingLink {
  constructor(id) {
    this.element = document.getElementById(id);
    this.x = Math.round(Math.random() * window.innerWidth);
    this.y = Math.round(Math.random() * window.innerHeight);
    this.dx = Math.random() > 0.5 ? 1 : -1;
    this.dy = Math.random() > 0.5 ? 1 : -1;
  }

  updatePosition() {
    if (
      this.x <= 0 ||
      this.x + this.element.offsetWidth + 10 > window.innerWidth
    ) {
      this.dx *= -1;
      this.x = (this.x > window.innerWidth/2 ? window.innerWidth - this.element.offsetWidth - 10 : 10);
    }
    if (
      this.y <= 0 ||
      this.y + this.element.offsetHeight + 10 > window.innerHeight
    ) {
      this.dy *= -1;
      this.y = (this.y > window.innerHeight/2 ? window.innerHeight - this.element.offsetHeight - 10 : 10);
    }
    this.x += this.dx;
    this.y += this.dy;
  }
}
const floatingLinks = [];
function animate() {
    if (!fast) {
      return
    }
    for (const floatingLink of floatingLinks) {
      floatingLink.updatePosition();
      floatingLink.element.style.left = floatingLink.x + "px";
      floatingLink.element.style.top = floatingLink.y + "px";
    }
    requestAnimationFrame(animate);
  }

function toggleLight() {
  const lightToggle = document.getElementById("lightToggle");
  const newVal = !(lightToggle.value === "true");
  lightToggle.value = newVal;
  if (newVal) {
    document.getElementById("lightImage").src = "docs/assets/images/bulb_on.svg";
    document.getElementById("revealedArea").style.display = "none";
  } else {
    document.getElementById("lightImage").src = "docs/assets/images/bulb_off.svg";
    document.getElementById("revealedArea").style.display = "block";
  }
}

var fast = true;
function toggleSpeed() {
  const speedToggle = document.getElementById("speedToggle");
  const newVal = !(speedToggle.value === "true");
  speedToggle.value = newVal;
  if (newVal) {
    document.getElementById("speedImage").src = "docs/assets/images/hare.svg";
    fast = true;
    animate();
  } else {
    document.getElementById("speedImage").src = "docs/assets/images/snail.svg";
    fast = false;
  }
}

window.onload = function () {
  const elements = document.getElementsByClassName("floatingLink");
  for (var i = 0; i < elements.length; i++) {
    floatingLinks.push(new FloatingLink(elements[i].id));
  }
  animate();
};
