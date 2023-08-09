import { Cell } from "./cell";

const FLEX_SIZE = 4;
const CELLS_COUNT = FLEX_SIZE * FLEX_SIZE;

export class Flex {
    cells;
    cellsGroupedByColumn: Cell[][];
    cellsGroupedByReversedColumn: Cell[][];
    cellsGroupedByRow: Cell[][];
    cellsGroupedByReversedRow: Cell[][];
    constructor(flexElement: HTMLElement) {
        this.cells = [];
        for (let i = 0; i < CELLS_COUNT; i++) {
            this.cells.push(
                new Cell(flexElement, i % FLEX_SIZE, Math.floor(i / FLEX_SIZE))
            )
        }
        this.cellsGroupedByColumn = this.groupCellsByColumn();
        this.cellsGroupedByReversedColumn = this.cellsGroupedByColumn.map(column => [...column].reverse());
        this.cellsGroupedByRow = this.groupCellsByRow();
        this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map(row => [...row].reverse())
    }

    getRandomEmptyCell() {
        const emptyCells = this.cells.filter(cell => cell.isEmpty());
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    groupCellsByColumn() {
        return this.cells.reduce((groupedCells: Cell[][], cell) => {
            groupedCells[cell.x] = groupedCells[cell.x] || [];
            groupedCells[cell.x][cell.y] = cell;
            return groupedCells
        }, [])
    }

    groupCellsByRow() {
        return this.cells.reduce((groupedCells: Cell[][], cell) => {
            groupedCells[cell.y] = groupedCells[cell.y] || [];
            groupedCells[cell.y][cell.x] = cell;
            return groupedCells
        }, [])
    }

    score(): number {
        let result = 0;
        for (let cell of this.cells) {
            if (!cell.linkedTile) continue;
            if (!cell.linkedTile?.value) continue;
            result +=cell.linkedTile?.value;
        }
        return result;
    }

}