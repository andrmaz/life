import {expect, test} from 'vitest'
import {build, compute, count, draw} from './main'

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

test('should compute next generation according to previous one', () => {
  expect(
    compute([
      [0, 0, 1, 1],
      [1, 0, 0, 1],
      [0, 0, 0, 0],
      [1, 1, 0, 1],
    ])
  ).toEqual([
    [0, 0, 1, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 1],
  ])
})

test('should count living neighbors starting from the current position in a grid', () => {
  expect(
    count(
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
