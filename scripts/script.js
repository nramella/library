// Variables //
const newBookBtn = document.getElementById('newBookBtn');
const form = document.getElementById('newBookForm')
const submitBtn = document.getElementById('submit')
const table = document.getElementById('tbody');

// Checks if local storage contains any data
if (localStorage.length != 0){
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    render();
} else {
    myLibrary = [];
}

// Book constructor
function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status
}

// Adds book to the library array, then renders the book
function addBookToLibrary(title, author, status) {
    const newBook = new Book(title, author, status);
    myLibrary.push(newBook);
    storeData();
    render();
}

// Store the myLibrary array into local storage
function storeData() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Update the status value
function updateStatus(x, status) {
    myLibrary[x].status = status;
}

// Renders the library onto the screen in a table
function render() {
    // Clear the current library table
    table.innerHTML = '';

    // Retrieve data from local storage
    storedData = JSON.parse(localStorage.getItem("myLibrary"));

    // Render the complete library table
    for(var i=0; i<storedData.length; i++) {
        // Assign variables for created elements
        const row = document.createElement('tr');
        const titleTD = document.createElement('td');
        const authorTD = document.createElement('td');
        const statusTD = document.createElement('td');
        const statusBtn = document.createElement("input");
        const deleteTD = document.createElement('td');
        const deleteBtn = document.createElement('input');

        // Set alternating background color for each row
        if (i%2 != 0) {
            row.setAttribute("style", "background-color: #dddddd");
        }

        // Assign attritbutes
        titleTD.setAttribute("class", "book");
        authorTD.setAttribute("class", "author");

        // Status cell dropdown
        statusTD.setAttribute("class", "status");
        statusBtn.type = "button";
        statusBtn.setAttribute("id", "statusBtn")
        statusBtn.setAttribute("class", i);

        // Delete cell button
        deleteTD.setAttribute("class", "delete");
        deleteBtn.type = "button";
        deleteBtn.value = "Delete";
        deleteBtn.setAttribute("id", "deleteBtn")
        deleteBtn.setAttribute("class", i);

        // Populate the cells with the stored data
        titleTD.innerHTML = storedData[i].title;
        authorTD.innerHTML = storedData[i].author;
        statusBtn.value = storedData[i].status;

        // Change read status button value after click
        statusBtn.addEventListener('click', function(){
            if (statusBtn.value == "Want to Read") {
                statusBtn.value = "Currently Reading";
            } else if (statusBtn.value == "Want to Read") {
                statusBtn.value = "Currently Reading";
            } else if (statusBtn.value == "Currently Reading") {
                statusBtn.value = "Read";
            } else {
                statusBtn.value = "Want to Read";
            }
            updateStatus(this.className, statusBtn.value);
            storeData();
            render();
        });

        // Delete the item from the library and render the page to update
        deleteBtn.addEventListener('click', function(){
            myLibrary.splice(this.className, 1);
            storeData();
            render();
        });

        // Append created elements to the table
        row.appendChild(titleTD);
        row.appendChild(authorTD);
        statusTD.appendChild(statusBtn);
        row.appendChild(statusTD);
        deleteTD.appendChild(deleteBtn);
        row.appendChild(deleteTD);
        table.appendChild(row);
    };
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

// Listeners //
window.onload = function() {
    form.style.display = "none"; // Hides the new book form when page loads
};
newBookBtn.addEventListener("click", checkDisplayForm);
submitBtn.addEventListener("click", getNewBook);