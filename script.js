const libraryDisplay = document.querySelector('.library');

const nameBook = document.querySelector('#name');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const statusRead = document.querySelector('#status');
const addBook = document.querySelector('#addBook');

const total = document.querySelector('#total');
const read = document.querySelector('#read');
const notRead = document.querySelector('#notRead');

addBook.addEventListener('click', () => controller.makeBook());

const form = (function () {
    const validateForm = () => {
        return nameBook.value.length && author.value.length && pages.value > 0;

    }

    const clearForm = () => {
        nameBook.value = "";
        author.value = "";
        pages.value = "";
        statusRead.checked = false;
    }

    const getResultRead = () => {
        return statusRead.checked === true ? "Read" : "Not read";
    }

    return {validateForm, clearForm, getResultRead}
})();

const library = (function () {
    let myLibrary = [];

    class Book{
        constructor(title, author, pages, read){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
    }

    const addBookToLibrary = (read) => {
        const book = new Book(nameBook.value, author.value, pages.value, read);
        myLibrary.push(book);
    }

    const deleteBook = (title) => {
        myLibrary = myLibrary.filter(book => book.title != title)
    }

    const countBooksRead = () => {
        let total = 0
        for (let obj of myLibrary) {
            obj.read === "Read" ? total += 1 : null ;
        }
        return total;
    }

    const startLibrary = () => {
        let book = new Book("Dancing Lessons for the Advanced in Age", "Bohumil Hrabal", 117, "Read")
        myLibrary.push(book);
        book = new Book("Extreme Ironing", "Phil Shaw", 95, "Not read")
        myLibrary.push(book);
        book = new Book("Do Androids Dream of Eletric Sheep?", "Philip K. Dick", 224, "Read")
        myLibrary.push(book);
    }

    const getMyLibrary = () => {
        return myLibrary
    }

    return {getMyLibrary, addBookToLibrary, deleteBook, countBooksRead, startLibrary}
})()

const controller = (function () {

    const makeBook = () => {
        if (form.validateForm() == true) {
            library.addBookToLibrary(form.getResultRead());
            form.clearForm();
            displayBooks();
        }
    }

    function displayBooks()  {
        clearDisplay();

        for (let obj of library.getMyLibrary()) {
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
                library.deleteBook(obj.title);
                displayBooks();
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
            libraryDisplay.appendChild(card);
        }
        updateCounter();

    }

    const clearDisplay = () => {
        libraryDisplay.textContent = "";
    }

    const updateCounter = () => {
        total.textContent = library.getMyLibrary().length;
        read.textContent = library.countBooksRead();
        notRead.textContent = +total.textContent - +read.textContent;
    }

    library.startLibrary();
    updateCounter();
    displayBooks();

    return {makeBook, displayBooks, updateCounter}
})();
