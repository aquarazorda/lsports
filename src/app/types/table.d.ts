type TableItem<I> = I;

type TableData<I> = Array<TableItem<I>>;

interface Props {
    expandableRow?: boolean,
    editable?: boolean,
    type: "string" | "textarea" | "date"
}

interface Column<I> {
    name: keyof I;
    props?: Props
}

interface TableHandler<I> {
    columns: Column<I>[];
    data: TableData<I>[];
    inEditState: { [key: string]: boolean };
    checkData: (data: TableData<I>) => TableData<I>;
    toggleExpandRow: (row: TableData<I>) => void;
    toggleEdit: (id: number) => void;
    delete: (id: number) => void;
    save: (id: number) => void;
    add: () => void;
    readonly dataPipe: (data: TableData<I>) => TableData<I>;
    readonly createEmptyRow: () => TableItem<I>;
}