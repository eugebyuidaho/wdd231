document.querySelector("#timestamp").value = new Date().toISOString();

const modalLinks = document.querySelectorAll(".level-link");
const closeButtons = document.querySelectorAll(".close-modal");

modalLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const modalId = link.getAttribute("data-modal");
    document.querySelector(`#${modalId}`).showModal();
  });
});

closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

document.querySelectorAll("dialog").forEach(modal => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});