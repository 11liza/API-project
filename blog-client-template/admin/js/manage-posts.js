
fetch('https://blog-api-assignment.up.railway.app/posts')
    .then((response) => {
        if (response.ok == false) {
            throw new Error('HTTP ERROR: ' + response.status);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data)
        let HTMLContent = "";
        for (let post of data) {
            console.log(post)
            // format Tags field
            let tagContent = "";
            if (post.tags) {
                for (let tag of post.tags) {
                    tagContent += tag + ', ';
                }
            }
            tagContent = tagContent.slice(0, tagContent.length - 1);
            // format Date field

            const dateValue = new Date(post.date);
            HTMLContent +=
                `<tr>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${tagContent}</td>
            <td>${dateValue.getFullYear()}-${dateValue.getMonth()}-${dateValue.getDay()} ${dateValue.getHours()}:${dateValue.getMinutes()}</td>
            <td>
                <a href="#">Update</a> |
                <a href="#">Delete</a>
            </td>
            </tr>`
        }
        console.timeLog(document.getElementById('table').lastElementChild)
        document.getElementById('table').lastElementChild.innerHTML = HTMLContent;
    })