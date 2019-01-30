export class CategoryItem {
    public constructor(
        public label: string,
        public description: string) {

    }

    static from(data: any): CategoryItem {
        return new CategoryItem(
            data.label,
            data.description);
    }
}