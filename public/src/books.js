const findAuthorById = (authors, id) => {
  let foundAuthor;
  for (author in authors) {
    if (authors[author].id === id) {
      foundAuthor = authors[author];
    }
  }
  return foundAuthor;
}

const findBookById = (books, id) => {
  let foundBook;
  for (book in books) {
    if (books[book].id === id) {
      foundBook = books[book];
    }
  }
  return foundBook;
}

const partitionBooksByBorrowedStatus = books => {
  let sortedBooks = [];
  let returned = [];
  let borrowed = [];
  for (book in books) {
    let bookObj = books[book];
    // Every
    let notCheckedOut = bookObj.borrows.every((borrowObj) => borrowObj.returned === true)
    notCheckedOut === false ? borrowed.push(bookObj) : returned.push(bookObj);
  }
  sortedBooks.push(borrowed);
  sortedBooks.push(returned);
  return sortedBooks;
}

// Destructuring
const getBorrowersForBook = ({ borrows }, accounts) => {
  let listOfBorrowers = [];
  for (account in accounts) {
    // Spread
    let accountObj = {...accounts[account]};
    for (items in borrows) {
      if (borrows[items].id === accounts[account].id) {
        accountObj.returned = borrows[items].returned;
        listOfBorrowers.push(accountObj);
      }      
    }
  }
  return listOfBorrowers.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
