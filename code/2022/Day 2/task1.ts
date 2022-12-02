import { input } from "./input"

const plays = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors

  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
}

export const LOST = 0
export const DRAW = 3
export const WIN = 6

export const wins = {
  A: {X: DRAW, Y: WIN, Z: LOST},
  B: {X: LOST, Y: DRAW, Z: WIN},
  C: {X: WIN, Y: LOST, Z: DRAW},
}

export type OpponentsPlay = keyof typeof wins
export type YourPlay = keyof typeof wins[OpponentsPlay]


const newLine = '\n'
export const games = input.split(newLine)

const scoreGame = (opponentsPlay: OpponentsPlay, yourPlay: YourPlay): number => {

  const outcomeScore = wins[opponentsPlay][yourPlay]

  return outcomeScore + plays[yourPlay]

}

const score = games.reduce((score, game) => {

  const [opponentsPlay, yourPlay] = game.split(' ') as [OpponentsPlay, YourPlay]

  const gameScore = scoreGame(opponentsPlay, yourPlay)

  return score + gameScore
}, 0)

console.log({ score })