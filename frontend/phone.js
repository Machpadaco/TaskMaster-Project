const phoneForm = document.getElementById('phoneForm');
const phoneList = document.getElementById('phoneList');

phoneForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: phoneForm.name.value,
    brand: phoneForm.brand.value,
    price: parseFloat(phoneForm.price.value),
    description: phoneForm.description.value,
    image: phoneForm.image.value // if using file upload, we’ll revise this later
  };

  const res = await fetch('/phones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert('Phone added!');
  loadPhones();
});

async function loadPhones() {
  const res = await fetch('/phones');
  const phones = await res.json();

  phoneList.innerHTML = phones.map(p => `
    <li>
      ${p.name} (${p.brand}) - ₦${p.price}<br/>
      <small>${p.description}</small>
    </li>`).join('');
}

window.onload = loadPhones;
