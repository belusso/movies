// schemas StudiosWithWinCount
export class StudiosWithWinCountResponse {
  studios: Array<StudiosWithWinCount> = []
}

export class StudiosWithWinCount {
  name: string = ''
  winCount: number = 0
}
