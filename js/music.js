document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('.music-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // --- グローバルボリューム制御用の要素 ---
    const globalVolumeSlider = document.querySelector('.global-volume-slider');
    const volumeValueDisplay = document.querySelector('.volume-value');
    let currentVolume = globalVolumeSlider ? globalVolumeSlider.value : 0.8;

    // --- オーディオ制御ロジック ---
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds === Infinity) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    players.forEach((player) => {
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-btn');
        const seekBar = player.querySelector('.seek-bar');
        const currentTimeEl = player.querySelector('.current-time');
        const durationTimeEl = player.querySelector('.duration-time');

        if (!audio || !playBtn || !seekBar) return;

        function updateBarBackground(bar, value, max) {
            if (!bar) return;
            const progress = max > 0 ? (value / max) * 100 : 0;
            bar.style.background = `linear-gradient(to right, 
                var(--theme-color) 0%, 
                var(--theme-color) ${progress}%, 
                rgba(255, 255, 255, 0.1) ${progress}%, 
                rgba(255, 255, 255, 0.1) 100%)`;
        }
        
        if (audio.readyState >= 1) {
            seekBar.max = audio.duration;
            durationTimeEl.textContent = formatTime(audio.duration);
        }

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                // 他の曲をすべて止める
                players.forEach(p => {
                    const a = p.querySelector('audio');
                    const b = p.querySelector('.play-btn');
                    if (a && !a.paused) {
                        a.pause();
                        p.classList.remove('is-playing');
                        if (b) b.textContent = '▶';
                    }
                });

                // 再生前に現在のマスターボリュームを適用
                audio.volume = currentVolume;
                
                audio.play().catch(err => console.error("再生エラー:", err));
                playBtn.textContent = '⏸';
                player.classList.add('is-playing');
            } else {
                audio.pause();
                playBtn.textContent = '▶';
                player.classList.remove('is-playing');
            }
        });

        audio.addEventListener('timeupdate', () => {
            if (!seekBar._isDragging) {
                seekBar.value = audio.currentTime;
                if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
                updateBarBackground(seekBar, audio.currentTime, audio.duration);
            }
        });

        audio.addEventListener('loadedmetadata', () => {
            seekBar.max = audio.duration;
            if (durationTimeEl) durationTimeEl.textContent = formatTime(audio.duration);
            updateBarBackground(seekBar, 0, audio.duration);
        });

        seekBar.addEventListener('input', () => {
            seekBar._isDragging = true;
            if (currentTimeEl) currentTimeEl.textContent = formatTime(seekBar.value);
            updateBarBackground(seekBar, seekBar.value, seekBar.max);
        });

        seekBar.addEventListener('change', () => {
            audio.currentTime = seekBar.value;
            seekBar._isDragging = false;
        });

        audio.addEventListener('ended', () => {
            playBtn.textContent = '▶';
            player.classList.remove('is-playing');
            seekBar.value = 0;
            updateBarBackground(seekBar, 0, seekBar.max);
        });
    });

    // --- フィルタリングロジック ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            players.forEach(p => {
                const a = p.querySelector('audio');
                if (a) a.pause();
                p.classList.remove('is-playing');
                const b = p.querySelector('.play-btn');
                if (b) b.textContent = '▶';
            });

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            players.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- グローバルボリューム制御ロジック ---
    if (globalVolumeSlider) {
        globalVolumeSlider.addEventListener('input', (e) => {
            currentVolume = e.target.value;
            
            // 表示の更新（例: 0.8 -> 80%）
            if (volumeValueDisplay) {
                const percent = Math.round(currentVolume * 100);
                volumeValueDisplay.textContent = `${percent}%`;
            }

            // 再生中のすべてのオーディオに即座に反映
            const allAudios = document.querySelectorAll('audio');
            allAudios.forEach(audio => {
                audio.volume = currentVolume;
            });
        });
    }
});