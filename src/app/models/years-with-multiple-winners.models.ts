// schemas YearsWithMultipleWinners
export class YearsWithMultipleWinnersResponse {
  years: Array<YearsWithMultipleWinners> = []
}

export class YearsWithMultipleWinners {
  winnerCount: number = 0
  year: number = 0
}
