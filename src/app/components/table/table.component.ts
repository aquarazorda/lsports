import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { reduce, unsafeDeleteAt } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';

@Component({
  selector: 'app-table[data]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('dataTable') table: any;
  @Input() data!: TableData<any>;

  public columns!: Column<any>[];

  constructor() { }

  ngOnInit() {
    this.checkData(this.data);
  }

  // Methods which need to be overloaded when extending this component
  protected dataPipe = (data: TableData<any>) => data;
  //

  public inEditState: any = {};

  public checkData = <I>(data: TableData<I>): TableData<I> => this.data = this.dataPipe(data);

  public toggleExpandRow = <I>(row: TableItem<I>) => this.table.rowDetail.toggleExpandRow(row);

  public toggleEdit = (index: number): void => {
    if (this.inEditState[index]) this.checkData(this.data);
    this.inEditState[index] = !this.inEditState[index];
  }

  public delete = (index: number): void => {
    this.toggleEdit(index);

    pipe(
      unsafeDeleteAt(index, this.data),
      this.checkData
    )
  };

  // For now we just toggle back and forth between the edit state,
  // but in the future we might want to do something more sophisticated.
  // Since we just have save button to toggle it back and values are bound from the view
  // we can guarantee that the values are saved.
  public save = (index: number) => {
    this.toggleEdit(index);
  }


}
