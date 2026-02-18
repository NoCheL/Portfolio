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
                    // 1. まず画像を隠し、動画を表示状態にする
                    mainImage.classList.remove('active');
                    mainVideo.classList.add('active');

                    // 2. ソースが違う場合のみ入れ替え
                    if (!mainVideo.src.includes(src)) {
                        mainVideo.src = src;
                        mainVideo.load(); // 読み込み開始
                    }

                    // 3. 【重要】イベントを待たず、このクリック関数内で直接再生を叩く
                    // これによりブラウザが「ユーザーの意思」と認めてくれます
                    const playPromise = mainVideo.play();

                    if (playPromise !== undefined) {
                        playPromise.catch(e => {
                            // 低電力モードなどの理由で失敗した場合のログ
                            console.log("再生がブロックされました:", e);
                        });
                    }

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