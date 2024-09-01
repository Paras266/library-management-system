const Library = require('../library');

describe('Library Management System', () => {
    let library;

    beforeEach(() => {
        library = new Library();
    });

    test('should add a new book to the library', () => {
        library.addBook('12345', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        expect(library.books['12345']).toBeDefined();
        expect(library.books['12345'].title).toBe('The Great Gatsby');
    });

    test('should not add a book with duplicate ISBN', () => {
        library.addBook('12345', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        expect(() => {
            library.addBook('12345', 'Another Book', 'Another Author', 2023);
        }).toThrow('Book with this ISBN already exists');
    });

    test('should borrow a book if it is available', () => {
        library.addBook('12345', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        library.borrowBook('12345');
        expect(library.books['12345'].isAvailable).toBe(false);
    });

    test('should not borrow a book if it is already borrowed', () => {
        library.addBook('12345', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        library.borrowBook('12345');
        expect(() => {
            library.borrowBook('12345');
        }).toThrow('Book is currently unavailable');
    });

    test('should return a borrowed book', () => {
        library.addBook('12345', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        library.borrowBook('12345');
        library.returnBook('12345');
        expect(library.books['12345'].isAvailable).toBe(true);
    });

    test('should remove a book from the library', () => {
        library.addBook('12345', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        library.removeBook('12345');
        expect(library.books['12345']).toBeUndefined();
    });

    test('should view all available books', () => {
        library.addBook('12345', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        library.addBook('67890', '1984', 'George Orwell', 1949);
        library.borrowBook('12345');
        const availableBooks = Object.values(library.books).filter(book => book.isAvailable);
        expect(availableBooks.length).toBe(1);
        expect(availableBooks[0].title).toBe('1984');
    });

    test('should not remove a book if it is currently borrowed', () => {
        library.addBook('12345', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925);
        library.borrowBook('12345');
        expect(() => {
            library.removeBook('12345');
        }).toThrow('Cannot remove a borrowed book');
    });
    
});
