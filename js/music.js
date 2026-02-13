const players = document.querySelectorAll('.music-item');

players.forEach((player) => {
  const audio = player.querySelector('audio');
  const playBtn = player.querySelector('.play-btn');
  const seekBar = player.querySelector('.seek-bar');
  const volumeBar = player.querySelector('.volume-bar');
  const musicIcon = player.querySelector('.music-icon');

  let rotation = 0;
  let spinning = false;
  let animationFrameId = null;

  function rotateCD() {
    if (!spinning) return;
    rotation += 0.1;
    musicIcon.style.transform = `rotate(${rotation}deg)`;
    animationFrameId = requestAnimationFrame(rotateCD);
  }

  function stopOtherPlayers() {
    players.forEach((otherPlayer) => {
      if (otherPlayer !== player) {
        const otherAudio = otherPlayer.querySelector('audio');
        const otherPlayBtn = otherPlayer.querySelector('.play-btn');
        const otherIcon = otherPlayer.querySelector('.music-icon');

        otherAudio.pause();
        otherPlayBtn.textContent = '▶';
        otherIcon.style.transform = otherIcon.style.transform || 'rotate(0deg)';
        cancelAnimationFrame(otherPlayer._animationFrameId);
        otherPlayer._spinning = false;
      }
    });
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      stopOtherPlayers();
      audio.play();
      playBtn.textContent = '⏸';
      spinning = true;
      player._spinning = true;
      rotateCD();
    } else {
      audio.pause();
      playBtn.textContent = '▶';
      spinning = false;
      cancelAnimationFrame(animationFrameId);
    }
  });

  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    spinning = false;
    cancelAnimationFrame(animationFrameId);
  });

  audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
  });

  audio.addEventListener('loadedmetadata', () => {
    seekBar.max = audio.duration;
  });

  seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
  });

  volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
  });

  // プレイヤーごとの状態を保存
  player._animationFrameId = animationFrameId;
  player._spinning = spinning;
});
