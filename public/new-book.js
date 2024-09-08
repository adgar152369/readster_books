const newBookForm = document.querySelector('.book-form');
const bookTitleInput = document.querySelector('input#title');
const bookAuthorInput = document.querySelector('input#author');
const bookYearInput = document.querySelector('input#year');
const bookEditionInput = document.querySelector('input#edition');
const bookHasReadInput = document.querySelector('input#hasRead');
const newBookBtn = document.querySelector('.book-add-btn');

const onSubmitForm = () => {
    newBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        newBookBtn.textContent = 'Adding';
        try {
            const response = await fetch('/api/v1/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: bookTitleInput.value,
                    author: bookAuthorInput.value,
                    year: bookYearInput.value,
                    edition: bookEditionInput.value,
                    hasRead: bookHasReadInput.checked,
                })
            });
            const data = await response.json();
            if (data) {
                location.href = "/";
                newBookBtn.textContent = 'Add';
            }
        } catch (error) {
            console.error(error);
        }
    });
}


(() => {
    document.addEventListener('DOMContentLoaded', onSubmitForm);
})()