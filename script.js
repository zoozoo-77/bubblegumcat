const successMessage = document.getElementById("successMessage");
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

    cat.src = "./cat-normal.png";

    increaseBubble();
});


// 버튼에서 손을 뗌
blowButton.addEventListener("pointerup", function () {
    if (!blowing) {
        return;
    }

    blowing = false;

    // 90~110% 성공
    if (percentage >= 90 && percentage <= 110) {
        cat.src = "./cat-success.png";

        // 풍선껌 숨기기 
        bubble.style.display = "none";

        // 성공 메시지 보여주기
        successMessage.classList.add("show");

        finished = true;
        blowButton.textContent = "처음으로 돌아가기";
    }

    // 90% 전에 손을 뗀 경우
    else if (percentage > 0 && percentage < 90) {
        cat.src = "./cat-disappointed.png";

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

    // 110%를 넘으면 폭발
    if (percentage > 110) {
        explodeBubble();
        return;
    }

    setTimeout(increaseBubble, 50);
}


// 폭발
function explodeBubble() {
    blowing = false;
    finished = true;

    cat.src = "./cat-explode.png";

    bubble.classList.remove("shrink");
    bubble.classList.add("explode");

    blowButton.textContent = "처음으로 돌아가기";
}


// 처음으로 돌아가기
function resetGame() {
    percentage = 0;
    blowing = false;
    finished = false;

    cat.src = "./cat-normal.png";

    bubble.classList.remove("shrink");
    bubble.classList.remove("explode");

    bubble.style.display = "block";
    bubble.style.width = "20px";
    bubble.style.height = "20px";

    successMessage.classList.remove("show");

    blowButton.textContent = "불기";
}