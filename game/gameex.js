document.addEventListener('DOMContentLoaded', () => {
    const mainVideo = document.getElementById('mainVideo');
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb-item');

    // --- 初期設定 ---
    mainVideo.muted = true;
    mainVideo.setAttribute('playsinline', '');

    // 最初の読み込み時に真っ黒になるのを防ぐ
    const startVideo = () => {
        mainVideo.play().catch(e => {
            console.log("初期再生失敗、ユーザー操作を待ちます");
        });
    };
    startVideo();

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const type = thumb.getAttribute('data-type');
            let src = thumb.getAttribute('data-src');
            
            // スペース対策（念のため）
            src = src.replace(/ /g, '%20');

            // アクティブクラスの切り替え
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            if (type === 'video') {
                mainImage.classList.remove('active');
                mainVideo.classList.add('active');

                // ソースが異なる場合のみ更新
                if (!mainVideo.src.includes(src)) {
                    mainVideo.src = src;
                    // スマホでは src を変えた後に play() を呼ぶことでロードが走る
                    mainVideo.play().catch(e => console.log("再生失敗:", e));
                } else {
                    // 同じソースなら一時停止を解除するだけ
                    mainVideo.play();
                }

            } else {
                // 画像の場合
                mainVideo.pause();
                mainVideo.classList.remove('active');
                
                mainImage.src = src;
                mainImage.onload = () => mainImage.classList.add('active');
                if (mainImage.complete) mainImage.classList.add('active');
            }
        });
    });
});