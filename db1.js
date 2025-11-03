import {books} from './db'

export const users = [
  {
    code: 'U101',
    username: 'AliceSmith98',
    email: 'alice.smith@example.com',
    password: 'pass123',
    borrowedBooks: ['B001'] // קוד ספר מושאל
  },
  {
    code: 'U102',
    username: 'BobJohnson',
    email: 'bob.j@example.com',
    password: 'pass456',
    borrowedBooks: ['B003']
  },
  {
    code: 'U103',
    username: 'CharlieBrown',
    email: 'c.brown@example.com',
    password: 'pass789',
    borrowedBooks: []
  }
];