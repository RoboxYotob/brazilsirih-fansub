// Enhanced Search Manager with animations
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
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        this.searchInput.addEventListener('focus', this.showResults.bind(this));
        this.searchInput.addEventListener('blur', this.hideResults.bind(this));
        
        // Enhanced keyboard navigation
        this.searchInput.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchContainer.contains(e.target)) {
                this.hideResults();
            }
        });

        this.addSearchAnimations();
    }

    addSearchAnimations() {
        // Add pulsing animation to search input when empty
        this.searchInput.addEventListener('focus', () => {
            if (!this.searchInput.value) {
                this.searchInput.style.animation = 'pulse 2s infinite';
            }
        });

        this.searchInput.addEventListener('input', () => {
            if (this.searchInput.value) {
                this.searchInput.style.animation = '';
            }
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            this.hideResults();
            this.showAllBoxes();
            this.animateSearchClear();
            return;
        }

        this.filterBoxes(query);
        this.showResults();
        this.updateResultsList(query);
        this.animateSearchResults();
    }

    animateSearchClear() {
        this.boxes.forEach((box, index) => {
            setTimeout(() => {
                box.style.animation = `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both`;
            }, index * 100);
        });
    }

    animateSearchResults() {
        const visibleBoxes = this.boxes.filter(box => !box.classList.contains('hidden'));
        visibleBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.style.animation = `bounceIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both`;
            }, index * 150);
        });
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
            noResults.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                    <h3>Tidak ada episode yang cocok</h3>
                    <p>Coba kata kunci lain atau periksa ejaan</p>
                </div>
            `;
            this.searchResults.appendChild(noResults);
            return;
        }

        matchingBoxes.forEach((box, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="font-size: 1.5rem;">🎬</div>
                    <div>
                        <strong>${box.getAttribute('data-search-text')}</strong>
                        <div style="font-size: 0.875rem; opacity: 0.7;">
                            Klik untuk melihat detail
                        </div>
                    </div>
                </div>
            `;
            
            resultItem.style.animationDelay = `${index * 0.1}s`;
            resultItem.style.animation = 'slideInRight 0.3s ease both';
            
            resultItem.addEventListener('click', () => {
                this.searchInput.value = '';
                this.hideResults();
                this.showAllBoxes();
                
                // Enhanced scroll to element with animation
                this.highlightAndScrollTo(box);
            });

            this.searchResults.appendChild(resultItem);
        });
    }

    highlightAndScrollTo(element) {
        // Add highlight effect
        element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.boxShadow = '0 0 0 4px var(--accent-blue), 0 20px 40px rgba(0,0,0,0.2)';
        element.style.transform = 'scale(1.05)';
        
        // Scroll to element
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });

        // Remove highlight after delay
        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.transform = '';
        }, 2000);
    }

    handleKeyboard(e) {
        const results = this.searchResults.querySelectorAll('.search-result-item');
        const highlighted = this.searchResults.querySelector('.highlight');
        let index = Array.from(results).indexOf(highlighted);

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (index < results.length - 1) {
                    this.highlightResult(results, index + 1);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (index > 0) {
                    this.highlightResult(results, index - 1);
                }
                break;
            case 'Enter':
                if (highlighted) {
                    highlighted.click();
                }
                break;
        }
    }

    highlightResult(results, newIndex) {
        results.forEach(r => r.classList.remove('highlight'));
        results[newIndex].classList.add('highlight');
    }

    showResults() {
        if (this.searchInput.value.trim().length > 0) {
            this.searchResults.classList.add('active');
            this.searchResults.style.animation = 'fadeInUp 0.3s ease both';
        }
    }

    hideResults() {
        this.searchResults.style.animation = 'fadeOutDown 0.3s ease both';
        setTimeout(() => {
            this.searchResults.classList.remove('active');
        }, 300);
    }
}

export { SearchManager };