const bubble = document.getElementById("bubble");
const blowButton = document.getElementById("blowButton");
const cat = document.getElementById("cat");

let percentage = 0;
let blowing = false;
let finished = false;


// 버튼을 누름
blowButton.addEventListener("pointerdown", function (event) {
    event.preventDefault();

    // 게임이 끝난 상태라면 처음으로 돌아가기
    if (finished) {
        resetGame();
        return;
    }

    blowing = true;

    cat.src = "./images/cat-normal.png";

    increaseBubble();
});


// 버튼에서 손을 뗌
blowButton.addEventListener("pointerup", function () {
    if (!blowing) {
        return;
    }

    blowing = false;

    // 100% 전에 손을 뗀 경우
    if (percentage > 0 && percentage < 100) {
        cat.src = "./images/cat-disappointed.png";

        bubble.classList.remove("explode");
        bubble.classList.add("shrink");

        finished = true;
        blowButton.textContent = "처음으로 돌아가기";
    }
});


// 풍선 키우기
function increaseBubble() {
    if (!blowing) {
        return;
    }

    percentage += 1;

    const size = 20 + percentage * 2.5;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";


    // 100%를 넘으면 폭발
    if (percentage > 100) {
        explodeBubble();
        return;
    }

    setTimeout(increaseBubble, 50);
}


// 폭발
function explodeBubble() {
    blowing = false;
    finished = true;

    cat.src = "./images/cat-explode.png";

    bubble.classList.remove("shrink");
    bubble.classList.add("explode");

    blowButton.textContent = "처음으로 돌아가기";
}


// 처음으로 돌아가기
function resetGame() {
    percentage = 0;
    blowing = false;
    finished = false;

    cat.src = "./images/cat-normal.png";

    bubble.classList.remove("shrink");
    bubble.classList.remove("explode");

    bubble.style.width = "20px";
    bubble.style.height = "20px";

    blowButton.textContent = "불기";
}