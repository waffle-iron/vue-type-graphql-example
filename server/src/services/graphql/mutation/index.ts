import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql/type/scalars';
import { BookType, DivisionType, UserType } from '../type/index';

import { BookRepository } from '../../../repository/book/BookRepository';
import { DivisionRepository } from '../../../repository/division/DivisionRepository';

import BookMutation from './book';
import DivisionMutation from './division';
import UserMutation from './user';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...BookMutation,
    ...DivisionMutation,
    ...UserMutation,
  },
});

export default mutation;
