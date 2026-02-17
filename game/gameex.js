document.addEventListener('DOMContentLoaded', () => {
    const mainVideo = document.getElementById('mainVideo');
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb-item');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const type = thumb.getAttribute('data-type');
            const src = thumb.getAttribute('data-src');

            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            if (type === 'video') {
                if (!mainVideo.src.includes(src)) {
                    mainVideo.src = src;
                    mainVideo.load(); // 読み込み開始
                }

                mainVideo.oncanplay = () => {
                    mainImage.classList.remove('active');
                    mainVideo.classList.add('active');
                    
                    mainVideo.play().catch(e => {
                        console.log("自動再生がブロックされました:", e);
                    });
                };

                mainVideo.onerror = () => {
                    console.error("動画の読み込みに失敗しました。パスを確認してください:", src);
                };

            } else {
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