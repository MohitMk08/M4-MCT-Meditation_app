document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#sidebar ul li a");
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");

    // Simulate a delay (e.g., for loading resources)
    setTimeout(() => {
        loader.style.display = "none"; // Hide the loader
        content.style.display = "block"; // Show the main content
    }, 2000); // Adjust the delay as needed

    // Remove 'active' class from all links
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    // Add 'active' class to the link that matches the current URL
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });

    // Optional: Add click event to update active class on user interaction
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(nav => nav.classList.remove("active")); // Remove active from all
            link.classList.add("active"); // Add active to the clicked link
        });
    });

    // Auto-Changeable Section
    const dynamicText = document.getElementById("dynamic-text");
    const meditationThoughts = [
        "You matter.",
        "You're awesome!",
        "You did great today!",
        "I believe in you!",
        "You are loved!",
        "You are worthy",
        "Keep going!",
        "I love you!",
        "Make it happen.",
        "Be a light.",
        "Know your worth.",
        "Things will get better",
        "Be good. Do good.",
        "Follow your heart.",
        "Stay hopeful!",
        "You are strong!",
        "Protect your peace.",
        "Be still.",
        "You are beautiful!",
        "Keep on fighting!",
    ];
    let currentThoughtIndex = 0;

    setInterval(() => {
        currentThoughtIndex = (currentThoughtIndex + 1) % meditationThoughts.length;
        dynamicText.textContent = meditationThoughts[currentThoughtIndex];
    }, 4000); // Change every 4 seconds

    // Collapsible Sections
    const collapsibleButtons = document.querySelectorAll(".toggle-collapse");

    collapsibleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;
            const arrow = button.querySelector(".arrow");

            // Toggle the 'active' class
            content.classList.toggle("active");

            // Adjust max-height for smooth transition
            if (content.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
                arrow.textContent = "▲"; // Change arrow to point upwards
            } else {
                content.style.maxHeight = "0";
                content.style.opacity = "0";
                arrow.textContent = "▼"; // Change arrow to point downwards
            }
        });
    });

    const musicContainer = document.getElementById("music-container");

    // Fetch music from Pixabay API
    const MUSIC_API_KEY = '49639701-22666741f13c9429349c81701'; // Replace with your Pixabay API key
    // const MUSIC_API_URL = `https://pixabay.com/api/music/?key=${MUSIC_API_KEY}&per_page=12`;

    // fetch(MUSIC_API_URL)
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.hits && data.hits.length > 0) {
    //             data.hits.forEach(track => {
    //                 // Create a card for each music track
    //                 const musicCard = document.createElement('div');
    //                 musicCard.classList.add('music-card', 'bg-white/20', 'backdrop-blur-lg', 'shadow-lg', 'rounded-lg', 'overflow-hidden', 'p-4');

    //                 musicCard.innerHTML = `
    //                     <h3 class="text-lg font-bold text-white truncate">${track.tags}</h3>
    //                     <audio controls class="w-full mt-4">
    //                         <source src="${track.audio}" type="audio/mpeg">
    //                         Your browser does not support the audio element.
    //                     </audio>
    //                 `;

    //                 musicContainer.appendChild(musicCard);
    //             });
    //         } else {
    //             musicContainer.innerHTML = '<p class="text-white text-lg">No music tracks found. Please try again later.</p>';
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error fetching music from Pixabay API:', error);
    //         musicContainer.innerHTML = '<p class="text-white text-lg">Failed to load music. Please try again later.</p>';
    //     });

    // Fetch videos from Pixabay API
    const VIDEO_API_KEY = '49639701-22666741f13c9429349c81701'; // Replace with your Pixabay API key
    const VIDEO_API_URL = `https://pixabay.com/api/videos/?key=${VIDEO_API_KEY}&q=beautiful+scenes+nature+landscape&video_type=film&per_page=12`;

    fetch(VIDEO_API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.hits && data.hits.length > 0) {
                data.hits.forEach(video => {
                    // Create a card for each video
                    const videoCard = document.createElement('div');
                    videoCard.classList.add('video-card');

                    // Check if the video has an audio track (Pixabay does not provide this info directly)
                    const hasAudio = video.tags.toLowerCase().includes("audio") || video.tags.toLowerCase().includes("sound");

                    videoCard.innerHTML = `
                        <video controls class="w-full">
                            <source src="${video.videos.medium.url}" type="video/mp4">
                            Your browser does not support the video element.
                        </video>
                        <div class="p-4">
                            <h3 class="text-lg font-bold text-white truncate">${video.user}</h3>
                            ${hasAudio
                            ? `<p class="text-sm text-green-400">Audio available</p>`
                            : `<p class="text-sm text-red-400">No audio track</p>`
                        }
                        </div>
                    `;

                    musicContainer.appendChild(videoCard);
                });
            } else {
                musicContainer.innerHTML = '<p class="text-white text-lg">No videos found. Please try again later.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching videos from Pixabay API:', error);
            musicContainer.innerHTML = '<p class="text-white text-lg">Failed to load videos. Please try again later.</p>';
        });
});

document.addEventListener("DOMContentLoaded", () => {
    // Dynamically load the loader
    fetch('loader.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);

            // Show the loader for 3 seconds
            setTimeout(() => {
                // Hide the loader
                const loader = document.getElementById("loader");
                loader.classList.add("hidden");

                // Show the main content
                const content = document.getElementById("content");
                content.classList.add("loaded");
            }, 3000); // 3 seconds delay
        });
});

document.addEventListener("DOMContentLoaded", () => {
    // Dynamically load the navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;

            // After the navbar is loaded, highlight the active link
            const links = document.querySelectorAll("#sidebar ul li a");
            const currentPath = window.location.pathname;

            links.forEach(link => {
                // Remove the 'active' class from all links
                link.classList.remove("active");

                // Add the 'active' class to the link that matches the current path
                if (link.getAttribute("href") === currentPath) {
                    link.classList.add("active");
                }
            });
        });

});

// Fetch beautiful scene images from Pixabay API
const SCENE_API_KEY = '49639701-22666741f13c9429349c81701'; // Replace with your Pixabay API key
const SCENE_API_URL = `https://pixabay.com/api/?key=${SCENE_API_KEY}&q=relaxing+scenes&image_type=photo&orientation=horizontal&per_page=24`;

document.addEventListener("DOMContentLoaded", () => {
    const scenesContainer = document.getElementById('scenes-container');
    const fullscreenModal = document.getElementById("fullscreen-modal");
    const fullscreenImage = document.getElementById("fullscreen-image");
    const closeFullscreenButton = document.getElementById("close-fullscreen");
    const countdownElement = document.getElementById("countdown");

    let countdown = 5; // 5-second countdown
    let countdownInterval;

    fetch(SCENE_API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.hits && data.hits.length > 0) {
                data.hits.forEach(image => {
                    // Create a card for each image
                    const sceneCard = document.createElement('div');
                    sceneCard.classList.add('scene-card');

                    sceneCard.innerHTML = `
                        <img src="${image.webformatURL}" alt="${image.user}" class="w-full cursor-pointer">
                        <div class="p-4">
                            <h3 class="text-lg font-bold text-white truncate">${image.user}</h3>
                        </div>
                    `;

                    scenesContainer.appendChild(sceneCard);

                    // Attach click event listener to the image
                    const sceneImage = sceneCard.querySelector("img");
                    sceneImage.addEventListener("click", () => {
                        fullscreenImage.src = sceneImage.src; // Set the clicked image as fullscreen
                        fullscreenModal.style.display = "flex"; // Show the modal
                        closeFullscreenButton.classList.remove("enabled"); // Disable the button initially
                        closeFullscreenButton.disabled = true;
                        countdown = 5; // Reset countdown
                        countdownElement.textContent = countdown;

                        // Start countdown
                        countdownInterval = setInterval(() => {
                            countdown--;
                            countdownElement.textContent = countdown;

                            if (countdown === 0) {
                                clearInterval(countdownInterval);
                                closeFullscreenButton.classList.add("enabled"); // Enable the button
                                closeFullscreenButton.disabled = false;
                                countdownElement.textContent = "✖"; // Replace countdown with cross icon
                            }
                        }, 1000);
                    });
                });
            } else {
                scenesContainer.innerHTML = '<p class="text-white text-lg">No scenes found. Please try again later.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching scenes from Pixabay API:', error);
            scenesContainer.innerHTML = '<p class="text-white text-lg">Failed to load scenes. Please try again later.</p>';
        });

    // Close fullscreen modal
    closeFullscreenButton.addEventListener("click", () => {
        fullscreenModal.style.display = "none"; // Hide the modal
        clearInterval(countdownInterval); // Clear the countdown
    });
});