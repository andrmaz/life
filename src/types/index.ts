export type Population = string[][]
export type Generation = number[][]

export const PopulationState = {alive: '*', dead: '.'} as const
export const GenerationState = {alive: 1, dead: 0} as const
