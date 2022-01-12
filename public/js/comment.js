const commentSubmit = document.querySelector('#comment-btn');
commentSubmit.addEventListener('click', async event => {

    console.log('cucumber');

    const comment = document.querySelector('#new-comment').value;

    const id = location.pathname.split('/')[2];

    const response = await fetch('/api/comment/'+ id, {
        method: 'POST',
        body: JSON.stringify({ comment: comment}),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response)
    
    
    
    if (response.ok) {
        document.location.replace('/post/' + id);
    } else {
        alert('Failed to create project');
    }
})