function changeLanguage(selectedLanguage) {
    if (selectedLanguage === "en") {
        // Load English content
        document.location.href = "index.html";
    } 
    else {
        // Load Chinese content (default)
        document.location.href = "index.zh.html";
    }
}