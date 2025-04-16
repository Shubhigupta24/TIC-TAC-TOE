let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newgamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); // Fixed typo in class name
let msg = document.querySelector("#msg");
let turn0 = true; // true for player0, false for playerX
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting filled boxes

        if (turn0) {
            // player0
            box.innerText = "0";
        } else {
            // playerX
            box.innerText = "X";
        }

        turn0 = !turn0; // Toggle turn
        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        // Check if all three positions have the same non-empty value
        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("Winner", pos1val);
            disableAllBoxes(); // Prevent further clicks
            showWinner(pos1val);
            return; // Exit after finding a winner
        }
    }
};

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = ""; // Fixed typo here
    });
};

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
