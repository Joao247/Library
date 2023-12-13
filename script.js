// script.js
const myLibrary = [];

function Book(title, author, pages, hasRead, pagesRead, image) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.pagesRead = hasRead ? pages : (pagesRead || 0);
    this.image = image || ''; // Set a default value or leave it empty
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

// script.js

// ... (existing code)

function displayBooks() {
    const readBooksContainer = document.getElementById("read-books");
    const readingBooksContainer = document.getElementById("reading-books");
    const toReadBooksContainer = document.getElementById("to-read-books");

    // Clear previous content in each category
    readBooksContainer.innerHTML = "";
    readingBooksContainer.innerHTML = "";
    toReadBooksContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3");

        const cardContent = document.createElement("div");
        cardContent.classList.add("card", "h-100");

        const readStatus = book.hasRead ? "read" : "not-read";

        console.log(book.image); // Add this line
        cardContent.innerHTML = `
    <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <img src="${book.image}" alt="${book.title}" class="card-img-top book-image">
        <p class="card-text">${book.author}</p>
        <p class="card-text">${book.pages} pages</p>
        ${!book.hasRead ? `<p class="card-text">Read: ${book.pagesRead} pages</p>` : ''}
    </div>
    <div class="card-footer d-flex justify-content-between">
        <button onclick="editBook(${index})" class="btn btn-primary">Edit</button>
        <button onclick="removeBook(${index})" class="btn btn-danger">Remove</button>
    </div>
`;


        // Update border color based on read status
        let borderColor;
        if (book.hasRead) borderColor = "border-success";
        else if (!book.hasRead && book.pagesRead > 0) borderColor = "border-warning";
        else if (!book.hasRead && book.pagesRead === 0) borderColor = "border-danger";

        cardContent.classList.add(borderColor, `book${index}`);

        // Append the card content to the card container
        cardContainer.appendChild(cardContent);

        // Append the card container to the appropriate category container
        if (book.hasRead) {
            readBooksContainer.appendChild(cardContainer);
        } else if (book.pagesRead > 0) {
            readingBooksContainer.appendChild(cardContainer);
        } else {
            toReadBooksContainer.appendChild(cardContainer);
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

// ... (remaining code)


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

    if (book.pagesRead == book.pages)
        book.hasRead = true

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
const book1 = new Book("Can't Hurt Me", "David Goggins", 364, true, 0, "https://davidgoggins.com/wp-content/uploads/2022/10/cant-hurt-me-group.jpg");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false, 120);
const book4 = new Book("1984", "George Orwell", 328, false, 200);
const book5 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const book6 = new Book("The Catcher in the Rye", "J.D. Salinger", 224, false, 150);
const book7 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1200, false, 800);
const book8 = new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 443, true);
const book9 = new Book("The Alchemist", "Paulo Coelho", 197, true);
const book10 = new Book("Moby-Dick", "Herman Melville", 624, false, 400);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
addBookToLibrary(book7);
addBookToLibrary(book8);
addBookToLibrary(book9);
addBookToLibrary(book10);

