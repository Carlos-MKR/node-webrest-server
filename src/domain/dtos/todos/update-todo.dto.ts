






export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ) { }


    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.text) returnObj.text = this.text;
        if (this.completedAt) returnObj.completedAt = this.completedAt;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string | undefined, UpdateTodoDto | undefined] {
        const { id, text, completedAt } = props;

        if (!id || isNaN(id)) return ['Id is required', undefined];
        if (!text) return ['Text is required', undefined];

        let newCompletedAt = completedAt;

        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) return ['Invalid completedAt date', undefined];
        }

        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}
