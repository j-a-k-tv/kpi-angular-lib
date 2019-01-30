import { CategoryItemVM } from './CategoryItemVM';

export class ExpenseItemVM {

    get spendDate(): Date { return new Date(this._spendDate); }
    get createdOn(): Date { return new Date(this._createdOn); }
    get updatedOn(): Date { return new Date(this._updatedOn); }

    public constructor(
        public id: number,
        public heading: string,
        public cost: number,
        private _spendDate: string,
        public category: CategoryItemVM,
        public notes: string,
        private _createdOn: string,
        private _updatedOn: string) {

    }

    static from(data: any): ExpenseItemVM {
        return new ExpenseItemVM(
            data.id,
            data.heading,
            data.cost,
            data.spendDate,
            CategoryItemVM.from(data.category),
            data.notes,
            data.createdOn,
            data.updatedOn);
    }
}