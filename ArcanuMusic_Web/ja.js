/*メニュー*/
document.addEventListener("DOMContentLoaded", function() {
    const menu = document.querySelector(".menu");
    const mainButton = document.querySelector(".main.button");
    const buttons = document.querySelectorAll(".button"); 
    const buttons2 = document.querySelectorAll(".button2"); 

    // mainButtonのみにメニュー開閉処理を適用
    mainButton.addEventListener("mousedown", function() {
        menu.classList.toggle("closed");

        if (menu.classList.contains("closed")) {
            mainButton.textContent = "Menu";
            // メニューが閉じた状態で各ボタンをリセット
            buttons.forEach(button => button.classList.add("closed"));
            buttons2.forEach(button2 => button2.classList.add("closed"));
        } else {
            mainButton.textContent = "Close";
            // メニューが開いた状態で各ボタンをリセット
            buttons.forEach(button => button.classList.remove("closed"));
            buttons2.forEach(button2 => button2.classList.remove("closed"));
        }
    });

    // ボタンのクリック処理
    buttons2.forEach(button2 => {
        button2.addEventListener("click", function() {
            const url = this.dataset.url; // data-url属性からURLを取得
            if (url) {
                console.log(`ページ移動: ${url}`); // コンソールデバッグ用
                window.location.href = url; // 指定されたページに移動
            } else {
                console.error("data-url属性が設定されていません。");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".menu");
  const buttons = document.querySelectorAll(".button2");

  buttons.forEach((button) => {
    // ツールチップを作成しbodyに追加
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = button.dataset.desc; // data-desc属性から説明を取得
    document.body.appendChild(tooltip); // bodyにツールチップを配置

    button.addEventListener("mouseenter", function () {
      if (!menu.classList.contains("closed")) {
        const rect = button.getBoundingClientRect(); // ボタンの位置を取得
        tooltip.style.top = `${rect.top + window.scrollY + button.offsetHeight / 2}px`; // ボタンの中央Y座標
        tooltip.style.left = `${rect.right + 10}px`; // ボタンの右側
        tooltip.style.opacity = "1";
      }
    });

    button.addEventListener("mouseleave", function () {
      tooltip.style.opacity = "0";
    });
  });
});

/*魔法 */
/*魔法陣 */

  
/*ゲームルール*/

/*ダウンロード */
document.addEventListener("DOMContentLoaded", () => {
    const runeSymbols = ["ᚠ", "ᚢ", "ᚦ", "ᚩ", "ᚱ", "ᚳ", "ᚷ", "ᚹ", "ᛇ", "ᛉ"]; // ルーン文字一覧
    const particleContainer = document.getElementById("particle-container");
  
    if (!particleContainer) {
      console.error("particle-containerが見つかりません。HTMLを確認してください。");
      return;
    }
  
// ランダムなRGBカラーを生成（Gを抜く）
function getRandomColorWithoutGreen() {
    const R = Math.floor(Math.random() * 256); // 0〜255の範囲のランダムな赤
    const G = 0; // 緑をゼロに固定
    const B = Math.floor(Math.random() * 256); // 0〜255の範囲のランダムな青
    return `rgb(${R}, ${G}, ${B})`;
  }
  
  // ランダムな位置を生成
  function getRandomPosition() {
    return {
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%"
    };
  }
  
  // パーティクルを生成する
  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.setAttribute("data-symbol", runeSymbols[Math.floor(Math.random() * runeSymbols.length)]);
  
    const position = getRandomPosition();
    particle.style.top = position.top;
    particle.style.left = position.left;
    particle.style.color = getRandomColorWithoutGreen(); // 緑を除いた色を使用
    particle.style.fontSize = `${15 + Math.random() * 10}px`; // サイズを大きくランダム化
  
    particleContainer.appendChild(particle);
  
    // ランダムな寿命を設定して消去
    const lifetime = 2000 + Math.random() * 3000; // 2秒から5秒間
    setTimeout(() => {
      particle.remove();
    }, lifetime);
  }
  
  // 一定間隔でランダムに複数のパーティクルを生成
  function generateParticles() {
    const interval = 200 + Math.random() * 300; // 0.2秒から0.5秒間隔
    const particleCount = Math.floor(4 + Math.random() * 4); // 5～10個の粒子を一度に生成
    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }
    setTimeout(generateParticles, interval);
  }
  
  // ページロード時に生成開始
    generateParticles();

});
  
          

document.addEventListener("DOMContentLoaded", () => {
  const BOOK_WIDTH = 830;
  const BOOK_HEIGHT = 520;
  const PAGE_WIDTH = 400;
  const PAGE_HEIGHT = 500;
  const PAGE_Y = (BOOK_HEIGHT - PAGE_HEIGHT) / 2;
  const CANVAS_PADDING = 60;

  let page = 0;

  let isVideoPlaying = false; // 動画が再生中かどうかを判定するフラグ
  let isMouseOverVideo = false; // 動画にカーソルが乗っているかのフラグ

  const canvas = document.getElementById("pageflip-canvas-red");
  if (!canvas) {
      console.error("Canvas要素が存在しません。HTML構造を確認してください。");
      return;
  }
  const context = canvas.getContext("2d");

  const mouse = { x: 0, y: 0 };
  const flips = [];
  const book = document.getElementById("redbook");
  const pages = book.getElementsByTagName("section");
  const videos = document.querySelectorAll("#myVideo"); // 動画要素を取得

    // 動画の再生・一時停止イベントリスナーを追加
    videos.forEach(video => {
        // 動画にカーソルが乗った場合
        video.addEventListener("mouseover", () => {
          isMouseOverVideo = true; // カーソルが動画上にある状態
        });
    
        // 動画からカーソルが離れた場合
        video.addEventListener("mouseout", () => {
          isMouseOverVideo = false; // カーソルが動画上から離れた状態
        });
    
        // 動画の再生・一時停止イベント
        video.addEventListener("play", () => {
          isVideoPlaying = true;
          console.log(`動画が再生されました: ${video.src}`);
        });
    
        video.addEventListener("pause", () => {
          isVideoPlaying = false;
          console.log(`動画が一時停止されました: ${video.src}`);
        });
    
        video.addEventListener("ended", () => {
          isVideoPlaying = false;
          console.log(`動画が終了しました: ${video.src}`);
        });
      });


  for (let i = 0, len = pages.length; i < len; i++) {
  if (isVideoPlaying || isMouseOverVideo) return;
      pages[i].style.zIndex = len - i;

      flips.push({
          progress: 1,
          target: 1,
          page: pages[i],
          dragging: false,
      });
  }

  canvas.width = BOOK_WIDTH + CANVAS_PADDING * 2;
  canvas.height = BOOK_HEIGHT + CANVAS_PADDING * 2;

  canvas.style.top = -CANVAS_PADDING + "px";
  canvas.style.left = -CANVAS_PADDING + "px";

  setInterval(render, 1000 / 60);

  document.addEventListener("mousemove", mouseMoveHandler, false);
  document.addEventListener("mousedown", mouseDownHandler, false);
  document.addEventListener("mouseup", mouseUpHandler, false);



  function mouseMoveHandler(event) {
    if (isVideoPlaying || isMouseOverVideo) return;
      mouse.x = event.clientX - book.offsetLeft - BOOK_WIDTH / 2;
      mouse.y = event.clientY - book.offsetTop;
  }

  function mouseDownHandler(event) {
    if (isVideoPlaying || isMouseOverVideo) return;
    const EDGE_THRESHOLD = 50; // 右端・左端の範囲（ピクセル単位）

    // マウスが左端にある場合
    if (mouse.x < -PAGE_WIDTH / 2 + EDGE_THRESHOLD && page - 1 >= 0) {
        flips[page - 1].dragging = true;
    }
    // マウスが右端にある場合
    else if (mouse.x > PAGE_WIDTH / 2 - EDGE_THRESHOLD && page + 1 < flips.length) {
        flips[page].dragging = true;
    }

    event.preventDefault();
}

  function mouseUpHandler(event) {
    for (let i = 0; i < flips.length; i++) {
        if (flips[i].dragging) {
            if (mouse.x < 0) {
                flips[i].target = -1;
                page = Math.min(page + 1, flips.length - 1); // 最後のページを超えないようにする
            } else {
                flips[i].target = 1;
                page = Math.max(page - 1, 0); // 最初のページを下回らないようにする
            }
        }
        flips[i].dragging = false;
    }
}

  function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0, len = flips.length; i < len; i++) {
          const flip = flips[i];

          if (flip.dragging) {
              flip.target = Math.max(Math.min(mouse.x / PAGE_WIDTH, 1), -1);
          }

          flip.progress += (flip.target - flip.progress) * 0.2;

          if (flip.dragging || Math.abs(flip.progress) < 0.997) {
              drawFlip(flip);
          }
      }
  }

  function drawFlip(flip) {
      const strength = 1 - Math.abs(flip.progress);
      const foldWidth = (PAGE_WIDTH * 0.5) * (1 - flip.progress);
      const foldX = PAGE_WIDTH * flip.progress + foldWidth;
      const verticalOutdent = 20 * strength;

      const paperShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
      const rightShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
      const leftShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);

      flip.page.style.width = Math.max(foldX, 0) + "px";

      context.save();
      context.translate(CANVAS_PADDING + BOOK_WIDTH / 2, PAGE_Y + CANVAS_PADDING);

      context.strokeStyle = `rgba(0,0,0,${0.05 * strength})`;
      context.lineWidth = 30 * strength;
      context.beginPath();
      context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
      context.lineTo(foldX - foldWidth, PAGE_HEIGHT + verticalOutdent * 0.5);
      context.stroke();

      const rightShadowGradient = context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
      rightShadowGradient.addColorStop(0, `rgba(0,0,0,${strength * 0.2})`);
      rightShadowGradient.addColorStop(0.8, `rgba(0,0,0,0.0)`);

      context.fillStyle = rightShadowGradient;
      context.beginPath();
      context.moveTo(foldX, 0);
      context.lineTo(foldX + rightShadowWidth, 0);
      context.lineTo(foldX + rightShadowWidth, PAGE_HEIGHT);
      context.lineTo(foldX, PAGE_HEIGHT);
      context.fill();

      const leftShadowGradient = context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
      leftShadowGradient.addColorStop(0, `rgba(0,0,0,0.0)`);
      leftShadowGradient.addColorStop(1, `rgba(0,0,0,${strength * 0.15})`);

      context.fillStyle = leftShadowGradient;
      context.beginPath();
      context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
      context.lineTo(foldX - foldWidth, 0);
      context.lineTo(foldX - foldWidth, PAGE_HEIGHT);
      context.lineTo(foldX - foldWidth - leftShadowWidth, PAGE_HEIGHT);
      context.fill();

      const foldGradient = context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
      foldGradient.addColorStop(0.35, "#fafafa");
      foldGradient.addColorStop(0.73, "#eeeeee");
      foldGradient.addColorStop(0.9, "#fafafa");
      foldGradient.addColorStop(1.0, "#e2e2e2");

      context.fillStyle = foldGradient;
      context.strokeStyle = `rgba(0,0,0,0.06)`;
      context.lineWidth = 0.5;

      context.beginPath();
      context.moveTo(foldX, 0);
      context.lineTo(foldX, PAGE_HEIGHT);
      context.quadraticCurveTo(foldX, PAGE_HEIGHT + verticalOutdent * 2, foldX - foldWidth, PAGE_HEIGHT + verticalOutdent);
      context.lineTo(foldX - foldWidth, -verticalOutdent);
      context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);

      context.fill();
      context.stroke();
      context.restore();
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const BOOK_WIDTH = 830;
    const BOOK_HEIGHT = 520;
    const PAGE_WIDTH = 400;
    const PAGE_HEIGHT = 500;
    const PAGE_Y = (BOOK_HEIGHT - PAGE_HEIGHT) / 2;
    const CANVAS_PADDING = 60;
  
    let page = 0;
  
    let isVideoPlaying = false; // 動画が再生中かどうかを判定するフラグ
    let isMouseOverVideo = false; // 動画にカーソルが乗っているかのフラグ
  
    const canvas = document.getElementById("pageflip-canvas-blue");
    if (!canvas) {
        console.error("Canvas要素が存在しません。HTML構造を確認してください。");
        return;
    }
    const context = canvas.getContext("2d");
  
    const mouse = { x: 0, y: 0 };
    const flips = [];
    const book = document.getElementById("bluebook");
    const pages = book.getElementsByTagName("section");
    const videos = document.querySelectorAll("#myVideo"); // 動画要素を取得
  
      // 動画の再生・一時停止イベントリスナーを追加
      videos.forEach(video => {
          // 動画にカーソルが乗った場合
          video.addEventListener("mouseover", () => {
            isMouseOverVideo = true; // カーソルが動画上にある状態
          });
      
          // 動画からカーソルが離れた場合
          video.addEventListener("mouseout", () => {
            isMouseOverVideo = false; // カーソルが動画上から離れた状態
          });
      
          // 動画の再生・一時停止イベント
          video.addEventListener("play", () => {
            isVideoPlaying = true;
            console.log(`動画が再生されました: ${video.src}`);
          });
      
          video.addEventListener("pause", () => {
            isVideoPlaying = false;
            console.log(`動画が一時停止されました: ${video.src}`);
          });
      
          video.addEventListener("ended", () => {
            isVideoPlaying = false;
            console.log(`動画が終了しました: ${video.src}`);
          });
        });
  
  
    for (let i = 0, len = pages.length; i < len; i++) {
    if (isVideoPlaying || isMouseOverVideo) return;
        pages[i].style.zIndex = len - i;
  
        flips.push({
            progress: 1,
            target: 1,
            page: pages[i],
            dragging: false,
        });
    }
  
    canvas.width = BOOK_WIDTH + CANVAS_PADDING * 2;
    canvas.height = BOOK_HEIGHT + CANVAS_PADDING * 2;
  
    canvas.style.top = -CANVAS_PADDING + "px";
    canvas.style.left = -CANVAS_PADDING + "px";
  
    setInterval(render, 1000 / 60);
  
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("mousedown", mouseDownHandler, false);
    document.addEventListener("mouseup", mouseUpHandler, false);
  
  
  
    function mouseMoveHandler(event) {
      if (isVideoPlaying || isMouseOverVideo) return;
        mouse.x = event.clientX - book.offsetLeft - BOOK_WIDTH / 2;
        mouse.y = event.clientY - book.offsetTop;
    }
  
    function mouseDownHandler(event) {
      if (isVideoPlaying || isMouseOverVideo) return;
      const EDGE_THRESHOLD = 50; // 右端・左端の範囲（ピクセル単位）
  
      // マウスが左端にある場合
      if (mouse.x < -PAGE_WIDTH / 2 + EDGE_THRESHOLD && page - 1 >= 0) {
          flips[page - 1].dragging = true;
      }
      // マウスが右端にある場合
      else if (mouse.x > PAGE_WIDTH / 2 - EDGE_THRESHOLD && page + 1 < flips.length) {
          flips[page].dragging = true;
      }
  
      event.preventDefault();
  }
  
    function mouseUpHandler(event) {
      for (let i = 0; i < flips.length; i++) {
          if (flips[i].dragging) {
              if (mouse.x < 0) {
                  flips[i].target = -1;
                  page = Math.min(page + 1, flips.length - 1); // 最後のページを超えないようにする
              } else {
                  flips[i].target = 1;
                  page = Math.max(page - 1, 0); // 最初のページを下回らないようにする
              }
          }
          flips[i].dragging = false;
      }
  }
  
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        for (let i = 0, len = flips.length; i < len; i++) {
            const flip = flips[i];
  
            if (flip.dragging) {
                flip.target = Math.max(Math.min(mouse.x / PAGE_WIDTH, 1), -1);
            }
  
            flip.progress += (flip.target - flip.progress) * 0.2;
  
            if (flip.dragging || Math.abs(flip.progress) < 0.997) {
                drawFlip(flip);
            }
        }
    }
  
    function drawFlip(flip) {
        const strength = 1 - Math.abs(flip.progress);
        const foldWidth = (PAGE_WIDTH * 0.5) * (1 - flip.progress);
        const foldX = PAGE_WIDTH * flip.progress + foldWidth;
        const verticalOutdent = 20 * strength;
  
        const paperShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
        const rightShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
        const leftShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
  
        flip.page.style.width = Math.max(foldX, 0) + "px";
  
        context.save();
        context.translate(CANVAS_PADDING + BOOK_WIDTH / 2, PAGE_Y + CANVAS_PADDING);
  
        context.strokeStyle = `rgba(0,0,0,${0.05 * strength})`;
        context.lineWidth = 30 * strength;
        context.beginPath();
        context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
        context.lineTo(foldX - foldWidth, PAGE_HEIGHT + verticalOutdent * 0.5);
        context.stroke();
  
        const rightShadowGradient = context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
        rightShadowGradient.addColorStop(0, `rgba(0,0,0,${strength * 0.2})`);
        rightShadowGradient.addColorStop(0.8, `rgba(0,0,0,0.0)`);
  
        context.fillStyle = rightShadowGradient;
        context.beginPath();
        context.moveTo(foldX, 0);
        context.lineTo(foldX + rightShadowWidth, 0);
        context.lineTo(foldX + rightShadowWidth, PAGE_HEIGHT);
        context.lineTo(foldX, PAGE_HEIGHT);
        context.fill();
  
        const leftShadowGradient = context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
        leftShadowGradient.addColorStop(0, `rgba(0,0,0,0.0)`);
        leftShadowGradient.addColorStop(1, `rgba(0,0,0,${strength * 0.15})`);
  
        context.fillStyle = leftShadowGradient;
        context.beginPath();
        context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
        context.lineTo(foldX - foldWidth, 0);
        context.lineTo(foldX - foldWidth, PAGE_HEIGHT);
        context.lineTo(foldX - foldWidth - leftShadowWidth, PAGE_HEIGHT);
        context.fill();
  
        const foldGradient = context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
        foldGradient.addColorStop(0.35, "#fafafa");
        foldGradient.addColorStop(0.73, "#eeeeee");
        foldGradient.addColorStop(0.9, "#fafafa");
        foldGradient.addColorStop(1.0, "#e2e2e2");
  
        context.fillStyle = foldGradient;
        context.strokeStyle = `rgba(0,0,0,0.06)`;
        context.lineWidth = 0.5;
  
        context.beginPath();
        context.moveTo(foldX, 0);
        context.lineTo(foldX, PAGE_HEIGHT);
        context.quadraticCurveTo(foldX, PAGE_HEIGHT + verticalOutdent * 2, foldX - foldWidth, PAGE_HEIGHT + verticalOutdent);
        context.lineTo(foldX - foldWidth, -verticalOutdent);
        context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
  
        context.fill();
        context.stroke();
        context.restore();
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const BOOK_WIDTH = 830;
    const BOOK_HEIGHT = 520;
    const PAGE_WIDTH = 400;
    const PAGE_HEIGHT = 500;
    const PAGE_Y = (BOOK_HEIGHT - PAGE_HEIGHT) / 2;
    const CANVAS_PADDING = 60;
  
    let page = 0;
  
    let isVideoPlaying = false; // 動画が再生中かどうかを判定するフラグ
    let isMouseOverVideo = false; // 動画にカーソルが乗っているかのフラグ
  
    const canvas = document.getElementById("pageflip-canvas-green");
    if (!canvas) {
        console.error("Canvas要素が存在しません。HTML構造を確認してください。");
        return;
    }
    const context = canvas.getContext("2d");
  
    const mouse = { x: 0, y: 0 };
    const flips = [];
    const book = document.getElementById("greenbook");
    const pages = book.getElementsByTagName("section");
    const videos = document.querySelectorAll("#myVideo"); // 動画要素を取得
  
      // 動画の再生・一時停止イベントリスナーを追加
      videos.forEach(video => {
          // 動画にカーソルが乗った場合
          video.addEventListener("mouseover", () => {
            isMouseOverVideo = true; // カーソルが動画上にある状態
          });
      
          // 動画からカーソルが離れた場合
          video.addEventListener("mouseout", () => {
            isMouseOverVideo = false; // カーソルが動画上から離れた状態
          });
      
          // 動画の再生・一時停止イベント
          video.addEventListener("play", () => {
            isVideoPlaying = true;
            console.log(`動画が再生されました: ${video.src}`);
          });
      
          video.addEventListener("pause", () => {
            isVideoPlaying = false;
            console.log(`動画が一時停止されました: ${video.src}`);
          });
      
          video.addEventListener("ended", () => {
            isVideoPlaying = false;
            console.log(`動画が終了しました: ${video.src}`);
          });
        });
  
  
    for (let i = 0, len = pages.length; i < len; i++) {
    if (isVideoPlaying || isMouseOverVideo) return;
        pages[i].style.zIndex = len - i;
  
        flips.push({
            progress: 1,
            target: 1,
            page: pages[i],
            dragging: false,
        });
    }
  
    canvas.width = BOOK_WIDTH + CANVAS_PADDING * 2;
    canvas.height = BOOK_HEIGHT + CANVAS_PADDING * 2;
  
    canvas.style.top = -CANVAS_PADDING + "px";
    canvas.style.left = -CANVAS_PADDING + "px";
  
    setInterval(render, 1000 / 60);
  
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("mousedown", mouseDownHandler, false);
    document.addEventListener("mouseup", mouseUpHandler, false);
  
  
  
    function mouseMoveHandler(event) {
      if (isVideoPlaying || isMouseOverVideo) return;
        mouse.x = event.clientX - book.offsetLeft - BOOK_WIDTH / 2;
        mouse.y = event.clientY - book.offsetTop;
    }
  
    function mouseDownHandler(event) {
      if (isVideoPlaying || isMouseOverVideo) return;
      const EDGE_THRESHOLD = 50; // 右端・左端の範囲（ピクセル単位）
  
      // マウスが左端にある場合
      if (mouse.x < -PAGE_WIDTH / 2 + EDGE_THRESHOLD && page - 1 >= 0) {
          flips[page - 1].dragging = true;
      }
      // マウスが右端にある場合
      else if (mouse.x > PAGE_WIDTH / 2 - EDGE_THRESHOLD && page + 1 < flips.length) {
          flips[page].dragging = true;
      }
  
      event.preventDefault();
  }
  
    function mouseUpHandler(event) {
      for (let i = 0; i < flips.length; i++) {
          if (flips[i].dragging) {
              if (mouse.x < 0) {
                  flips[i].target = -1;
                  page = Math.min(page + 1, flips.length - 1); // 最後のページを超えないようにする
              } else {
                  flips[i].target = 1;
                  page = Math.max(page - 1, 0); // 最初のページを下回らないようにする
              }
          }
          flips[i].dragging = false;
      }
  }
  
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        for (let i = 0, len = flips.length; i < len; i++) {
            const flip = flips[i];
  
            if (flip.dragging) {
                flip.target = Math.max(Math.min(mouse.x / PAGE_WIDTH, 1), -1);
            }
  
            flip.progress += (flip.target - flip.progress) * 0.2;
  
            if (flip.dragging || Math.abs(flip.progress) < 0.997) {
                drawFlip(flip);
            }
        }
    }
  
    function drawFlip(flip) {
        const strength = 1 - Math.abs(flip.progress);
        const foldWidth = (PAGE_WIDTH * 0.5) * (1 - flip.progress);
        const foldX = PAGE_WIDTH * flip.progress + foldWidth;
        const verticalOutdent = 20 * strength;
  
        const paperShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
        const rightShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
        const leftShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
  
        flip.page.style.width = Math.max(foldX, 0) + "px";
  
        context.save();
        context.translate(CANVAS_PADDING + BOOK_WIDTH / 2, PAGE_Y + CANVAS_PADDING);
  
        context.strokeStyle = `rgba(0,0,0,${0.05 * strength})`;
        context.lineWidth = 30 * strength;
        context.beginPath();
        context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
        context.lineTo(foldX - foldWidth, PAGE_HEIGHT + verticalOutdent * 0.5);
        context.stroke();
  
        const rightShadowGradient = context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
        rightShadowGradient.addColorStop(0, `rgba(0,0,0,${strength * 0.2})`);
        rightShadowGradient.addColorStop(0.8, `rgba(0,0,0,0.0)`);
  
        context.fillStyle = rightShadowGradient;
        context.beginPath();
        context.moveTo(foldX, 0);
        context.lineTo(foldX + rightShadowWidth, 0);
        context.lineTo(foldX + rightShadowWidth, PAGE_HEIGHT);
        context.lineTo(foldX, PAGE_HEIGHT);
        context.fill();
  
        const leftShadowGradient = context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
        leftShadowGradient.addColorStop(0, `rgba(0,0,0,0.0)`);
        leftShadowGradient.addColorStop(1, `rgba(0,0,0,${strength * 0.15})`);
  
        context.fillStyle = leftShadowGradient;
        context.beginPath();
        context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
        context.lineTo(foldX - foldWidth, 0);
        context.lineTo(foldX - foldWidth, PAGE_HEIGHT);
        context.lineTo(foldX - foldWidth - leftShadowWidth, PAGE_HEIGHT);
        context.fill();
  
        const foldGradient = context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
        foldGradient.addColorStop(0.35, "#fafafa");
        foldGradient.addColorStop(0.73, "#eeeeee");
        foldGradient.addColorStop(0.9, "#fafafa");
        foldGradient.addColorStop(1.0, "#e2e2e2");
  
        context.fillStyle = foldGradient;
        context.strokeStyle = `rgba(0,0,0,0.06)`;
        context.lineWidth = 0.5;
  
        context.beginPath();
        context.moveTo(foldX, 0);
        context.lineTo(foldX, PAGE_HEIGHT);
        context.quadraticCurveTo(foldX, PAGE_HEIGHT + verticalOutdent * 2, foldX - foldWidth, PAGE_HEIGHT + verticalOutdent);
        context.lineTo(foldX - foldWidth, -verticalOutdent);
        context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
  
        context.fill();
        context.stroke();
        context.restore();
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const BOOK_WIDTH = 830;
    const BOOK_HEIGHT = 520;
    const PAGE_WIDTH = 400;
    const PAGE_HEIGHT = 500;
    const PAGE_Y = (BOOK_HEIGHT - PAGE_HEIGHT) / 2;
    const CANVAS_PADDING = 60;
  
    let page = 0;
  
    let isVideoPlaying = false; // 動画が再生中かどうかを判定するフラグ
    let isMouseOverVideo = false; // 動画にカーソルが乗っているかのフラグ
  
    const canvas = document.getElementById("pageflip-canvas-yellow");
    if (!canvas) {
        console.error("Canvas要素が存在しません。HTML構造を確認してください。");
        return;
    }
    const context = canvas.getContext("2d");
  
    const mouse = { x: 0, y: 0 };
    const flips = [];
    const book = document.getElementById("yellowbook");
    const pages = book.getElementsByTagName("section");
    const videos = document.querySelectorAll("#myVideo"); // 動画要素を取得
    const images = document.querySelectorAll(".bookimg"); // 動画要素を取得

  
      // 動画の再生・一時停止イベントリスナーを追加
      videos.forEach(video => {
          // 動画にカーソルが乗った場合
          video.addEventListener("mouseover", () => {
            isMouseOverVideo = true; // カーソルが動画上にある状態
          });
      
          // 動画からカーソルが離れた場合
          video.addEventListener("mouseout", () => {
            isMouseOverVideo = false; // カーソルが動画上から離れた状態
          });
      
          // 動画の再生・一時停止イベント
          video.addEventListener("play", () => {
            isVideoPlaying = true;
            console.log(`動画が再生されました: ${video.src}`);
          });
      
          video.addEventListener("pause", () => {
            isVideoPlaying = false;
            console.log(`動画が一時停止されました: ${video.src}`);
          });
      
          video.addEventListener("ended", () => {
            isVideoPlaying = false;
            console.log(`動画が終了しました: ${video.src}`);
          });
        });
  
    images.forEach(img => {
        // 動画にカーソルが乗った場合
        img.addEventListener("mouseover", () => {
            isMouseOverVideo = true; // カーソルが動画上にある状態
        });
    
        // 動画からカーソルが離れた場合
        img.addEventListener("mouseout", () => {
            isMouseOverVideo = false; // カーソルが動画上から離れた状態
        });
    });

  
    for (let i = 0, len = pages.length; i < len; i++) {
    if (isVideoPlaying || isMouseOverVideo) return;
        pages[i].style.zIndex = len - i;
  
        flips.push({
            progress: 1,
            target: 1,
            page: pages[i],
            dragging: false,
        });
    }
  
    canvas.width = BOOK_WIDTH + CANVAS_PADDING * 2;
    canvas.height = BOOK_HEIGHT + CANVAS_PADDING * 2;
  
    canvas.style.top = -CANVAS_PADDING + "px";
    canvas.style.left = -CANVAS_PADDING + "px";
  
    setInterval(render, 1000 / 60);
  
    document.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener("mousedown", mouseDownHandler, false);
    document.addEventListener("mouseup", mouseUpHandler, false);
  
  
  
    function mouseMoveHandler(event) {
      if (isVideoPlaying || isMouseOverVideo) return;
        mouse.x = event.clientX - book.offsetLeft - BOOK_WIDTH / 2;
        mouse.y = event.clientY - book.offsetTop;
    }
  
    function mouseDownHandler(event) {
      if (isVideoPlaying || isMouseOverVideo) return;
      const EDGE_THRESHOLD = 50; // 右端・左端の範囲（ピクセル単位）
  
      // マウスが左端にある場合
      if (mouse.x < -PAGE_WIDTH / 2 + EDGE_THRESHOLD && page - 1 >= 0) {
          flips[page - 1].dragging = true;
      }
      // マウスが右端にある場合
      else if (mouse.x > PAGE_WIDTH / 2 - EDGE_THRESHOLD && page + 1 < flips.length) {
          flips[page].dragging = true;
      }
  
      event.preventDefault();
  }
  
    function mouseUpHandler(event) {
      for (let i = 0; i < flips.length; i++) {
          if (flips[i].dragging) {
              if (mouse.x < 0) {
                  flips[i].target = -1;
                  page = Math.min(page + 1, flips.length - 1); // 最後のページを超えないようにする
              } else {
                  flips[i].target = 1;
                  page = Math.max(page - 1, 0); // 最初のページを下回らないようにする
              }
          }
          flips[i].dragging = false;
      }
  }
  
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        for (let i = 0, len = flips.length; i < len; i++) {
            const flip = flips[i];
  
            if (flip.dragging) {
                flip.target = Math.max(Math.min(mouse.x / PAGE_WIDTH, 1), -1);
            }
  
            flip.progress += (flip.target - flip.progress) * 0.2;
  
            if (flip.dragging || Math.abs(flip.progress) < 0.997) {
                drawFlip(flip);
            }
        }
    }
  
    function drawFlip(flip) {
        const strength = 1 - Math.abs(flip.progress);
        const foldWidth = (PAGE_WIDTH * 0.5) * (1 - flip.progress);
        const foldX = PAGE_WIDTH * flip.progress + foldWidth;
        const verticalOutdent = 20 * strength;
  
        const paperShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
        const rightShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
        const leftShadowWidth = (PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
  
        flip.page.style.width = Math.max(foldX, 0) + "px";
  
        context.save();
        context.translate(CANVAS_PADDING + BOOK_WIDTH / 2, PAGE_Y + CANVAS_PADDING);
  
        context.strokeStyle = `rgba(0,0,0,${0.05 * strength})`;
        context.lineWidth = 30 * strength;
        context.beginPath();
        context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
        context.lineTo(foldX - foldWidth, PAGE_HEIGHT + verticalOutdent * 0.5);
        context.stroke();
  
        const rightShadowGradient = context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
        rightShadowGradient.addColorStop(0, `rgba(0,0,0,${strength * 0.2})`);
        rightShadowGradient.addColorStop(0.8, `rgba(0,0,0,0.0)`);
  
        context.fillStyle = rightShadowGradient;
        context.beginPath();
        context.moveTo(foldX, 0);
        context.lineTo(foldX + rightShadowWidth, 0);
        context.lineTo(foldX + rightShadowWidth, PAGE_HEIGHT);
        context.lineTo(foldX, PAGE_HEIGHT);
        context.fill();
  
        const leftShadowGradient = context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
        leftShadowGradient.addColorStop(0, `rgba(0,0,0,0.0)`);
        leftShadowGradient.addColorStop(1, `rgba(0,0,0,${strength * 0.15})`);
  
        context.fillStyle = leftShadowGradient;
        context.beginPath();
        context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
        context.lineTo(foldX - foldWidth, 0);
        context.lineTo(foldX - foldWidth, PAGE_HEIGHT);
        context.lineTo(foldX - foldWidth - leftShadowWidth, PAGE_HEIGHT);
        context.fill();
  
        const foldGradient = context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
        foldGradient.addColorStop(0.35, "#fafafa");
        foldGradient.addColorStop(0.73, "#eeeeee");
        foldGradient.addColorStop(0.9, "#fafafa");
        foldGradient.addColorStop(1.0, "#e2e2e2");
  
        context.fillStyle = foldGradient;
        context.strokeStyle = `rgba(0,0,0,0.06)`;
        context.lineWidth = 0.5;
  
        context.beginPath();
        context.moveTo(foldX, 0);
        context.lineTo(foldX, PAGE_HEIGHT);
        context.quadraticCurveTo(foldX, PAGE_HEIGHT + verticalOutdent * 2, foldX - foldWidth, PAGE_HEIGHT + verticalOutdent);
        context.lineTo(foldX - foldWidth, -verticalOutdent);
        context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
  
        context.fill();
        context.stroke();
        context.restore();
    }
  });
  
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".bookbutton");
    const books = document.querySelectorAll(".book");
    const closeButton = document.getElementById("close-all");
    const videos = document.querySelectorAll("#myVideo"); // 動画要素を取得
    
    let currentBook = null; // 現在表示中の本を記録する変数
  
    // ボタンをクリックした際に対応する本を表示
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        // 全ての本を非表示
        books.forEach(book => {
          book.classList.add("hidden");
          book.style.zIndex = "1"; // z-indexをリセット
        });
  
        // 対応する色の本を表示
        const color = button.getAttribute("data-color");
        books.forEach(book => {
          if (book.getAttribute("data-color") === color) {
            book.classList.remove("hidden");
            book.classList.add("visible"); // 魔法アニメーション適用
            currentBook = book; // 現在表示中の本を記録
          }
        });
  
        // ×ボタンを表示
        closeButton.classList.remove("hidden");
      });
    });
  
    // ×ボタンをクリックした際に全ての本を非表示
    closeButton.addEventListener("click", () => {
        // 全ての本を非表示にする
        books.forEach(book => {
            book.classList.add("hidden");
            book.classList.remove("visible"); // アニメーションをリセット
        });

        // 再生中の動画を停止しサイズをリセットする
        videos.forEach(video => {
            video.pause(); // 再生を停止
            video.style.width = "307.2px"; // 元の幅に戻す
            video.style.height = "172.8px"; // 元の高さに戻す
            video.style.top = ""; // 一時停止時にリセット
            video.style.left = ""; // 中央寄せ解除
            video.style.transform = ""; // 中央寄せの補正を解除
            video.style.zIndex = "9999"; // 元のz-indexに戻す
            video.style.position = "absolute"; // 元の位置へ戻す
        });

        closeButton.classList.add("hidden"); // ×ボタンも非表示
        currentBook = null; // 現在表示中の本の記録をリセット
    });  
// 動画クリックイベントの追加
// 動画クリックイベントの追加
videos.forEach(video => {
    video.addEventListener("click", (event) => {
        event.stopPropagation(); // イベントの伝播を停止
        if (video.paused) {
            video.play(); // 再生
            video.style.width = "950px"; // 動的に幅を変更
            video.style.height = "535px"; // 動的に高さを変更
            video.style.top = "50%"; // 上方向に中央寄せ
            video.style.left = "50%"; // 上方向に中央寄せ
            video.style.transform = "translate(-50%, -50%)"; // 中央寄せの補正
            video.style.zIndex = "2147483647"; // 最大のz-index値で最前面に配置
            video.style.position = "fixed"; // 位置を固定して他のコンテンツと分離
        } else {
            video.pause(); // 一時停止
            video.style.width = "307.2px"; // 元の幅に戻す
            video.style.height = "172.8px"; // 元の高さに戻す
            video.style.top = ""; // 一時停止時にリセット
            video.style.left = ""; // 上方向に中央寄せ
            video.style.transform = ""; // 中央寄せの補正を解除
            video.style.zIndex = "9999"; // 元のz-indexに戻す
            video.style.position = "absolute"; // 元の位置へ戻す
        }
    });
});
    });
    