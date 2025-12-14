import Book from "../models/book.js"

const addDefaultBooks = async (req, res) => {
    try {
        const defaultBooks = [
            {
                title: "The Last of Us",
                author: "Aryan",
                year: 2018
            },
            {
                title: "Resident Evil",
                author: "Maryan",
                year: 2019
            },
            {
                title: "Days Gone",
                author: "Barbarian",
                year: 2017
            },
        ];

        const getDefaultBooks = await Book.insertMany(defaultBooks);

        res.status(200).json({
            success: true,
            message: `${getDefaultBooks.length} books added successfully!`,
            data: getDefaultBooks
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again'
        });
    }
};


const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        if (allBooks?.length > 0) {
            return res.status(200).json({ success: true, message: 'List of books fetched Successfully!', data: allBooks });
        } else {
            return res.status(404).json({ success: false, message: 'Error fetching books' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong! Please try again' });
    }
}


const getBookByID = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const booksByID = await Book.findById(getCurrentBookID);

        if (!booksByID) {
            return res.status(404).json({
                success: false,
                message: 'Error fetching the book! Please check the ID again'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Book of given ID fetched successfully',
            data: booksByID
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong! Please try again' });
    }
}


const addNewBook = async (req, res) => {
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await Book.create(newBookFormData);

        if (newlyCreatedBook) {
            res.status(201).json({ success: true, message: 'Book added successfully', data: newlyCreatedBook });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong! Please try again' });

    }
}


const updateBook = async (req, res) => {
    try {
        const updateBookFormData = req.body; //because we need to get the access to the requested body
        const getCurrentBookID = req.params.id;
        const updateBook = await Book.findByIdAndUpdate(getCurrentBookID, updateBookFormData, {
            new: true
        })
        if (!updateBook) {
            res.status(404).json({
                success: false,
                message: 'Unable to update book! Please re-check the ID'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Book updated successfully for the given ID!',
                data: updateBook
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong! Please try again' });
    }
}


const deleteBook = async (req, res) => {
    try {
        const getCurrentBookID = req.params.id;
        const deleteBookByID = await Book.findByIdAndDelete(getCurrentBookID);

        if (!deleteBookByID) {
            res.status(404).json({
                success: false,
                message: 'Unable to delete book! Please re-check the ID'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Book successfully deleted for the given ID!',
            data: deleteBookByID
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong! Please try again' });
    }
}


const sortBook = async (req, res) => {
    try {
        const sortBy = req.query.sortBy || 'title';
        const BookSort = await Book.find().sort(sortBy);
        //THINGS TO REMEMBER : USE THIS API AS http://localhost:3000/api/books/sort?sortBy=title

        if (BookSort.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No books found to sort!' 
            })
        }
        res.status(200).json({
            success: true,
            message: 'Book successfully sorted!',
            data: BookSort
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong! Please try again' });
    }
}


const deleteAllBook = async (req, res) => {
    try {
        if (req.query.confirm !== 'true') {
            return res.status(400).json({
                success: false,
                message: 'Confirmation required. Add ?confirm=true to proceed with deletion.',
            });
        }

        const result = await Book.deleteMany({});
        res.status(200).json({
            success: true,
            message: `${result.deletedCount} books deleted successfully.`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting books.',
        });
    }

};


module.exports = {
    addDefaultBooks,
    getAllBooks,
    getBookByID,
    addNewBook,
    updateBook,
    deleteBook,
    sortBook,
    deleteAllBook
};