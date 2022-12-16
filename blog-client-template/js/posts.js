fetchAllBlogs();

async function fetchAllBlogs() {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        let blogs = await response.json();

        let blogsHTML = '';
        for (let blog of blogs) {
            let blogDate = new Date(blog.date)
            let tagContent = "";
            if (blog.tags) {
                for (let tag of blog.tags) {
                    tagContent += tag + ', ';
                }
            }
            tagContent = tagContent.slice(0, tagContent.length - 2);
            blogsHTML += `
                <li class="list-group-item">
                <p>Title: ${capitalizeFirstLetter(blog.title)} </p>
                    <p>Author: ${capitalizeFirstLetter(blog.author)}  <span class="date">- ${blogDate.getFullYear()}-${blogDate.getMonth() + 1}-${blogDate.getDate()} at ${blogDate.getHours()}:${blogDate.getMinutes()}:${blogDate.getSeconds()}</span></p>
                    <p>Tags: ${capitalizeFirstLetter(tagContent)}</p>
                    <p>${capitalizeFirstLetter(blog.content.slice(0, 100))}<span>
                    <a href="post.html?id=${blog._id}">...read more</a></span>
                    </p>  
                </li>
            `
        }

        document.getElementById('blog-list').innerHTML = blogsHTML;

    } catch (error) {
        console.log(error);
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}