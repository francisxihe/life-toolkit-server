import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
// import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: Record<string, any>, user: User): Promise<Todo> {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      user,
    });
    return this.todosRepository.save(todo);
  }

  async findAll(user: User): Promise<Todo[]> {
    return this.todosRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user: User): Promise<Todo> {
    const todo = await this.todosRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: Record<string, any>, user: User): Promise<Todo> {
    const todo = await this.findOne(id, user);
    Object.assign(todo, updateTodoDto);
    return this.todosRepository.save(todo);
  }

  async remove(id: number, user: User): Promise<void> {
    const todo = await this.findOne(id, user);
    await this.todosRepository.remove(todo);
  }

  async toggleComplete(id: number, user: User): Promise<Todo> {
    const todo = await this.findOne(id, user);
    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? new Date() : null;
    return this.todosRepository.save(todo);
  }
}