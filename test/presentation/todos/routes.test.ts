import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo route testing', () => {

    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(async () => {
        testServer.close();
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    });

    const todo1 = { text: 'Hola Mundo 1' };
    const todo2 = { text: 'Hola Mundo 2' };

    test('should return todos on /api/todos', async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        });

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
    });

    test('should return a TODO by id on /api/todos/:id', async () => {

        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
        });
    });

    test('should return a 400 if TODO with id not found', async () => {
        const id = 9999;
        const { body } = await request(testServer.app)
            .get(`/api/todos/${id}`)
            .expect(400);

        expect(body).toEqual({ error: `Todo with id ${id} not found` });
    });

    test('should create a new TODO on /api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
        });
    });

    test('should return an error if text is not present when creating a TODO', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400);

        expect(body).toEqual({ error: 'Text is required' });
    });

    test('should update a TODO on /api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: 'Hola Mundo UPDATE', completedAt: '2023-10-21' })
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: 'Hola Mundo UPDATE',
            completedAt: '2023-10-21T00:00:00.000Z',
        });
    });

    test('should return 400 if TODO to update does not exist', async () => {
        const id = 9999;
        const { body } = await request(testServer.app)
            .put(`/api/todos/${id}`)
            .send({ text: 'Hola Mundo UPDATE' })
            .expect(400);

        expect(body).toEqual({ error: `Todo with id ${id} not found` });
    });

    test('should delete a TODO on /api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
        });

        // Verify it was actually deleted
        const dbTodo = await prisma.todo.findUnique({ where: { id: todo.id } });
        expect(dbTodo).toBeNull();
    });

    test('should return 400 if TODO to delete does not exist', async () => {
        const id = 9999;
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${id}`)
            .expect(400);

        expect(body).toEqual({ error: `Todo with id ${id} not found` });
    });

});
