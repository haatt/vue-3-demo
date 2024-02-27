export interface ITableCell {
  id?: string | number;
  thClass?: string;
  tdClass?: string;
  cellClass?: string;
  cellContent?: string | number;
  component?: Array<unknown>;
}

export interface ITableHeaderCell extends ITableCell {
  orderable?: boolean;
}

export interface ITableRowHeader {
  id: string | number;
  trClass?: string;
  cells: ITableHeaderCell[];
}

export interface ITableRow {
  id: string | number;
  trClass?: string;
  cells: ITableCell[];
}

export interface ITableRows {
  id: string | number;
  rows: ITableRow[];
}
