// Variables //
const newBookBtn = document.getElementById('newBookBtn');
const form = document.getElementById('newBookForm')
const submitBtn = document.getElementById('submit')
const list = document.getElementById('libraryList');

// Listeners //
window.onload = function() {
    form.style.display = "none"; // Hides the new book form when page loads
};
newBookBtn.addEventListener("click", checkDisplayForm);
submitBtn.addEventListener("click", getNewBook);

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
    myLibrary.push(newBook);
}

function render() {
    for(var i=0; i<myLibrary.length; i++) {
        const row = document.createElement('div');
        row.setAttribute("class", "row");
        const currentBook = myLibrary[i];
        row.innerHTML = currentBook.title+ " by: "+currentBook.author;
        list.append(row);
    }
}

function checkDisplayForm() {
    if (form.style.display === "none"){
        form.style.display = "block";
    } else {
        form.style.display = "none";

    }
}

function getNewBook() {
    const inputTitle = document.getElementById('inputTitle');
    const inputAuthor = document.getElementById('inputAuthor');
    addBookToLibrary(inputTitle.value, inputAuthor.value);
    inputTitle.value = '';
    inputAuthor.value = '';
    refresh();
}

function refresh() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    checkDisplayForm();
    render();
}

addBookToLibrary('Memory Man', 'David Baldacci'); // Sample book (Testing Only - will be removed)
render();