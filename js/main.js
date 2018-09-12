// Listener for form submit
// Target myForm id and add event listener, which takes in parameters an event called 'submit' and put in function called saveBookmark
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark function
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  // testing if values are logged
  console.log(siteName);
  console.log(siteUrl);

  // Create object named bookmark set name to siteName and url to siteUrl.
  var bookmark = {
    name: siteName,
    url: siteUrl
  }
  // testing bookmark object
  console.log(bookmark);

  /*
  // Local Storage Test
  localStorage.setItem('test', 'Hello World');
  // This will get item from local storage 'test';
  console.log(localStorage.getItem('test'));
  // This will delete item 'test' from local storage
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null) {
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // If there is something in bookmarks...
    // Get bookmarks from LocalStorage
    // JSON.parse turn strings into json
    // JSON.stringify will turn it into strings
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to Local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  // Clear Form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Added event parameter named(e) and attached prevent default to prevent form from submitting
  e.preventDefault()
}

// Delete Bookmark
function deleteBookmark(url) {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through Bookmarks
  for (var i = 0; i<bookmarks.length; i++) {
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set Back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}


// Fetch Bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i=0; i<bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    /*
    test if bookmark results show
     bookmarksResults.innerHTML += name;
   */
   bookmarksResults.innerHTML += '<div class="breadcrumb">'+
                                 '<h3>'+name+
                                 ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
                                 ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                 '</h3>'+
                                 '</div>';
  }
}


// Validation for url
function validateForm(siteName, siteUrl) {
  // If user does not fill in site name and url alert, return false after
  if(!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  // Format url
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
    alert('Please use a valid URL ...')
    return false;
  }
  return true;
}
