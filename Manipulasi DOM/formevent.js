const submitAction = document.getElementById("formDataDiri");
// event on submit
submitAction.addEventListener("submit", function (event) {
  const InputNama = document.getElementById("inputNama").value;
  const InputDomisili = document.getElementById("inputDomisili").value;
  const hiddenMessage = `Halo ${InputNama}. Bagaimana Cuacanya di ${InputDomisili} ?`;

  document.getElementById("messageAfterSubmit").innerText = hiddenMessage;
  event.preventDefault();
});
