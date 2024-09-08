const bookTitleInput = document.querySelector('input#title');
const bookAuthorInput = document.querySelector('input#author');
const bookYearInput = document.querySelector('input#year');
const bookEditionInput = document.querySelector('input#edition');
const bookHasReadInput = document.querySelector('input#hasRead');
const bookTitleEl = document.querySelector('#edit-book-title');
const bookForm = document.querySelector('.book-form');
const editBtnEl = document.querySelector('.book-edit-btn');
const editBookAlertEl = document.querySelector('.form-alert');
const params = window.location.search
const id = new URLSearchParams(params).get('id')

const showBook = async () => {
    try {
        const response = await fetch(`/api/v1/books/${id}`);
        const data = await response.json();
        const { title, author, year, edition, hasRead } = data.book;
        bookTitleEl.textContent = title;
        bookTitleInput.value = title;
        bookAuthorInput.value = author;
        bookYearInput.value = year;
        bookEditionInput.value = edition;
        if (hasRead) bookHasReadInput.checked = true;
    } catch (error) {
        console.log(error);
    }
}

const showSavedBook = () => {

}

bookForm.addEventListener('submit', async (e) => {
    editBtnEl.textContent = 'Saving...';
    editBtnEl.disabled = true;
    e.preventDefault();
    try {
        const bookTitle = bookTitleInput.value;
        const bookAuthor = bookAuthorInput.value;
        const bookYear = bookYearInput.value;
        const bookEdition = bookEditionInput.value;
        const bookRead = bookHasReadInput.checked;
        const data = await fetch(`/api/v1/books/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: bookTitle,
                author: bookAuthor,
                year: bookYear,
                edition: bookEdition,
                hasRead: bookRead
            })
        });
        const {book} = await data.json();
        const { title } = book;

        editBookAlertEl.classList.add('success')
        editBookAlertEl.textContent = `Successfully edited ${title}!`;
    } catch (error) {
        console.error(error);
        editBookAlertEl.classList.remove('success');
        editBookAlertEl.classList.add('alert')
        editBookAlertEl.textContent = 'error, please try again.'
    }
    editBtnEl.textContent = 'Edit';
    editBtnEl.disabled = false;
    setTimeout(() => {
        editBookAlertEl.style.display = 'none';
        editBookAlertEl.classList.remove('success');
    }, 5000);
});

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        showBook();
    })
})()