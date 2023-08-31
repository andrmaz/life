import {ResultingGeneration, InputGeneration} from '../types'
import {die, edge, live} from './utils'

/**
 * @param  {number} cols the count of the columns
 * @param  {number} rows the count of the rows
 * @returns an empty two dimensional array
 */
function build(cols: number, rows: number): ResultingGeneration {
  const grid: ResultingGeneration = new Array(rows)
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols)
  }
  return grid
}

/**
 * @param  {ResultingGeneration} grid a two dimensional array
 * @param  {InputGeneration} input the initial population state
 * @returns the two dimensional array populated by initial state
 */
function draw(
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

/**
 * @param  {ResultingGeneration} grid a populated two dimensional array
 * @returns the computed next generation
 */
function compute(grid: ResultingGeneration): ResultingGeneration {
  const rows = grid.length
  const cols = grid[0].length
  const next = build(cols, rows)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (edge(i, rows, j, cols)) {
        next[i][j] = grid[i][j]
      } else {
        const neighbors = count(grid, i, j)
        const state = grid[i][j]
        if (live(state, neighbors)) {
          next[i][j] = 1
        } else if (die(state, neighbors)) {
          next[i][j] = 0
        } else {
          next[i][j] = state
        }
      }
    }
  }
  return next
}

/**
 * @param  {ResultingGeneration} grid a populated two dimensional array
 * @param  {number} row the current row
 * @param  {number} col the current col
 * @returns the count of living neighbors
 */
function count(grid: ResultingGeneration, row: number, col: number): number {
  let sum = 0
  const prev = -1
  const next = 1
  for (let i = prev; i < next + 1; i++) {
    for (let j = prev; j < next + 1; j++) {
      sum += grid[row + i][col + j]
    }
  }
  sum -= grid[row][col]
  return sum
}

export {parse, build, draw, compute, count}
