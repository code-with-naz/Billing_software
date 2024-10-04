const API_BASE_URL = 'http://localhost:3000/api'; 

const billingList = document.getElementById('billingList');

// Fetch Billings
const fetchBillings = async () => {
    const response = await fetch(`${API_BASE_URL}/billing`);
    return await response.json();
};

// Render Billings
const renderBillings = async () => {
    const billings = await fetchBillings();
    billingList.innerHTML = '';
    billings.forEach(billing => {
        const li = document.createElement('li');
        li.textContent = `Customer: ${billing.customer.name}, Total: $${billing.total}`;
        
        // Create Edit button
        const editButton = document.createElement('span');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.onclick = () => editBilling(billing._id);

        // Create Delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteBilling(billing._id);

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        billingList.appendChild(li);
    });
};

// Edit Billing
const editBilling = async (billingId) => {
    // Logic to edit billing, you can redirect to an edit page or open a modal
    alert(`Editing billing ID: ${billingId}`);
};

// Delete Billing
const deleteBilling = async (billingId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/billing/delete/${billingId}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        alert(result.message || 'Billing deleted successfully!');
        renderBillings(); 
    } catch (error) {
        alert(error.message);
    }
};

// Initialize Billing View
const initBillingView = async () => {
    await renderBillings();
};

initBillingView();
