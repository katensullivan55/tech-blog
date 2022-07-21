// login DOM
const searchEl = document.getElementById('search-title');
const searchButton = document.getElementById('search-btn');

const sendSearch = async (e) => {
    e.preventDefault();
    const blogTitle =  searchEl.value.trim();

    if (blogTitle) {
        const response = await fetch(`/search/${blogTitle}`)
        if (response.ok) {
          document.location.replace(`/search/${blogTitle}`);
        } else {
          alert('No blog found.');
        }
      }
    };
    searchButton.addEventListener('click', sendSearch);