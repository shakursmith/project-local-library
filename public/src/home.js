function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let totalBorrowed = 0;
  books.some((book) => {
    book.borrows.some((borrow) => borrow.returned === false ? totalBorrowed += 1 : totalBorrowed +=0)
  })
  return totalBorrowed;
}

function getMostCommonGenres(books) {
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

function getMostPopularBooks(books) {
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


function getMostPopularAuthors(books, authors) {
  const unorderedList = [];  
  
  // Loop through the Books array (1)
  books.forEach((book) => {
    const listItem = {};
    const bookId = book.authorId;
    
    // Find matching author (2)
    authors.find((author) => {
      if (author.id === bookId) listItem.name = `${author.name.first} ${author.name.last}`;
    })

    // Reduce to get the count (3)
    listItem.count = book.borrows.reduce((acc, borrow) => {
      if (book.authorId) {
        acc++;
      }
    return acc;
    }, 0);

    // Push items into an array (4)
    unorderedList.push(listItem);
  })

  // Sort List (5)
  const orderedList = unorderedList.sort((nameA, nameB) => nameA.count > nameB.count ? -1 : 1);
  orderedList.length = 5;
  
  return orderedList; 
}


module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
