const audio = document.getElementById('my-audio');
const playBtn = document.getElementById('play-btn');
const seekBar = document.getElementById('seek-bar');
const volumeBar = document.getElementById('volume-bar');
const musicItem = document.querySelector('.music-icon');

// 再生・一時停止
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
    musicItem.classList.add('spin');
  } else {
    audio.pause();
    playBtn.textContent = '▶';
    musicItem.classList.remove('spin');
  }
});

// シークバー更新
audio.addEventListener('timeupdate', () => {
  seekBar.value = audio.currentTime;
});

// シークバーの最大値を音声の長さに設定
audio.addEventListener('loadedmetadata', () => {
  seekBar.max = audio.duration;
});

// シークバー操作
seekBar.addEventListener('input', () => {
  audio.currentTime = seekBar.value;
});

// 音量バー操作
volumeBar.addEventListener('input', () => {
  audio.volume = volumeBar.value;
});
