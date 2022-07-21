const commentEl = document.querySelector('#create-comment');
const commentSubmit = document.querySelector('#comment-submit')


//function for submission 
const addComment = async (e) => {
    e.preventDefault();
        const blog_id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
          ];
        //   console.log(blog_id)
        //   console.log(id)
          
    const commentBody = {
        comment: commentEl.value.trim(),
        blog_id
    };

    // console.log(commentBody)

    
         // sending event details to the server using POST request
    const fetchNewEvent = await fetch('/api/comment', {
        method: 'POST',
        headers:{
            'content-type': 'application/json',
        },
        body: JSON.stringify(commentBody),
    });
    
   
    
    //if the submission is successful then go to the users personal page
    if(fetchNewEvent.ok){
        document.location.reload();
    }
    //otherwise if it doesn't work then send text notification of error
    else{
        alert(fetchNewEvent.statusText);
    }
}
// addComment()
//on submit button being clicked then add the details.
commentSubmit.addEventListener('submit', addComment);