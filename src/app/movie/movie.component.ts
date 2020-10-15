import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB:any[]=[];
  title: String = "";
  year:number;
  section = 2;
  id:number;
  moviesItem:any[]=[];
  actorItem:any[]=[];
  actorsDB:any[]=[];
  zzdb:any[]=[];
  movieID: string = "";
  actorID: string = ""; 

  constructor(private dbService: DatabaseService) { }
  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
    this.final()
   
  }

//get actors --> Observables
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onSaveMovie() {
    let obj = { title: this.title,year:this.year };
    this.dbService.createMovies(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  onDeleteMovies(item){
    console.log(item._id)
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }


//   delByYear:function(req,res){
//     Movie.deleteMany({year:{$gt:req.body.year2},year:{$lt:req.body.year1}},function(err,movie){
//         res.json(movie);
//     })
// },
  onDeleteMovieaYear(year){
    year = this.year;
    console.log(year)
    this.dbService.deleteMovieaYear(year).subscribe(result => {
      this.onGetMovies();
    });
  }
  onSelectMovies(movieItem){
    this.movieID = movieItem._id;
    this.dbService.selectMovie(movieItem._id).subscribe(result => {
      console.log(movieItem)
      // this.moviesItem.push(movieItem);
      // this.zzdb.push(movieItem)
      console.log(this.moviesItem);
      console.log(this.zzdb);
    });
  }
  

  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      console.log(data)
      this.actorsDB = data;
    });
  }

  onSelectActor(actorItem){
    this.actorID = actorItem._id;
    // let obj = {movieID: this.movieID,actorID: this.actorID,movieName:this.movieName}
    // this.zzdb.push(obj);
    this.dbService.selectActor(actorItem._id).subscribe(result => {
      console.log(actorItem)
      // this.actorItem.push(actorItem);
      this.zzdb.push({actorID: this.actorID, movieID: this.movieID})
      // console.log(this.zzdb);
    });
  }

  onAddActor(mid,aid){
    this.dbService.addActor(mid,aid).subscribe(result => {
      console.log(result)
      this.onGetMovies() 
    });
  }








  
  changeSection(id){
    this.section = id;
  }
 
  changeClass(id){
    if (id ==this.section)
    return "btn-primary";
    else return "btn-danger";
  }
  final(){
    console.log(this.zzdb)

  }
}
