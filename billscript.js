const API_BASE_URL = 'http://localhost:3000/api'; 

const billingForm = document.getElementById('billingForm');
const billingCustomer = document.getElementById('billingCustomer');
const billingProduct = document.getElementById('billingProduct');
const billingMessage = document.getElementById('billingMessage');

// Fetch Customers for Billing
const fetchBillingCustomers = async () => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    const customers = await response.json();
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer._id;
        option.textContent = customer.name;
        billingCustomer.appendChild(option);
    });
};

// Fetch Products for Billing
const fetchBillingProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    const products = await response.json();
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product._id;
        option.textContent = product.name;
        billingProduct.appendChild(option);
    });
};

// Add Billing
billingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const customerId = billingCustomer.value;
    const productId = billingProduct.value;
    const quantity = document.getElementById('billingQuantity').value;

    try {
        const productResponse = await fetch(`${API_BASE_URL}/products/${productId}`);
        const productData = await productResponse.json();
        const price = productData.price;

        const response = await fetch(`${API_BASE_URL}/billing/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer: customerId,
                products: [{ product: productId, quantity: parseInt(quantity), price }]
            })
        });
        const result = await response.json();
        billingMessage.textContent = result.message || 'Billing added successfully!';
        billingForm.reset();
    } catch (error) {
        billingMessage.textContent = error.message;
    }
});

// Initialize Billing Management
const initBilling = async () => {
    await fetchBillingCustomers();
    await fetchBillingProducts();
};

initBilling();
