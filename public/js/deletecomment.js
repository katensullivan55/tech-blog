const deleteCommentButtons = document.querySelectorAll('.delete-comment')
  //delete comment

  const deleteCommentHandler = async (e) => {
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
      // console.log(id);
      await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      document.location.reload();
    }
  };
deleteCommentButtons.forEach((commentButton) => {
  commentButton.addEventListener('click', deleteCommentHandler);
})