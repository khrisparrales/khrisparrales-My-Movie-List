import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  constructor(private http: HttpClient) {}
  getMovies(number: any) {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=2ec9323401793e5a207687ea4612d147&language=es-MX&page=' +
        number
    );
  }
  getGenders(type: any) {
    return this.http.get(
      'https://api.themoviedb.org/3/genre/' +
        type +
        '/list?api_key=2ec9323401793e5a207687ea4612d147&language=es-MX'
    );
  }
  getSession_id() {
    return this.http.get(
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=2ec9323401793e5a207687ea4612d147'
    );
  }
}
