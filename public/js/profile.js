
// ========= GLOBAL VARIABLES ========= 

let editMode = false;

let currentPostId;

// ======= PUBLISH POST =========

const postForm = document.querySelector('.new-post-form');

postForm.addEventListener('submit', async (event) => {

  event.preventDefault();

    // EDIT POST
  if (editMode) {

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;

    const response = await fetch('/api/post/' + currentPostId, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log(response);

    document.querySelector('#comment-btn').textContent = "Update";

    if (response.ok) {

      document.location.replace('/profile');

    } else {
      alert('Failed to update post');
    }

      // NEW POST
  } else {

    const newTitle = document.querySelector('#post-title').value.trim();
    const newContent = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/post/', {
      method: 'POST',
      body: JSON.stringify({ 
        title: newTitle,
        content: newContent 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }

  }

});

// ===== EDIT POST =======

  const editContainer = document.querySelector('.post-container');

  editContainer.addEventListener('click', async event => {

    if(event.target.matches(".edit-btn")) {

      editMode = true;

      document.querySelector('#post-btn').textContent = "Update";
  
      currentPostId = event.target.getAttribute('data-id');
  
      editTitle = document.querySelector('#post-title');
      editTitle.value = event.target.getAttribute('data-title');
  
      editContent = document.querySelector('#post-content');
      editContent.value = event.target.getAttribute('data-content');

    }


  });

// ========== DELETE POST ========== 

const delButtonHandler = async (event) => {

  if (event.target.matches('.delete-btn')) {

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.post-container')
  .addEventListener('click', delButtonHandler);
