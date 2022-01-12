
// ===== SUBMIT A COMMENT =======

const commentSubmit = document.querySelector('#comment-btn');

commentSubmit.addEventListener('click', async (event) => {

    const comment = document.querySelector('#new-comment').value;

    const id = location.pathname.split('/')[2];

    const response = await fetch('/api/comment/'+ id, {
        method: 'POST',
        body: JSON.stringify({ comment: comment}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(response);
    
    if (response.ok) {
        document.location.replace('/post/' + id);
    } else {
        alert('Failed to create comment');
    }
});

// ===== EDIT A COMMENT =======

// const commentEdit = document.getElementById('#edit-btn');

// commentEdit.addEventListener('click', async event => {

//     const editComment = document.getElementById('#edit-comment').value;

//     const id = location.pathname.split('/')[2];

//     const response = await fetch('/api/comment/'+ id, {
//         method: 'PUT',
//         body: JSON.stringify({ comment: comment}),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });

//     console.log(response)
    
//     if (response.ok) {
//         document.location.replace('/post/' + id);

//     } else {
//         alert('Failed to edit comment');
//     }
// });

// ========== DELETE COMMENT ========== 

const delButtonHandler = async (event) => {

    if (event.target.hasAttribute('data-id')) {
  
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });

      console.log(response);
  
      if (response.ok) {

        const id = await fetch(`/api/post/:id`, {
            method: 'GET',
          });
    
        document.location.replace(`/post/${id}`);

      } else {
        alert('Failed to delete comment');
      }
    }
  };

  document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);