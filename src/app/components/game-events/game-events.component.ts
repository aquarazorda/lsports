import { Component, OnDestroy } from '@angular/core';
import { filter, reduce, sort } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { contramap, Ord, ordDate } from 'fp-ts/lib/Ord';
import Utils from 'src/app/utils/utils';
import { TableComponent } from '../table/table.component';

type Item = TableItem<SportEvent>;
type Items = TableData<SportEvent>;

@Component({
  selector: 'app-game-events[data]',
  templateUrl: './game-events.component.html',
  styleUrls: ['./game-events.component.css']
})
export class GameEventsComponent extends TableComponent implements TableHandler<SportEvent>, OnDestroy {

  public updater = setInterval(() => this.checkData(this.data), 60000);

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

  }

  public columns: Column<Item>[] = [
    { name: "SportName", props: { type: 'string' } },
    { name: "Location", props: { type: 'string' } },
    { name: "League", props: { type: 'string' } },
    { name: "Teams Playing", props: { type: 'string' } },
    { name: "Starting Time", props: { type: 'date' } },
    { name: "Additional Data", props: { type: 'textarea', expandableRow: true } }
  ];

  public readonly dataPipe = (data: Items) => pipe(
    filter(this.isFinished)(data),
    sort(this.byDate)
  );

  public createEmptyRow = () => reduce(
    {},
    (acc, { name }: Column<Item>) => ({ ...acc, [name]: name == "Starting Time" ? new Date() : "" })
  )(this.columns) as Item;

  private byDate: Ord<Item> = contramap((data: Item) => data["Starting Time"])(ordDate);

  public add = () => {
    this.data.unshift(this.createEmptyRow());
    this.toggleEdit(0);
  }

  public getRowClass = (row: Item) => ({
    'bg-color-green': this.startsSoon(row)
  });

  private isFinished = (data: Item) => Utils.alreadyPassed(data['Starting Time']);

  public startsSoon = (data: Item) => Utils.timeDiffIsValid(data, "Starting Time", 3600000);

  public changeDate = (event: string, index: number) => this.data[index]["Starting Time"] = new Date(event);

  public dateToString = (date: Date) => Utils.dateToString(date);

  ngOnDestroy() {
    clearInterval(this.updater);
  }
}
