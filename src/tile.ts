function adjustSize(number: number) {
    const length = Math.ceil(Math.log10(number + 1));
    const scaleFactor = 7.5 - (length * 0.5);
    return scaleFactor > 4.5 ? scaleFactor : 4.5;
}

export class Tile {
    tileElement;
    x: number | undefined;
    y: number | undefined;
    value: number | undefined;
    constructor(flexElement: HTMLElement) {
        this.tileElement = document.createElement("div");
        this.tileElement.classList.add('tile');

        this.setValue(Math.random() > 0.5 ? 2 :4);
        flexElement && flexElement.append(this.tileElement);
    }

    setXY(x: number,y: number) {
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty("--x", String(x));
        this.tileElement.style.setProperty("--y", String(y));
    }

    setValue(value: number) {
        this.value = value;
        this.tileElement.textContent = String(value);
        const bgLightness = 100 - Math.log2(value) * 5;
        this.tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
        this.tileElement.style.setProperty("--text-lightness", `${bgLightness < 50 ? 90 : 10}%`);
        this.tileElement.style.setProperty("--font-size", `${adjustSize(this.value)}vmin`)
    }

    removeFromDOM() {
        this.tileElement.remove()
    }

    waitForTransitionEnd() {
        return new Promise(resolve => {
            this.tileElement.addEventListener("transitionend", resolve, {once: true})
        })
    }

    waitForAnimationEnd() {
        return new Promise(resolve => {
            this.tileElement.addEventListener("animationend", resolve, {once: true})
        })
    }
}