import * as Sequelize from 'sequelize';
import { sequelize } from '../database';
import BookModel from './BookModel';

import { Book } from '../../model';
import * as ar from '../abstract/AbstractRepository';

class BookRepository extends ar.AbstractRepository<Book> {
  async create(book: Book): Promise<Book> {
    const dbBook = await BookModel.create(book);
    return dbBook;
  }

  async findOne(book: Book): Promise<Book | null> {
    const data = this.getUniqueCriteria(book, ['id']);
    const dbBook = await BookModel.findOne({
      where: data,
    });
    return dbBook;
  }

  async findAll(order?: ar.Order): Promise<Book[]> {
    if (!order) {
      order = 'DESC';
    }
    const dbBooks: Book[] = await BookModel.findAll({
      order: [
        ['created_at', order],
      ],
    });
    return dbBooks;
  }

  async findAllByPaging(books: Book[], offset?: number | 0, limit?: number | 20, order?: ar.Order): Promise<Book[]> {
    if (!order) {
      order = 'DESC';
    }
    const dbBooks: Book[] = await BookModel.findAll({
      offset,
      limit,
      where: books,
      order: [
        ['created_at', order],
      ],
    });
    return dbBooks;
  }

  async findAllByIds(ids: number[], order?: ar.Order): Promise<Book[]> {
    if (!order) {
      order = 'DESC';
    }
    const dbBooks: Book[] = await BookModel.findAll({
      where: {
        id: [...ids],
      },
      order: [BookModel, 'created_at', order],
    });
    return dbBooks;
  }

  async update(book: Book): Promise<Book | boolean> {
    const data = this.getUniqueCriteria(book, ['id']);
    try {
      await BookModel.update(book, {
        where: data,
      });
    } catch (error) {
      return false;
    }
    return true;
  }

  async delete(book: Book): Promise<Book | boolean> {
    const data = this.getUniqueCriteria(book, ['id']);
    try {
      await BookModel.destroy({
        where: data,
      });
    } catch (error) {
      return false;
    }
    return true;
  }
}

export { BookRepository };
