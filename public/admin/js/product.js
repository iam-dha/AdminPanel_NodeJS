// Change product status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if(buttonChangeStatus.length > 0){ // add href="javascript:;" to make only work js code
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const currentAvailabilityStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const changeAvailabilityStatus = (currentAvailabilityStatus == "In Stock" ? "Out Stock" : "In Stock");

            const action = `${path}/${changeAvailabilityStatus}/${id}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}

// End change product status

// Delete product
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Delete this item?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}

// End Delete product



