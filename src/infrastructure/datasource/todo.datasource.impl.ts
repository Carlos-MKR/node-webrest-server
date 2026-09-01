import { prisma } from "../../data/postgres";
import { TodoDataSource } from "../../domain";
import type { CreateTodoDto, UpdateTodoDto } from "../../domain";
import { TodoEntity } from "../../domain";



export class TodoDataSourceImpl extends TodoDataSource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto
        });

        return TodoEntity.fromObject(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map(todo => TodoEntity.fromObject(todo));
    }

    async getById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        if (!todo) {
            throw `Todo with id ${id} not found`;
        }

        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.getById(updateTodoDto.id);
        const todoUpdated = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(todoUpdated);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.getById(id);
        const todoDeleted = await prisma.todo.delete({
            where: { id }
        });

        return TodoEntity.fromObject(todoDeleted);
    }

}