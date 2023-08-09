import { Cell } from "./cell";
import { Flex } from "./flex";
import { Tile } from "./tile";
import '../style.css';

const gameBoard = document.getElementById("game-board") as HTMLElement;

const flex = new Flex(gameBoard);
flex.getRandomEmptyCell().linkTile(new Tile(gameBoard));
flex.getRandomEmptyCell().linkTile(new Tile(gameBoard));

setupInputOnce();

const score = document.getElementById('score') as HTMLElement;
score.textContent = `Общий счет: ${flex.score()}`;

function setupInputOnce() {
    window.addEventListener("keydown", handleInput, {once: true});
    
}

async function handleInput(event: any) {
    switch(event.key) {
        case "ArrowUp": {
            if (!canMoveUp()) {
                setupInputOnce();
                return;
            }
            await moveUp();
            break;
        }
        case "ArrowDown": {
            if (!canMoveDown()) {
                setupInputOnce();
                return;
            }
            await moveDown();
            break;
        }
        case "ArrowRight": {
            if (!canMoveRight()) {
                setupInputOnce();
                return;
            }
            await moveRight();
            break;
        }
        case "ArrowLeft": {
            if (!canMoveLeft()) {
                setupInputOnce();
                return;
            }
            await moveLeft()
            break;
        }
        default: {
            setupInputOnce();
            return;
        } 
    }

    const newTile = new Tile(gameBoard);
    flex.getRandomEmptyCell().linkTile(newTile);
    score.textContent = `Общий счет: ${flex.score()}`;
    if(!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        await newTile.waitForAnimationEnd();
        alert('Начните сначала');
        return
    }
    setupInputOnce();
}

async function moveUp() {
    await slideTiles(flex.cellsGroupedByColumn);
}

async function moveDown() {
    await slideTiles(flex.cellsGroupedByReversedColumn)
}

async function moveLeft() {
    await slideTiles(flex.cellsGroupedByRow)
}

async function moveRight() {
    await slideTiles(flex.cellsGroupedByReversedRow)
}

async function slideTiles(groupedCells: Cell[][]) {
    const promises: Promise<unknown>[] = [];
    groupedCells.forEach(group => slideTilesInGroup(group, promises));

    await Promise.all(promises);

    flex.cells.forEach(cell => {
        cell.hasTileForMerge() && cell.mergeTiles();
    })
}

function slideTilesInGroup(group: Cell[], promises:Promise<unknown>[]) {
    for (let i = 1; i < group.length; i++) {
        if (group[i].isEmpty()) {
          continue;
        }
    
        const cellWithTile = group[i];
    
        let targetCell;
        let j = i - 1;
        if (!cellWithTile.linkedTile) return;
        while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
          targetCell = group[j];
          j--;
        }
    
        if (!targetCell) {
          continue;
        }
    
        promises.push(cellWithTile.linkedTile.waitForTransitionEnd());
    
        if (targetCell.isEmpty()) {
          targetCell.linkTile(cellWithTile.linkedTile);
        } else {
          targetCell.linkTileForMerge(cellWithTile.linkedTile);
        }
    
        cellWithTile.unlinkTile();
    }
}

function canMoveUp() {
    return canMove(flex.cellsGroupedByColumn);
}

function canMoveDown() {
    return canMove(flex.cellsGroupedByReversedColumn);
}
function canMoveLeft() {
    return canMove(flex.cellsGroupedByRow);
}
function canMoveRight() {
    return canMove(flex.cellsGroupedByReversedRow);
}

function canMove(groupedCells: Cell[][]) {
    return groupedCells.some(group => canMoveInGroup(group))
}

function canMoveInGroup(group: Cell[]) {
    return group.some((cell, index) => {
        if (index === 0) {
            return false;
        }
        if (cell.isEmpty()) {
            return false;
        }
        const targetCell = group[index-1];
        if (!cell.linkedTile) return;
        return targetCell.canAccept(cell.linkedTile);
    })
}