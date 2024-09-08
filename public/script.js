const bookListEl = document.querySelector(".book-list");
const loadingTextEl = document.querySelector('.loading-text');

const fetchAllBooks = async () => {
    try {
        loadingTextEl.style.visibility = 'visible';
        const response = await fetch('/api/v1/library');
        const data = await response.json();
        if (data.books.length < 1) {
            loadingTextEl.style.visibility = 'hidden';
            bookListEl.innerHTML = "<h5>No Books To Display</h5>";
            return;
        }
        const allBooks = data.books.map((book) => {
            const { _id, title, author, year, edition, hasRead } = book;
            return `
                <div class="single-book">
                    <h5 class="book-title">${title}</h5>
                    <div class="book-info">
                        <p class="book-author">${author}</p>
                        <p class="book-year">${year}</p>
                        <p class="book-edition"><em>${edition}</em></p>
                        <p>${hasRead ? '<i title="Read" class="fa-solid fa-book-open"></i>' : '<i title="Not Read" class="fa-solid fa-book"></i>'}
                    </div>
                    <div class="action-btns">
                        <span>
                            <a href="edit-book.html?id=${_id}" class="btn edit-btn"><i class="fa-regular fa-pen-to-square"></i></a>
                        </span>
                        <span>
                            <button class="btn delete-btn" data-id="${_id}"><i class="fa-solid fa-trash-can"></i></button>
                        </span>
                    </div>
                </div>`
        });
        bookListEl.innerHTML = allBooks.join('');
    } catch (error) {
        bookListEl.innerHTML = "<h5>There was an error displaying your books</h5>"
    }
    loadingTextEl.style.visibility = 'hidden';
}

bookListEl.addEventListener('click', async (e) => {
    if (e.target.parentElement.classList.contains('delete-btn')) {
        const bookId = e.target.parentElement.getAttribute('data-id');
        const response = await fetch(`/api/v1/books/${bookId}`, { method: 'DELETE' });
        const message = await response.json();
        alert(message.message);
        location.href = "/";
    }
});

// START
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        fetchAllBooks();
    })
})();