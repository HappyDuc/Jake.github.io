console.log("a");

document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const spotlightCenterX = (mouseX / window.innerWidth * 100);
    const spotlightCenterY = (mouseY / window.innerHeight * 100);

    const revealedArea = document.querySelector(".revealedArea");
    revealedArea.style.background = `radial-gradient(
        circle 50vh at ${spotlightCenterX}% ${spotlightCenterY}%, transparent 10%, rgba(0, 0, 0, 0.98)
    )`
})