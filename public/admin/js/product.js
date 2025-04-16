const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

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
