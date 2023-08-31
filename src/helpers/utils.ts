/**
 * @param  {number} state the current state of the cell
 * @param  {number} neighbors the count of living neighbors
 * @returns true if the cell should live
 */
function live(state: number, neighbors: number): boolean {
  return died(state) && neighbors == 3
}

function died(state: number): state is 0 {
  return state == 0
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
  return state == 1
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

export {edge, die, live}
