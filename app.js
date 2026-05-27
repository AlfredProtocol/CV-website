const matrix = document.getElementById("matrix");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MAX_MATRIX_LINES = window.innerWidth <= 768 ? 8 : 14;
const MATRIX_INTERVAL = window.innerWidth <= 768 ? 900 : 650;

const fragments = [
    "010101",
    "sudo",
    "ssh",
    "nmap",
    "root@box",
    "{auth}",
    "</dev>",
    "0xAF12",
    "[scan]",
    "SELECT *",
    "while(true)",
    "tcpdump"
];

let matrixTimer = null;

function randomFragment() {
    return fragments[Math.floor(Math.random() * fragments.length)];
}

function buildMatrixLine() {
    const length = 2 + Math.floor(Math.random() * 3);
    return Array.from({ length }, randomFragment).join(" ");
}

function spawnMatrixLine() {
    if (!matrix || document.hidden) {
        return;
    }

    if (matrix.childElementCount >= MAX_MATRIX_LINES) {
        matrix.firstElementChild?.remove();
    }

    const line = document.createElement("span");
    line.className = "line";
    line.textContent = buildMatrixLine();
    line.style.left = `${Math.random() * 100}vw`;
    line.style.animationDuration = `${7 + Math.random() * 5}s`;
    line.style.fontSize = `${14 + Math.random() * 12}px`;
    line.style.opacity = `${0.14 + Math.random() * 0.18}`;

    matrix.appendChild(line);

    line.addEventListener(
        "animationend",
        () => {
            line.remove();
        },
        { once: true }
    );
}

function startMatrix() {
    if (!matrix || prefersReducedMotion || matrixTimer) {
        return;
    }

    for (let i = 0; i < Math.min(6, MAX_MATRIX_LINES); i += 1) {
        window.setTimeout(spawnMatrixLine, i * 250);
    }

    matrixTimer = window.setInterval(spawnMatrixLine, MATRIX_INTERVAL);
}

function stopMatrix() {
    if (matrixTimer) {
        window.clearInterval(matrixTimer);
        matrixTimer = null;
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopMatrix();
        return;
    }

    startMatrix();
});

if (matrix) {
    startMatrix();
}
