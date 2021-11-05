import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { reduce, unsafeDeleteAt } from 'fp-ts/lib/Array';
import Utils from '../../utils/utils';

@Component({
  selector: 'app-table[input]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, TableHandler<any> {

  @ViewChild('dataTable') table: any;
  @Input() input!: TableInput<any>;

  // I don't like this, but during this phase, input is unfortunately undefined
  public data!: TableData<any>;
  public columns!: Column<any>[];
  public rowNgClass!: (data: TableItem<any>) => { [key: string]: boolean };
  private intervals: any[] = [];
  public utils = Utils;

  constructor() { }

  ngOnInit() {
    this.columns = this.input.columns;
    this.rowNgClass = this.input.rowNgClass;
    this.checkAndUpdateRows(this.input.rows);
    if (this.input.checker) {
      this.intervals.push(
        setInterval(() => this.checkAndUpdateRows(this.data), this.input.checker.interval)
      );
    }
  }

  public inEditState: any = {};

  public checkAndUpdateRows = (data: any) => {
    this.data = this.input.checkRows(data);
  }

  public createEmptyRow = <T>() => reduce(
    {},
    (acc, { name }: Column<T>) => ({ ...acc, [name]: name == "Starting Time" ? new Date() : "" })
  )(this.input.columns) as TableItem<T>;

  public add = () => {
    this.data.unshift(this.createEmptyRow());
    this.toggleEdit(0);
  };

  public toggleExpandRow = <T>(row: TableItem<T>) => this.table.rowDetail.toggleExpandRow(row);

  public toggleEdit = (index: number): void => {
    if (this.inEditState[index]) this.checkAndUpdateRows(this.data);
    this.inEditState[index] = !this.inEditState[index];
  };

  public editDate = (index: number, key: any, value: any) =>
    this.data[index][key] = new Date(value);

  public delete = (index: number): void => {
    unsafeDeleteAt(index, this.data);
    this.toggleEdit(index);
  };

  // For now we just toggle back and forth between the edit state,
  // but in the future we might want to do something more sophisticated.
  // Since we just have save button to toggle it back and values are bound from the view
  // we can guarantee that the values are saved.
  public save = (index: number) => {
    this.toggleEdit(index);
  }

  ngOnDestroy() {
    this.intervals.forEach(interval => clearInterval(interval));
  }


}
