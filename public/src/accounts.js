function findAccountById(accounts, id) {
  // Filter
  const foundAccount = accounts.filter((account) => account.id === id);
  return foundAccount[0];
}

const sortAccountsByLastName = accounts =>  {
  let sortedByLast;
  for (account in accounts) {
    // Sort
    sortedByLast = accounts.sort((account1, account2) => account1.name.last > account2.name.last ? 1 : -1);
  }
  return sortedByLast;
}

// Destructuring
const numberOfBorrows = (accounts, books) => {
  let borrowsCount = 0;
  let tempArray; 
    for (book in books) {
      // Map
      tempArray = books[book].borrows.map((borrowArray) => {
        return borrowArray.id
      });
      // Filter
      tempArray = tempArray.filter((id) => id === accounts.id);
      if (tempArray.length > 0) borrowsCount++
    }
  return borrowsCount 
}

const getBooksPossessedByAccount = ({ id }, books, authors) => {
  let checkedOut = [];
    for (let book in books) {
      let bookObj = books[book];
      // Find
      if (bookObj.borrows.find((borrowObj) => (borrowObj.id === id && borrowObj.returned == false))) {
        for (let author in authors) {
          if (bookObj.authorId === authors[author].id) {
            bookObj.author = authors[author];
            checkedOut.push(bookObj);
          }
        }
      }
    }
  return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
