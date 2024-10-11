// event on input untuk menentukan jumlah karakter yang diperbolehkan dan maksimal karakter
document.addEventListener("DOMContentLoaded", function () {
  const inputMaxLengthOnLoad = document.getElementById("inputNama").maxLength;
  document.getElementById("sisaKarakter").innerText = inputMaxLengthOnLoad;

  document.getElementById("inputNama").addEventListener("input", function () {
    const jumlahKarakterDiketik = document.getElementById("inputNama").value.length;
    const jumlahKarakterMaksimal = document.getElementById("inputNama").maxLength;

    console.log("Jumlah Karakter Diketik: ", jumlahKarakterDiketik);
    console.log("Jumlah Karakter Maksimal:", jumlahKarakterMaksimal);
    const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
    document.getElementById("sisaKarakter").innerText = sisaKarakterUpdate.toString();

    if (sisaKarakterUpdate === 0) {
      document.getElementById("sisaKarakter").innerText = "Batas Maksimal Tercapai!";
    } else if (sisaKarakterUpdate <= 5) {
      document.getElementById("notifikasiSisaKarakter").style.color = "red";
    } else {
      document.getElementById("notifikasiSisaKarakter").style.color = "black";
    }
  });

  // code on focus pada input nama untuk menampilkan sisa karakter yang tersedia
  document.getElementById("inputNama").addEventListener("focus", function () {
    console.log("inputNama: focus");
    document.getElementById("notifikasiSisaKarakter").style.visibility = "visible";
  });

  // menggunakan event onblur untuk menghilangkan notifikasi sisa karakter
  document.getElementById("inputNama").addEventListener("blur", function () {
    console.log("inputNama: blur");
    document.getElementById("notifikasiSisaKarakter").style.visibility = "hidden";
  });

  // menggunakan event onchange
  document.getElementById("inputCaptcha").addEventListener("change", function () {
    console.log("inputCaptcha: change");

    const inputCaptcha = document.getElementById("inputCaptcha").value;
    const submitButtonStatus = document.getElementById("submitButton");

    if (inputCaptcha === "PRNU") {
      submitButtonStatus.removeAttribute("disabled");
    } else {
      submitButtonStatus.setAttribute("disabled", "");
    }
  });

  // melakukan validasi saat formulir di submit maka akan muncul alert
  document.getElementById("formDataDiri").addEventListener("submit", function (event) {
    const inputCaptcha = document.getElementById("inputCaptcha").value;

    if (inputCaptcha === "PRNU") {
      alert("Selamat! Data Anda Berhasil diSubmit! :D");
    } else {
      alert("Maaf! Captcha Anda Salah :( ");
      document.getElementById("submitButton").setAttribute("disabled", "");
    }
    event.preventDefault();
  });
  // event copy pada clipboard
  document.getElementById("inputCopy").addEventListener("copy", function () {
    alert("Kode Voucher Telah Dicopy!");
  });

  document.getElementById("inputPaste").addEventListener("paste", function () {
    alert("Kode Voucher Telah Disalin");
  });
});
