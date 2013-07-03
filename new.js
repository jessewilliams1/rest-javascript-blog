window.onload = initialize();

function initialize() {
	var sumbitButton = document.getElementById('submitButton');
	submitButton.onclick = createPost;
}

function createPost() {
	var post = {
		document: {
			title: $('#titleInput').val(),
			author: $('#authorInput').val(),
			content: $('#contentInput').val()
			}};
	$.ajax({
		type: 'POST',
		url: 'https://api.mongohq.com/databases/blog/collections/posts/documents?_apikey=e126odp9ti7qngjm0xsf', // your POST target goes here
		dataType: 'json',
		data: post, // message to send goes here
		success:function (data) { window.location = 'blog.html'; }
	});
}