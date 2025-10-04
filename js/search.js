class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.episodeList = document.getElementById('episodeList');
        this.searchContainer = document.getElementById('searchContainer');
        this.boxes = Array.from(document.querySelectorAll('.box'));
        this.init();
    }

    init() {
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchInput.addEventListener('focus', this.showResults.bind(this));
        this.searchInput.addEventListener('blur', this.hideResults.bind(this));
        
        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchContainer.contains(e.target)) {
                this.hideResults();
            }
        });
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            this.hideResults();
            this.showAllBoxes();
            return;
        }

        this.filterBoxes(query);
        this.showResults();
        this.updateResultsList(query);
    }

    filterBoxes(query) {
        this.boxes.forEach(box => {
            const searchText = box.getAttribute('data-search-text').toLowerCase();
            if (searchText.includes(query)) {
                box.classList.remove('hidden');
            } else {
                box.classList.add('hidden');
            }
        });
    }

    showAllBoxes() {
        this.boxes.forEach(box => box.classList.remove('hidden'));
    }

    updateResultsList(query) {
        this.searchResults.innerHTML = '';
        
        const matchingBoxes = this.boxes.filter(box => {
            const searchText = box.getAttribute('data-search-text').toLowerCase();
            return searchText.includes(query);
        });

        if (matchingBoxes.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'Tidak ada episode yang cocok dengan pencarian.';
            this.searchResults.appendChild(noResults);
            return;
        }

        matchingBoxes.forEach((box, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.textContent = box.getAttribute('data-search-text');
            
            resultItem.addEventListener('click', () => {
                this.searchInput.value = '';
                this.hideResults();
                this.showAllBoxes();
                
                // Scroll to the selected box
                box.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Add highlight effect
                box.style.transition = 'all 0.5s ease';
                box.style.boxShadow = '0 0 0 3px var(--accent-blue)';
                setTimeout(() => {
                    box.style.boxShadow = '';
                }, 2000);
            });

            this.searchResults.appendChild(resultItem);
        });
    }

    showResults() {
        if (this.searchInput.value.trim().length > 0) {
            this.searchResults.classList.add('active');
        }
    }

    hideResults() {
        setTimeout(() => {
            this.searchResults.classList.remove('active');
        }, 150);
    }
}

export { SearchManager };