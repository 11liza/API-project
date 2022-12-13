
fetch('https://blog-api-assignment.up.railway.app/posts')
    .then((response) => {
        if (response.ok == false) {
            throw new Error('HTTP ERROR: ' + response.status);
        }
        return response.json();
    })
    .then((data) => {
        let HTMLContent = "";
        for (let post of data) {
            // format Date field
            const dateValue = new Date(post.date);

            HTMLContent +=
                `<tr>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${post.tags}</td>
            <td>${dateValue.getFullYear()}-${dateValue.getMonth()}-${dateValue.getDay()} ${dateValue.getHours()}:${dateValue.getMinutes()}</td>
            <td>
                <a href="update-post.html?id=${post._id}">Update</a> |
                <a href="#" data-id=${post._id}>Delete</a>
            </td>
            </tr>`
        }
        document.getElementById('table').lastElementChild.innerHTML = HTMLContent;

        //Delete post
        let form = document.getElementById('form');
        let delLinks = form.querySelectorAll("a[data-id]");
        for (let link of delLinks) {
            link.addEventListener('click',async(e)=>{
                let id = e.target.dataset.id;
                try{
                    await fetch('https://blog-api-assignment.up.railway.app/posts/'+id,{
                        method: 'DELETE'
                    })
                    link.parentNode.parentNode.remove();
                }catch(error){
                    console.log(error);
                }
            })
        }
    })
    .catch((error) => {
        console.log(error);
    })
