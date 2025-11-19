const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('profilePic', profileForm.profilePic.files[0]);

  const userId = localStorage.getItem('userId');

  const res = await fetch(`/users/upload/${userId}`, {
    method: 'POST',
    body: formData
  });

  const result = await res.json();
  alert('Profile picture uploaded!');
});

// Fetch and display profile data
console.log("Profile script loaded.");

