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

fetch('https://qsite.kohihq.net/proxy/getplayers')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(responses => {
        const playersContainer = document.getElementById('players');
        let htmlContent = '';

        responses.forEach(response => {
            htmlContent += `
                <div class="main-top-content content-center">
                    There are currently ${response.content} players online
                </div>
            `;
        });

        playersContainer.innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Error fetching the players:', error);
    });
