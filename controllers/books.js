// TODO: require Book model
const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({ books });
    } catch (error) {
        res.status(404).json({ errorMsg: error })
    }
}

const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ errorMsg: `Book of id: ${id} cannot be found!` });
        }
        res.status(200).json({ book });
    } catch (error) {
        res.status(500).json({ errorMsg: error })
    }
}

const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ book });
    } catch (error) {
        console.log(error);
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({ errorMsg: `No book found with id of ${id}` });
        }
        res.status(200).json({ book });
    } catch (error) {
        const errorMsg = error.errors.title.properties.message;
        res.status(500).json({ errorMsg });
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ book });
        }
        res.status(200).json({ message: 'successfully deleted' });
    } catch (error) {
        res.status(500).json({ errorMsg: error })
    }
}

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}