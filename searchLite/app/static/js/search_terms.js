document.getElementById("addTermButton").addEventListener("click", function () {
    var searchInput = document.getElementById("searchInput");
    if (searchInput.value.trim() === "") {
        alert("Please enter a valid search term before adding.");
    } else {
        var term = searchInput.value.trim();
        addTerm(term);
        searchInput.value = "";
    }
});

// Function to add a term to the terms list
function addTerm(term) {
    var termsList = document.getElementById("termsList");

    // Create a new term-item div with the term text, delete button, and hidden input
    var termDiv = document.createElement("div");
    termDiv.classList.add("term-item");

    var termSpan = document.createElement("span");
    termSpan.textContent = term;

    var deleteButton = document.createElement("span");
    deleteButton.classList.add("delete-term");
    deleteButton.textContent = "X";

    var termInput = document.createElement("input");
    termInput.type = "hidden";
    termInput.name = "search_terms";
    termInput.value = term;

    termDiv.appendChild(termSpan);
    termDiv.appendChild(deleteButton);
    termDiv.appendChild(termInput);
    termsList.appendChild(termDiv);

    // Attach delete functionality to the delete button
    deleteButton.addEventListener("click", function () {
        termDiv.remove(); // Remove the entire term div, which includes the hidden input
    });
}

// Re-apply delete event listeners to preloaded terms on page load
document.addEventListener("DOMContentLoaded", function () {
    var preloadedDeleteButtons = document.querySelectorAll(".delete-term");
    preloadedDeleteButtons.forEach(function(deleteButton) {
        deleteButton.addEventListener("click", function () {
            deleteButton.parentElement.remove(); // Remove the term div and associated hidden input
        });
    });
});

// Validation check before submitting the form
document.getElementById("searchForm").addEventListener("submit", function (event) {
    var termsList = document.getElementById("termsList");
    if (termsList.children.length === 0) {
        alert("Please add at least one search term before searching.");
        event.preventDefault();
    }
});
