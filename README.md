# My Library App

## Overview

This project is a simple Library app created using HTML, CSS, and JavaScript. The app allows users to manage their book collection, and it provides features such as adding new books, marking books as read, editing book details, and removing books. The project is part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Features

- **Dynamic Book Display:**
  - The library dynamically categorizes books into "Read," "Reading," and "To Read" based on their status.
  - Each book card displays relevant information such as title, author, pages, and pages read.

- **Book Management:**
  - Add new books to the library with details like title, author, and page count.
  - Mark books as "Read" or "Not Read" before adding them, and specify the number of pages read.
  - Edit book details, such as the number of pages and pages read, after adding them.
  - Remove individual books from the library.

- **Visual Feedback:**
  - Book cards feature border colors indicating read status.
  - Border colors change based on whether a book is read, not read with pages read, or not read with zero pages read.

- **Local Storage:**
  - The app uses `localStorage` to persistently store the user's library data, allowing for a seamless experience between sessions.

## Tools Used

- **Visual Studio Code:** Integrated Development Environment
- **Firebase:** Cloud-based service for user authentication and cloud data storage
- **Node.js:** JavaScript runtime for server-side development
- **Firebase SDKs:** Integrated for authentication and cloud data services

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-library-app.git
2. Explore the various features of the library app.

## Usage

### Adding a Book:

- Click the "+" button to open the form.
- Enter the book details and click "Add Book."

### Editing a Book:

- Click the "Edit" button on a book card to modify its details.
- Update the information and click "Save."

### Removing a Book:

- Click the "X" button on a book card to remove it from the library.

### Read Status:

- Use the "Already finished reading?" checkbox when adding a book.
- If a book is not read, specify the number of pages read.

## Firebase Integration

The app is integrated with Firebase for cloud-based features. Users have the option to log in using their Google account to sync their library data across devices.

## Credits

- **Firebase:** Firebase SDKs used for authentication and cloud data services.
- **Google Fonts:** Fonts used for a visually appealing experience.

## Outcome

- Applied HTML5 semantic elements for improved structure.
- Utilized CSS Flexbox for a responsive layout.
- Implemented dynamic DOM manipulation using JavaScript.
- Integrated Firebase for cloud-based features.

## Acknowledgments

Special thanks to The Odin Project for providing a hands-on project to enhance skills in DOM manipulation, HTML structure, CSS styling, and JavaScript functionality.

Enjoy managing your library! 📚✨
