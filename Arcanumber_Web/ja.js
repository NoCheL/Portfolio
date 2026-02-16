
document.addEventListener('DOMContentLoaded', function() {
    const pagetop_btn = document.querySelector('.pagetop');
    const mypictop_btn = document.querySelector('.mypictop');

    if (pagetop_btn && mypictop_btn) {
      window.addEventListener("scroll", scroll_event);

      function scroll_event() {
        if (window.scrollY > 500) {
            pagetop_btn.style.opacity = "1";
            mypictop_btn.style.opacity="1";        
        } else {
            pagetop_btn.style.opacity = "0"; 
            mypictop_btn.style.opacity="0";               
        }
      }
    } else {
      console.error("Required elements not found in the DOM");
    }
  });

var titlepics_src = ["images/Title2_1.png", "images/Title2_2.png", "images/Title2_3.png", "images/Title2_4.png"];
var order = [0, 1, 2, 3, 3, 2, 1, 0];
var titlenum = -1;
var titletimer;
var targetUrl = "";

function navigateTo(url) {
    let animation = document.getElementById('animation');
    animation.style.display = 'flex';
    targetUrl = url;

    // スクロール無効化
    document.body.style.overflow = 'hidden';

    titlenum = -1; // アニメーションのインデックスをリセット
    startAnimation().then(() => {
        // スクロール再有効化
        document.body.style.overflow = 'auto';
        window.location.href = targetUrl;
    });
}

async function startAnimation() {
    let animation = document.getElementById('animation');
    for (let i = 0; i < order.length; i++) {
        titlenum = order[i];
        animation.style.backgroundImage = `url(${titlepics_src[titlenum]})`;
        if (titlenum === 3) {
            await new Promise(resolve => setTimeout(resolve, 300)); // 3の時は1秒待つ
        } else {
            await new Promise(resolve => setTimeout(resolve, 100)); // 他の時は0.5秒待つ
        }
    }
}

// スクロール再有効化関数
function enableScrolling() {
    document.body.style.overflow = 'auto';
}


document.addEventListener('DOMContentLoaded', function() {
    initializeCard('images/redcard1.png', 'images/redcard2.png', 'button1');
    initializeCard('images/bluecard1.png', 'images/bluecard2.png', 'button2');
    initializeCard('images/greencard1.png', 'images/greencard2.png', 'button4');
    initializeCard('images/yellowcard1.png', 'images/yellowcard2.png', 'button3');
});

document.addEventListener('DOMContentLoaded', function() {
    initializeCard('images/redcard1.png', 'images/redcard2.png', 'button1');
    initializeCard('images/bluecard1.png', 'images/bluecard2.png', 'button2');
    initializeCard('images/greencard1.png', 'images/greencard2.png', 'button4');
    initializeCard('images/yellowcard1.png', 'images/yellowcard2.png', 'button3');
    
    // ボタンにクリックイベントを追加
    let buttons = document.querySelectorAll('.card-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            changeCardImage(button, 'images/RedMagic1.png', 'images/RedMagic1.png');
        });
    });
});


/*ダウンロード画面*/
document.addEventListener('DOMContentLoaded', function() {
    initializeCard('images/redcard1.png', 'images/redcard2.png', 'button1');
    initializeCard('images/bluecard1.png', 'images/bluecard2.png', 'button2');
    initializeCard('images/greencard1.png', 'images/greencard2.png', 'button4');
    initializeCard('images/yellowcard1.png', 'images/yellowcard2.png', 'button3');
    
    // 初期の回転アニメーションを開始
    let buttons = document.querySelectorAll('.card-button');
    buttons.forEach(button => {
        button.style.animation = 'spin 4s linear infinite';
        button.addEventListener('click', function(event) {
            if (button.style.animation !== 'none') {
                stopRotationAndChangeImage(button);
            } else {
                event.stopPropagation();
            }
        });
    });
});

function initializeCard(frontImage, backImage, buttonId) {
    let button = document.getElementById(buttonId);
    if (!button.classList.contains('card-button-inner')) {
        button.classList.add('card-button-inner');
        button.innerHTML = '<div class="card-button-front"></div><div class="card-button-back"></div>';
    }
    let front = button.querySelector('.card-button-front');
    let back = button.querySelector('.card-button-back');
    front.style.backgroundImage = `url(${frontImage})`;
    back.style.backgroundImage = `url(${backImage})`;
    // 画像のサイズを調整する
    front.style.backgroundSize = 'cover';
    back.style.backgroundSize = 'cover';
}

function stopRotationAndChangeImage(button) {
    button.style.animation = 'none'; // 回転を止める
    let front = button.querySelector('.card-button-front');
    let back = button.querySelector('.card-button-back');
    // フェードアウト
    front.style.opacity = '0';
    back.style.opacity = '0';
    
    // ボタンのクリックを無効にする
    button.style.pointerEvents = 'none';

    // box-shadowを削除
    button.classList.add('no-box-shadow');

    setTimeout(() => {
        // フェードアウト後、片方だけ表示
        front.style.opacity = '1';
        back.style.opacity = '0';
        
        let idleImages;
        if (button.id === 'button2') {
            idleImages = ['images/BlueIdle1.png', 'images/BlueIdle2.png'];
        } else if (button.id === 'button1') {
            idleImages = ['images/RedIdle1.png', 'images/RedIdle2.png'];
        } else if (button.id === 'button4') {
            idleImages = ['images/GreenIdle1.png', 'images/GreenIdle2.png'];
        } else if (button.id === 'button3') {
            idleImages = ['images/YellowIdle1.png', 'images/YellowIdle2.png'];
        }
        // 画像のアニメーション
        let imageIndex = 0;
        let firstChangeDone = false;
        let idleInterval = setInterval(() => {
            front.style.backgroundImage = `url(${idleImages[imageIndex]})`;
            if (button.id === 'button4' || button.id === 'button3') {
                front.style.transform = 'scaleX(-1)'; // GreenIdleおよびYellowIdleの画像を左右反転
            } else {
                front.style.transform = 'scaleX(1)'; // 他の画像は通常表示
            }
            imageIndex = (imageIndex + 1) % idleImages.length;
            if (!firstChangeDone) {
                firstChangeDone = true;
                clearInterval(idleInterval);
                idleInterval = setInterval(() => {
                    front.style.backgroundImage = `url(${idleImages[imageIndex]})`;
                    imageIndex = (imageIndex + 1) % idleImages.length;
                }, 600);
            }
        }, 30);
        setTimeout(() => {
            // アニメーションの停止
            let magicImages;
            if (button.id === 'button1') {
                magicImages = ['images/RedMagic1.png', 'images/RedMagic2.png', 'images/RedMagic3.png'];
            } else if (button.id === 'button2') {
                magicImages = ['images/BlueMagic1.png', 'images/BlueMagic2.png', 'images/BlueMagic3.png'];
            } else if (button.id === 'button4') {
                magicImages = ['images/GreenMagic1.png', 'images/GreenMagic2.png', 'images/GreenMagic3.png'];
            } else if (button.id === 'button3') {
                magicImages = ['images/YellowMagic1.png', 'images/YellowMagic2.png', 'images/YellowMagic3.png'];
            }
            // Magicアニメーションの表示
            let magicIndex = 0;
            let magicInterval = setInterval(() => {
                front.style.backgroundImage = `url(${magicImages[magicIndex]})`;
                if (button.id === 'button1' || button.id === 'button2') {
                    front.style.transform = 'scaleX(-1)'; // RedMagicおよびBlueMagicの画像を左右反転
                } else {
                    front.style.transform = 'scaleX(1)'; // 他の画像は通常表示
                }
                front.style.opacity = '1'; // 画像を表示
                clearInterval(idleInterval);
                magicIndex++;
                if (magicIndex >= magicImages.length) {
                    clearInterval(magicInterval);
                    setTimeout(() => {
                        // 画像の途切れを防ぐためフェードアウトなしで元の画像に戻す
                        if (button.id === 'button1') {
                            front.style.backgroundImage = `url(images/redcard1.png)`;
                            back.style.backgroundImage = `url(images/redcard2.png)`;
                        } else if (button.id === 'button2') {
                            front.style.backgroundImage = `url(images/bluecard1.png)`;
                            back.style.backgroundImage = `url(images/bluecard2.png)`;
                        } else if (button.id === 'button4') {
                            front.style.backgroundImage = `url(images/greencard1.png)`;
                            back.style.backgroundImage = `url(images/greencard2.png)`;
                        } else if (button.id === 'button3') {
                            front.style.backgroundImage = `url(images/yellowcard1.png)`;
                            back.style.backgroundImage = `url(images/yellowcard2.png)`;
                        }
                        front.style.opacity = '1'; // フェードイン
                        back.style.opacity = '1'; // 両方を表示
                        button.style.transform = 'scaleX(1)'; // ボタン全体を通常表示にリセット
                        button.style.animation = 'spin 4s linear infinite'; // 回転アニメーションを再開
                        
                        // box-shadowを元に戻す
                        button.classList.remove('no-box-shadow');

                        // ボタンのクリックを再度有効にする
                        button.style.pointerEvents = 'auto';

                    }, 500);
                }
            }, 300); // Magicアニメーションの各画像表示時間
        }, 5000);
    }, 500);
}

// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    const images = ['images/redrole21.png', 'images/redrole22.png', 'images/redrole23.png']; // Add your image paths here
    let currentIndex = 0;

    const slider = document.getElementById('slider');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    prevButton.addEventListener('click', () => {
        console.log('Prev button clicked');
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        console.log('Current index:', currentIndex);
        slider.src = images[currentIndex];
    });

    nextButton.addEventListener('click', () => {
        console.log('Next button clicked');
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        console.log('Current index:', currentIndex);
        slider.src = images[currentIndex];
    });
});
