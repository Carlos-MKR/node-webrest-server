


export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null
    ) { }


    get isCompleted(): boolean {
        return !!this.completedAt; // null -> false, Date -> true
    }

    public static fromObject(object: { [key: string]: any }): TodoEntity {
        const { id, text, completedAt } = object;

        if (typeof id !== 'number') {
            throw new Error('El id debe ser un número');
        }

        if (typeof text !== 'string') {
            throw new Error('El texto debe ser una cadena');
        }

        let newCompletedAt;
        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (isNaN(newCompletedAt.getTime())) {
                throw new Error('El completedAt debe ser una fecha válida');
            }
        }

        return new TodoEntity(id, text, newCompletedAt);
    }

}