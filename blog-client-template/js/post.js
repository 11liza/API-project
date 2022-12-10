let urlParams = new URLSearchParams(window.location.search)

fetchBlog();

async function fetchBlog() {

    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'));
        let blog = await response.json();

        let blogsHTML = '';
        {
            let blogDate = new Date(blog.date)

            blogsHTML += `
                <li class="list-group-item">
                <p>Title: ${blog.title} </p>
                    <p>Author: ${blog.author}  <span class="date">- ${blogDate.getFullYear()}-${blogDate.getMonth() + 1}-${blogDate.getDate()} at ${blogDate.getHours()}:${blogDate.getMinutes()}:${blogDate.getSeconds()}</span></p>
                    <p>Tags: ${blog.tags}</p>
                    <p>${blog.content} <br></p>
                    
                  
                </li>
            `
        }

        document.getElementById('blog-post').innerHTML = blogsHTML;

    } catch (error) {
        console.log(error);
    }
}
