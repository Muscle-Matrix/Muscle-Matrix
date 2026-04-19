const storeKey = "muscleMatrixState";

const starterState = {
  session: null,
  credentials: {
    username: "Siddharth123",
    password: "12345678"
  },
  activeSubscription: null,
  members: [
    { id: crypto.randomUUID(), name: "Rahul Sharma", age: 22, weight: 72, height: 175, goal: "Muscle Gain", plan: "Quarterly", fee: "Paid" },
    { id: crypto.randomUUID(), name: "Aisha Khan", age: 26, weight: 64, height: 164, goal: "Fat Loss", plan: "Monthly", fee: "Pending" },
    { id: crypto.randomUUID(), name: "Vikram Singh", age: 31, weight: 84, height: 181, goal: "Strength", plan: "Yearly", fee: "Paid" }
  ],
  trainers: [
    { id: crypto.randomUUID(), name: "Ananya Coach", speciality: "Strength Training", shift: "Morning" },
    { id: crypto.randomUUID(), name: "Dev Malik", speciality: "Martial Arts", shift: "Evening" }
  ],
  attendance: [],
  schedules: [],
  progress: []
};

const exercises = [
  { name: "Barbell Squat", group: "Legs", sets: "4 x 6-8", note: "Brace core, keep knees tracking over toes." },
  { name: "Bench Press", group: "Chest", sets: "4 x 6-10", note: "Control the descent and drive through the floor." },
  { name: "Lat Pulldown", group: "Back", sets: "3 x 10-12", note: "Pull elbows down, avoid shrugging." },
  { name: "Romanian Deadlift", group: "Legs", sets: "3 x 8-10", note: "Hinge from hips with a neutral spine." },
  { name: "Plank", group: "Core", sets: "3 x 45 sec", note: "Keep ribs tucked and glutes active." },
  { name: "Incline Dumbbell Press", group: "Chest", sets: "3 x 8-12", note: "Use a steady tempo and full range." },
  { name: "Seated Row", group: "Back", sets: "3 x 10-12", note: "Squeeze shoulder blades together." },
  { name: "Treadmill Intervals", group: "Cardio", sets: "10 rounds", note: "Sprint 30 sec, walk 60 sec." }
];

const combatPaths = [
  {
    name: "Iron Boxing",
    inspiration: "Zack Lee energy",
    level: "Beginner to advanced",
    focus: "Footwork, guard, jabs, crosses, hooks, bag rounds, and shoulder endurance.",
    drills: ["Shadow boxing", "Heavy-bag rounds", "Slip rope", "Jump rope conditioning"],
    video: "https://www.youtube.com/results?search_query=beginner+boxing+footwork+jab+cross+heavy+bag"
  },
  {
    name: "Kyokushin Conditioning",
    inspiration: "Body-hardening striker path",
    level: "Intermediate",
    focus: "Low kicks, stance work, controlled sparring, trunk conditioning, and discipline.",
    drills: ["Round kicks", "Horse stance holds", "Bodyweight circuits", "Pad combinations"],
    video: "https://www.youtube.com/results?search_query=kyokushin+karate+basic+kicks+conditioning"
  },
  {
    name: "Grappler Control",
    inspiration: "Street wrestling arc",
    level: "Beginner",
    focus: "Balance, safe takedown entries, hip escapes, top control, and mobility.",
    drills: ["Sprawl practice", "Hip escape", "Bridge and roll", "Partner pummeling"],
    video: "https://www.youtube.com/results?search_query=beginner+wrestling+takedown+drills+hip+escape"
  },
  {
    name: "MMA Hybrid",
    inspiration: "All-rounder fighter route",
    level: "Advanced",
    focus: "Striking-to-clinch transitions, cage fitness, explosive strength, and recovery.",
    drills: ["Jab to level change", "Pad and sprawl", "Kettlebell swings", "Interval rounds"],
    video: "https://www.youtube.com/results?search_query=beginner+mma+striking+wrestling+drills"
  },
  {
    name: "Muay Thai Clinch",
    inspiration: "Pressure fighter style",
    level: "Intermediate",
    focus: "Elbows, knees, clinch posture, round kicks, and shin-safe progression.",
    drills: ["Teep practice", "Knee entries", "Clinch posture", "Thai pad rounds"],
    video: "https://www.youtube.com/results?search_query=muay+thai+beginner+clinch+knees+teep"
  },
  {
    name: "Systema Mobility",
    inspiration: "Calm movement specialist",
    level: "Recovery friendly",
    focus: "Breathing, movement flow, falling mechanics, and tension control.",
    drills: ["Breathing ladders", "Ground flow", "Soft rolls", "Reaction walking"],
    video: "https://www.youtube.com/results?search_query=martial+arts+mobility+falling+drills+beginner"
  }
];

const subscriptionPlans = [
  { name: "Rookie", price: "Rs. 299/mo", amount: 299, text: "Exercise library, BMI and calorie tools, and starter combat lessons.", featured: false },
  { name: "Fighter", price: "Rs. 699/mo", amount: 699, text: "Full martial paths, weekly plans, diet planner, and progress tracking.", featured: true },
  { name: "Dojo Pro", price: "Rs. 1499/mo", amount: 1499, text: "Coach dashboard, member reports, premium combat routines, and gym analytics.", featured: false }
];

const mealBank = {
  Balanced: ["Oats with milk, banana, and peanuts", "Rice, dal, curd, salad, and paneer", "Fruit bowl with yogurt", "Chicken or paneer roti wrap"],
  Vegetarian: ["Poha with sprouts", "Rajma rice with salad", "Paneer bhurji and roti", "Curd, fruit, and roasted chana"],
  "High Protein": ["Eggs or tofu with toast", "Chicken breast or paneer bowl", "Whey shake with banana", "Fish, soy, or dal with rice"],
  "Budget Indian": ["Dalia with milk", "Dal khichdi with curd", "Sattu drink and banana", "Egg curry or chana with roti"]
};

let state = loadState();

function loadState() {
  const saved = localStorage.getItem(storeKey);
  if (!saved) return starterState;
  try {
    const parsed = JSON.parse(saved);
    return {
      ...starterState,
      ...parsed,
      credentials: {
        ...starterState.credentials,
        ...(parsed.credentials || {})
      }
    };
  } catch {
    return starterState;
  }
}

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return [...document.querySelectorAll(selector)];
}

function toast(message) {
  const el = qs("#toast");
  el.textContent = message;
  el.classList.add("show");
  window.setTimeout(() => el.classList.remove("show"), 2200);
}

function bmi(weight, height) {
  return weight / ((height / 100) ** 2);
}

function bmiLabel(value) {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Healthy";
  if (value < 30) return "Overweight";
  return "Obese";
}

function memberBmi(member) {
  return bmi(Number(member.weight), Number(member.height));
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function getPlan(name) {
  return subscriptionPlans.find((plan) => plan.name === name);
}

function login(profile) {
  state.session = profile;
  saveState();
  applySession();
  toast(`Welcome, ${profile.name}`);
}

function logout() {
  state.session = null;
  saveState();
  applySession();
}

function applySession() {
  const loggedIn = Boolean(state.session);
  qs('[data-screen="login"]').classList.toggle("hidden", loggedIn);
  qs('[data-screen="dashboard"]').classList.toggle("hidden", !loggedIn);

  if (loggedIn) {
    const name = state.session.name || state.credentials.username;
    qs("#profileName").textContent = name;
    qs("#profileRole").textContent = name;
    qs("#profileInitials").textContent = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
    qs("#paymentName").value = name;
    renderAll();
  }
}

function switchPage(id) {
  qsa(".page").forEach((page) => page.classList.toggle("active", page.id === id));
  qsa(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.target === id));
  const active = qs(`.nav-item[data-target="${id}"]`);
  qs("#pageTitle").textContent = active ? active.textContent : "Overview";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  renderOverview();
  renderMembers();
  renderTrainers();
  renderSelectors();
  renderAttendance();
  renderSchedules();
  renderExerciseLibrary();
  renderMartial();
  renderReports();
  renderAccount();
}

function renderOverview() {
  const today = todayIso();
  qs("#totalMembers").textContent = state.members.length;
  qs("#totalTrainers").textContent = state.trainers.length;
  qs("#todayAttendance").textContent = state.attendance.filter((item) => item.date === today).length;
  qs("#pendingFees").textContent = state.members.filter((member) => member.fee === "Pending").length;

  qs("#recentMembers").innerHTML = state.members.slice(-4).reverse().map((member) => `
    <div class="list-row">
      <div><strong>${member.name}</strong><small>${member.goal} · ${member.plan}</small></div>
      <span class="badge ${member.fee === "Pending" ? "warn" : ""}">${member.fee}</span>
    </div>
  `).join("") || `<p>No members yet.</p>`;

  const pending = state.members.filter((member) => member.fee === "Pending").map((member) => member.name);
  const needsCardio = state.members.filter((member) => memberBmi(member) >= 25).map((member) => member.name);
  const tips = [
    pending.length ? `Collect pending fee from ${pending.slice(0, 2).join(", ")}.` : "All visible member fees are clear.",
    needsCardio.length ? `Add cardio blocks for ${needsCardio.slice(0, 2).join(", ")}.` : "Current BMI spread looks balanced.",
    "Review attendance gaps every Saturday for better retention."
  ];
  qs("#smartTips").innerHTML = tips.map((tip) => `<div class="tip-item"><strong>${tip}</strong></div>`).join("");
}

function renderMembers() {
  const filter = qs("#memberSearch")?.value?.toLowerCase() || "";
  const rows = state.members
    .filter((member) => member.name.toLowerCase().includes(filter) || member.goal.toLowerCase().includes(filter))
    .map((member) => {
      const value = memberBmi(member);
      return `
        <tr>
          <td><strong>${member.name}</strong><br><small>${member.age} yrs · ${member.weight} kg · ${member.height} cm</small></td>
          <td>${member.goal}</td>
          <td>${value.toFixed(1)} <span class="badge">${bmiLabel(value)}</span></td>
          <td>${member.plan}</td>
          <td><span class="badge ${member.fee === "Pending" ? "warn" : ""}">${member.fee}</span></td>
          <td><button class="danger-btn" data-delete-member="${member.id}" type="button">Delete</button></td>
        </tr>
      `;
    }).join("");
  qs("#memberTable").innerHTML = rows || `<tr><td colspan="6">No member records found.</td></tr>`;
}

function renderTrainers() {
  qs("#trainerList").innerHTML = state.trainers.map((trainer) => `
    <div class="trainer-card">
      <div><strong>${trainer.name}</strong><small>${trainer.speciality} · ${trainer.shift}</small></div>
      <button class="danger-btn" data-delete-trainer="${trainer.id}" type="button">Delete</button>
    </div>
  `).join("") || `<p>No trainers added.</p>`;
}

function renderSelectors() {
  const options = state.members.map((member) => `<option value="${member.id}">${member.name}</option>`).join("");
  ["#attendanceMember", "#scheduleMember", "#progressMember"].forEach((selector) => {
    const el = qs(selector);
    if (el) el.innerHTML = options || `<option value="">Add a member first</option>`;
  });
}

function renderAttendance() {
  qs("#attendanceLog").innerHTML = state.attendance.slice(-8).reverse().map((item) => `
    <div class="list-row">
      <div><strong>${item.name}</strong><small>${item.session} · ${item.date}</small></div>
      <span class="badge">Present</span>
    </div>
  `).join("") || `<p>No attendance marked.</p>`;
}

function renderSchedules() {
  qs("#scheduleList").innerHTML = state.schedules.slice(-8).reverse().map((item) => `
    <div class="list-row">
      <div><strong>${item.name}</strong><small>${item.day}</small></div>
      <span class="badge">${item.focus}</span>
    </div>
  `).join("") || `<p>No schedules created.</p>`;
}

function renderExerciseLibrary() {
  const selected = qs("#exerciseFilter")?.value || "All";
  const visible = selected === "All" ? exercises : exercises.filter((exercise) => exercise.group === selected);
  qs("#exerciseLibrary").innerHTML = visible.map((exercise) => `
    <article class="exercise-card">
      <div>
        <span class="badge">${exercise.group}</span>
        <h3>${exercise.name}</h3>
        <p>${exercise.note}</p>
      </div>
      <strong>${exercise.sets}</strong>
    </article>
  `).join("");
}

function renderMartial() {
  const active = state.activeSubscription;
  qs("#subscriptionPlans").innerHTML = subscriptionPlans.map((plan) => `
    <article class="price-card ${plan.featured ? "featured" : ""}">
      <h3>${plan.name}</h3>
      <div class="price">${plan.price}</div>
      <p>${plan.text}</p>
      <button class="${plan.featured ? "primary-btn" : "secondary-btn"}" type="button" data-subscribe="${plan.name}">
        ${active?.plan === plan.name ? "Active Plan" : `Pay ${plan.price}`}
      </button>
    </article>
  `).join("");

  qs("#subscriptionStatus").className = active ? "badge" : "badge warn";
  qs("#subscriptionStatus").textContent = active ? `${active.plan} active` : "Subscription required";
  qs("#paymentAccess").innerHTML = active
    ? `
      <div>
        <h3>Martial Arts Unlocked</h3>
        <p>${state.credentials.username} has access through the ${active.plan} plan. Transaction: ${active.transactionId}</p>
      </div>
      <button class="secondary-btn" type="button" data-subscribe="${active.plan}">Change Plan</button>
    `
    : `
      <div>
        <h3>Unlock the complete academy</h3>
        <p>Subscribe once to open every martial art path, training drill, and video link in this section.</p>
      </div>
      <button class="primary-btn" type="button" data-subscribe="Fighter">Open Payment Gateway</button>
    `;

  qs("#combatPaths").innerHTML = combatPaths.map((path) => `
    <article class="combat-card ${active ? "" : "locked-card"}">
      <span class="badge">${path.level}</span>
      <h3>${path.name}</h3>
      <p><strong>${path.inspiration}</strong></p>
      <p>${path.focus}</p>
      <ul>${path.drills.map((drill) => `<li>${drill}</li>`).join("")}</ul>
      <a class="video-link" href="${path.video}" target="_blank" rel="noreferrer">Watch Videos</a>
    </article>
  `).join("");
}

function renderReports() {
  const averageBmi = state.members.length
    ? state.members.reduce((sum, member) => sum + memberBmi(member), 0) / state.members.length
    : 0;
  const reportItems = [
    ["Average BMI", averageBmi ? averageBmi.toFixed(1) : "0"],
    ["Fee Collection", `${state.members.filter((member) => member.fee === "Paid").length}/${state.members.length} paid`],
    ["Attendance Entries", state.attendance.length],
    ["Workout Schedules", state.schedules.length]
  ];

  qs("#reportSummary").innerHTML = reportItems.map(([label, value]) => `
    <div class="report-item"><strong>${label}</strong><span class="badge">${value}</span></div>
  `).join("");

  qs("#progressList").innerHTML = state.progress.slice(-8).reverse().map((item) => `
    <div class="list-row">
      <div><strong>${item.name}</strong><small>${item.note} · ${item.date}</small></div>
      <span class="badge">${item.weight} kg</span>
    </div>
  `).join("") || `<p>No progress entries yet.</p>`;
}

function renderAccount() {
  qs("#currentUsername").textContent = state.credentials.username;
  qs("#newUsername").value = state.credentials.username;
}

function openCheckout(planName) {
  const plan = getPlan(planName) || subscriptionPlans[1];
  qs("#checkoutPlan").textContent = plan.name;
  qs("#checkoutAmount").textContent = plan.price;
  qs("#paymentName").value = state.credentials.username;
  qs("#paymentForm").dataset.plan = plan.name;
  qs("#checkoutModal").classList.remove("hidden");
}

function closeCheckout() {
  qs("#checkoutModal").classList.add("hidden");
}

function calculateMetrics(data) {
  const bodyMassIndex = bmi(data.weight, data.height);
  const bmr = data.gender === "male"
    ? (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5
    : (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161;
  const maintenance = Math.round(bmr * data.activity);
  const target = data.goal === "Fat Loss" ? maintenance - 400 : data.goal === "Muscle Gain" ? maintenance + 300 : maintenance;
  return { bodyMassIndex, bmr: Math.round(bmr), maintenance, target };
}

function currentCalculatorData() {
  return {
    gender: qs("#calcGender").value,
    age: Number(qs("#calcAge").value),
    weight: Number(qs("#calcWeight").value),
    height: Number(qs("#calcHeight").value),
    activity: Number(qs("#calcActivity").value),
    goal: qs("#calcGoal").value
  };
}

function updateCalculator(showToast = false) {
  const data = currentCalculatorData();
  const metrics = calculateMetrics(data);
  qs("#calculatorResult").innerHTML = [
    ["BMI", `${metrics.bodyMassIndex.toFixed(1)} ${bmiLabel(metrics.bodyMassIndex)}`],
    ["BMR", `${metrics.bmr} kcal`],
    ["Maintain", `${metrics.maintenance} kcal`],
    ["Target", `${metrics.target} kcal`]
  ].map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join("");
  renderWorkout(metrics, data.goal);
  if (showToast) toast("Plan generated");
}

function renderWorkout(metrics, goal) {
  const focus = {
    "Fat Loss": ["Full-body strength", "Cardio intervals", "Core stability"],
    "Muscle Gain": ["Push hypertrophy", "Pull hypertrophy", "Leg volume"],
    Strength: ["Squat and posterior chain", "Bench and upper push", "Deadlift and rows"],
    Maintenance: ["Balanced strength", "Mobility", "Conditioning"]
  }[goal] || ["Full-body strength", "Cardio", "Mobility"];

  const days = ["Day 1", "Day 2", "Day 3"];
  qs("#workoutPlan").innerHTML = focus.map((title, index) => `
    <article class="plan-card">
      <span class="badge">${days[index]}</span>
      <h3>${title}</h3>
      <ul>
        <li>Warm-up: 8 minutes mobility</li>
        <li>Main lift: ${goal === "Strength" ? "5 x 5" : "4 x 8-12"}</li>
        <li>Accessory work: 3 focused movements</li>
        <li>Finish: ${goal === "Fat Loss" ? "12 minute intervals" : "loaded carries and stretching"}</li>
      </ul>
    </article>
  `).join("");

  qs("#dietCalories").value = metrics.target;
  createDietPlan();
}

function createDietPlan() {
  const type = qs("#dietType").value;
  const calories = Number(qs("#dietCalories").value);
  const meals = Number(qs("#dietMeals").value);
  const protein = Math.round((calories * 0.3) / 4);
  const carbs = Math.round((calories * 0.45) / 4);
  const fats = Math.round((calories * 0.25) / 9);

  qs("#macroTargets").innerHTML = [
    ["Calories", calories],
    ["Protein", `${protein} g`],
    ["Carbs", `${carbs} g`],
    ["Fats", `${fats} g`]
  ].map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join("");

  const foods = mealBank[type];
  qs("#dietPlan").innerHTML = Array.from({ length: meals }, (_, index) => `
    <article class="meal-card">
      <span class="badge">Meal ${index + 1}</span>
      <h3>${foods[index % foods.length]}</h3>
      <p>Target: about ${Math.round(calories / meals)} kcal with water and vegetables.</p>
    </article>
  `).join("");
}

function bindEvents() {
  qs("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = qs("#usernameInput").value.trim();
    const password = qs("#passwordInput").value;

    if (username !== state.credentials.username || password !== state.credentials.password) {
      toast("Wrong username or password");
      return;
    }

    login({ name: username, role: username });
  });

  qs("#googleLogin").addEventListener("click", () => login({ name: state.credentials.username, role: state.credentials.username }));
  qs("#logoutBtn").addEventListener("click", logout);

  qsa("[data-target]").forEach((button) => {
    button.addEventListener("click", () => switchPage(button.dataset.target));
  });

  qs("#memberForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.members.push({
      id: crypto.randomUUID(),
      name: qs("#memberName").value,
      age: Number(qs("#memberAge").value),
      weight: Number(qs("#memberWeight").value),
      height: Number(qs("#memberHeight").value),
      goal: qs("#memberGoal").value,
      plan: qs("#memberPlan").value,
      fee: qs("#memberFee").value
    });
    saveState();
    event.target.reset();
    renderAll();
    toast("Member saved");
  });

  qs("#trainerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.trainers.push({
      id: crypto.randomUUID(),
      name: qs("#trainerName").value,
      speciality: qs("#trainerSpeciality").value,
      shift: qs("#trainerShift").value
    });
    saveState();
    event.target.reset();
    renderAll();
    toast("Trainer saved");
  });

  document.addEventListener("click", (event) => {
    const memberId = event.target.dataset.deleteMember;
    const trainerId = event.target.dataset.deleteTrainer;
    const subscription = event.target.dataset.subscribe;

    if (memberId) {
      state.members = state.members.filter((member) => member.id !== memberId);
      saveState();
      renderAll();
      toast("Member deleted");
    }

    if (trainerId) {
      state.trainers = state.trainers.filter((trainer) => trainer.id !== trainerId);
      saveState();
      renderAll();
      toast("Trainer deleted");
    }

    if (subscription) {
      openCheckout(subscription);
    }
  });

  qs("#memberSearch").addEventListener("input", renderMembers);
  qs("#exerciseFilter").addEventListener("change", renderExerciseLibrary);

  qs("#attendanceDate").value = todayIso();
  qs("#attendanceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const member = state.members.find((item) => item.id === qs("#attendanceMember").value);
    if (!member) return toast("Add a member first");
    state.attendance.push({ id: crypto.randomUUID(), memberId: member.id, name: member.name, date: qs("#attendanceDate").value, session: qs("#attendanceSession").value });
    saveState();
    renderAll();
    toast("Attendance marked");
  });

  qs("#scheduleForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const member = state.members.find((item) => item.id === qs("#scheduleMember").value);
    if (!member) return toast("Add a member first");
    state.schedules.push({ id: crypto.randomUUID(), memberId: member.id, name: member.name, day: qs("#scheduleDay").value, focus: qs("#scheduleFocus").value });
    saveState();
    event.target.reset();
    renderAll();
    toast("Schedule added");
  });

  qs("#calculatorForm").addEventListener("submit", (event) => {
    event.preventDefault();
    updateCalculator(true);
  });

  qs("#copyWorkout").addEventListener("click", async () => {
    const text = qs("#workoutPlan").innerText.trim();
    if (!text) return toast("Generate a plan first");
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    toast("Workout plan copied");
  });

  qs("#dietForm").addEventListener("submit", (event) => {
    event.preventDefault();
    createDietPlan();
    toast("Diet plan created");
  });

  qs("#progressForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const member = state.members.find((item) => item.id === qs("#progressMember").value);
    if (!member) return toast("Add a member first");
    state.progress.push({ id: crypto.randomUUID(), memberId: member.id, name: member.name, date: todayIso(), weight: Number(qs("#progressWeight").value), note: qs("#progressNote").value });
    saveState();
    event.target.reset();
    renderAll();
    toast("Progress saved");
  });

  qs("#credentialForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = qs("#newUsername").value.trim();
    const currentPassword = qs("#currentPassword").value;
    const newPassword = qs("#newPassword").value;

    if (currentPassword !== state.credentials.password) {
      toast("Current password is incorrect");
      return;
    }

    state.credentials = { username, password: newPassword };
    state.session = { name: username, role: username };
    qs("#usernameInput").value = username;
    qs("#passwordInput").value = newPassword;
    qs("#paymentName").value = username;
    qs("#currentPassword").value = "";
    qs("#newPassword").value = "";
    saveState();
    applySession();
    toast("Login details updated");
  });

  qs("#paymentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const plan = getPlan(event.target.dataset.plan);
    const reference = qs("#paymentReference").value.trim();

    if (!plan || reference.length < 4) {
      toast("Enter valid payment details");
      return;
    }

    state.activeSubscription = {
      plan: plan.name,
      amount: plan.amount,
      method: qs("#paymentMethod").value,
      paidBy: qs("#paymentName").value.trim() || state.credentials.username,
      transactionId: `MM${Date.now().toString().slice(-8)}`,
      paidOn: todayIso()
    };
    saveState();
    closeCheckout();
    qs("#paymentReference").value = "";
    renderMartial();
    toast(`${plan.name} subscription active`);
  });

  qsa("[data-close-checkout]").forEach((button) => {
    button.addEventListener("click", closeCheckout);
  });

  qs("#exportReport").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `muscle-matrix-report-${todayIso()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

bindEvents();
applySession();
renderExerciseLibrary();
updateCalculator();
registerServiceWorker();
