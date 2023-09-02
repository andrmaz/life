import {
  Generation,
  GenerationState,
  Population,
  PopulationState,
} from '../types'
import {die, edge, live, removeLine} from './utils'

/**
 * @param  {number} cols the count of the columns
 * @param  {number} rows the count of the rows
 * @returns the initial empty generation
 */
function build(cols: number, rows: number): Generation {
  const min = 1
  const grid: Generation = new Array(Math.max(min, rows))
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(Math.max(min, cols))
  }
  return grid
}

/**
 * @param  {Generation} grid  the initial empty generation
 * @param  {Population} input the initial population state
 * @returns the generation populated by initial state
 */
function draw(grid: Generation, input: Population): Generation {
  const rows = grid.length
  const cols = grid[0].length
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] =
        input[i][j] == PopulationState.alive
          ? GenerationState.alive
          : GenerationState.dead
    }
  }
  return grid
}

/**
 * @param  {string} text the input text file content
 * @returns the initial population state
 */
function parse(text: string): Population {
  text = removeLine(removeLine(text))
  return text.length
    ? text
        .split('')
        .filter(
          char =>
            char == PopulationState.dead ||
            char == PopulationState.alive ||
            char == '\n'
        )
        .toString()
        .split('\n')
        .map(str =>
          str
            .split('')
            .filter(
              char =>
                char == PopulationState.dead || char == PopulationState.alive
            )
        )
    : [[]]
}

/**
 * @param  {Generation} grid the previous populated generation
 * @returns the next populated generation
 */
function compute(grid: Generation): Generation {
  const rows = grid.length
  const cols = grid[0].length
  const next = build(cols, rows)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (edge(i, rows, j, cols)) {
        next[i][j] = grid[i][j]
      } else {
        const neighbors = countLiveNeighbors(grid, i, j)
        const state = grid[i][j]
        if (live(state, neighbors)) {
          next[i][j] = GenerationState.alive
        } else if (die(state, neighbors)) {
          next[i][j] = GenerationState.dead
        } else {
          next[i][j] = state
        }
      }
    }
  }
  return next
}

/**
 * @param  {Generation} grid a populated generation
 * @param  {number} row the current row
 * @param  {number} col the current col
 * @returns the count of living neighbors
 */
function countLiveNeighbors(
  grid: Generation,
  row: number,
  col: number
): number {
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

/**
 * @param  {string} text the input text file content
 * @returns the count of the rows
 */
function readRows(text: string): number {
  if (text.length < 1) return 0
  text = removeLine(text)
  const count = text.slice(0, text.indexOf(' '))
  if (!count) {
    throw new Error('Error reading rows count from file')
  }
  return parseInt(count)
}

/**
 * @param  {string} text the input text file content
 * @returns the count of the cols
 */
function readCols(text: string): number {
  if (text.length < 1) return 0
  text = removeLine(text)
  const count = text.slice(text.indexOf(' ') + 1, text.indexOf('\n')).trim()
  if (!count) {
    throw new Error('Error reading cols count from file')
  }
  return parseInt(count)
}

export {parse, build, draw, compute, countLiveNeighbors, readRows, readCols}
