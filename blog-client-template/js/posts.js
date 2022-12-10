fetchAllBlogs();

async function fetchAllBlogs() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        let blogs = await response.json();

        let blogsHTML = '';
        for (let blog of blogs) {
            let blogDate = new Date(blog.date)

            blogsHTML += `
                <table class="list-group-item"> 
                <tr><th><td>Title: ${blog.title} <br><br></td></th></tr>
                    <tr><th><td>Author: ${blog.author}<br><br></td></th></tr>
                    <tr><th><td>${blog.content.slice(0, 100)}<br><br></td></th></tr>
                    <tr class="date"><th><td>- ${blogDate.getFullYear()}-${blogDate.getMonth() + 1}-${blogDate.getDate()} ${blogDate.getHours()}:${blogDate.getMinutes()}:${blogDate.getSeconds()} <br><br></td></th></tr>
                    
                    <tr>
                     <th><td><a href="update-blog.html?id=${blog._id}">Update</a></td></th>
                     <th><td><a href="#" class="delete-links" data-id="${blog._id}">Delete</a></td></th>
                    </tr>
                   
                    <tr><th><td><br>Tags: ${blog.tags}</td></th></tr><br><br>
                </table>
            `
        }

        document.getElementById('blog-list').innerHTML = blogsHTML;

    } catch (error) {
        console.log(error);
    }
}