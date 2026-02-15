function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }

    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "block";
    // 微小な遅延を置いてからactiveクラスをつけることでアニメーションを確実に発火させる
    setTimeout(() => {
        activeTab.classList.add("active");
    }, 10);
    
    evt.currentTarget.classList.add("active");
}