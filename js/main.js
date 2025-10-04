import { SearchManager } from './search.js';
import { NightModeManager } from './nightmode.js';

// Simple initialization without complex scroll logic
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Search
    const searchManager = new SearchManager();
    
    // Initialize Night Mode
    const nightModeManager = new NightModeManager();
    
    console.log('Website modules initialized successfully');
});