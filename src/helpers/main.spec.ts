import {expect, test} from 'vitest'
import {
  build,
  compute,
  countLiveNeighbors,
  draw,
  parse,
  readCols,
  readRows,
} from './main'

test('should build a two dimensional grid by input generation size', () => {
  expect(build(3, 3)).toEqual(new Array(3).fill(new Array(3)))
})

test('should draw the grid according to the initial population state', () => {
  expect(
    draw(new Array(3).fill(new Array(3)), new Array(3).fill(['.', '*', '.']))
  ).toEqual([
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ])
})

test('should parse the initial population state from a text input', () => {
  expect(
    parse(
      'Generation 3:\n4 8\n. . . . . . . .\n. . . . * . . .\n. . . * * . . .\n . . . . . . . .'
    )
  ).toEqual([
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '*', '.', '.', '.'],
    ['.', '.', '.', '*', '*', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
  ])
})

test('should compute next generation according to previous one', () => {
  expect(
    compute([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ])
  ).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ])
})

test('should count living neighbors starting from the current position in a grid', () => {
  expect(
    countLiveNeighbors(
      [
        [0, 0, 1],
        [1, 0, 0],
        [0, 1, 0],
      ],
      1,
      1
    )
  ).toBe(3)
})

test('should read a one integer row count from a text input', () => {
  expect(
    readRows(
      'Generation 3:\n4 8\n. . . . . . . .\n. . . . * . . .\n. . . * * . . .\n . . . . . . . .'
    )
  ).toBe(4)
})

test('should read a two integer row count from a text input', () => {
  expect(
    readRows(
      'Generation 3:\n11 8\n. . . . . . . .\n. . . . * . . .\n. . . * * . . .\n . . . . . . . .'
    )
  ).toBe(11)
})

test('should read a one integer col count from a text input', () => {
  expect(
    readCols(
      'Generation 3:\n4 8\n. . . . . . . .\n. . . . * . . .\n. . . * * . . .\n . . . . . . . .'
    )
  ).toBe(8)
})

test('should read a one integer col count from a text input', () => {
  expect(
    readCols(
      'Generation 3:\n4 11\n. . . . . . . .\n. . . . * . . .\n. . . * * . . .\n . . . . . . . .'
    )
  ).toBe(11)
})
