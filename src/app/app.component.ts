import { Component, OnInit } from '@angular/core';
import { correctData, invalidData } from './utils/data';
import * as E from 'fp-ts/Either';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'lsports';

  public data: E.Either<Error, SportEvent[]> = E.left(new Error('Data not loaded yet!'));

  async ngOnInit() {
    this.data = await correctData();
  }
}
