import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { 
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';
import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  heroes$?: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
