// Variables //
const newBookBtn = document.getElementById('newBookBtn');
const form = document.getElementById('form')
const list = document.getElementById('libraryList');

let myLibrary = []; // Library array to hold current books

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.getInfo = function() {
        return title, author;
    }
}

function addBookToLibrary(title, author) {
    const newBook = new Book(title, author);
    myLibrary.push(newBook)
}

function render() {
    for(var i=0; i<myLibrary.length; i++) {
        const row = document.createElement('div');
        const currentBook = myLibrary[i];
        row.innerHTML = currentBook.title+ " by: "+currentBook.author;
        list.append(row);
    }
}

function newBookForm() {
    const bookForm = document.createElement("form");
    form.appendChild(bookForm);

    const inputTitle = document.createElement("input");
    inputTitle.setAttribute("type", "text");
    inputTitle.setAttribute("value", "Book Title");
    bookForm.appendChild(inputTitle);

}

addBookToLibrary('title1', 'author1');
addBookToLibrary('title2', 'author2');
render();

newBookBtn.addEventListener("click", newBookForm);