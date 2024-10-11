// Mendapatkan referensi elemen dari form
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageDiv = document.getElementById("message");

// Fungsi untuk memeriksa validitas form
function checkFormValidity() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Cek apakah semua field sudah terisi dan email mengandung karakter '@'
  if (name.length > 0 && email.includes("@")) {
    // Trigger custom event 'formValid' ketika semua valid
    const formValidEvent = new CustomEvent("formValid", {
      detail: { message: "Form valid dan siap untuk dikirim!" },
    });
    document.dispatchEvent(formValidEvent);
  } else {
    messageDiv.innerHTML = "<b> Form Tidak Valid </b>"; // Kosongkan pesan validasi jika tidak valid
    messageDiv.style.color = "red";
  }
}

// Menambahkan event listener untuk input perubahan pada form
nameInput.addEventListener("input", checkFormValidity);
emailInput.addEventListener("input", checkFormValidity);

// Menangkap event submit agar tidak mengirimkan form secara otomatis
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Menghentikan pengiriman form default
  alert("Form disubmit!");
});

// Menambahkan event listener untuk event kustom 'formValid'
document.addEventListener("formValid", function (event) {
  // Menampilkan pesan sukses saat form valid
  messageDiv.textContent = event.detail.message;
  messageDiv.style.color = "green";
});
