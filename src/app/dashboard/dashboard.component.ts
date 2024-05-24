import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgFor } from '@angular/common';
import { MovieService } from '../service/movie.service';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { YearsWithMultipleWinners } from '../models/years-with-multiple-winners.models';
import { StudiosWithWinCount } from '../models/studios-with-win-count.models';
import { MaxMinWinIntervalForProducers } from '../models/max-min-interval-for-producers.models';
import { WinnersByYear } from '../models/winners-by-year.models';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzCardModule,
    NzGridModule,
    NzTableModule,
    NgFor,
    NzInputNumberModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  host: { ngSkipHydration: 'true' },
})
export class DashboardComponent implements OnInit {

  // Table 1
  yearsWithMultipleWinners = {
    data: new Array<YearsWithMultipleWinners>(),
    loading: false
  }

  // Table 2
  studiosWithWinCount = {
    data: new Array<StudiosWithWinCount>(),
    loading: false
  }

  // Table 3
  winIntervalForProducers = {
    max: new Array<MaxMinWinIntervalForProducers>(),
    min: new Array<MaxMinWinIntervalForProducers>(),
    loading: false
  }

  // Table 4
  yearsMoviesWinnerByYear = {
    data: new Array<WinnersByYear>(),
    filter: null as null | number,
    loading: false
  }

  constructor(private movieService: MovieService) { }

  loadYearsWithMultipleWinners() {
    this.yearsWithMultipleWinners.loading = true
    this.movieService.getYearsWithMultipleWinners().subscribe((response) => {
      this.yearsWithMultipleWinners.loading = false
      this.yearsWithMultipleWinners.data = response?.years || []
    }, (error) => {
      this.yearsWithMultipleWinners.loading = false
      console.error(`Error -> getYearsWithMultipleWinners ${error.message}`)
    })
  }

  loadWinIntervalForProducers() {
    this.winIntervalForProducers.loading = true
    this.movieService.getMaxMinWinIntervalForProducers().subscribe({
      next: (response) => {
        this.winIntervalForProducers.loading = false
        this.winIntervalForProducers.max = response?.max || []
        this.winIntervalForProducers.min = response?.min || []
      }, error: (error) => {
        this.winIntervalForProducers.loading = false
        console.error(`Error -> getMaxMinWinIntervalForProducers ${error.message}`)
      }
    })
  }

  loadStudiosWithWinCount() {
    this.studiosWithWinCount.loading = true
    this.movieService.getStudiosWithWinCount().subscribe({
      next: (response) => {
        this.studiosWithWinCount.loading = false
        const studios = response.studios || []
        // Ordenando e pegando os 3 primeiros
        const sorted = studios.sort((a, b) => a.winCount + b.winCount);
        this.studiosWithWinCount.data = sorted.slice(0, 3)
      }, error: (error) => {
        this.studiosWithWinCount.loading = false
        console.error(`Error -> getStudiosWithWinCount ${error.message}`)
      }
    })
  }

  loadYearsMoviesWinnerByYear() {
    if (this.yearsMoviesWinnerByYear.filter) {
      this.yearsMoviesWinnerByYear.loading = true
      this.movieService.getWinnersByYear(this.yearsMoviesWinnerByYear.filter).subscribe({
        next: (response) => {
          this.yearsMoviesWinnerByYear.loading = false
          this.yearsMoviesWinnerByYear.data = response
        }, error: (error) => {
          this.yearsMoviesWinnerByYear.loading = false
          console.error(`Error -> getWinnersByYear ${error.message}`)
        }
      })
    }
  }

  ngOnInit(): void {
    this.loadYearsWithMultipleWinners()
    this.loadWinIntervalForProducers()
    this.loadStudiosWithWinCount()
  }

}
