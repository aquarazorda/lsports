type TableItem<T> = T;

type TableData<T> = TableItem<T>[];

type TableInput<T> = {
    rows: TableData<T>;
    columns: Column<T>[];
    checkRows: (data: TableData<T>) => TableData<T>;
    rowNgClass: (data: TableItem<T>) => { [key: string]: boolean };
    checker?: { enabled: true, interval: number };
}

interface Props {
    expandableRow?: boolean,
    editable?: boolean
}

interface Column<T> {
    name: string;
    type: "string" | "textarea" | "date";
    defaultValue: string | Date;
    props?: Props;
}

interface TableHandler<T> {
    input: TableInput<T>;
    columns: Column<T>[];
    data: TableData<T>;
    inEditState: { [key: string]: boolean };
    checkAndUpdateRows: (data: TableData<T>) => void;
    toggleExpandRow: (row: TableItem<T>) => void;
    toggleEdit: (id: number) => void;
    delete: (id: number) => void;
    save: (id: number) => void;
    add: () => void;
    readonly createEmptyRow: () => TableItem<T>;
}