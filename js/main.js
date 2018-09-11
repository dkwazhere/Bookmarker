// Listener for form submit
// Target myForm id and add event listener, which takes in parameters an event called 'submit' and put in function called saveBookmark
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// functions
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;
  // testing if values are logged
  console.log(siteName);
  console.log(siteUrl);
  // Added event parameter named(e) and attached prevent default to prevent form from submitting
  e.preventDefault()

}
