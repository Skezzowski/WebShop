export interface Filters {
    text?: string;
    price?: {
        min?: number;
        max?: number;
    };
    itemsPerPages?: 10 | 25 | 50 | 75 | 100;
    sortBy?: sortTypes;
}

export enum sortTypes {
    'Default sorting',
    'Price ASC',
    'Price DESC',
    'Date ASC',
    'Date DESC',
    'Name ASC',
    'Name DESC'
}
