const customerForm = document.getElementById('customerForm');
const customerList = document.getElementById('customerList');

customerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: customerForm.name.value,
    email: customerForm.email.value,
    phone: customerForm.phone.value,
    purchaseHistory: []
  };

  const res = await fetch('/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert('Customer saved!');
  loadCustomers();
});

async function loadCustomers() {
  const res = await fetch('/customers');
  const customers = await res.json();

  customerList.innerHTML = customers.map(c => `
    <li>${c.name} - ${c.email}</li>
  `).join('');
}

window.onload = loadCustomers;
