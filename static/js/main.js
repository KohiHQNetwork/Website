function toClipboard(input) {
    var textarea = document.createElement("textarea");
    textarea.textContent = input;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy"); 
  
    document.body.removeChild(textarea);
}

// Initialize Tooltips
$(document).tooltip({
    selector: '[data-toggle="tooltip"]'
});
