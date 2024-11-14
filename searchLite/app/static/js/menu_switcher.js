document.addEventListener("DOMContentLoaded", function() {
    // Function to hide all sections in menu-box
    function hideAllSections() {
        document.querySelectorAll("#menu-box > div").forEach(div => {
            div.style.display = "none";
        });
    }

    // Event listeners for the buttons
    document.getElementById("search-btn").addEventListener("click", function() {
        hideAllSections();
        document.querySelector(".search-page").style.display = "block";
    });

    // document.getElementById("open-files-btn").addEventListener("click", function() {
    //     hideAllSections();
    //     document.querySelector(".open-file-list").style.display = "block";
    // });

    document.getElementById("upload-docs-btn").addEventListener("click", function() {
        hideAllSections();
        document.querySelector(".upload-docs").style.display = "block";
    });

    // Initially hide all sections except one if desired
    // Uncomment the line below if you want to show a default section
    // document.querySelector(".search-page").style.display = "block";
});
