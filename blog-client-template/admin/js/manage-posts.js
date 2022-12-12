
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

        //pagination
        pagination(data)
    })
    .catch((error) => {
        console.log(error);
    })

function pagination(data) {

    const numberOfPosts = data.length;
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    const paginationNumbers = document.getElementById('pagination-numbers');
    const body = document.querySelector('tbody');
    const rowList = body.querySelectorAll('tr');
    console.log(rowList);
    console.log(numberOfPosts)


    const paginationLimit = 10;
    const pageCount = Math.ceil(numberOfPosts / paginationLimit);
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

        if (currentPage == pageCount) {
            disableButton(nextButton)
        } else {
            enableButton(nextButton);
        }
    }

    const handleActivePageNumber = () => {
        console.log('handle')
        document.querySelectorAll(".pagination-number").forEach((button) => {
            button.classList.remove('active');
            const pageIndex = Number(button.getAttribute("page-index"));
            console.log(pageIndex);
            if (pageIndex == currentPage) {
                button.classList.add('active');
            }
        })
    }

    const appendPageNumber = (index) => {
        const pageNumber = document.createElement('button');
        pageNumber.classList.add('.pagination-number');
        pageNumber.innerHTML = index;
        pageNumber.setAttribute('page-index', index);
        pageNumber.setAttribute('arial-label', "Page " + index);
        paginationNumbers.appendChild(pageNumber);
    }

    const getPaginationNumbers = () => {
        for (let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    }

    const setCurrentPage = (pageNum) => {
        currentPage = pageNum;

        handleActivePageNumber();
        handlePageButtonsStatus();

        
        const startPoint = (pageNum - 1) * paginationLimit;
        const endPoint = pageNum * paginationLimit;

        for (let i = 0; i < rowList.length; i++) {
            console.log(rowList[i]);
            rowList[i].setAttribute("hidden","true");
            // show all posts of current page
            if (i >= startPoint && i < endPoint) {
                rowList[i].removeAttribute("hidden");
            }
        }
    }
    getPaginationNumbers();
    setCurrentPage(1);
    // window.onload = function(){
    //     console.log('co khog')
    //     getPaginationNumbers();
    //     setCurrentPage(1);
    // }
    prevButton.addEventListener("click", () => {
        console.log('iiii')
        setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
        console.log("aaaa")
    });

    const availablePages =  paginationNumbers.childNodes;
   for(let button of availablePages ){
    const pageIndex = Number(button.getAttribute('page-index'));
    console.log(pageIndex)
    button.addEventListener("click", ()=>{
        setCurrentPage(pageIndex);
    })
   }
}


