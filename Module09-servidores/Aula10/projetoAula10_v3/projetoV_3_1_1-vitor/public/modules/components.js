const bodyTable = document.querySelector("#table-body");

export function renderTable(userList) {
    bodyTable.innerHTML = ""; //clear table data before insert updated data
    userList.forEach((element) => {
        const rowElement = document.createElement("tr");
        rowElement.innerHTML = `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>
                <img
                    src="./assets/pencil-5-svgrepo-com.svg"
                    alt="pencil icon"
                    class="pencil"
                />
            </td>
            <td><img src="./assets/icons8-x-30.svg" alt="delete icon" 
            class="x"/></td>
        `;
        bodyTable.appendChild(rowElement);
    });
}
