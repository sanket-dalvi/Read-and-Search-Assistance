document.addEventListener("DOMContentLoaded", function () {
    const dropZone = document.querySelector(".drop-zone");
    const fileInput = document.getElementById("file-input");

    dropZone.addEventListener("dragover", function (e) {
        e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
        dropZone.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend", "drop"].forEach(type => {
        dropZone.addEventListener(type, function (e) {
            dropZone.classList.remove("drop-zone--over");
        });
    });

    dropZone.addEventListener("drop", function (e) {
        e.preventDefault(); // This stops the file from being opened if dropped outside of the drop zone

        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files; // As mentioned earlier, this doesn't work due to security reasons in JavaScript
            // Display the filename or handle the files as needed
            console.log("Dropped file:", e.dataTransfer.files[0].name);
        }
    });

    fileInput.addEventListener("change", function () {
        if (this.files.length) {
            console.log("File chosen via input:", this.files[0].name);
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const clearSelectionBtn = document.getElementById('clear-selection-btn');
    const fileInput = document.getElementById('file-input');

    clearSelectionBtn.addEventListener('click', function () {
        fileInput.value = ""; // Clear the file input value
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = ""; // Clear the displayed file list if necessary
    });
});
