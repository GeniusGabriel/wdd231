// Get the current date and time when the page loads
const timestampField = document.querySelector("#timestamp");

// Check that the timestamp field exists
if (timestampField) {
    timestampField.value = new Date().toLocaleString();
}
// SELECT ALL MEMBERSHIP LINKS
const modalLinks = document.querySelectorAll(".modal-link");
// OPEN MEMBERSHIP DIALOGS
modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = link.getAttribute("href");
        const modal = document.querySelector(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});
// SELECT ALL DIALOG CLOSE BUTTONS
const closeButtons = document.querySelectorAll(".close-modal");

// CLOSE THE CORRESPONDING DIALOG
closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");

        if (dialog) {
            dialog.close();
        }
    });
});