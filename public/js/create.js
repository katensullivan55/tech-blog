//get all form data through submission
const titleEl = document.querySelector('#create-title');
const contentEl = document.querySelector('#create-content');
const createBlogSubmit = document.querySelector('#blog-submit')

//function for submission 
const createBlog = async (e) =>{
    e.preventDefault();
    const blogBody = {
        title: titleEl.value.trim(),
        content: contentEl.value
    };

    // console.log(blogBody)

    // sending event details to the server using POST request
    const fetchNewEvent = await fetch('/api/blog', {
        method: 'POST',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(blogBody),
    });

    //if the submission is successful then go to the users personal page
    if(fetchNewEvent.ok){
        document.location.replace('/');
    }
    //otherwise if it doesn't work then send text notification of error
    else{
        alert(fetchNewEvent.statusText);
    }
}

//on submit button being clicked then add the details.
createBlogSubmit.addEventListener('submit', createBlog);