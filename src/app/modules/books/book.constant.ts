import { IStatus } from './book.interface';

export const status: IStatus[] = ['reading', 'soon', 'finished'];

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookFilterableFields = ['searchTerm', 'genre', 'publicationYear'];
