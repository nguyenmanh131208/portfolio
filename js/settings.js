document.addEventListener('DOMContentLoaded', function () {

    function injectSettingsHTML() {
        const settingsHTML = `
            <div id="settings-toggle-container">
                <a id="settings-toggle-button"><i class="fas fa-cog"></i></a>
            </div>
            <div id="settings-panel">
                <div class="panel-header">
                    <h6 class="panel-title">MM SETTINGS</h6>
                    <a id="settings-close-button" class="close-button">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L1 13" stroke="#526484" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 1L13 13" stroke="#526484" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </a>
                </div>
                <div class="panel-content">
                    <div class="settings-section">
                        <div class="section-title">MUSIC LIST</div>
                        <ul id="music-playlist" class="music-list-container"></ul>
                    </div>
                    <div class="settings-section">
                        <div class="section-title">THEME</div>
                        <div class="option-grid">
                            <div class="theme-option active" id="light-mode-option">
                                <span class="option-preview"><i class="fas fa-check"></i></span>
                                <span class="option-name">Light Theme</span>
                            </div>
                            <div class="theme-option" id="dark-mode-option">
                                <span class="option-preview dark-preview"><i class="fas fa-check"></i></span>
                                <span class="option-name">Dark Theme</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <audio id="music-player-element"></audio>
        `;
        document.body.insertAdjacentHTML('beforeend', settingsHTML);
    }

    async function loadMusicList() {
        try {
            const response = await fetch('./musicData.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const musicData = await response.json();
            const playlistContainer = document.getElementById('music-playlist');
            
            if (playlistContainer) {
                playlistContainer.innerHTML = '';
                musicData.forEach(song => {
                    const songItem = document.createElement('li');
                    songItem.dataset.audioSrc = song.audio;
                    songItem.innerHTML = `
                        <img class="song-avatar" src="${song.avatar}" alt="Avatar">
                        <div class="song-details">
                            <span class="song-title">${song.title}</span>
                            <span class="song-artist">${song.author}</span>
                        </div>
                    `;
                    playlistContainer.appendChild(songItem);
                });
                initializeMusicPlayer();
            }
        } catch (error) {
            console.error("Could not fetch music data:", error);
            const playlistContainer = document.getElementById('music-playlist');
            if(playlistContainer) playlistContainer.innerHTML = '<li>Failed to load music list.</li>';
        }
    }

    function initializeSettingsEvents() {
        const settingsPanel = document.getElementById('settings-panel');
        const toggleButton = document.getElementById('settings-toggle-button');
        const closeButton = document.getElementById('settings-close-button');
        const lightModeOption = document.getElementById('light-mode-option');
        const darkModeOption = document.getElementById('dark-mode-option');
        const body = document.body;

        if (!settingsPanel) return;

        toggleButton.addEventListener('click', () => settingsPanel.classList.toggle('is-open'));
        closeButton.addEventListener('click', () => settingsPanel.classList.remove('is-open'));

        lightModeOption.addEventListener('click', () => {
            body.classList.remove('dark-theme');
            lightModeOption.classList.add('active');
            darkModeOption.classList.remove('active');
            body.style.backgroundColor = "white";
            body.style.color = "black";
        });

        darkModeOption.addEventListener('click', () => {
            body.classList.add('dark-theme');
            darkModeOption.classList.add('active');
            lightModeOption.classList.remove('active');
            body.style.backgroundColor = "black";
            body.style.color = "white";
        });

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !body.classList.contains('dark-theme')) {
            darkModeOption.click();
        } else {
            lightModeOption.classList.add('active');
        }
    }

    function initializeMusicPlayer() {
        const audioPlayer = document.getElementById('music-player-element');
        const musicItems = document.querySelectorAll('#music-playlist li');
        let currentSongIndex = -1;

        if (!audioPlayer || musicItems.length === 0) return;

        const playSong = (songElement, index) => {
            musicItems.forEach(item => item.classList.remove('current-song'));
            
            songElement.classList.add('current-song');
            currentSongIndex = index;
            
            const audioSrc = songElement.dataset.audioSrc;
            audioPlayer.src = audioSrc;
            audioPlayer.play().catch(error => console.log("Playback interrupted:", error));
        };
        
        musicItems.forEach((item, index) => {
            item.addEventListener('click', () => playSong(item, index));
        });

        audioPlayer.addEventListener('ended', () => {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * musicItems.length);
            } while (musicItems.length > 1 && nextIndex === currentSongIndex);
            
            playSong(musicItems[nextIndex], nextIndex);
        });
    }

    injectSettingsHTML();
    initializeSettingsEvents();
    loadMusicList();
});