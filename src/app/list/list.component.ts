import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgFor } from '@angular/common';
import { Movies } from '../models/movies.models';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NzGridModule,
    NzCardModule,
    FormsModule,
    NzTableModule,
    NgFor,
    NzInputNumberModule,
    NzSelectModule,
    HttpClientModule,
  ],
  templateUrl: './list.component.html',
  host: { ngSkipHydration: 'true' },
})
export class ListComponent {

  moviesList: Array<Movies> = []
  timeout: any = null
  loading = false

  filters = {
    year: null,
    winner: null,
  }

  pagination = {
    total: 1,
    size: 15,
    page: 1
  }

  yesOrNo = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ];

  constructor(private movieService: MovieService) { }

  loadData() {
    this.loading = true
    this.movieService.getMovies(
      this.pagination.page,
      this.pagination.size,
      {
        winner: this.filters.winner,
        year: this.filters.year
      }
    ).subscribe({
      next: (response) => {
        this.loading = false;
        this.pagination.total = response?.totalElements || 0
        this.moviesList = response?.content || []
      }, error: (error) => {
        this.loading = false
        console.error(`Error -> getMovies ${error.message}`)
      }
    })
  }

  onFilterChange() {
    // timeout para fazer a busca após 500 milisegundos sem alterar o filtro
    // para evitar varias buscas enquanto usuario esta digitando 
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.onParamsChange()
    }, 500)
  }

  onParamsChange(params?: NzTableQueryParams): void {
    if (params) {
      this.pagination.page = params.pageIndex
    }
    this.loadData()
  }
}

