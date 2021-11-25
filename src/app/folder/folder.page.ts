import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public Movies: any = [];
  public Genders: any = [];

  valdisprev: boolean = false;
  valdisnext: boolean = false;
  current = 1;
  nextpage = 2;
  prevpage = 3;
  total = 100;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tmdbs: TmdbService
  ) {
    this.getMovies(this.current);
    this.getGenders();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  //call service to get the movies
  getMovies(number: any) {
    this.tmdbs.getMovies(number).subscribe((data: any) => {
      if (data.total_pages > this.current) {
        this.current = data.page;
        this.nextpage = this.current + 1;
        this.prevpage = this.current - 1;
        this.total = data.total_pages;
        console.log(data);

        if (this.current <= 1) {
          this.valdisprev = true;
          this.valdisnext = false;
        } else if (this.current >= 2 && this.current < this.total) {
          this.valdisprev = false;
          this.valdisnext = false;
        } else if (this.current == this.total) {
          this.valdisprev = false;
          this.valdisnext = true;
        }

        this.Movies = data.results;
      }
    });
  }
  getGenders() {
    this.tmdbs.getGenders('movie').subscribe((data: any) => {
      console.log(data);
      this.Genders = data.genres;
    });
  }

  nextf() {
    if (this.nextpage <= this.total) {
      // this.nextpage++;
      this.getMovies(this.nextpage);
    }
  }
  prevf() {
    if (this.current <= this.total && this.current > 1) {
      this.current--;
      this.getMovies(this.current);
    }
  }
}
