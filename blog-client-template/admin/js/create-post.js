let form = document.getElementById('post');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    let myData = Object.fromEntries(formData);
    console.log(myData)

    let tags = [];
    for(let option of document.getElementById('tags').options){
        if(option.selected){
            tags.push(option.value)
        }
    }
    console.log(tags)
    myData.tags = tags;
    console.log(myData)

    try {
        await fetch('https://blog-api-assignment.up.railway.app/posts',{
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(myData)
        })
        window.location.replace('index.html')

    }catch(error){
        console.log(error);
    }
})