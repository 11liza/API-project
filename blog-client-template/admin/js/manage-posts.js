
fetch('https://blog-api-assignment.up.railway.app/posts')
    .then((response) => {
        if (response.ok == false) {
            throw new Error('HTTP ERROR: ' + response.status);
        }
        return response.json();
    })
    .then((data) => {
        let HTMLContent = "";
        const pageIndex = 1;
        const paginationLimit = 10;
        const tbody = document.querySelector('tbody');
        
        if (!data) {
            const h3 = document.createElement('h3');
            h3.innerHTML = 'No data';
            tbody.appendChild(h3);
        } else {
            tbody.innerHTML = "";
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

                        // find current page
                        console.log(document.querySelector('.active'));
                        const pageIndex = Number(document.querySelector('.active').getAttribute('page-index'));
                        console.log(pageIndex);
                        // pagination efter deleting post
                        fetch('https://blog-api-assignment.up.railway.app/posts')
                            .then((response) => {
                                return response.json();
                            })
                            .then((data) => {
                                if (!data) {
                                    const h3 = document.createElement('h3');
                                    h3.innerHTML = 'No data';
                                    document.querySelector('tbody').appendChild(h3)
                                } else {
                                    document.getElementById('pagination-numbers').innerHTML = "";
                                    console.log(document.getElementById('pagination-numbers').childNodes)
                                    pagination(data.length, paginationLimit, pageIndex);
                                }

                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    } catch (error) {
                        console.log(error);
                    }
                })
            }

            //pagination
            pagination(data.length, paginationLimit, pageIndex)
        }
    })
    .catch((error) => {
        console.log(error);
    })

function pagination(numberOfPosts, paginationLimit, currentPage) {

    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    const paginationNumbers = document.getElementById('pagination-numbers');
    const body = document.querySelector('tbody');
    const rowList = body.querySelectorAll('tr');
    console.log(rowList);

    //calculate number of pages
    const pageCount = Math.ceil(numberOfPosts / paginationLimit);
    console.log(pageCount);

    if (currentPage > pageCount) {
        currentPage = pageCount;
    }

    const disableButton = (button) => {
        button.classList.add('disabled');
        button.setAttribute("disabled", true);
    }

    const enableButton = (button) => {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    }
    //handle status of previous and next buttons
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
        console.log(document.getElementById('pagination-numbers').childNodes)
        document.getElementById('pagination-numbers').childNodes.forEach((button) => {

            button.classList.remove('active');
            button.style.backgroundColor = 'unset';
            console.log(button)
            const pageIndex = Number(button.getAttribute("page-index"));
            console.log(pageIndex);
            if (pageIndex == currentPage) {
                button.classList.add('active');
                button.style.backgroundColor = 'grey';
                console.log(button)
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
    // generate page indexes
    const getPaginationNumbers = () => {
        for (let i = 1; i <= pageCount; i++) {
            appendPageNumber(i);
        }
    }

    const setCurrentPage = (pageNum) => {
        currentPage = pageNum;

        handleActivePageNumber();
        handlePageButtonsStatus();

        //calculate first och last post of one page
        const startPoint = (pageNum - 1) * paginationLimit;
        const endPoint = pageNum * paginationLimit;

        for (let i = 0; i < rowList.length; i++) {
            console.log(rowList[i]);
            rowList[i].setAttribute("hidden", "true");
            // show all posts of current page
            if (i >= startPoint && i < endPoint) {
                rowList[i].removeAttribute("hidden");
            }
        }
    }
    getPaginationNumbers();
    setCurrentPage(currentPage);


    prevButton.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
    });

    const availablePages = paginationNumbers.childNodes;
    for (let button of availablePages) {
        const pageIndex = Number(button.getAttribute('page-index'));
        console.log(pageIndex)
        button.addEventListener("click", (e) => {
            setCurrentPage(pageIndex);
        })
    }
}