[![Deploy static content to Pages](https://github.com/andrmaz/life/actions/workflows/pages-build-deployment.yml/badge.svg)](https://github.com/andrmaz/life/actions/workflows/pages-build-deployment.yml)

# Game of life

## Problem description

Given a input generation the goal of this kata is to calculate the next
generation. The world consists of a two dimensional grid of cells, where
each cell is either dead or alive. For the purpose of this kata let's assume
that the grid is finite and no life can exist off the edges.
Given a cell we define its eight neighbors as the cells that are horizontally,
vertically, or diagonally adjacent.
When calculating the next generation you should follow these rules:

- Any live cell with fewer than two live neighbors dies;
- Any live cell with two or three live neighbors lives on to the next
  generation;
- Any live cell with more than three live neighbors dies;
- Any dead cell with exactly three live neighbors becomes a live cell.

## Implementation

The initial state (the current generation) will be provided via a text file
that specifies:

- the current generation number;
- the grid size;
- the population state (\* represents a live cell, . represents a dead cell).

The sample files can be found in the [public directory](https://github.com/andrmaz/life/tree/main/public)
