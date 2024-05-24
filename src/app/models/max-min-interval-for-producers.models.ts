// schemas MaxMinWinIntervalForProducers
export class MaxMinWinIntervalForProducersResponse {
  max: Array<MaxMinWinIntervalForProducers> = []
  min: Array<MaxMinWinIntervalForProducers> = []
}

export class MaxMinWinIntervalForProducers {
  followingWin: number = 0
  interval: number = 0
  previousWin: number = 0
  producer: string = ''
}
