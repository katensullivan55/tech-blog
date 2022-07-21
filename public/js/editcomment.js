const editCommentButton = document.querySelector('#edit-comment-submit')
const commentEl = document.querySelector('#edit-comment')
  
  const editComment = async (e) => {
    e.preventDefault();
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
      const commentBody = {
        comment: commentEl.value,
      };
  
      // sending event details to the server using PUt request
      const fetchNewEvent = await fetch(`/api/comment/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(commentBody),
      });
      document.location.replace(`/`);
    }
  };

  editCommentButton.addEventListener('click', editComment);

