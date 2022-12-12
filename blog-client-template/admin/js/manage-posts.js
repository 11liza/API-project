
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
            // format Tags field
            let tagContent = "";
            if (post.tags) {
                for (let tag of post.tags) {
                    tagContent += tag + ', ';
                }
            }
            tagContent = tagContent.slice(0, tagContent.length - 2);

            // format Date field
            const dateValue = new Date(post.date);
            HTMLContent +=
                `<tr>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${tagContent}</td>
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
            link.addEventListener('click', async (e) => {
                console.log(link.parentNode.parentNode)
                let id = e.target.dataset.id;
                try {
                    await fetch('https://blog-api-assignment.up.railway.app/posts/' + id, {
                        method: 'DELETE'
                    })
                    link.parentNode.parentNode.remove();
                } catch (error) {
                    console.log(error);
                }
            })
        }
    })
    .catch((error) => {
        console.log(error);
    })

function pagination(numberOfPages) {

    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    const pagintionNumbers = document.getElementById('page-numbers');


    const paginationLimit = 10;
    const pageCount = Math.ceil(numberOfPages / paginationLimit);
    let currentPage = 1;

    const disableButton = (button) => {
        button.classList.add('disabled');
        button.setAttribute("disabled", true);
    }

    const enableButton = (button) => {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    }

    const handlePageButtonsStatus = () => {
        if (currentPage == 1) {
            disableButton(prevButton)
        } else {
            enableButton(prevButton)
        }

        if(currentPage == pageCount){
            disableButton(nextButton)
        }else {
            enableButton(nextButton);
        }
    }

    const handleActivePageNumber = ()=> {
        document.querySelectorAll(".pagination-number").forEach((button)=>{
            button.classList.remove('active');
            const pageIndex = Number(button.getAttribute("page-index"));
            if(pageIndex == currentPage){
                button.classList.add('active');
            }
        })
    }

    const appendPageNumber = (index) =>{
        const pageNumber = document.createElement('button');
        pageNumber.classList.add('.pagination-number');
        pageNumber.innerHTML = index;
        pageNumber.setAttribute('page-index',index);
        pageNumber.setAttribute('arial-label',"Page " + index);
        pagintionNumbers.appendChild('pageNumber');
    }

}


