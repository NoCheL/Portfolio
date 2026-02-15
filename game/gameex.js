document.addEventListener('DOMContentLoaded', () => {
    const mainVideo = document.getElementById('mainVideo');
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb-item');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const type = thumb.getAttribute('data-type');
            const src = thumb.getAttribute('data-src');

            // 1. サムネイルのactiveクラスを更新
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // 2. メイン表示の切り替え
            if (type === 'video') {
                // 画像を非表示
                mainImage.classList.remove('active');
                
                // 動画を表示・再生
                mainVideo.src = src;
                mainVideo.classList.add('active');
                mainVideo.play();
            } else {
                // 動画を停止・非表示
                mainVideo.pause();
                mainVideo.classList.remove('active');
                
                // 画像を表示
                mainImage.src = src;
                mainImage.classList.add('active');
            }
        });
    });
});