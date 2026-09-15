const myLibrary = []

function Book(title, author, pageCount) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pageCount = pageCount
    this.read = false
}

function addBookToLibrary(title,author,pageCount) {
    myLibrary.push (new Book(title,author,pageCount));
}

const bookInfo = document.getElementById("bookInfo")
bookInfo.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pageCount = document.getElementById("pageCount").value;
    addBookToLibrary(title,author,pageCount);
    displayBooks()
});

Book.prototype.toggleRead = function() {
    this.read = !this.read
}

const bookDisplay = document.getElementById("bookDisplay")
function displayBooks() {
    bookDisplay.replaceChildren()
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div")
        bookCard.classList.add("book-card")
        bookCard.id = (myLibrary[i].id)

        const bookTitle = document.createElement("h3")
        bookTitle.textContent = (myLibrary[i].title)

        const bookAuthor = document.createElement("p")
        bookAuthor.textContent = ("written by: " + myLibrary[i].author)

        const bookPageCount = document.createElement("p")
        bookPageCount.textContent = (myLibrary[i].pageCount + " total pages.")

        const toggleReadBtn = document.createElement("button")
        if (myLibrary[i].read == false) {
            toggleReadBtn.textContent = ("Not Read")
            bookCard.style.backgroundColor = "red"
        } else {
            toggleReadBtn.textContent = ("Read")
            bookCard.style.backgroundColor = "green"
        }
        toggleReadBtn.addEventListener('click', (event) => {
            myLibrary[i].toggleRead()
            displayBooks()
        })


        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = ("Delete Book")
        deleteBtn.addEventListener('click', (event) => {
            const targetID = bookCard.id
            myLibrary.pop(myLibrary.find(Book => Book.id === targetID))
            displayBooks()
        })

        bookCard.appendChild(bookTitle)
        bookCard.appendChild(bookAuthor)
        bookCard.appendChild(bookPageCount)
        bookCard.appendChild(toggleReadBtn)
        bookCard.appendChild(deleteBtn)
        bookDisplay.appendChild(bookCard)
    }
}

// Placeholder Books

addBookToLibrary("14 Reasons Why", "John Allen", 196)
addBookToLibrary("How to win BIG", "Big Guy", 14)
addBookToLibrary("A Small Snail", "Small Ant", 6072)
displayBooks()