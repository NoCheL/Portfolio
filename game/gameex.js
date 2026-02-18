document.addEventListener('DOMContentLoaded', () => {
    const mainYoutube = document.getElementById('mainYoutube');
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb-item');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const type = thumb.getAttribute('data-type');
            const dataSrc = thumb.getAttribute('data-src');

            // アクティブ表示の切り替え
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            if (type === 'video') {
                mainImage.classList.remove('active');
                mainYoutube.classList.add('active');

                const videoId = dataSrc; // JmGk6SGK-4g が入る
                // エラー回避のため、playlistパラメータを確実に含める
                const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&controls=0&modestbranding=1&rel=0&enablejsapi=1`;
                
                if (!mainYoutube.src.includes(videoId)) {
                    mainYoutube.src = youtubeUrl;
                }
            } else {
                // 画像への切り替え
                mainYoutube.classList.remove('active');
                // 動画を止めるためにsrcを一時的に空にする
                mainYoutube.src = ""; 
                
                mainImage.src = dataSrc;
                mainImage.onload = () => mainImage.classList.add('active');
                if (mainImage.complete) mainImage.classList.add('active');
            }
        });
    });
});