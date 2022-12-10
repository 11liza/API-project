
window.onload = function () {
    console.log(location.search)
    let urlParams = new URLSearchParams(location.search);
    console.log(urlParams.get('id'));

    let tagsField = document.querySelectorAll('option');
    let form = document.getElementById('post');

    //get post from server och show on DOM
    fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'))
        .then((response) => {
            if (response.ok == false) {
                throw new Error('HTTP ERROR: ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            for (let key of Object.keys(data)) {
                console.log(key)

                //format tags field
                if (key == 'tags' && data[key]) {
                    console.log(data[key])
                    for (let tag of tagsField) {
                        console.log(tag.value)
                        if(data[key].includes(tag.value)){
                            tag.selected = 'true';
                        }
                    }
                    // format all fields except the tags field
                } else if (document.getElementById(key)) {
                    document.getElementById(key).value = data[key];
                }
            }
        })
        .catch((error)=>{
        console.log(error);
        })  

    //update post
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        let myData = Object.fromEntries(formData);
        console.log(myData)

        // get list of selected tags
        let listOfTags = [];
        for(let tag of tagsField){
            if(tag.selected){
                listOfTags.push(tag.value);
            }
        }
        myData.tags = listOfTags;
        console.log(myData)

        try{
            await fetch('https://blog-api-assignment.up.railway.app/posts/' + urlParams.get('id'), {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(myData)
            })
           window.location.replace('index.html');
        }catch(error){
            console.log(error);
        }
    })
}