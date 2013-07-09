// Onload calls an 'initialize' function, to allow for more than 1 function call onload
window.onload = initialize;


function initialize() {

	// Performs different actions depending on the "type" of page (I.E. home, admin, search)
	var pageType = document.getElementById('pageType').innerHTML;
	if (pageType == 'home') {
		getPosts();
	}
	else if (pageType == 'create') {
		var sumbitButton = document.getElementById('submitButton');
		submitButton.onclick = createPost;
	}
}


// Builds the new entry and posts it to the database
function createPost() {
	var post = {
		document: {
			title: $('#titleInput').val(),
			author: $('#authorInput').val(),
			content: $('#contentInput').val()
			}};
	$.ajax({
		type: 'POST',
		url: 'https://api.mongohq.com/databases/blog/collections/posts/documents?_apikey=XXXXXXXXXXXXXXXXXXX', // your POST target goes here
		dataType: 'json',
		data: post, // message to send goes here
		success:function (data) { window.location = 'index.html'; }
	});
}


// Retrieves posts with a given criteria or all posts if given no arguments
function getPosts(criteria, value) {

	var url = 'https://api.mongohq.com/databases/blog/collections/posts/documents?_apikey=XXXXXXXXXXXXXXXXXXX'; // Default URL with no criteria
	
	// If criteria AND value have values, add to the query
	if (criteria && value) {
		url += '&q=' + criteria + ':' + value; // Added criteria
	}
	
	$.getJSON(url, function(response) {
		for (i in response) {
			// Creation of DOM elements for a single post
			var singlePost = document.createElement('div');
			var singlePostTitle = document.createElement('h2');
			var singlePostAuthor = document.createElement('h3');
			var singlePostContent = document.createElement('p');
			
			// Assignment of values
			singlePost.id = response[i]._id.$oid;
			singlePost.className = 'singlePost';
			singlePostTitle.innerHTML = response[i].title;
			singlePostAuthor.innerHTML = 'Posted by ' + response[i].author;
			singlePostContent.innerHTML = response[i].content;
			
			// Building the post
			singlePost.appendChild(singlePostTitle);
			singlePost.appendChild(singlePostAuthor);
			singlePost.appendChild(singlePostContent);
				
			// Appending to content
			document.getElementById('innerMainFrame').appendChild(singlePost);
		}
	});
}