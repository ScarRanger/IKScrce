function openModal(id) {
    const modal = document.getElementById(`${id}-modal`);
    if (modal) {
        modal.style.display = "block";
    }
}

function closeModal(id) {
    const modal = document.getElementById(`${id}-modal`);
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside the content
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
