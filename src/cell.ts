import { Tile } from "./tile";

export class Cell {
    x;
    y;
    linkedTile: Tile | undefined | null;
    linkedTileForMerge: Tile | undefined | null;
    constructor(flexElement: HTMLElement, x: number, y: number) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        flexElement.append(cell);
        this.x = x;
        this.y = y;
    }

    isEmpty() {
        return !this.linkedTile;
    }

    linkTile(tile: Tile) {
        tile.setXY(this.x, this.y);
        this.linkedTile = tile;
    }

    unlinkTile() {
        this.linkedTile = null;
    }

    linkTileForMerge(tile: Tile) {
        tile.setXY(this.x, this.y);
        this.linkedTileForMerge = tile;
    }

    canAccept(newTile: Tile) {
        return this.isEmpty() || (!this.hasTileForMerge() && this.linkedTile && this.linkedTile.value === newTile.value )
    }

    hasTileForMerge() {
        return !!this.linkedTileForMerge;
    }

    mergeTiles() {
        if (!this.linkedTile) return;
        if (!this.linkedTileForMerge) return;
        if (!this.linkedTile.value) return;
        if (!this.linkedTileForMerge.value) return;
        this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMerge.value);
        this.linkedTileForMerge.removeFromDOM();
        this.unlinkTileForMerge();
    }

    unlinkTileForMerge() {
        this.linkedTileForMerge = null;
    }
}