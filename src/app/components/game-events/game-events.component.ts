import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, sort } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { contramap, Ord, ordDate } from 'fp-ts/lib/Ord';
import Utils from 'src/app/utils/utils';
import * as E from 'fp-ts/Either';
import { sequenceT } from 'fp-ts/es6/Apply';
import { columnsData, sportEventData } from 'src/app/utils/data';

@Component({
  selector: 'app-game-events',
  templateUrl: './game-events.component.html',
  styleUrls: ['./game-events.component.css']
})
export class GameEventsComponent implements OnInit {

  public tableData: E.Either<Error, TableInput<SportEvent>> = E.left(new Error('No data'));

  constructor() {
  }

  async ngOnInit() {
    // preparing data to be passed to the table
    this.tableData = pipe(
      sequenceT(E.Apply)(await sportEventData(), await columnsData()),
      E.map(([rows, cols]) => ({
        rows: rows,
        columns: cols,
        checkRows: this.gameCheck,
        rowNgClass: this.getRowClass,
        checker: { enabled: true, interval: 60000 }
      }))
    );
  }

  // This
  private gameCheck = (data: SportEvent[]) => pipe(
    filter(this.isFinished)(data),
    sort(this.byDate)
  );
  // and this needs to be passed to the table component
  public getRowClass = (item: SportEvent): { [key: string]: boolean } => ({
    'bg-color-green': this.startsSoon(item)
  });
  // these are just building blocks, which helps with readability.
  private byDate: Ord<SportEvent> = contramap((item: SportEvent) => item["Starting Time"])(ordDate);
  public startsSoon = (item: SportEvent) => Utils.timeDiffIsValid(item, "Starting Time", 3600000);
  private isFinished = (item: SportEvent) => Utils.alreadyPassed(item['Starting Time']);
}
