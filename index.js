const create = document.querySelector('#create');
create.addEventListener('click', onAddItem);
window.addEventListener('keyup', onAddItem);


let id = 0;


function onAddItem(event) {
    if (event.type === 'click' || event.key === 'Enter') {
        const createdFullDate = new Date();

        
        const expiredFullDate = document.querySelector('#new-expiration-date').value.replace(/-/, '/').replace(/-/, '/');
        const formattedExpiredDate = new Date(expiredFullDate);
        
        
        const displayExpiredDate = `${formattedExpiredDate.getMonth() + 1}-${formattedExpiredDate.getDate()}-${formattedExpiredDate.getFullYear()}`;
        const displayCreatedDate = `${createdFullDate.getMonth() + 1}-${createdFullDate.getDate()}-${createdFullDate.getFullYear()}`;

        
        const compareExpiredDate = new Date(expiredFullDate).setHours(0,0,0,0);
        const compareCreatedDate = new Date(createdFullDate).setHours(0,0,0,0);

        
        const table = document.querySelector('#list');
        const row = table.insertRow(id + 1);

        
        if (compareCreatedDate >= compareExpiredDate) {
            row.setAttribute('class', 'table-danger');
        }

        
        row.setAttribute('id', `item-${id}`);
        row.insertCell(0).innerHTML = document.querySelector('#new-item').value;
        row.insertCell(1).innerHTML = displayCreatedDate;
        row.insertCell(2).innerHTML = displayExpiredDate;
        const actions = row.insertCell(3);
        actions.appendChild(createDeleteButton(id++));

        resetForm();
    }
}

function createDeleteButton(deleteId) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-success';
    btn.id = deleteId;
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        const elementToDelete = document.querySelector(`#item-${deleteId}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
        id--;
    }
    return btn;
}

function resetForm() {
    document.querySelector('#new-item').value = '';
    document.querySelector('#new-expiration-date').value = '';
}
