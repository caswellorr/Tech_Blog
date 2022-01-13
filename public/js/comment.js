

// ===== GLOBAL VARIABLES =======
let editMode = false;

let currentCommentId;

// ===== SUBMIT COMMENT =======

const submitComment = document.querySelector('#comment-btn');

submitComment.addEventListener('click', async (event) => {

  if (editMode) {

    let comment = document.querySelector("#comment").value

    const response = await fetch('/api/comment/' + currentCommentId, {
      method: 'PUT',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

    if (response.ok) {
      const id = location.pathname.split('/')[2];

      document.location.replace('/post/' + id);
    } else {
      alert('Failed to create comment');
    }

  } else {

    const comment = document.querySelector('#comment').value;

    const id = location.pathname.split('/')[2];

    const response = await fetch('/api/comment/' + id, {
      method: 'POST',
      body: JSON.stringify({ comment: comment }),
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

  }

});

// ===== EDIT A COMMENT =======

const commentEditBtn = document.querySelector('.edit-btn');

commentEditBtn.addEventListener('click', async event => {

  editMode = true;

  currentCommentId = event.target.getAttribute('data-id');

  document.querySelector('#comment').textContent = event.target.getAttribute('data-value');
});

// ========== DELETE COMMENT ========== 

const delButtonHandler = async (event) => {

  if (event.target.matches('.delete-btn') && event.target.hasAttribute('data-id')) {

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    console.log(response);

    if (response.ok) {

      document.location.replace(window.location.pathname);

    } else {
      alert('Failed to delete comment');
    }
  }
};

document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);