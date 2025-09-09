// ====== DATA ======
const questions = [
    { question: "Lực Hấp dẫn tồn tại giữa:", answers: ["Trái Đất và quả táo", "Mặt Trăng và Trái Đất", "Hai học sinh trong lớp", "Tất cả trường hợp trên"], correct: 3, difficulty: 1 },
    { question: "Trọng lực là gì?", answers: ["Lực ép của vật lên mặt đất", "Lực hút Trái Đất tác dụng lên vật", "Lực hút giữa Trái Đất và Mặt Trăng", "Lực hút của mọi vật tác dụng lên Trái Đất"], correct: 1, difficulty: 2 },
    { question: "Nếu khối lượng một vật tăng gấp đôi thì lực hấp dẫn giữa nó và Trái Đất", answers: ["Không đổi", "Tăng 2 lần", "Giảm 2 lần", "Tăng 4 lần"], correct: 1, difficulty: 3 },
    { question: "Nếu khoảng cách giữa hai vật tăng gấp 3, thì lực hấp dẫn:", answers: ["Giảm 3 lần", "Không giảm", "Giảm 6 lần", "Giảm 9 lần"], correct: 3, difficulty: 4 },
    { question: "Định luật vạn vật hấp dẫn giúp ta:", answers: ["Giải thích quỹ đạo hành tinh", "Phóng vệ tinh nhân tạo", "Hiểu hiện tượng thủy triều", "Tất cả đều đúng"], correct: 3, difficulty: 5 },
    { question: "Đại lượng nào sau đây không ảnh hưởng đến lực hấp dẫn giữa hai vật?", answers: ["Khối lượng vật thứ nhất", "Khối lượng vật thứ hai", "Khoảng cách giữa hai vật", "Vận tốc chuyển động của hai vật"], correct: 3, difficulty: 6 },
    { question: "Một vật có khối lượng m đặt trên mặt đất chịu tác dụng lực hút của Trái Đất là F, nếu đưa vật đó lên độ cao bằng đúng bán kính R thì lực hấp dẫn sẽ bằng bao nhiêu?", answers: ["F", "1/2F", "1/3F", "1/4F"], correct: 3, difficulty: 7 },
];

const rewards = {
    Rare: ["rewards/reward1.png","rewards/reward2.png","rewards/reward3.png"],
    Epic: ["rewards/reward4.png","rewards/reward5.png"],
    Legend: ["rewards/reward6.png"]
};

// ====== STATE ======
let currentQuestion = 0;

// ====== DOM ======
const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const caseItems = document.getElementById("case-items");
const rewardText = document.getElementById("reward-text");
const tickSound = document.getElementById("tick-sound");
const winSound = document.getElementById("win-sound");

// ====== FUNCTIONS ======
function loadQuestion() {
    if(currentQuestion >= questions.length){
        questionText.textContent = "Bạn đã hoàn thành tất cả câu hỏi!";
        optionsDiv.innerHTML = "";
        return;
    }
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    optionsDiv.innerHTML = "";
    q.answers.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(idx);
        optionsDiv.appendChild(btn);
    });
}

function getReward(difficulty){
    let rareChance = Math.max(70 - (difficulty-1)*10, 10);
    let epicChance = Math.min(25 + (difficulty-1)*5, 50);
    let legendChance = 100 - rareChance - epicChance;

    // câu khó (6,7) luôn ra Legend
    if(difficulty >= 6){
        return { type: "Legend", src: rewards.Legend[Math.floor(Math.random()*rewards.Legend.length)] };
    }

    let rand = Math.random()*100;
    if(rand < rareChance){
        return { type: "Rare", src: rewards.Rare[Math.floor(Math.random()*rewards.Rare.length)] };
    } else if(rand < rareChance+epicChance){
        return { type: "Epic", src: rewards.Epic[Math.floor(Math.random()*rewards.Epic.length)] };
    } else {
        return { type: "Legend", src: rewards.Legend[Math.floor(Math.random()*rewards.Legend.length)] };
    }
}

function openCaseAnimation(reward){
    caseItems.innerHTML = "";
    rewardText.textContent = "";
    let items = [];
    // tạo các item fake chạy ngang
    for(let i=0;i<10;i++){
        let div = document.createElement("div");
        div.classList.add("reward-item");
        div.style.backgroundImage = `url(${rewards.Rare[Math.floor(Math.random()*rewards.Rare.length)]})`;
        caseItems.appendChild(div);
        items.push(div);
    }
    let finalDiv = document.createElement("div");
    finalDiv.classList.add("reward-item", reward.type.toLowerCase());
    finalDiv.style.backgroundImage = `url(${reward.src})`;
    caseItems.appendChild(finalDiv);
    items.push(finalDiv);

    // animation scroll
    let index = 0;
    let interval = setInterval(()=>{
        items.forEach((item,i)=>item.style.transform=`translateX(-${index*90}px)`);
        tickSound.play();
        index++;
        if(index>items.length-5){
            clearInterval(interval);
            rewardText.textContent = `Bạn nhận được: ${reward.type}!`;
            winSound.play();
        }
    }, 200);
}

function checkAnswer(selectedIndex){
    const q = questions[currentQuestion];
    if(selectedIndex === q.correct){
        const reward = getReward(q.difficulty);
        openCaseAnimation(reward);
    } else {
        alert("Sai rồi!");
    }
    currentQuestion++;
    setTimeout(loadQuestion, 1500);
}

// ====== INIT ======
loadQuestion();
