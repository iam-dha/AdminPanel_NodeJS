// Permission

const tablePermission = document.querySelector("[permission-table]");
if(tablePermission){
    const submitButton = document.querySelector("[button-submit]")
    submitButton.addEventListener("click", () => {
        let permissions = [];
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if(name == "id"){
                inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    });
                })
            }
            else{
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if(checked){
                        permissions[index].permissions.push(name);
                    }

                })
            }
        });
        if(permissions.length > 0){
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    })
}


// Permissions Data display

const dataRecords = document.querySelector("[data-records]");

if(dataRecords){
    const roles = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermission = document.querySelector("[permission-table]");

    roles.forEach((role, index) => {
        const permissions = role.permissions;

        permissions.forEach(permission => {
            const row = tablePermission.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        })
    })

}

