import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MovieApiService } from './movie-api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  searchResults: Array<any>;
  myMovieList: Array<any>;

  constructor(private apiService: ApiService, private movieApiService: MovieApiService) { }

  getSearchResults(): any[] {
    return this.searchResults;
  }

  getMyMovieList(): any[] {
    return this.myMovieList;
  }

  async searchForMovies(searchTerm: string) {
    const response = await this.movieApiService.get(searchTerm);
    this.searchResults.length = 0;
    this.searchResults.push(...response.results);
  }

  async loadMovieList() {
    const results = await this.apiService.get();
    this.myMovieList.length = 0;
    this.myMovieList.push(...results);
  }

  async saveToList(movie: any) {
    this.apiService.post(movie);
    this.loadMovieList();
  }
}
