const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Initialize cube positions in grid
cubes.forEach((cube, index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);

    cube.style.left = col * 90 + "px";
    cube.style.top = row * 90 + "px";

    cube.addEventListener("mousedown", startDrag);
});

function startDrag(e) {
    activeCube = e.target;
    activeCube.style.cursor = "grabbing";

    const cubeRect = activeCube.getBoundingClientRect();

    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    document.addEventListener("mousemove", dragCube);
    document.addEventListener("mouseup", stopDrag);
}

function dragCube(e) {
    if (!activeCube) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = activeCube.getBoundingClientRect();

    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Boundary constraints
    const maxLeft = container.clientWidth - cubeRect.width;
    const maxTop = container.clientHeight - cubeRect.height;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    activeCube.style.left = newLeft + "px";
    activeCube.style.top = newTop + "px";
}

function stopDrag() {
    if (activeCube) {
        activeCube.style.cursor = "grab";
    }

    activeCube = null;
    document.removeEventListener("mousemove", dragCube);
    document.removeEventListener("mouseup", stopDrag);
}

