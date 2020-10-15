import { Injectable } from '@angular/core';

import{HttpClient,HttpHeaders} from "@angular/common/http"; //

const httpOptions = { //body
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {//

  constructor(private http: HttpClient) { }

  getActors(){
    return this.http.get('/actors')
  }

  createActor(actor){
    return this.http.post('/actors', actor ,httpOptions)
    
  }
  updateActor(aid, data) {
    let url = "/actors/" + aid;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  getMovies(){
    return this.http.get('/movies')
  }

  createMovies(movies){
    return this.http.post('/movies', movies ,httpOptions)
    
  }
  deleteMovie(id){
    let url = "/deleteMovies/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieaYear(year){
    let url = "/deleteMoviesByYear/" + year;
    return this.http.delete(url, httpOptions);
  }

  selectMovie(id){
    let url = "/moviesid/" + id;
    return this.http.get(url, httpOptions);
  }

  selectActor(id){
    let url = "/actorsid/" + id;
    return this.http.get(url, httpOptions);
  }

  addActor(mid,aid){
    let url = "/movies/" + mid+ "/" + aid ;
    return this.http.post(url, httpOptions);
  }



  




}
