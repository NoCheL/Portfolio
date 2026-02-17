document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.game-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            //アクティブなボタンの切り替え
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            //フィルター値を取得
            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                //カードのカテゴリー属性を取得
                const cardCategory = card.getAttribute('data-category');
                
                //判定処理
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    
                    //フェードイン
                    card.style.opacity = "0";
                    card.style.transform = "translateY(10px)";
                    setTimeout(() => {
                        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 10);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});