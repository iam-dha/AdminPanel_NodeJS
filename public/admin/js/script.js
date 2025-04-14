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
            // console.log(url.href)
            window.location.href = url.href;
        })

    })
}

//Form search

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


