let urlParams = new URLSearchParams(window.location.search)

fetchBlog();

async function fetchBlog() {

    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'));
        let blog = await response.json();
        let tagContent = "";
        if (blog.tags) {
            for (let tag of blog.tags) {
                tagContent += tag + ', ';
            }
        }
        tagContent = tagContent.slice(0, tagContent.length - 2);
        let blogsHTML = '';
        {
            let blogDate = new Date(blog.date)

            blogsHTML += `
                <li class="list-group-item">
                <p>Title: ${capitalizeFirstLetter(blog.title)} </p>
                    <p>Author: ${capitalizeFirstLetter(blog.author)}  <span class="date">- ${blogDate.getFullYear()}-${blogDate.getMonth() + 1}-${blogDate.getDate()} at ${blogDate.getHours()}:${blogDate.getMinutes()}:${blogDate.getSeconds()}</span></p>
                    <p>Tags: ${capitalizeFirstLetter(tagContent)}</p>
                    <p>${capitalizeFirstLetter(blog.content)} <br></p>
                    
                  
                </li>
            `
        }

        document.getElementById('blog-post').innerHTML = blogsHTML;

    } catch (error) {
        console.log(error);
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}