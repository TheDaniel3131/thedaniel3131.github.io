function changeLanguage(selectedLanguage) {
    if (selectedLanguage === "zh") {
        // Load Chinese content
        document.location.href = "index.zh.html";
    } 
    else {
        // Load English content (default)
        document.location.href = "index.html";
    }
}