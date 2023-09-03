import {Generation, GenerationState} from '../types'

/**
 * @param  {Generation} grid a populated generation
 * @returns the count of living cells
 */
function countLiveCells(grid: Generation) {
  return grid.length > 1
    ? grid
        .map(axis =>
          axis
            .filter(state => state == GenerationState.alive)
            .reduce((acc, curr) => acc + curr, 0)
        )
        .reduce((acc, curr) => acc + curr, 0)
    : 0
}

/**
 * @param  {number} state the current state of the cell
 * @param  {number} neighbors the count of living neighbors
 * @returns true if the cell should live
 */
function live(state: number, neighbors: number): boolean {
  return died(state) && neighbors == 3
}

function died(state: number): state is 0 {
  return state == GenerationState.dead
}

/**
 * @param  {number} state the current state of the cell
 * @param  {number} neighbors  the count of living neighbors
 * @returns true if the cell should die
 */
function die(state: number, neighbors: number): boolean {
  return alive(state) && (neighbors < 2 || neighbors > 3)
}

function alive(state: number): state is 1 {
  return state == GenerationState.alive
}

/**
 * @param  {number} row the current row
 * @param  {number} rows the count of the rows
 * @param  {number} col the current column
 * @param  {number} cols the count of the columns
 * @returns true if the current cell is on the edge
 */
function edge(row: number, rows: number, col: number, cols: number): boolean {
  return isFirst(row) || isLast(row, rows) || isFirst(col) || isLast(col, cols)
}

function isFirst(curr: number) {
  return curr == 0
}

function isLast(curr: number, length: number) {
  return curr == length - 1
}

function removeLine(text: string): string {
  return text.slice(text.indexOf('\n') + 1, text.length)
}

export {edge, die, live, countLiveCells, removeLine}
