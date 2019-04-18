// Variables //
const newBookBtn = document.getElementById('newBookBtn');
const form = document.getElementById('newBookForm')
const submitBtn = document.getElementById('submit')
const table = document.getElementById('library-table');

let myLibrary = []; // Library array to hold current books

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.getInfo = function() {
        return title, author;
    }
}

// Adds book to the library array, then renders the book
function addBookToLibrary(title, author) {
    const newBook = new Book(title, author);
    myLibrary.push(newBook);
    render(newBook);

}

// Renders the library onto the screen in a table
function render(book) {
    const row = document.createElement('tr');
    const titleTD = document.createElement('td');
    const authorTD = document.createElement('td');
    const deleteTD = document.createElement('td');
    const deleteBtn = document.createElement('input');
    deleteBtn.type = "button";
    deleteBtn.value = "Delete";
    deleteBtn.setAttribute("id", myLibrary.length-1);
    // deleteRender.setAttribute("onClick", "deleteBook(this.id);");

    titleTD.innerHTML = book.title;
    authorTD.innerHTML = book.author;

    deleteBtn.addEventListener('click', function(){
        row.remove();
        myLibrary.splice(this.id, 1);
        console.log(myLibrary.length)
    });

    row.appendChild(titleTD);
    row.appendChild(authorTD);
    deleteTD.appendChild(deleteBtn);
    row.appendChild(deleteTD);
    table.appendChild(row);
}

// Controls when the form is displayed 
function checkDisplayForm() {
    if (form.style.display === "none"){
        form.style.display = "block";
    } else {
        form.style.display = "none";

    }
}

// Gets the information from the new book form
function getNewBook() {
    const inputTitle = document.getElementById('inputTitle');
    const inputAuthor = document.getElementById('inputAuthor');
    addBookToLibrary(inputTitle.value, inputAuthor.value);
    inputTitle.value = '';
    inputAuthor.value = '';
    checkDisplayForm();
}


addBookToLibrary('Memory Man', 'David Baldacci'); // Sample book (Testing Only - will be removed)


// Listeners //
window.onload = function() {
    form.style.display = "none"; // Hides the new book form when page loads
};
newBookBtn.addEventListener("click", checkDisplayForm);
submitBtn.addEventListener("click", getNewBook);