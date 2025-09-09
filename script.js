// =======================
// BLOCK 1️⃣: Câu hỏi
// =======================
const questions = [
    { question: "Lực Hấp dẫn tồn tại giữa:", answers: ["Trái Đất và quả táo", "Mặt Trăng và Trái Đất", "Hai học sinh trong lớp", "Tất cả trường hợp trên"], correct: 3 },
    { question: "Trọng lực là gì?", answers: ["Lực ép của vật lên mặt đất", "Lực hút Trái Đất tác dụng lên vật", "Lực hút giữa Trái Đất và Mặt Trăng", "Lực hút của mọi vật tác dụng lên Trái Đất"], correct: 1 },
    { question: "Nếu khối lượng một vật tăng gấp đôi thì lực hấp dẫn giữa nó và Trái Đất", answers: ["Không đổi", "Tăng 2 lần", "Giảm 2 lần", "Tăng 4 lần"], correct: 1 },
    { question: "Nếu khoảng cách giữa hai vật tăng gấp 3, thì lực hấp dẫn:", answers: ["Giảm 3 lần", "Không giảm", "Giảm 6 lần", "Giảm 9 lần"], correct: 3 },
    { question: "Định luật vạn vật hấp dẫn giúp ta:", answers: ["Giải thích quỹ đạo hành tinh", "Phóng vệ tinh nhân tạo", "Hiểu hiện tượng thủy triều", "Tất cả đều đúng"], correct: 3 },
    { question: "Đại lượng nào sau đây không ảnh hưởng đến lực hấp dẫn giữa hai vật?", answers: ["Khối lượng vật thứ nhất", "Khối lượng vật thứ hai", "Khoảng cách giữa hai vật", "Vận tốc chuyển động của hai vật"], correct: 3 },
    { question: "Một vật có khối lượng m đặt trên mặt đất chịu tác dụng lực hút của Trái Đất là F, nếu đưa vật đó lên độ cao bằng đúng bán kính R thì lực hấp dẫn sẽ bằng bao nhiêu?", answers: ["F", "1/2F", "1/3F", "1/4F"], correct: 3 }
];

// =======================
// BLOCK 2️⃣: Phần thưởng và độ hiếm
// =======================
const rewardsList = [
    {name: "Ngôi Sao Nhỏ", img: "rewards/star.png", rarity: "Common", color: "#aaa"},
    {name: "Trái Tim Xanh", img: "rewards/heart.png", rarity: "Common", color: "#aaa"},
    {name: "Ánh Trăng", img: "rewards/moon.png", rarity: "Common", color: "#aaa"},
    {name: "Kim Cương Ma Thuật", img: "rewards/diamond.png", rarity: "Rare", color: "#00f"},
    {name: "Quả Cầu Thần Thánh", img: "rewards/orb.png", rarity: "Rare", color: "#00f"},
    {name: "Tinh Thể Băng Giá", img: "rewards/ice.png", rarity: "Rare", color: "#00f"},
    {name: "Cúp Vàng Rem", img: "rewards/cup.png", rarity: "Epic", color: "#a0f"},
    {name: "Ánh Sáng Vĩnh Cửu", img: "rewards/light.png", rarity: "Epic", color: "#a0f"},
    {name: "Vũ Trụ Huyền Bí", img: "rewards/universe.png", rarity: "Legend", color: "#ff0"},
    {name: "Vương Miện Rem", img: "rewards/crown.png", rarity: "Legend", color: "#ff0"}
];

// =======================
// BLOCK 3️⃣: Chọn phần thưởng theo độ hiếm
// =======================
function pickReward(difficultyLevel) {
    let rarityChances = {Common:0.6,Rare:0.25,Epic:0.12,Legend:0.03};
    if(difficultyLevel >= 7) rarityChances = {Common:0,Rare:0,Epic:0,Legend:1};

    let rand = Math.random();
    let cumulative = 0;
    let selectedRarity = "Common";
    for(let r in rarityChances){
        cumulative += rarityChances[r];
        if(rand <= cumulative){
            selectedRarity = r;
            break;
        }
    }
    const pool = rewardsList.filter(r => r.rarity === selectedRarity);
    return pool[Math.floor(Math.random() * pool.length)];
}

// =======================
// BLOCK 4️⃣: Băng chuyền + animation
// =======================
function showCaseAnimation(difficultyLevel){
    const caseStrip = document.getElementById("case-strip");
    caseStrip.innerHTML = "";
    const totalRewards = 20;

    let winningReward = pickReward(difficultyLevel);

    for(let i=0;i<totalRewards;i++){
        let r = (i === Math.floor(totalRewards/2)) ? winningReward : pickReward(difficultyLevel);
        const img = document.createElement("img");
        img.src = r.img;
        img.classList.add("reward");
        img.dataset.rarity = r.rarity;
        img.title = r.name + " (" + r.rarity + ")";
        caseStrip.appendChild(img);
    }

    caseStrip.style.transition = "left 5s cubic-bezier(0.25,1,0.5,1)";
    caseStrip.style.left = "-50%";

    setTimeout(()=>{
        caseStrip.style.transition = "none";
        caseStrip.style.left = "calc(50% - 60px)";
        document.getElementById("win-sound").play();

        // Hiển thị popup rực rỡ
        const popup = document.getElementById("reward-popup");
        popup.innerHTML = `🎉 Chúc mừng! Bạn nhận được <b>${winningReward.name} (${winningReward.rarity})</b> 🎁✨`;
        popup.style.display = "block";

        // Ẩn sau 3s
        setTimeout(()=>{ popup.style.display="none"; }, 3000);
    },5000);
}
document.getElementById("next-btn").addEventListener("click",()=>{
    showQuestion();
});

showQuestion();

