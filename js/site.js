document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card-link');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // アクティブクラスの切り替え
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const cardYear = card.getAttribute('data-year');
                
                if (filterValue === 'all' || cardYear === filterValue) {
                    card.classList.remove('hidden');
                    // フェード演出
                    card.style.opacity = "0";
                    setTimeout(() => {
                        card.style.opacity = "1";
                    }, 10);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});