class NightModeManager {
    constructor() {
        this.toggleButton = document.getElementById('nightModeToggle');
        this.isNightMode = localStorage.getItem('nightMode') === 'true';
        this.init();
    }

    init() {
        // Apply saved mode
        if (this.isNightMode) {
            this.enableNightMode();
        }

        // Add event listener
        this.toggleButton.addEventListener('click', this.toggleMode.bind(this));
    }

    toggleMode() {
        this.isNightMode = !this.isNightMode;
        
        if (this.isNightMode) {
            this.enableNightMode();
        } else {
            this.disableNightMode();
        }

        // Save preference
        localStorage.setItem('nightMode', this.isNightMode);
    }

    enableNightMode() {
        document.body.classList.add('night-mode');
        this.updateToggleIcon(true);
    }

    disableNightMode() {
        document.body.classList.remove('night-mode');
        this.updateToggleIcon(false);
    }

    updateToggleIcon(isNightMode) {
        const icon = this.toggleButton.querySelector('.toggle-icon');
        icon.textContent = isNightMode ? '☀️' : '🌙';
    }
}

export { NightModeManager };