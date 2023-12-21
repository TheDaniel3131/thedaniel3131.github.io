// darkmode.js

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');

    // Check if dark mode is already enabled in local storage
    const isDarkModeEnabled = localStorage.getItem('dark-mode') === 'enabled';

    // Set initial state based on local storage
    setDarkMode(isDarkModeEnabled);

    // Toggle dark mode on checkbox change
    darkModeToggle.addEventListener('change', function () {
        const isDarkMode = darkModeToggle.checked;
        setDarkMode(isDarkMode);
    });

    function setDarkMode(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
    }
});
