class MatrixConfig {

    static MOBILE_BREAKPOINT = 768;

    static get maxLines() {
        return window.innerWidth <= this.MOBILE_BREAKPOINT
            ? 8
            : 14;
    }

    static get interval() {
        return window.innerWidth <= this.MOBILE_BREAKPOINT
            ? 900
            : 650;
    }

    static fragments = [

        "sudo",
        "ssh",
        "nmap -sV",
        "root@box",
        "0xAF12",
        "SELECT *",
        "while(true)",
        "tcpdump",
        "git push",
        "exploit.py",
        "127.0.0.1",
        "eth0",
        "python3",
        "systemctl",
        "netstat",
        "localhost"

    ];
}

class FragmentGenerator {

    constructor(fragments) {
        this.fragments = fragments;
    }

    randomFragment() {

        return this.fragments[
            Math.floor(
                Math.random() * this.fragments.length
            )
        ];
    }

    generateLine() {

        const length =
            2 + Math.floor(Math.random() * 4);

        return Array.from(
            { length },
            () => this.randomFragment()
        ).join(" ");
    }
}

class MatrixLine {

    constructor(content) {

        this.element =
            document.createElement("span");

        this.element.className = "line";

        this.element.textContent = content;

        this.applyStyles();

        this.registerEvents();
    }

    applyStyles() {

        this.element.style.left =
            `${Math.random() * 100}vw`;

        this.element.style.animationDuration =
            `${8 + Math.random() * 6}s`;

        this.element.style.fontSize =
            `${14 + Math.random() * 10}px`;

        this.element.style.opacity =
            `${0.08 + Math.random() * 0.12}`;
    }

    registerEvents() {

        this.element.addEventListener(
            "animationend",
            () => this.remove(),
            { once: true }
        );
    }

    render(parent) {
        parent.appendChild(this.element);
    }

    remove() {
        this.element.remove();
    }
}

class MatrixRenderer {

    constructor(container, generator) {

        this.container = container;

        this.generator = generator;

        this.intervalId = null;
    }

    createLine() {

        if (
            !this.container ||
            document.hidden
        ) {
            return;
        }

        this.cleanup();

        const content =
            this.generator.generateLine();

        const line =
            new MatrixLine(content);

        line.render(this.container);
    }

    cleanup() {

        while (
            this.container.childElementCount >=
            MatrixConfig.maxLines
        ) {
            this.container.firstElementChild?.remove();
        }
    }

    start() {

        if (this.intervalId) {
            return;
        }

        for (let i = 0; i < 5; i++) {

            window.setTimeout(
                () => this.createLine(),
                i * 220
            );
        }

        this.intervalId =
            window.setInterval(
                () => this.createLine(),
                MatrixConfig.interval
            );
    }

    stop() {

        if (!this.intervalId) {
            return;
        }

        clearInterval(this.intervalId);

        this.intervalId = null;
    }
}

class App {

    constructor() {

        this.matrixElement =
            document.getElementById("matrix");
    }

    initialize() {

        if (!this.matrixElement) {
            return;
        }

        const generator =
            new FragmentGenerator(
                MatrixConfig.fragments
            );

        const renderer =
            new MatrixRenderer(
                this.matrixElement,
                generator
            );

        renderer.start();
    }
}

const app = new App();

app.initialize();
