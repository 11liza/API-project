const listOfTags = ['economics', 'travel', 'food','favorit','entertainment','games','sports'];
let tagField = document.getElementById('tags');
let tagContent = "";
for (let tag of listOfTags){
    tagContent += `<option value=${tag}>${tag}</option>`
}
tagField.innerHTML = tagContent;