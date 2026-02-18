document.addEventListener('DOMContentLoaded', () => {
    //フィルターボタンのイベントリスナーを設定
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.game-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
                                       .map(b => b.getAttribute('data-filter'))
                                       .filter(f => f !== 'all');

            cards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                const isShow = activeFilters.length === 0 || 
                               activeFilters.every(f => cardCategories.includes(f));

                if (isShow) {
                    if (card.classList.contains('hidden')) {
                        card.classList.remove('hidden');
                        
                        // フェードイン演出
                        card.style.opacity = "0";
                        card.style.transform = "translateY(10px)";
                        setTimeout(() => {
                            card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 10);
                    }
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});