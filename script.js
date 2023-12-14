// Define an array to store the book library
const myLibrary = [];

// Book constructor function
function Book(title, author, pages, hasRead, pagesRead, image) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.pagesRead = hasRead ? pages : (pagesRead || 0);
    this.image = image || ''; // Set a default value or leave it empty
}

// Function to add a book to the library and update the display
function addBookToLibrary(book) {
    // Check if a book with the same title and author already exists
    const existingBook = myLibrary.find(existingBook => existingBook.title === book.title && existingBook.author === book.author);

    if (existingBook) {
        // Display a warning and prevent insertion
    } else {
        // Add the book to the library and update the display
        myLibrary.push(book);
        displayBooks();
    }
}

// Function to remove a book from the library and update the display
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// Function to display the form for adding a new book
function displayForm() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

// Function to close the modal form
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Function to toggle visibility of "Pages Read" input based on the state of the "Read" checkbox
function togglePagesReadVisibility() {
    const readCheckbox = document.getElementById("read");
    const pagesReadContainer = document.getElementById("pages-read-container");

    if (readCheckbox.checked) {
        pagesReadContainer.style.display = "none";
    } else {
        pagesReadContainer.style.display = "block";
    }
}

// Function to display books in the library
function displayBooks() {
    // Get containers for different categories
    const readBooksContainer = document.getElementById("read-books");
    const readingBooksContainer = document.getElementById("reading-books");
    const toReadBooksContainer = document.getElementById("to-read-books");

    // Clear previous content in each category
    readBooksContainer.innerHTML = "";
    readingBooksContainer.innerHTML = "";
    toReadBooksContainer.innerHTML = "";

    // Loop through each book in the library
    myLibrary.forEach((book, index) => {
        // Create card container and content for each book
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3");

        const cardContent = document.createElement("div");
        cardContent.classList.add("card", "h-100");

        const readStatus = book.hasRead ? "read" : "not-read";

        // Check if the book has an image before including the image tag
        const imageTag = book.image ? `<img src="${book.image}" alt="${book.title}" class="card-img-top book-image">` : '';

        // Create card content with book details
        cardContent.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                ${imageTag}
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
    // Add headers for each category if they have content
    if (readBooksContainer.children.length >= 0) {
        const readBooksCount = readBooksContainer.children.length;
        readBooksContainer.insertAdjacentHTML("afterbegin", `<h3>Books I've Read (${readBooksCount})</h3>`);
    }
    if (readingBooksContainer.children.length >= 0) {
        const readingBooksCount = readingBooksContainer.children.length;
        readingBooksContainer.insertAdjacentHTML("afterbegin", `<h3>Books I'm Reading (${readingBooksCount})</h3>`);
    }
    if (toReadBooksContainer.children.length >= 0) {
        const toReadBooksCount = toReadBooksContainer.children.length;
        toReadBooksContainer.insertAdjacentHTML("afterbegin", `<h3>Books I Want to Read (${toReadBooksCount})</h3>`);
    }

}

// Function to handle the edit button click
function editBook(index) {
    const bookCard = document.querySelector(`.book${index}`);
    const book = myLibrary[index];

    // Replace the content with input fields for editing
    bookCard.innerHTML = `
        <div class="book${index} edit-mode">
            <h2>${book.title}</h2>
            <p class="subtitle">${book.author}</p>
            <div class="edit-fields">
                <label for="edit-pages">Pages:</label>
                <input type="number" id="edit-pages" value="${book.pages}">
                <label for="edit-pages-read">Pages Read:</label>
                <input type="number" id="edit-pages-read" value="${book.pagesRead}">
                <label for="edit-image">Image URL:</label>
                <input type="text" id="edit-image" value="${book.image}">
            </div>
            <div class="edit-buttons">
                <button onclick="saveEdit(${index})" class="save-btn">Save</button>
                <button onclick="cancelEdit(${index})" class="cancel-btn">Cancel</button>
            </div>
        </div>
    `;
    document.body.style.overflow = 'auto';
}


// Function to handle the save button click
function saveEdit(index) {
    const bookCard = document.querySelector(`.book${index}`);
    const book = myLibrary[index];

    // Update the book details with the new values from input fields
    book.pages = parseInt(document.getElementById("edit-pages").value) || 0;
    book.pagesRead = parseInt(document.getElementById("edit-pages-read").value) || 0;
    book.image = document.getElementById("edit-image").value; // Update the image URL

    // Update read status based on pages read
    book.hasRead = book.pagesRead === book.pages;

    // Display the updated book details
    displayBooks();
}

// Function to handle the cancel button click
function cancelEdit(index) {
    // Simply re-display the books without saving the changes
    displayBooks();
    document.body.style.overflow = 'hidden';
}

// Event listener for displaying the form
document.getElementById("new-book-btn").addEventListener("click", displayForm);

// Event listener for toggling visibility of "Pages Read" input
document.getElementById("read").addEventListener("change", togglePagesReadVisibility);

// Event listener for submitting the book form
document.getElementById("book-form").addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal();

    // Get form input values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    // Check if a book with the same title and author already exists
    const existingBook = myLibrary.find(book => book.title === title && book.author === author);

    if (existingBook) {
        // Display a warning that the book already exists
        alert("This book already exists in the library. Please choose a different title or author.");
    } else {
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;
        const pagesRead = read ? 0 : document.getElementById("pages-read").value;
        const image = document.getElementById("image").value; // Get the image URL

        // Create a new Book object and add it to the library
        const newBook = new Book(title, author, pages, read, pagesRead, image);
        addBookToLibrary(newBook);

        // Reset the form
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
        document.getElementById("read").checked = false;
        document.getElementById("pages-read").value = "";
        document.getElementById("image").value = ""; // Clear the image input
    }
});



// Example: Manually adding a few books to the library
const book1 = new Book("Can't Hurt Me", "David Goggins", 364, true, 364, "https://davidgoggins.com/wp-content/uploads/2022/10/cant-hurt-me-group.jpg");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true, 281, "https://th.bing.com/th/id/R.d95ed3737ac91fa01efe48b4f6725ee9?rik=RdWC9X2rnaM6YQ&pid=ImgRaw&r=0");
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false, 0, "https://th.bing.com/th/id/OIP.fFaX7nKq5_5gf2nSI3QEUgHaLK?rs=1&pid=ImgDetMain");
const book4 = new Book("1984", "George Orwell", 328, false, 0, "https://th.bing.com/th/id/OIP.Z5KLQbybGAxlM5JdjOWeWwAAAA?rs=1&pid=ImgDetMain");
const book5 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true, 310, "https://th.bing.com/th/id/OIP.3K0rBdwlwAe9MPGTDRRy4QHaLH?rs=1&pid=ImgDetMain");
const book6 = new Book("The Catcher in the Rye", "J.D. Salinger", 224, false, 0, "https://i1.wp.com/bookstoker.com/wp-content/uploads/2019/03/The-Catcher-in-the-Rye-by-J.D.-Salinger.jpeg?fit=1089%2C1600&ssl=1");

const book8 = new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 443, true, 443, "https://th.bing.com/th/id/OIP.JzwMezOQWYe0jmz4e9s7awHaJy?rs=1&pid=ImgDetMain");
const book9 = new Book("The Alchemist", "Paulo Coelho", 197, true, 197, "https://images-na.ssl-images-amazon.com/images/I/81s5gr8znaL.jpg");
const book10 = new Book("Moby-Dick", "Herman Melville", 624, false, 0, "https://th.bing.com/th/id/OIP.dyD3G28ri4z-aBURZTycRQHaLS?rs=1&pid=ImgDetMain");
const book13 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const book16 = new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 443, true);
const book19 = new Book("The Shining", "Stephen King", 447, true, 447, "https://th.bing.com/th/id/R.2c77e35f41770b9d67a88e1d0dec6c5e?rik=0naC6wq9w9SCBA&pid=ImgRaw&r=0");
const book20 = new Book("Pride and Prejudice", "Jane Austen", 279, true, 279, "https://cdn.kobo.com/book-images/afcd8653-3b27-4423-bee9-570fb1441aed/353/569/90/False/pride-and-prejudice-71.jpg");
//const book21 = new Book("The Picture of Dorian Gray", "Oscar Wilde", 254, false, 150, "https://th.bing.com/th/id/R.cdc3cc896c10f50329e1c920ffb6bcf6?rik=3G1mMwaXUzd%2bEA&riu=http%3a%2f%2f1.bp.blogspot.com%2f-UdW_0eFw31A%2fUQldWsA6puI%2fAAAAAAAAE5Q%2fJ0_OB0Ju5BA%2fs1600%2fThePictureofDorianGray.jpg&ehk=RbfiEfoN5NBWw0h%2fk6fHdMfFrYdbjoggnZHpBwtsdPs%3d&risl=&pid=ImgRaw&r=0");
const book22 = new Book("One Hundred Years of Solitude", "Gabriel García Márquez", 417, true, 417, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg");
const book23 = new Book("Brave New World", "Aldous Huxley", 325, true, 325, "https://diwanegypt.com/wp-content/uploads/2020/08/9780099477464.jpg");
const book24 = new Book("The Martian", "Andy Weir", 369, true, 369, "https://th.bing.com/th/id/OIP.CFoK_xldCsuxiMB-70PA3wHaLf?rs=1&pid=ImgDetMain");
const book25 = new Book("Frankenstein", "Mary Shelley", 280, true, 280, "https://cdn.kobo.com/book-images/bd3fce8f-a9a0-4cb0-a539-d8779090ba51/353/569/90/False/frankenstein-557.jpg");
const book26 = new Book("The Odyssey", "Homer", 296, true, 296, "https://th.bing.com/th/id/OIP.SWTNCJO-e6VnneyKZqMvKgHaLK?rs=1&pid=ImgDetMain");
const book27 = new Book("Crime and Punishment", "Fyodor Dostoevsky", 545, false, 0, "https://th.bing.com/th/id/OIP.QEgynWMtobnZyIEFeQMFsgHaLy?rs=1&pid=ImgDetMain");
//const book28 = new Book("The Hunger Games", "Suzanne Collins", 374, true);
const book29 = new Book("The Road", "Cormac McCarthy", 287, false, 0, "https://th.bing.com/th/id/OIP.Qc66EN6ij9zwjKD8K_IejAHaLy?rs=1&pid=ImgDetMain");
//const book30 = new Book("The Grapes of Wrath", "John Steinbeck", 464, false, 300);
const book31 = new Book("The Girl with the Dragon Tattoo", "Stieg Larsson", 590, false, 0, "https://th.bing.com/th/id/OIP.aO2nksAzahK55XwMKQgQkQHaLP?rs=1&pid=ImgDetMain");
//const book32 = new Book("The Silent Patient", "Alex Michaelides", 323, false, 150);
//const book33 = new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true);
//const book34 = new Book("Wuthering Heights", "Emily Brontë", 342, true);
//const book35 = new Book("Great Expectations", "Charles Dickens", 505, false, 250);
const book36 = new Book("The Color Purple", "Alice Walker", 295, true, 295, "https://th.bing.com/th/id/R.621b6dda171a1e6524b72133aa5ce04a?rik=SiY5rAzC7Ad8qw&pid=ImgRaw&r=0");
const book37 = new Book("The Handmaid's Tale", "Margaret Atwood", 311, true, 311, "https://th.bing.com/th/id/R.7f1c35f20fec49e94432c5a9ec498832?rik=2dkG6uOLcsyFqA&pid=ImgRaw&r=0");
const book38 = new Book("The Adventures of Sherlock Holmes", "Arthur Conan Doyle", 307, true, 307, "https://th.bing.com/th/id/OIP.MvTt1eysegqhuqxsFx9yWgHaLd?rs=1&pid=ImgDetMain");
const book50 = new Book("Way of the Wolf", "Jordan Belfort", 256, false, 110, "https://m.media-amazon.com/images/I/510X9kKYWVL.jpg")
//const book39 = new Book("The Three Musketeers", "Alexandre Dumas", 700, false, 400);
//const book40 = new Book("Les Misérables", "Victor Hugo", 1463, false, 800);

// Add the manually added books to the library


// Add the manually added books to the library
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
addBookToLibrary(book8);
addBookToLibrary(book9);
addBookToLibrary(book10);
addBookToLibrary(book13);
addBookToLibrary(book16);
//addBookToLibrary(book18);
addBookToLibrary(book19);
addBookToLibrary(book20);
//addBookToLibrary(book21);
addBookToLibrary(book22);
addBookToLibrary(book23);
addBookToLibrary(book24);
addBookToLibrary(book25);
addBookToLibrary(book26);
addBookToLibrary(book27);
//addBookToLibrary(book28);
addBookToLibrary(book29);
//addBookToLibrary(book30);
addBookToLibrary(book31);
//addBookToLibrary(book32);
//addBookToLibrary(book33);
//addBookToLibrary(book34);
//addBookToLibrary(book35);
addBookToLibrary(book36);
addBookToLibrary(book37);
addBookToLibrary(book38);
addBookToLibrary(book50);
// addBookToLibrary(book39);
// addBookToLibrary(book40);
