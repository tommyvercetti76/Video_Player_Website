const playlistId = 'PLxxuC2dcJeMeobJ7W9-kJ9ZzS4T9zz_zn&pp=gAQB';
const apiKey = 'AIzaSyC4EZV2EEKABIz90yURDjNAcAahQhDoAW0'; // Replace with your YouTube Data API key
let videoIds = [];

async function fetchVideoIds() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`);
        const data = await response.json();
        if (data.error) {
            console.error('Error fetching video IDs:', data.error.message);
            return;
        }
        videoIds = data.items.map(item => item.snippet.resourceId.videoId);
    } catch (error) {
        console.error('Error fetching video IDs:', error);
    }
}

async function loadRandomVideo() {
    await fetchVideoIds();
    if (videoIds.length === 0) {
        console.error('No video IDs found. Please check your playlist ID and API key.');
        return;
    }
    playRandomVideo();
}

function playRandomVideo() {
    const videoIframe = document.getElementById('video-iframe');
    const randomIndex = Math.floor(Math.random() * videoIds.length);
    videoIframe.src = `https://www.youtube.com/embed/${videoIds[randomIndex]}?autoplay=1&rel=0`;
}

document.getElementById('next-btn').addEventListener('click', () => {
    playRandomVideo();
});

document.getElementById("share-btn").addEventListener("click", function () {
    const videoIframe = document.getElementById("video-iframe");
    const videoUrl = videoIframe.src;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(videoUrl)
            .then(() => alert("Video URL copied to clipboard"))
            .catch(err => console.error("Could not copy text:", err));
    } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = videoUrl;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Video URL copied to clipboard");
    }
});

loadRandomVideo();

function toggleMenu() {
    const menuItems = document.getElementById('menu-items');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    menuItems.classList.toggle('open');
    hamburgerMenu.classList.toggle('open');
}
