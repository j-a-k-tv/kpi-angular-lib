export class ExpenseItem {
    public constructor(
        public heading: string,
        public cost: number,
        public spendDate: Date,
        public categoryId: number,
        public notes: string) {

    }

    static from(data: any): ExpenseItem {
        return new ExpenseItem(
            data.heading,
            data.cost,
            data.spendDate,
            data.categoryId,
            data.notes);
    }
}