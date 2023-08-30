import {ResultingGeneration, InputGeneration} from './types'

function build(cols: number, rows: number): ResultingGeneration {
  const grid: ResultingGeneration = new Array(rows)
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols)
  }
  return grid
}

function fill(
  grid: ResultingGeneration,
  input: InputGeneration
): ResultingGeneration {
  const rows = grid.length
  const cols = grid[0].length
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = input[i][j] == '*' ? 1 : 0
    }
  }
  return grid
}

function parse(rows: number): InputGeneration {
  const input: InputGeneration = new Array(rows)
  let line = 0
  while (line < rows) {
    input[line] = ['.', '*', '*', '.', '.', '*', '*', '.']
    line++
  }
  return input
}

function count(grid: ResultingGeneration, x: number, y: number): number {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      sum += grid[x + i][y + j]
    }
  }
  sum -= grid[x][y]
  return sum
}

function compute(grid: ResultingGeneration): ResultingGeneration {
  const rows = grid.length
  const cols = grid[0].length
  const next = build(cols, rows)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Edges
      if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
        next[i][j] = grid[i][j]
      } else {
        const neighbors = count(grid, i, j)
        const state = grid[i][j]
        // living
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1
          // dieing
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0
        } else {
          next[i][j] = state
        }
      }
    }
  }
  return next
}

export {parse, build, fill, count, compute}
