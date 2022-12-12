
window.onload = function () {


    console.log(location.search);
    let urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams.get('id'));

    fetchBlog();

    async function fetchBlog() {
        try {
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'));
            let blog = await response.json();
            console.log(blog);
            document.getElementById('content-textarea').value = blog.content;
            document.getElementById('tag-select').value = blog.tags;
        } catch (error) {
            console.log(error);
        }
    }

    document.getElementById('update-blog-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const form = e.target;
        let formDataObject = serializeForm(form);


        try {
            await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id')), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            }

            location.replace('index.html')
        } catch (error) {
            console.log(error)
        }
    })

}


let serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);

    for (var key of formData.keys()) {
        let inputData = formData.getAll(key);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];
        }
    }

    return obj;
};