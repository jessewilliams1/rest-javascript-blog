window.onload = initialize();

function initialize() {
	getPosts();
}

function getPosts() {
	$.getJSON('https://api.mongohq.com/databases/blog/collections/posts/documents?_apikey=xxxxxxxxxxxxxxx', // <--- must be the path to your database rest API
		function(response) {
			
			for (i in response) {
				var singlePost = document.createElement('div');
				var singlePostTitle = document.createElement('h2');
				var singlePostAuthor = document.createElement('h3');
				var singlePostContent = document.createElement('p');
			
				singlePost.id = response[i]._id.$oid;
				singlePost.className = 'singlePost';
				singlePostTitle.innerHTML = response[i].title;
				singlePostAuthor.innerHTML = 'Posted by ' + response[i].author;
				singlePostContent.innerHTML = response[i].content;
			
				singlePost.appendChild(singlePostTitle);
				singlePost.appendChild(singlePostAuthor);
				singlePost.appendChild(singlePostContent);
				
				document.getElementById('innerMainFrame').appendChild(singlePost);
			}
		});
}