const library = document.querySelector('.library');

const nameBook = document.querySelector('#name');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const statusRead = document.querySelector('#status');
const addBook = document.querySelector('#addBook');

const total = document.querySelector('#total');
const read = document.querySelector('#read');
const notRead = document.querySelector('#notRead');

addBook.addEventListener('click', () => validateForm());

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title.value;
    this.author = author.value;
    this.pages = pages.value;
    this.read = read;
}

function validateForm() {
    if (nameBook.value.length && author.value.length && pages.value > 0) {
        addBookToLibrary();
    }
}

function addBookToLibrary() {
    const book = new Book(nameBook, author, pages, getResultRead());
    myLibrary.push(book);
    ClearForm();
    displayCards();
}

function makeNameBookArray() {
    return nameBook.value.replaceAll(' ', '')
}

function getResultRead() {
    return statusRead.checked === true ? "Read" : "Not read";
}

function ClearForm() {
    nameBook.value = "";
    author.value = "";
    pages.value = "";
    statusRead.checked = false;
}

function displayCards() {
    clearDisplay();
    for (let obj of myLibrary) {
        const card = document.createElement('div');
        const firstPart = document.createElement('div');
        const title = document.createElement('span');
        title.textContent = obj.title;
        const by = document.createElement('div');
        by.textContent = "By: ";
        const author = document.createElement('span');
        author.textContent = obj.author;
        const nPages = document.createElement('div');
        nPages.textContent = "Number of pages: ";
        const pages = document.createElement('span');
        pages.textContent = obj.pages;
        const status = document.createElement('div');
        status.textContent = "Status: ";
        const read = document.createElement('span');
        read.textContent = obj.read;
        if (read.textContent === "Not read") {
            card.classList.add("greyColor", "card");
        } else {
            card.classList.add("card");
        }
        const secondLine = document.createElement('div');
        const thirdLine = document.createElement('div');
        const fourthLine = document.createElement('div');
        secondLine.appendChild(by);
        secondLine.appendChild(author);
        thirdLine.appendChild(nPages);
        thirdLine.appendChild(pages);
        fourthLine.appendChild(status);
        fourthLine.appendChild(read);
        firstPart.appendChild(title);
        firstPart.appendChild(secondLine);
        firstPart.appendChild(thirdLine);
        firstPart.appendChild(fourthLine);
        const secondPart = document.createElement('div');
        const change = document.createElement('button');
        const burn = document.createElement('button');
        change.addEventListener('click', function(event) {
            if (read.textContent === "Read") {
                read.textContent = "Not read";
                obj.read = "Not read"; 
                card.classList.add("greyColor");              
            } else {
                read.textContent = "Read";
                obj.read = "Read";
                card.classList.remove("greyColor");
            }
            updateCounter();
        })
        burn.addEventListener('click', function(event) {
            myLibrary = myLibrary.filter(book => book.title != obj.title);
            displayCards();
        })

        change.classList.add('change');
        burn.classList.add('burn');
        change.textContent = "Change status";
        burn.textContent = "Burn book";
        secondPart.classList.add('buttons');
        secondPart.appendChild(change);
        secondPart.appendChild(burn);
        card.appendChild(firstPart);
        card.appendChild(secondPart);
        library.appendChild(card);
    }
    updateCounter();
}

function clearDisplay() {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }
}

function updateCounter() {
    total.textContent = myLibrary.length;
    read.textContent = countBooksRead();
    notRead.textContent = +total.textContent - +read.textContent;
}

function countBooksRead() {
    let total = 0
    for (let obj of myLibrary) {
        obj.read === "Read" ? total += 1 : null ;
    }
    return total;
}

function BookStart(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function startLibrary() {
    let book = {
        title : "Dancing Lessons for the Advanced in Age",
        author : "Bohumil Hrabal",
        pages : 117,
        read : "Read",
    }
    myLibrary.push(book);
    book = {
        title : "Extreme Ironing",
        author : "Phil Shaw",
        pages : 95,
        read : "Not read",
    }
    myLibrary.push(book);
    book = {
        title : "Do Androids Dream of Eletric Sheep?",
        author : "Philip K. Dick",
        pages : 224,
        read : "Read",
    }
    myLibrary.push(book);
    displayCards();
}

startLibrary();