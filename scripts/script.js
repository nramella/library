// Variables //
const newBookBtn = document.getElementById('newBookBtn');
const form = document.getElementById('newBookForm')
const submitBtn = document.getElementById('submit')
const table = document.getElementById('library-table');

let myLibrary = []; // Library array to hold current books

// Book constructor
function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status
    this.getInfo = function() {
        return title, author, status;
    }
}

// Adds book to the library array, then renders the book
function addBookToLibrary(title, author, status) {
    const newBook = new Book(title, author, status);
    myLibrary.push(newBook);
    render(newBook);

}

// Renders the library onto the screen in a table
function render(book) {
    const row = document.createElement('tr');
    const titleTD = document.createElement('td');
    const authorTD = document.createElement('td');
    const statusTD = document.createElement('td');
    const deleteTD = document.createElement('td');
    const deleteBtn = document.createElement('input');
    deleteBtn.type = "button";
    deleteBtn.value = "Delete";
    deleteBtn.setAttribute("class", "deleteBtn")
    deleteBtn.setAttribute("id", myLibrary.length-1);
    // deleteRender.setAttribute("onClick", "deleteBook(this.id);");

    titleTD.innerHTML = book.title;
    authorTD.innerHTML = book.author;
    statusTD.innerHTML = book.status;

    deleteBtn.addEventListener('click', function(){
        row.remove();
        myLibrary.splice(this.id, 1);
    });

    row.appendChild(titleTD);
    row.appendChild(authorTD);
    row.appendChild(statusTD);
    deleteTD.appendChild(deleteBtn);
    row.appendChild(deleteTD);
    table.appendChild(row);
}

// Controls when the form is displayed 
function checkDisplayForm() {
    if (form.style.display === "none"){
        form.style.display = "block";
        document.getElementById('newBookBtn').innerHTML = "Close";
    } else {
        form.style.display = "none";
        document.getElementById('newBookBtn').innerHTML = "Add New Book";
    }
}

// Gets the information from the new book form
function getNewBook() {
    const inputTitle = document.getElementById('inputTitle');
    const inputAuthor = document.getElementById('inputAuthor');
    const inputStatus = document.getElementById('read-status');
    addBookToLibrary(inputTitle.value, inputAuthor.value, inputStatus.value);
    inputTitle.value = '';
    inputAuthor.value = '';
    checkDisplayForm();
}


addBookToLibrary('Memory Man', 'David Baldacci', 'Read'); // Sample book (Testing Only - will be removed)


// Listeners //
window.onload = function() {
    form.style.display = "none"; // Hides the new book form when page loads
};
newBookBtn.addEventListener("click", checkDisplayForm);
submitBtn.addEventListener("click", getNewBook);