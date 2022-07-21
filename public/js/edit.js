const closedButton = document.querySelector('#edit-blog-submit')
const titleEl = document.querySelector('#edit-title')
const contentEl = document.querySelector('#edit-content');
  
  const editBlog = async (e) => {
    e.preventDefault();
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
      const blogBody = {
        title: titleEl.value,
        content: contentEl.value,
      };
  
      // sending event details to the server using PUt request
      const fetchNewEvent = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(blogBody),
      });
      document.location.replace('/');
    }
  };

closedButton.addEventListener('click', editBlog);
