// schemas Movie
export class MoviesResponse {
  content: Array<Movies> = []
  totalPages: number = 0
  totalElements: number = 0
  size: number = 0
  number: number = 0
}

export class Movies {
  id: number = 0
  year: number = 0
  title: string = ''
  studios: Array<string> = []
  producers: Array<string> = []
  winner: boolean = false
}