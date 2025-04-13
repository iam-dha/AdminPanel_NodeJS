const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {

    let url = new URL(window.location.href);
    console.log(url);

    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            let status = button.getAttribute("button-status");

            if(status) {
                url.searchParams.set("availabilityStatus", status)
            }
            else {
                url.searchParams.delete("availabilityStatus");
            }
            // console.log(url.href)
            window.location.href = url.href;
        })

    })
}
