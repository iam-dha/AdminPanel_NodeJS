// Status Filter
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {

    let url = new URL(window.location.href);

    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            let status = button.getAttribute("button-status");

            if(status) {
                url.searchParams.set("availabilityStatus", status)
            }
            else {
                url.searchParams.delete("availabilityStatus");
            }
            url.searchParams.delete("page"); // Auto set page to 1
            window.location.href = url.href;
        })

    })
}
// End Status Filter

//Form Search

const formSearch = document.querySelector("#form-search")
if(formSearch){

    let url = new URL(document.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent reload
        const keyword = e.target.elements.keyword.value;

        if(keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    })
}

// End Form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
    let url = new URL(document.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", (e) => {
            const page = button.getAttribute("button-pagination");
            
            url.searchParams.set("page", page);

            window.location.href = url.href;

        })
    })
}

// End Pagination

// Checkbox Multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked){
            // Check ALL
            inputsId.forEach((input) => {
                input.checked = true;
            })
        }
        else {
            // Uncheck ALL
            inputsId.forEach((input) => {
                input.checked = false;
            })
        }
    })

    inputsId.forEach((input) => {
        input.addEventListener("click", () => {
            if ([...inputsId].every(input => input.checked)) {
                inputCheckAll.checked = true;  
            } else {
                inputCheckAll.checked = false;
            }
        });
    });


}
// End Checkbox Multi

// Form Change Multi
    const formChangeMulti = document.querySelector("[form-change-multi]");
    if(formChangeMulti){
        formChangeMulti.addEventListener("submit", (e) => {
            e.preventDefault();
            const checkboxMulti = document.querySelector("[checkbox-multi]");
            const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

            const typeChange = e.target.elements.type.value;

            if(typeChange == "Delete"){
                const isConfirm = confirm("Delete selected product?");
                if(!isConfirm){
                    return;
                }
            }
            if(inputsChecked.length > 0){
                let ids = [];
                const inputIds = formChangeMulti.querySelector("[name='ids']");
                inputsChecked.forEach(input => {
                    const id = input.value;
                    if(typeChange == "Change-Position"){
                        const position = input.closest("tr").querySelector("input[name='position']").value;

                        ids.push(`${id}-${position}`);
                    }
                    else {
                        ids.push(id);
                    }
                })
                
                inputIds.value = ids.join(", ");
                formChangeMulti.submit();
            }
            else{
                alert("Please choose at least one");
            }
        })
    }

// End Form Change Multi

//Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const closeAlert = showAlert.querySelector("[close-alert]");
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })


}
//End show alert

//Preview Image

const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", (e) => {
        const [fileToPreview] = e.target.files;
        if(fileToPreview){
            uploadImagePreview.src = URL.createObjectURL(fileToPreview);
        }
    })
}

//End Preview image

//Sort product

const sort = document.querySelector("[sort]");

if(sort){
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");

    // Sort
    sortSelect.addEventListener("change", (e) => {
        const [key, value] = e.target.value.split('-');
        url.searchParams.set("sortKey", key);
        url.searchParams.set("sortValue", value);
        window.location.href = url.href;
    })

    //Clear Sort
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    })

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue){
        const sortOptionSelected = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value= '${sortOptionSelected}']`);
        optionSelected.selected = true;
    }
}

//End sort product


