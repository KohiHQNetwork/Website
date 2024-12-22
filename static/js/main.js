function toClipboard(input) {
    var textarea = document.createElement("textarea");
    textarea.textContent = input;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy"); 
  
    document.body.removeChild(textarea);
}

function updatetimes() {
    dayjs.extend(dayjs_plugin_relativeTime);

    document.querySelectorAll('time.relative-time').forEach(timeElement => {
        const timestamp = timeElement.getAttribute('datetime');
        const relativeTime = dayjs.unix(timestamp).fromNow();

        timeElement.textContent = relativeTime;

        timeElement.setAttribute('title', dayjs.unix(timestamp).format('HH:mm A MMM D, YYYY'));
    });
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
        
        let htmlContent = `
            <div class="main-top-content content-center">
                There are currently ${responses.content} players online
            </div>
        `;
        
        playersContainer.innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Error fetching the players:', error);
    });

fetch('https://qsite.kohihq.net/forums/news/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(responses => {
        const newsContainer = document.getElementById('news');
        let htmlContent = '';
        responses.reverse(); 

        responses.forEach(response => {
            htmlContent += `
                <div class="post-holder">
                    <div class="post-item">
                        <div class="post-header">
                            <div class="title">
                                <a href="${response.readMoreLink}">
                                    <h2>${response.title}</h2>
                                </a>
                                <span class="author">
                                    <a href="${response.author.link}">${response.author.name}</a>
                                </span>
                                <time class="relative-time" datetime="${response.timestamp}" data-format="ago" data-toggle="tooltip" title="${response.postedTime}">${response.postedTime}</time>
                            </div>
                        </div>
                        <div class="post-body">
                            ${response.content}
                        </div>
                        <div class="btn-holder">
                            <a href="${response.readMoreLink}" class="btn">Read more...</a>
                        </div>
                    </div>
                </div>
            `;
        });

        newsContainer.innerHTML = htmlContent;

        updatetimes();
    })
    .catch(error => {
        console.error('Error fetching the posts:', error);
    });

