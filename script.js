// script.js
const myLibrary = [];

function Book(title, author, pages, hasRead, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.pagesRead = hasRead ? pages : (pagesRead || 0);
}


function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// Update the displayForm function
function displayForm() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}


function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function togglePagesReadVisibility() {
    const readCheckbox = document.getElementById("read");
    const pagesReadInput = document.getElementById("pages-read");
    const pagesReadLabel = document.getElementById("pages-read-label");

    // Toggle visibility of "Pages Read" input based on the state of the "Read" checkbox
    if (readCheckbox.checked) {
        pagesReadInput.style.display = "none";
        pagesReadLabel.style.display = "none";
    } else {
        pagesReadInput.style.display = "block";
        pagesReadLabel.style.display = "block";
    }
}

function displayBooks() {
    const readBooksContainer = document.getElementById("read-books");
    const readingBooksContainer = document.getElementById("reading-books");
    const toReadBooksContainer = document.getElementById("to-read-books");

    // Clear previous content in each category
    readBooksContainer.innerHTML = "";
    readingBooksContainer.innerHTML = "";
    toReadBooksContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const readStatus = book.hasRead ? "read" : "not-read";

        bookCard.innerHTML = `
            <div class="book${index}">
                <h2>${book.title}</h2>
                <p class="subtitle">${book.author}</p>
                <p>${book.pages} pages</p>
                ${!book.hasRead ? `<p>Read: ${book.pagesRead} pages</p>` : ''}
                <button onclick="editBook(${index})" class="edit-btn">Edit</button>
                <button onclick="removeBook(${index})" class="remove-btn">X</button>
            </div>
        `;

        // Update border color based on read status
        let borderColor;
        if(book.hasRead)
            borderColor = "#4CAF50"
        else if(!book.hasRead & book.pagesRead > 0)
            borderColor = "#e4e804"
        else if(!book.hasRead & book.pagesRead == 0)
            borderColor = "#f44336"
        
        bookCard.style.border = `2px solid ${borderColor}`;

        // Append the book card to the appropriate category container
        if (book.hasRead) {
            readBooksContainer.appendChild(bookCard);
        } else if (book.pagesRead > 0) {
            readingBooksContainer.appendChild(bookCard);
        } else {
            toReadBooksContainer.appendChild(bookCard);
        }
    });

    // Add headers for each category if they have content
    if (readBooksContainer.children.length > 0) {
        readBooksContainer.insertAdjacentHTML("afterbegin", "<h3>Books I've Read</h3>");
    }
    if (readingBooksContainer.children.length > 0) {
        readingBooksContainer.insertAdjacentHTML("afterbegin", "<h3>Books I'm Reading</h3>");
    }
    if (toReadBooksContainer.children.length > 0) {
        toReadBooksContainer.insertAdjacentHTML("afterbegin", "<h3>Books I Want to Read</h3>");
    }
}

// Add a new function to handle the edit button click
function editBook(index) {
    const bookCard = document.querySelector(`.book${index}`);
    const book = myLibrary[index];

    // Replace the content with input fields
    bookCard.innerHTML = `
        <div class="book${index}">
            <h2>${book.title}</h2>
            <p class="subtitle">${book.author}</p>
            <label for="edit-pages">Pages:</label>
            <input type="number" id="edit-pages" value="${book.pages}">
            <label for="edit-pages-read">Pages Read:</label>
            <input type="number" id="edit-pages-read" value="${book.pagesRead}">
            <button onclick="saveEdit(${index})" class="save-btn">Save</button>
            <button onclick="cancelEdit(${index})" class="cancel-btn">Cancel</button>
        </div>
    `;
}

// Add a new function to handle the save button click
function saveEdit(index) {
    const bookCard = document.querySelector(`.book${index}`);
    const book = myLibrary[index];

    // Update the book details with the new values
    book.pages = parseInt(document.getElementById("edit-pages").value) || 0;
    book.pagesRead = parseInt(document.getElementById("edit-pages-read").value) || 0;
    if (book.pagesRead < book.pages)
        book.hasRead = false

    // Display the updated book details
    displayBooks();
}

// Add a new function to handle the cancel button click
function cancelEdit(index) {
    // Simply re-display the books without saving the changes
    displayBooks();
}


document.getElementById("new-book-btn").addEventListener("click", displayForm);


document.getElementById("read").addEventListener("change", togglePagesReadVisibility);

document.getElementById("book-form").addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    const pagesRead = read ? 0 : document.getElementById("pages-read").value;

    const newBook = new Book(title, author, pages, read, pagesRead);
    addBookToLibrary(newBook);

    // Reset the form
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
    document.getElementById("pages-read").value = "";

    // Hide the form
    //document.getElementById("form-container").classList.add("hidden");
});

// Example: Manually adding a few books to the library
const book1 = new Book("Can't hurt me", "David Goggins", 364, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
