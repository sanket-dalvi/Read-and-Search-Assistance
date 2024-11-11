function validateSearch() {
    console.log("test")
    var searchInput = document.getElementById('searchInput').value.trim();

    // Check if search input is empty or ends with "|||"
    if (searchInput === '' || searchInput.endsWith('|||')) {
        alert('Please enter a valid search query.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

filter_mime_types = {
    'all': [],
    'pdf': ['application/pdf'],
    'images': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
    'doc': ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    'txt': ['text/plain'],
    'sheets': ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
    'html': ['text/html'],
    'urls': ['url']
}

// Filter documents based on button click
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        const isActive = button.classList.contains('active');

        // Toggle active class for multiple selection
        button.classList.toggle('active');

        // Get all active filters
        const activeFilters = Array.from(document.querySelectorAll('.filter-button.active')).map(button => button.dataset.filter);

        // Filter documents based on selected filters
        document.querySelectorAll('.document-card').forEach(card => {
            const fileType = card.getAttribute('data-type');
            const shouldShow = activeFilters.includes('all') || activeFilters.some(filter => filter_mime_types[filter].includes(fileType));

            if (shouldShow) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.querySelectorAll('.show-image-button').forEach(button => {
    button.addEventListener('click', () => {
        const image = button.nextElementSibling;
        image.style.display = image.style.display === 'none' ? 'grid' : 'none';
    });
});


// Count document cards in each category
const countDocuments = () => {
    const total_count = document.querySelectorAll('.document-card').length;
    const pdf_count = document.querySelectorAll('.document-card[data-type="application/pdf"]').length;
    const image_count = document.querySelectorAll('.document-card[data-type*="image/"]').length;
    const doc_count = document.querySelectorAll('.document-card[data-type="application/msword"], .document-card[data-type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"]').length;
    const txt_count = document.querySelectorAll('.document-card[data-type="text/plain"]').length;
    const sheets_count = document.querySelectorAll('.document-card[data-type="application/vnd.ms-excel"], .document-card[data-type="text/csv"]').length;
    const html_count = document.querySelectorAll('.document-card[data-type="text/html"]').length;
    const urls_count = document.querySelectorAll('.document-card[data-type="url"]').length;

    // Update filter buttons with counts
    document.getElementById('allFilterButton').textContent += ' (' + total_count + ')';
    document.getElementById('pdfFilterButton').textContent += ' (' + pdf_count + ')';
    document.getElementById('imagesFilterButton').textContent += ' (' + image_count + ')';
    document.getElementById('docFilterButton').textContent += ' (' + doc_count + ')';
    document.getElementById('txtFilterButton').textContent += ' (' + txt_count + ')';
    document.getElementById('sheetFilterButton').textContent += ' (' + sheets_count + ')';
    document.getElementById('htmlFilterButton').textContent += ' (' + html_count + ')';
    document.getElementById('urlFilterButton').textContent += ' (' + urls_count + ')';

};

// Call countDocuments function on page load
window.addEventListener('load', countDocuments);

