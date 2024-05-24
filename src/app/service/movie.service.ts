import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { YearsWithMultipleWinnersResponse } from "../models/years-with-multiple-winners.models";
import { MaxMinWinIntervalForProducersResponse } from "../models/max-min-interval-for-producers.models";
import { StudiosWithWinCountResponse } from "../models/studios-with-win-count.models";
import { WinnersByYear } from "../models/winners-by-year.models";
import { MoviesResponse } from "../models/movies.models";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private api = 'https://tools.texoit.com/backend-java/api/movies'

  constructor(private httpClient: HttpClient) { }

  getYearsWithMultipleWinners() {
    const params = { 'projection': 'years-with-multiple-winners' }
    return this.httpClient.get<YearsWithMultipleWinnersResponse>(this.api, { params })
  }

  getMaxMinWinIntervalForProducers() {
    const params = { 'projection': 'max-min-win-interval-for-producers' }
    return this.httpClient.get<MaxMinWinIntervalForProducersResponse>(this.api, { params })
  }

  getStudiosWithWinCount() {
    const params = { 'projection': 'studios-with-win-count' }
    return this.httpClient.get<StudiosWithWinCountResponse>(this.api, { params })
  }

  getWinnersByYear(year: number) {
    const params = { 'winner': true, year }
    return this.httpClient.get<Array<WinnersByYear>>(this.api, { params })
  }

  getMovies(
    page: number,
    size: number,
    filter: {
      winner: boolean | null;
      year: number | null
    }
  ) {
    const params: any = { page: page - 1, size }
    if (filter.winner !== null) {
      params.winner = filter.winner
    }
    if (Number(filter.year) > 0) {
      params.year = filter.year
    }
    return this.httpClient.get<MoviesResponse>(this.api, { params })
  }

}