class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  }
  clearInputs() {
    (document.getElementById("title").value = ""),
      (document.getElementById("author").value = ""),
      (document.getElementById("isbn").value = "");
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  showAlert(message, className) {
    const form = document.getElementById("book-form");
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    form.before(div);
    // Remove Alert After 3 Seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

// Add Book Event
document.getElementById("book-form").addEventListener("submit", e => {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  // Validate Form

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please Fill In This Form", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book Added!", "success");
    Store.addBook(book);
  }

  ui.clearInputs();

  e.preventDefault();
});

// Delete Book Event
document.getElementById("book-list").addEventListener("click", e => {
  const ui = new UI();

  ui.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert("book Removed Successfully!", "success");

  e.preventDefault();
});

// Store Book
class Store {
  static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = this.getBook();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books",JSON.stringify(books));
  }

  static getBook() {
    let books;
    if (localStorage.getItem("books")) {
      books = JSON.parse(localStorage.getItem("books"));
    } else {
      books = [];
    }
    return books;
  }

  static showBook(book) {
    const books = Store.getBook();
    books.forEach(book => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
}
document.addEventListener("DOMContentLoaded", Store.showBook);