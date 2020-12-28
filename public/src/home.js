const { findAuthorById } = require('./books');

const totalBooksCount = books => {
  let totalBooks = 0;
  for (book in books) {
    books[book] ? totalBooks+=1 : totalBooks+=0;
  }
  return totalBooks;
}

const totalAccountsCount = accounts => {
  let totalAccounts = 0;
  for (account in accounts) {
    accounts[account] ? totalAccounts+=1 : totalAccounts+=0;
  }
  return totalAccounts;
}

const booksBorrowedCount = books => {
  let totalBorrowed = 0;
  for (book in books) {
    books[book].borrows.some((items) => items.returned === false) ? totalBorrowed += 1 : totalBorrowed +=0;
  }
  return totalBorrowed; 
}

const getMostCommonGenres = books => {
  let unorderedList = [];
  // create object with genre and count
  for (book in books) {
    let name = books[book].genre;
    let count = 1;
    let found = false;

    // update count for duplicate genres
    for (items in unorderedList) {
      if (books[book].genre === unorderedList[items].name) {
        unorderedList[items].count += 1;
        found = true;
      } 
    }
    // Object Shorthand
    if (!found) unorderedList.push({name, count}) 
  } 
  // sort list
  const orderedList = unorderedList.sort((obj1, obj2) => obj1.count < obj2.count ? 1 : -1);
  return orderedList.slice(0,5);
}

const getMostPopularBooks = books => {
  let unorderedList = [];
  // create object with title and count
  for (book in books) {
    let name = books[book].title;
    let count = 0;
    books[book].borrows.forEach(borrow => {
      count = books[book].borrows.length;    
    });
  // Object Shorthand
    unorderedList.push({name, count})
  }
  // sort list
  const orderedList = unorderedList.sort((obj1, obj2) => obj1.count < obj2.count ? 1 : -1);
  return orderedList.slice(0,5);
}


const getMostPopularAuthors = (books, authors) => {
  // Reduce
  const unorderedList = books.reduce((acc, book) => {
    const bookId = book.authorId;
    // Helper Function
    const foundAuthor = findAuthorById(authors, bookId);
    const firstName = foundAuthor.name.first;
    const lastName = foundAuthor.name.last;
    const name = `${firstName} ${lastName}`
    const count = book.borrows.length;
    // Object Shorthand
    acc.push({name, count});
    return acc;
  }, []);
  // Sort List
  const orderedList = unorderedList.sort((obj1, obj2) => obj1.count < obj2.count ? 1 : -1);
  return orderedList.slice(0,5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
