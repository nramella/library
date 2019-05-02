// Variables //
const newBookBtn = document.getElementById('newBookBtn');
const form = document.getElementById('newBookForm')
const submitBtn = document.getElementById('submit')
const table = document.getElementById('table-library');


// Local Storage
// const localData = localStorage.getItem("books");
// const myLibrary = localData ? JSON.parse(localData) : [];
let myLibrary = []; // Library array to hold current books
// addBookToLibrary('Memory Man', 'David Baldacci', 'Read'); // Sample book (Testing Only - will be removed)


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
    localStorage.setItem("books", JSON.stringify(myLibrary));
    render();
}

function refresh() {
    var bookRow = document.getElementsByClassName("bookItem");
    while (bookRow.length > 0) {
        bookRow[0].parentNode.removeChild(bookRow[0]);
    }
}

// Renders the library onto the screen in a table
// function render() {
//     const inputTitle = document.getElementById('inputTitle').value;
//     const inputAuthor = document.getElementById('inputAuthor').value;
//     const inputStatus = document.getElementById('read-status').value;
//     const newBook = new Book(inputTitle, inputAuthor, inputStatus);
//     inputTitle.value = '';
//     inputAuthor.value = '';

//     myLibrary.push(newBook);
//     localStorage.setItem("books", JSON.stringify(myLibrary));
    
//     const index = myLibrary.indexOf(newBook);
//     var test = JSON.parse(localStorage.getItem("books"));

//     table.innerHTML = "";

//     test.forEach(function(x) {
//         // Assign variables for created elements
//         const row = document.createElement('tr');
//         row.setAttribute("class", "bookItem");
//         const titleTD = document.createElement('td');
//         const authorTD = document.createElement('td');
//         const statusTD = document.createElement('td');
//         const statusBtn = document.createElement("input");
//         const deleteTD = document.createElement('td');
//         const deleteBtn = document.createElement('input');

//         // Assign attritbutes
//         titleTD.setAttribute("class", "book");
//         authorTD.setAttribute("class", "author");

//         // Status cell dropdown
//         statusTD.setAttribute("class", "status");
//         statusBtn.type = "button";
//         statusBtn.setAttribute("class", "statusBtn")

//         // Delete cell button
//         deleteTD.setAttribute("class", "delete");
//         deleteBtn.type = "button";
//         deleteBtn.value = "Delete";
//         deleteBtn.setAttribute("class", "deleteBtn")
//         deleteBtn.setAttribute("id", myLibrary.length);

//         titleTD.innerHTML = x.title;
//         authorTD.innerHTML = x.author;
//         statusBtn.value = x.status;

//         statusBtn.addEventListener('click', function(){
//             if (statusBtn.value == "Want to Read") {
//                 statusBtn.value = "Currently Reading";
//             } else if (statusBtn.value == "Want to Read") {
//                 statusBtn.value = "Currently Reading";
//             } else if (statusBtn.value == "Currently Reading") {
//                 statusBtn.value = "Read";
//             } else {
//                 statusBtn.value = "Want to Read";
//             }
//         });

//         deleteBtn.addEventListener('click', function(){
//             myLibrary.splice(this.id - 1, 1);
//             row.remove();
//             localStorage.setItem("books", JSON.stringify(myLibrary));
//         });

//         row.appendChild(titleTD);
//         row.appendChild(authorTD);
//         statusTD.appendChild(statusBtn);
//         row.appendChild(statusTD);
//         deleteTD.appendChild(deleteBtn);
//         row.appendChild(deleteTD);
//         table.appendChild(row);
//     });
        
        
        
    
// }

// function deleteBook(index){
//     row.remove();
//     myLibrary.splice(index, 1)
// }

function render() {
    const inputTitle = document.getElementById('inputTitle').value;
    const inputAuthor = document.getElementById('inputAuthor').value;
    const inputStatus = document.getElementById('read-status').value;
    var i = 0;

    let newBook = new Book(inputTitle, inputAuthor, inputStatus);
    document.getElementById('inputTitle').value = '';
    document.getElementById('inputAuthor').value = '';
    // checkDisplayForm();

    myLibrary.push(newBook);
    console.log(myLibrary);
    for (var x=0; x<myLibrary.length; x++) {
        if (myLibrary[x].title === "test1") {
            alert("Worked");
            console.log(x);
        }
    }


    table.innerHTML = "";

    let render = function (libraryList, table) {
        table.innerHTML += libraryList;
    }

    myLibrary.forEach(function(element) {
        let libraryList =  `<tr id=${myLibrary.length - 1}>
                            <td class="book">${element.title}</td>
                            <td class="author">${element.author}</td>
                            <td class="status"><input type="button" class="statusBtn" value=${element.status}></input></td>
                            <td class="delete"><input type="button" value="Delete" class="deleteBtn" id=${element.title}></input></td>
                            </tr>`;
        render(libraryList, table);

        // checkDisplayForm();

        document.addEventListener('click', function(e) {
            if (e.target && e.target.className == "deleteBtn") {
                const test = e.target.id
                console.log(test);
                // myLibrary.forEach(function(e) {
                //     if(e.target.id == 1) {
                //         alert("hello");
                //     }
                // })
                const tempRow = document.getElementById(e.target.id)
                table.deleteRow(myLibrary.length - 1);
                myLibrary.splice(myLibrary.indexOf(e.target.id))
            }
        });
    });

    
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
    checkDisplayForm();
    render(inputTitle.value, inputAuthor.value, inputStatus.value);
    inputTitle.value = '';
    inputAuthor.value = '';
}

// Listeners //
window.onload = function() {
    form.style.display = "none"; // Hides the new book form when page loads
    localStorage.clear();
    // if(localStorage != ""){
    //     localStorage.clear();
    //     render();
    // }
};

newBookBtn.addEventListener("click", checkDisplayForm);
submitBtn.addEventListener("click", render);


