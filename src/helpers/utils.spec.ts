import {expect, test} from 'vitest'
import {die, edge, live} from './utils'

test('should fill current cell when it is died and neighbors count equals 3', () => {
  expect(live(0, 3)).toBeTruthy()
})

test('should not fill current cell when it is died and neighbors count different than 3', () => {
  expect(live(0, 2)).toBeFalsy()
})

test('should clear current cell when it is alive and neighbors count less than 2', () => {
  expect(die(1, 1)).toBeTruthy()
})

test('should clear current cell when it is alive and neighbors count greater than 3', () => {
  expect(die(1, 4)).toBeTruthy()
})

test('should not clear current cell when it is alive and neighbors count equal 3', () => {
  expect(die(1, 3)).toBeFalsy()
})

test('should detect if current cell is on the first row', () => {
  expect(edge(0, 4, 2, 4)).toBeTruthy()
})

test('should detect if current cell is on the first column', () => {
  expect(edge(3, 4, 0, 4)).toBeTruthy()
})

test('should detect if current cell is on the last row', () => {
  expect(edge(3, 4, 2, 4)).toBeTruthy()
})

test('should detect if current cell is on the last column', () => {
  expect(edge(1, 4, 3, 4)).toBeTruthy()
})
