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
                // --- 動画を表示する場合 ---
                mainImage.classList.remove('active');
                
                // srcが変わる場合のみ読み込み直す（再生位置リセット防止）
                if (!mainVideo.src.includes(src)) {
                    mainVideo.src = src;
                }
                
                mainVideo.classList.add('active');
                mainVideo.play().catch(e => console.log("Auto-play blocked"));
                
            } else {
                // --- 画像を表示する場合 ---
                mainVideo.pause();
                mainVideo.classList.remove('active');

                // 画像のsrcをセットしてから表示
                mainImage.src = src;
                
                // 画像の読み込み完了を待ってからactiveにするとスムーズ
                mainImage.onload = () => {
                    mainImage.classList.add('active');
                };
                
                // もし既にキャッシュされている場合はすぐ表示
                if (mainImage.complete) {
                    mainImage.classList.add('active');
                }
            }
        });
    });
});