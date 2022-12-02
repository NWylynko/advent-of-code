import { DRAW, LOST, WIN, YourPlay, games, OpponentsPlay } from "./task1"

const outcomes = {
  LOSS: LOST,
  DRAW: DRAW,
  WIN: WIN
}

const possiblePlays = {
  ROCK: {DRAW: "ROCK", WIN: "PAPER", LOSS: "SCISSORS"},
  PAPER: {DRAW: "PAPER", WIN: "SCISSORS", LOSS: "ROCK"},
  SCISSORS: {DRAW: "SCISSORS", WIN: "ROCK", LOSS: "PAPER"},
} as const

const decode = (game: string) => {
  const [opponentsPlay, outcomeLetter] = game.split(' ') as [OpponentsPlay, YourPlay]

  const plays = {
    A: "ROCK",
    B: "PAPER",
    C: "SCISSORS"
  } as const
  const play = plays[opponentsPlay]

  const outcomes = {
    X: "LOSS",
    Y: "DRAW",
    Z: "WIN"
  } as const
  const outcome = outcomes[outcomeLetter]

  return {
    play,
    outcome
  }
}

const plays = {
  "ROCK": 1,
  "PAPER": 2,
  "SCISSORS": 3,
}

const score = games.reduce((score, game) => {

  const { play, outcome } = decode(game)

  const ourPlay = possiblePlays[play][outcome]
  const outcomeScore = outcomes[outcome]

  return score + outcomeScore + plays[ourPlay]
}, 0)

console.log({ score })