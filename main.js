const STAGES = [
  { key: "white",  name: "白｜能量覺知" },
  { key: "blue",   name: "藍｜穩定與淨化" },
  { key: "orange", name: "橙｜能量流動" },
  { key: "yellow", name: "黃｜內在力量" },
  { key: "green",  name: "綠｜共振與連結" },
  { key: "indigo", name: "靛｜意識擴展" },
  { key: "violet", name: "紫｜靈魂整合" },
];

const ORACLES = {
  white: [
    "回到呼吸，讓此刻把你帶回中心。",
    "你的覺察已經足夠，現在允許它流動。",
    "看見，就是改變的開始。",
    "鬆開評價，單純感受能量的來去。",
    "用白光掃過全身，讓雜訊退散。",
    "把今天的一次嘆息，換成一次微笑。",
    "留意身體最放鬆的 1% 角落。",
    "清清楚楚地陪伴自己三分鐘。"
  ],
  blue: [
    "以水的節奏，讓情緒找到出口。",
    "今天丟掉一件過重的責任感。",
    "用三口深呼吸，淨化腦中的回音。",
    "界線是愛的一種形狀。",
    "替自己換上更輕盈的語氣。",
    "把手機放下三分鐘，給靈魂一點空氣。",
    "讓藍色光霧洗過心口。",
    "慢一點，才能看見更多。"
  ],
  orange: [
    "一個小行動勝過十次想像。",
    "今天把『想做』變成『做了』。",
    "創造力來自允許，不是用力。",
    "三分鐘快走，喚醒身體的火。",
    "完成一件 5 分鐘就能搞定的小事。",
    "先動起來，靈感才會跟上。",
    "把卡住的能量轉成一個微小進度。",
    "去做一個讓你微笑的決定。"
  ],
  yellow: [
    "說一句更真實、更靠近你的話。",
    "今天的你，足以做出選擇。",
    "把猶豫化成一個明確的時間點。",
    "調整姿勢，讓脊椎記起自信。",
    "從 1 到 10，現在你願意前進幾步？",
    "替自己簽下小小的承諾書。",
    "不必完美，但要主動。",
    "握住方向盤，而不是緊抓剎車。"
  ],
  green: [
    "把善意說出口，讓世界聽見。",
    "傳一則真心的感謝訊息。",
    "擁抱你正在學習的樣子。",
    "向某個關係多走一步。",
    "以溫柔換取更深的真實。",
    "在綠意中散步 3 分鐘。",
    "用傾聽承接彼此的脆弱。",
    "讓愛先發聲。"
  ],
  indigo: [
    "閉眼 60 秒，讓直覺浮上來。",
    "今天試著相信第一個靈光。",
    "為一個重複出現的徵兆命名。",
    "把夢裡的畫面記下一行字。",
    "安靜，是最會說話的地方。",
    "問自己：如果我已經成功，我會怎麼做？",
    "把問題交給更大的自己。",
    "與未知握手。"
  ],
  violet: [
    "一切都在對齊你更高的版本。",
    "用感恩結束今天。",
    "把收穫分享給另一個人。",
    "想像紫光包圍全身，深深呼吸。",
    "把『必然』寫在心中。",
    "讓豐盛透過你流向世界。",
    "信任，你已在路上。",
    "由內而外，悄悄完成一個整合。"
  ]
};

const ACTIONS = {
  white: ["3 分鐘白光掃描冥想", "記錄當下最強烈的身體感受", "清理工作桌面 1 項"],
  blue: ["喝溫水 300ml", "寫下一個界線句式：我需要…", "3 次深呼吸＋緩慢吐氣"],
  orange: ["完成 1 件 5 分鐘小事", "3 分鐘快走/伸展", "做一個讓你興奮的小決定"],
  yellow: ["訂一個 24 小時內可完成的行動", "把目標拆成 3 個子步驟", "說出你的選擇"],
  green: ["發一則感謝訊息", "對一個人說真誠的讚美", "3 分鐘綠意散步"],
  indigo: ["閉眼 60 秒聽直覺", "記一則靈感備忘", "觀想問題已被解決"],
  violet: ["寫下 3 件感恩", "1 分鐘紫光觀想", "把今天的收穫分享出去"]
};

const store = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch{ return def; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};

function pickOracle(stageKey){
  const pool = ORACLES[stageKey];
  const memKey = "oracle_last_" + stageKey;
  const last = store.get(memKey, null);
  let idx = Math.floor(Math.random()*pool.length);
  if (pool.length>1 && last === idx) idx = (idx+1) % pool.length;
  store.set(memKey, idx);
  return pool[idx];
}

function buildSliders(){
  const wrap = document.getElementById("sliders");
  wrap.innerHTML = "";
  STAGES.forEach((s,i)=>{
    const row = document.createElement("div");
    row.className = "slider";
    row.innerHTML = `
      <label for="s_${s.key}">${i+1}. ${s.name}</label>
      <input type="range" min="0" max="10" step="1" value="5" id="s_${s.key}" name="${s.key}">
      <output id="o_${s.key}">5</output>
    `;
    wrap.appendChild(row);
  });
  wrap.querySelectorAll('input[type="range"]').forEach(r=>{
    r.addEventListener("input", e=>{
      document.getElementById("o_"+e.target.name).textContent = e.target.value;
    });
  });
}

function buildAccordion(){
  const acc = document.getElementById("accordion");
  acc.innerHTML = "";
  STAGES.forEach((s)=>{
    const item = document.createElement("div");
    item.className = "accordion-item";
    item.id = "acc_"+s.key;
    item.innerHTML = `
      <div class="acc-header" role="button">
        <div class="acc-title">${s.name}</div>
        <div class="acc-indicator">＋</div>
      </div>
      <div class="acc-body" id="body_${s.key}">
        <p><strong>關鍵詞：</strong>${stageKeywords(s.key)}</p>
        <p><strong>行動建議：</strong></p>
        <ul>${ACTIONS[s.key].map(a=>`<li>${a}</li>`).join("")}</ul>
        <p class="hint"><em>提示：</em>每次測驗後會自動展開最低分的階段。</p>
      </div>
    `;
    item.querySelector(".acc-header").addEventListener("click", ()=>toggleAcc(s.key));
    acc.appendChild(item);
  });
}

function toggleAcc(key){
  STAGES.forEach(s=>{
    const body = document.getElementById("body_"+s.key);
    const head = document.querySelector("#acc_"+s.key+" .acc-indicator");
    if (s.key===key){
      const open = !body.classList.contains("open");
      body.classList.toggle("open", open);
      head.textContent = open ? "－" : "＋";
    } else {
      body.classList.remove("open");
      const h2 = document.querySelector("#acc_"+s.key+" .acc-indicator");
      if (h2) h2.textContent = "＋";
    }
  });
}

function stageKeywords(key){
  const map = {
    white: "覺察、清明、回到中心",
    blue: "淨化、界線、緩慢",
    orange: "行動、創造、熱度",
    yellow: "決斷、自信、主動",
    green: "共振、關係、善意",
    indigo: "直覺、徵兆、靜心",
    violet: "整合、感恩、豐盛"
  };
  return map[key];
}

function drawRadar(values){
  const svg = document.getElementById("radar");
  const size = 300, cx = 150, cy = 150, max = 10, layers = 5;
  svg.innerHTML = "";

  for (let l=1; l<=layers; l++){
    const r = (l/layers)*120;
    const pts = STAGES.map((_,i)=>{
      const ang = (Math.PI*2/STAGES.length)*i - Math.PI/2;
      const x = cx + r * Math.cos(ang);
      const y = cy + r * Math.sin(ang);
      return `${x},${y}`;
    }).join(" ");
    const poly = document.createElementNS("http://www.w3.org/2000/svg","polygon");
    poly.setAttribute("points", pts);
    poly.setAttribute("fill", l%2? "#eef2ff":"#f7f9ff");
    poly.setAttribute("stroke", "#cdd5ff");
    poly.setAttribute("stroke-width", "0.6");
    svg.appendChild(poly);
  }

  STAGES.forEach((s,i)=>{
    const ang = (Math.PI*2/STAGES.length)*i - Math.PI/2;
    const x = cx + 120 * Math.cos(ang);
    const y = cy + 120 * Math.sin(ang);
    const line = document.createElementNS("http://www.w3.org/2000/svg","line");
    line.setAttribute("x1", cx); line.setAttribute("y1", cy);
    line.setAttribute("x2", x);  line.setAttribute("y2", y);
    line.setAttribute("stroke", "#cdd5ff");
    line.setAttribute("stroke-width", "0.6");
    svg.appendChild(line);

    const lx = cx + 135 * Math.cos(ang);
    const ly = cy + 135 * Math.sin(ang);
    const text = document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute("x", lx); text.setAttribute("y", ly);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "10");
    text.textContent = s.name.split("｜")[0];
    svg.appendChild(text);
  });

  const pts = values.map((v,i)=>{
    const r = (v/max)*120;
    const ang = (Math.PI*2/STAGES.length)*i - Math.PI/2;
    const x = cx + r * Math.cos(ang);
    const y = cy + r * Math.sin(ang);
    return `${x},${y}`;
  }).join(" ");
  const area = document.createElementNS("http://www.w3.org/2000/svg","polygon");
  area.setAttribute("points", pts);
  area.setAttribute("fill", "rgba(90,108,255,0.45)");
  area.setAttribute("stroke", "#5a6cff");
  area.setAttribute("stroke-width", "2");
  svg.appendChild(area);

  values.forEach((v,i)=>{
    const r = (v/10)*120;
    const ang = (Math.PI*2/STAGES.length)*i - Math.PI/2;
    const x = cx + r * Math.cos(ang);
    const y = cy + r * Math.sin(ang);
    const dot = document.createElementNS("http://www.w3.org/2000/svg","circle");
    dot.setAttribute("cx", x); dot.setAttribute("cy", y);
    dot.setAttribute("r", 3.2); dot.setAttribute("fill", "#1d2cff");
    svg.appendChild(dot);
  });
}

function addHistory(values){
  const hist = store.get("history", []);
  const today = new Date();
  const dayStr = today.toISOString().slice(0,10);
  const existedIdx = hist.findIndex(h => h.date === dayStr);
  const row = { date: dayStr, values };
  if (existedIdx >= 0) hist[existedIdx] = row; else hist.push(row);
  while (hist.length > 7) hist.shift();
  store.set("history", hist);
  renderHistory();
}

function renderHistory(){
  const hist = store.get("history", []);
  const tb = document.querySelector("#historyTable tbody");
  tb.innerHTML = "";
  hist.slice().reverse().forEach(h=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${h.date}</td>` + h.values.map(v=>`<td>${v}</td>`).join("");
    tb.appendChild(tr);
  });
}

function calcStreakAndBadges(){
  const streak = store.get("streak", 0);
  document.getElementById("streakCount").textContent = streak;
  renderBadges(streak);
}

function sameDay(a,b){
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}

function daysBetween(a,b){
  const A = new Date(a.getFullYear(),a.getMonth(),a.getDate());
  const B = new Date(b.getFullYear(),b.getMonth(),b.getDate());
  return Math.round((B-A)/(1000*60*60*24));
}

function handleCheckIn(){
  const now = new Date();
  const last = store.get("lastCheckIn", null);
  let streak = store.get("streak", 0);
  if (!last){
    streak = 1;
  } else {
    const lastDate = new Date(last);
    if (sameDay(lastDate, now)){
      // already checked in
    } else {
      const diff = daysBetween(lastDate, now);
      if (diff === 1) streak += 1;
      else streak = 1;
    }
  }
  store.set("lastCheckIn", now.toISOString());
  store.set("streak", streak);
  document.getElementById("streakCount").textContent = streak;
  renderBadges(streak);
}

function renderBadges(streak){
  const area = document.getElementById("badgeArea");
  area.innerHTML = "";
  if (streak >= 7){
    area.appendChild(makeBadge("連續 7 日", "🜁", "光之啟動"));
  }
  if (streak >= 21){
    area.appendChild(makeBadge("連續 21 日", "🜂", "光之行者"));
  }
  if (streak >= 77){
    area.appendChild(makeBadge("連續 77 日", "🜃", "靈魂整合"));
  }
}

function makeBadge(title, emoji, tag){
  const el = document.createElement("div");
  el.className = "badge";
  el.innerHTML = `<span class="emoji">${emoji}</span><span>${title}</span><small style="margin-left:6px;opacity:.7">${tag}</small>`;
  return el;
}

function onGenerate(e){
  e.preventDefault();
  const values = STAGES.map(s => parseInt(document.getElementById("s_"+s.key).value,10));
  drawRadar(values);
  document.getElementById("resultCard").hidden = false;

  let minIdx = 0, maxIdx = 0;
  values.forEach((v,i)=>{
    if (v < values[minIdx]) minIdx = i;
    if (v > values[maxIdx]) maxIdx = i;
  });
  document.getElementById("lowestStage").textContent  = STAGES[minIdx].name;
  document.getElementById("highestStage").textContent = STAGES[maxIdx].name;

  const lowKey = STAGES[minIdx].key;
  const oracle = pickOracle(lowKey);
  const actions = ACTIONS[lowKey];
  document.getElementById("oracleText").textContent = oracle;
  const ul = document.getElementById("actionsList");
  ul.innerHTML = actions.map(a=>`<li>${a}</li>`).join("");
  document.getElementById("feedbackCard").hidden = false;

  addHistory(values);

  toggleAcc(lowKey);
  document.getElementById("expandLowestBtn").onclick = ()=>toggleAcc(lowKey);
}

function onReset(){
  document.querySelectorAll('#sliders input[type="range"]').forEach(r=>{
    r.value = 5; document.getElementById("o_"+r.name).textContent = "5";
  });
  document.getElementById("resultCard").hidden = true;
  document.getElementById("feedbackCard").hidden = true;
}

function init(){
  buildSliders();
  buildAccordion();
  renderHistory();
  calcStreakAndBadges();
  document.getElementById("quizForm").addEventListener("submit", onGenerate);
  document.getElementById("resetBtn").addEventListener("click", onReset);
  document.getElementById("checkInBtn").addEventListener("click", handleCheckIn);
}

document.addEventListener("DOMContentLoaded", init);
