import express from "express"
import {getAllBooks, getBookByID, addNewBook, updateBook, deleteBook,sortBook,deleteAllBook, addDefaultBooks} from '../controllers/bookController.js';

//create express router     
const router = express.Router();

//all the routes for books
router.post('/addDefault',addDefaultBooks);
router.get('/get', getAllBooks);
router.get('/get/:id',getBookByID );
router.post('/add', addNewBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook); 
router.get('/sort', sortBook);
router.delete('/deleteAll',deleteAllBook);

module.exports = router;
