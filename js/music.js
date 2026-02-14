const players = document.querySelectorAll('.music-item');

players.forEach((player) => {
  const audio = player.querySelector('audio');
  const playBtn = player.querySelector('.play-btn');
  const seekBar = player.querySelector('.seek-bar');
  const volumeBar = player.querySelector('.volume-bar');

  // 他のプレイヤーをすべて停止させる関数
  function stopAllOtherPlayers() {
    players.forEach((otherPlayer) => {
      if (otherPlayer !== player) {
        const otherAudio = otherPlayer.querySelector('audio');
        const otherBtn = otherPlayer.querySelector('.play-btn');
        
        otherAudio.pause();
        otherBtn.textContent = '▶';
        otherPlayer.classList.remove('is-playing'); // 回転を止める
      }
    });
  }

  // 再生・一時停止の切り替え
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      stopAllOtherPlayers();
      audio.play();
      playBtn.textContent = '⏸';
      player.classList.add('is-playing'); // CSSで回転開始
    } else {
      audio.pause();
      playBtn.textContent = '▶';
      player.classList.remove('is-playing'); // CSSで回転停止
    }
  });

  // 音声が終わった時の処理
  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    player.classList.remove('is-playing');
    seekBar.value = 0;
  });

  // シークバーの連動（再生中）
  audio.addEventListener('timeupdate', () => {
    if (!seekBar._isDragging) { // ドラッグ中でなければ更新
      seekBar.value = audio.currentTime;
    }
  });

  // メタデータ読み込み完了時に最大値を設定
  audio.addEventListener('loadedmetadata', () => {
    seekBar.max = audio.duration;
  });

  // シークバー操作
  seekBar.addEventListener('input', () => {
    seekBar._isDragging = true;
  });

  seekBar.addEventListener('change', () => {
    audio.currentTime = seekBar.value;
    seekBar._isDragging = false;
  });

  // 音量操作
  volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
  });
});