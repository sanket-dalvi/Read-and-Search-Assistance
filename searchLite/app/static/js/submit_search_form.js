document.addEventListener("DOMContentLoaded", function() {
    const resultButton = document.getElementById("result-btn");
    const searchForm = document.getElementById("searchForm");

    // Manually trigger form submission and validation
    resultButton.addEventListener("click", function() {
        if (searchForm) {
            // Trigger the submit event handler
            const submitEvent = new Event("submit", { cancelable: true });
            searchForm.dispatchEvent(submitEvent);

            // Check if the default action was prevented (e.g., validation failed)
            if (!submitEvent.defaultPrevented) {
                searchForm.submit(); // Submit the form if validation passed
            }
        } else {
            console.warn("Search form not found!");
        }
    });
});
