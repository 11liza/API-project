window.onload = function () {

    const form = document.getElementById('post');
    console.log(location.search);
    let urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams.get('id'));

    fetchBlog();

    async function fetchBlog() {
        try {
            const response = await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'));
            let blog = await response.json();
            console.log(blog);
            //for fields with input type
            const inputFields = document.querySelectorAll('input');
            for (let field of inputFields) {
                console.log(blog[field.id])
                field.value = blog[field.id];
            }
            // for textarea field
            const areafield = document.querySelector('textarea');
            areafield.value = blog.content;

            const tags = document.getElementById('tags');
            console.log(blog.tags)

            for (let tag of tags.childNodes) {
                if (blog.tags.includes(tag.value)) {
                    tag.selected = 'true';
                }
            }
            //udpate data

            document.getElementById('post').addEventListener('submit', async function (e) {
                e.preventDefault();
                const form = e.target;
                let formDataObject = serializeForm(form);
                console.log(JSON.stringify(formDataObject))

                try {
                    await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'), {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formDataObject)
                    })
                    location.replace('index.html')
                } catch (error) {
                    console.log(error)
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
    console.log(document.getElementById('post'))
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