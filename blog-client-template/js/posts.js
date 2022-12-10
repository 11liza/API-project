fetchAllBlogs();

async function fetchAllBlogs() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        let blogs = await response.json();

        let blogsHTML = '';
        for (let blog of blogs) {
            let blogDate = new Date(blog.date)

            blogsHTML += `
                <li class="list-group-item">
                <p>Title: ${blog.title} </p>
                    <p>Author: ${blog.author}  <span class="date">- ${blogDate.getFullYear()}-${blogDate.getMonth() + 1}-${blogDate.getDate()} at ${blogDate.getHours()}:${blogDate.getMinutes()}:${blogDate.getSeconds()}</span></p>
                    <p>Tags: ${blog.tags}</p>
                    <p>${blog.content.slice(0, 100)} <br></p>
                    
                    <div>
                        <a href="post.html?id=${blog._id}">Read more</a>
                    </div>
                  
                </li>
            `
        }

        document.getElementById('blog-list').innerHTML = blogsHTML;

    } catch (error) {
        console.log(error);
    }
}