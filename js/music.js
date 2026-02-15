document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('.music-item');

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
        const volumeBar = player.querySelector('.volume-bar'); // 無くてもエラーにならないよう処理
        const currentTimeEl = player.querySelector('.current-time');
        const durationTimeEl = player.querySelector('.duration-time');

        // 要素が見つからないカードがあった場合にスキップしてエラーを防ぐ
        if (!audio || !playBtn || !seekBar) return;

        // テーマカラーを取得
        const themeColor = getComputedStyle(player).getPropertyValue('--theme-color').trim() || '#00c6c6';

        function updateBarBackground(bar, value, max) {
            if (!bar) return;
            const progress = max > 0 ? (value / max) * 100 : 0;
            // メインカラーから少し明るい色へのグラデーションにする
            bar.style.background = `linear-gradient(to right, 
                var(--theme-color) 0%, 
                var(--theme-color) ${progress}%, 
                rgba(255, 255, 255, 0.1) ${progress}%, 
                rgba(255, 255, 255, 0.1) 100%)`;
        }
        
        // 初期化：再生時間を表示（メタデータが既にロードされている場合用）
        if (audio.readyState >= 1) {
            seekBar.max = audio.duration;
            durationTimeEl.textContent = formatTime(audio.duration);
        }

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // クリックイベントの伝播を防止
            
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
                
                // 選択した曲を再生
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

        // ボリュームバーが存在する場合のみ処理
        if (volumeBar) {
            volumeBar.addEventListener('input', () => {
                audio.volume = volumeBar.value;
                updateBarBackground(volumeBar, volumeBar.value, 1);
            });
            // 初期状態の背景を反映
            updateBarBackground(volumeBar, volumeBar.value, 1);
        }

        audio.addEventListener('ended', () => {
            playBtn.textContent = '▶';
            player.classList.remove('is-playing');
            seekBar.value = 0;
            updateBarBackground(seekBar, 0, seekBar.max);
        });
    });
});