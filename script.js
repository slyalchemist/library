const myLibrary = [];

//Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if(this.read === "on"){
            return(`${this.title} by ${this.author}, ${this.pages} pages, read`);
        }
        else{
            return(`${this.title} by ${this.author}, ${this.pages} pages, not read yet`);
        }
    }
}

// Button accepts user input from popup modal
let finishBookButton = document.getElementById("finishBook");
finishBookButton.onclick = function addBookToLibrary() {
    let newTitle = document.getElementById("title").value;
    let newAuthor = document.getElementById("author").value;
    let newPages = document.getElementById("pages").value;
    let newRead = document.getElementById("read").checked;

    //Calls Book constructor to create a new Book object from user input
    const newBook = new Book(newTitle, newAuthor, newPages, newRead);
    console.log(newBook.info());

    //Adds newBook to myLibrary array
    myLibrary.push(newBook);
    console.log(myLibrary);

    //Hides "Add new book" modal from display
    modal.style.display = "none";

    //calls the displayBook function to add new book to user interface from information collected from user
    displayBook(newTitle, newAuthor, newPages, newRead);
}


//Create functional modal
let modal = document.getElementById("bookModal");
let addBookButton = document.getElementById("addBook");
let closeModal = document.getElementsByClassName("close")[0];

addBookButton.onclick = function() {
    modal.style.display = "block";
}

closeModal.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal){
        modal.style.display = "none";
    }
}

//Create containers for new books to be displayed on user interface after user has submitted a new book
let container = document.getElementById("container");

function displayBook(newTitle, newAuthor, newPages, newRead){
    const newDiv = document.createElement("div");
    newDiv.classList.add("bookDisplay");
    container.appendChild(newDiv);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("titleDiv");
    newDiv.appendChild(titleDiv);

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("authorDiv");
    newDiv.appendChild(authorDiv);

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pagesDiv");
    newDiv.appendChild(pagesDiv);

    const readDiv = document.createElement("div");
    readDiv.classList.add("readDiv");
    newDiv.appendChild(readDiv);

    const removeDiv = document.createElement("span");
    removeDiv.classList.add("removeBook");
    removeDiv.innerHTML = "Remove Book";
    newDiv.appendChild(removeDiv);

    removeDiv.onclick = function () {
        newDiv.removeChild(removeDiv);
        newDiv.removeChild(readDiv);
        newDiv.removeChild(pagesDiv);
        newDiv.removeChild(authorDiv);
        newDiv.removeChild(titleDiv);
        container.removeChild(newDiv);
    }


    titleDiv.innerHTML = `${newTitle}`;
    authorDiv.innerHTML = `Written by ${newAuthor}`;
    pagesDiv.innerHTML = `${newPages} pages`;
    if(newRead === true){
        readDiv.classList.add("active");
        readDiv.innerHTML = "read";
    }
    else{
        readDiv.innerHTML = "not read yet";
    }
    readDiv.onclick = function () {
        readDiv.classList.toggle("active");
        if(readDiv.innerHTML === "read"){
            readDiv.innerHTML = "not read yet";
        }
        else if(readDiv.innerHTML === "not read yet"){
            readDiv.innerHTML = "read";
        }
    }

}
