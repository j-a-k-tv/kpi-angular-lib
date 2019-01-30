export class CategoryItemVM {

    get createdOn(): Date { return new Date(this._createdOn); }
    get updatedOn(): Date { return new Date(this._updatedOn); }

    public constructor(
        public id: number,
        public label: string,
        public description: string,
        private _createdOn: string,
        private _updatedOn: string) {
        if (!id || !label)
            throw new TypeError(`required fields id and label are missing`);
    }

    static from(data: any): CategoryItemVM {
        if (typeof data !== "object" || Array.isArray(data))
            throw new TypeError(`Expected object but got ${typeof data}`);
        return new CategoryItemVM(
            data.id,
            data.label,
            data.description,
            data.createdOn,
            data.updatedOn);
    }
}