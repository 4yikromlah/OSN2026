// Logika Utama SMASA-Online CBT - v2.0 (Multi-role: Admin, Guru, Siswa)

// Global State
let currentRole = null; // 'siswa', 'admin', atau 'guru'
let loggedUser = null;
let activeExam = null;
let examAnswers = {};
let examFlags = {};
let examCurrentIdx = 0;
let examTimerInterval = null;
let examTimeLeft = 0;
let activeReviewResult = null;
let activeFontSize = 100;
let selectedExamId = null; // diperlukan untuk logout guru

// Inisialisasi awal
document.addEventListener("DOMContentLoaded", () => {
  startHeaderClock();

  const savedTheme = localStorage.getItem("cbt_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  setupGlobalEvents();
  showView("login-view");
});

// =================== HELPER ===================
function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function startHeaderClock() {
  const clockElement = document.getElementById("header-clock-text");
  if (!clockElement) return;

  const updateClock = () => {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    let dateStr = now.toLocaleDateString("id-ID", options);
    clockElement.innerText = `${dateStr} WIB`;
  };

  updateClock();
  setInterval(updateClock, 1000);
}

// =================== SPA NAVIGATION ===================
function showView(viewId) {
  const allViews = [
    "login-view", "student-dashboard-view", "exam-room-view",
    "review-exam-view", "admin-dashboard-view", "teacher-dashboard-view"
  ];

  allViews.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  const target = document.getElementById(viewId);
  if (target) target.classList.remove("hidden");

  const headerElement = document.querySelector("header");
  if (viewId === "login-view") {
    headerElement.classList.add("hidden");
  } else {
    headerElement.classList.remove("hidden");
    updateHeaderUserBadge();
  }

  if (viewId === "admin-dashboard-view") {
    initAdminPanel();
  }

  refreshIcons();
}

function updateHeaderUserBadge() {
  const badgeRole = document.getElementById("header-user-role");
  const badgeName = document.getElementById("header-user-status");

  if (currentRole === "admin") {
    badgeRole.innerText = "ADMINISTRATOR";
    badgeName.innerHTML = `<i data-lucide="shield" style="width:14px;height:14px;margin-right:4px;"></i> Administrator`;
    badgeName.style.color = "#10b981";
  } else if (currentRole === "guru" && loggedUser) {
    badgeRole.innerText = `GURU`;
    badgeName.innerHTML = `<i data-lucide="graduation-cap" style="width:14px;height:14px;margin-right:4px;"></i> ${loggedUser.name}`;
    badgeName.style.color = "#8b5cf6";
  } else if (currentRole === "siswa" && loggedUser) {
    badgeRole.innerText = `SISWA`;
    badgeName.innerHTML = `<i data-lucide="user" style="width:14px;height:14px;margin-right:4px;"></i> ${loggedUser.name}`;
    badgeName.style.color = "#3b82f6";
  }
  refreshIcons();
}

// =================== EVENT LISTENERS ===================
function setupGlobalEvents() {
  // Tab login role switcher (Siswa, Admin, Guru)
  const roleButtons = document.querySelectorAll(".login-role-btn");
  roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      roleButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const role = btn.getAttribute("data-role");
      const studentFields = document.getElementById("login-student-fields");
      const adminFields = document.getElementById("login-admin-fields");
      const teacherFields = document.getElementById("login-teacher-fields");

      if (studentFields) studentFields.classList.add("hidden");
      if (adminFields) adminFields.classList.add("hidden");
      if (teacherFields) teacherFields.classList.add("hidden");

      if (role === "admin") {
        if (adminFields) adminFields.classList.remove("hidden");
      } else if (role === "guru") {
        if (teacherFields) teacherFields.classList.remove("hidden");
      } else {
        if (studentFields) studentFields.classList.remove("hidden");
      }
    });
  });

  document.getElementById("btn-do-login").addEventListener("click", handleLoginSubmit);
  document.getElementById("btn-logout").addEventListener("click", handleLogout);
  document.getElementById("btn-theme-toggle").addEventListener("click", toggleTheme);
}

// =================== THEME ===================
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("cbt_theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById("btn-theme-toggle");
  if (!toggleBtn) return;
  toggleBtn.innerHTML = theme === "dark" ? `<i data-lucide="sun"></i>` : `<i data-lucide="moon"></i>`;
  refreshIcons();
}

// =================== LOGIN ===================
function handleLoginSubmit() {
  const activeRoleBtn = document.querySelector(".login-role-btn.active");
  const role = activeRoleBtn.getAttribute("data-role");

  if (role === "admin") {
    const usernameInput = document.getElementById("login-admin-username").value.trim();
    const passwordInput = document.getElementById("login-admin-password").value.trim();
    const storedPass = localStorage.getItem("cbt_admin_password") || "admin321";
    const storedUser = localStorage.getItem("cbt_admin_username") || "admin";

    if (usernameInput === storedUser && passwordInput === storedPass) {
      currentRole = "admin";
      loggedUser = "Administrator";
      showView("admin-dashboard-view");
      document.getElementById("login-admin-username").value = "";
      document.getElementById("login-admin-password").value = "";
    } else {
      alert("Username atau Password Administrator salah!\n(Default: admin / admin321)");
    }

  } else if (role === "guru") {
    const usernameInput = document.getElementById("login-teacher-username").value.trim();
    const passwordInput = document.getElementById("login-teacher-password").value.trim();

    const teachers = JSON.parse(localStorage.getItem("cbt_teachers")) || [];
    const teacher = teachers.find(t => t.username === usernameInput && t.password === passwordInput);

    if (teacher) {
      currentRole = "guru";
      loggedUser = teacher;
      window.currentTeacherId = teacher.id;
      initTeacherDashboard(teacher);
      document.getElementById("login-teacher-username").value = "";
      document.getElementById("login-teacher-password").value = "";
    } else {
      alert("Username atau Password Guru tidak ditemukan!\nHub. Admin untuk mendapatkan akses.");
    }

  } else {
    // Login Siswa dengan username + password
    const usernameInput = document.getElementById("login-student-username") ?
      document.getElementById("login-student-username").value.trim() :
      document.getElementById("login-student-name").value.trim();
    const passwordInput = document.getElementById("login-student-password") ?
      document.getElementById("login-student-password").value.trim() :
      document.getElementById("login-student-nisn").value.trim();

    if (!usernameInput || !passwordInput) {
      alert("Harap masukkan Username dan Password Anda!");
      return;
    }

    const students = JSON.parse(localStorage.getItem("cbt_students")) || [];
    let student = students.find(s => (s.username || s.nisn) === usernameInput && s.password === passwordInput);

    if (!student) {
      // Fallback: cek juga dengan name+nisn untuk kompatibilitas lama
      student = students.find(s => (s.nisn === passwordInput || s.username === usernameInput));
      if (!student) {
        alert("Username atau Password Siswa tidak valid!\nHubungi guru/admin untuk mendapat akun.");
        return;
      }
    }

    currentRole = "siswa";
    loggedUser = student;
    initStudentDashboard();
  }
}

// =================== LOGOUT ===================
function handleLogout() {
  if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
    if (examTimerInterval) clearInterval(examTimerInterval);
    currentRole = null;
    loggedUser = null;
    activeExam = null;
    selectedExamId = null;
    window.currentTeacherId = null;
    showView("login-view");
  }
}

// =================== TEACHER DASHBOARD ===================
function initTeacherDashboard(teacher) {
  showView("teacher-dashboard-view");

  // Update sambutan guru
  const welcomeEl = document.getElementById("teacher-welcome-name");
  if (welcomeEl) welcomeEl.innerText = teacher.name;

  const subjectEl = document.getElementById("teacher-welcome-subject");
  if (subjectEl) subjectEl.innerText = teacher.subject;

  // Init panel guru
  initTeacherPanel(teacher.subject);
}

// =================== STUDENT DASHBOARD ===================
function initStudentDashboard() {
  showView("student-dashboard-view");
  document.getElementById("student-welcome-name").innerText = loggedUser.name;
  renderAvailableExams();
  renderStudentAttempts();
  renderStudentStats();
}

function renderStudentStats() {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];
  const myResults = results.filter(r => r.nisn === (loggedUser.username || loggedUser.nisn));

  document.getElementById("stud-stat-total-exams").innerText = exams.filter(e => e.status === "AKTIF").length;
  document.getElementById("stud-stat-total-attempts").innerText = myResults.length;

  if (myResults.length > 0) {
    const avg = Math.round(myResults.reduce((acc, curr) => acc + curr.score, 0) / myResults.length);
    document.getElementById("stud-stat-average-score").innerText = avg + "%";
  } else {
    document.getElementById("stud-stat-average-score").innerText = "0%";
  }

  if (myResults.length > 0) {
    const lastResult = myResults[myResults.length - 1];
    const exam = exams.find(e => e.id === lastResult.examId);
    const kkm = exam ? exam.kkm : 65;
    document.getElementById("stud-stat-last-kkm").innerText = lastResult.score >= kkm ? "Tuntas KKM" : "Belum Tuntas";
  } else {
    document.getElementById("stud-stat-last-kkm").innerText = "-";
  }
}

function renderAvailableExams() {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const container = document.getElementById("student-available-exams");
  const activeExams = exams.filter(e => e.status === "AKTIF");

  if (activeExams.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size:0.88rem;">Belum ada paket ujian aktif saat ini.</p>`;
    return;
  }

  container.innerHTML = activeExams.map(exam => `
    <div class="exam-item-card" style="box-shadow: var(--nm-outset-shadow); cursor: default;">
      <span class="exam-item-badge">${exam.subject}</span>
      <div class="exam-item-title" style="margin: 5px 0 10px 0;">${exam.title}</div>
      <div class="exam-item-info-row">
        <div class="exam-item-meta">
          <i data-lucide="clock" style="width:14px;height:14px;margin-right:4px;"></i> ${exam.duration} Menit
          <span style="color:var(--text-light);margin:0 4px;">•</span>
          <i data-lucide="help-circle" style="width:14px;height:14px;margin-right:4px;"></i> ${exam.questions.length} Soal
        </div>
        <button class="btn-clay-primary" onclick="confirmStartExam('${exam.id}')" style="padding:6px 14px; font-size:0.75rem; border-radius:10px;">
          <i data-lucide="play" style="width:12px;height:12px;margin-right:4px;"></i> Ikuti Ujian
        </button>
      </div>
    </div>
  `).join('');

  refreshIcons();
}

function renderStudentAttempts() {
  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const tbody = document.getElementById("student-attempts-body");
  const myResults = results.filter(r => r.nisn === (loggedUser.username || loggedUser.nisn));

  if (myResults.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:20px;">Anda belum mengikuti ujian apa pun.</td></tr>`;
    return;
  }

  tbody.innerHTML = myResults.map((r, idx) => {
    const exam = exams.find(e => e.id === r.examId);
    const kkm = exam ? (exam.kkm || 65) : 65;
    const isPass = r.score >= kkm;
    const formattedDate = new Date(r.date).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

    return `
      <tr>
        <td>${idx + 1}</td>
        <td>${r.examTitle}</td>
        <td>${formattedDate}</td>
        <td><span class="badge-score ${isPass ? 'pass' : 'fail'}">${r.score}% (KKM: ${kkm})</span></td>
        <td>
          <button class="btn-clay-neutral" onclick="loadExamReview('${r.id}')" style="padding:6px 12px; font-size:0.72rem; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:4px;">
            <i data-lucide="file-text" style="width:13px;height:13px;"></i> Detail
          </button>
        </td>
      </tr>
    `;
  }).join('');

  refreshIcons();
}

// =================== EXAM ROOM ===================
function confirmStartExam(examId) {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const exam = exams.find(e => e.id === examId);
  if (!exam) return;
  if (exam.questions.length === 0) {
    alert("Maaf, paket ujian ini belum memiliki soal. Hubungi guru.");
    return;
  }
  if (confirm(`Mulai pengerjaan "${exam.title}"?\nDurasi: ${exam.duration} menit.\n\nKlik OK untuk memulai.`)) {
    startExamSession(exam);
  }
}

function startExamSession(exam) {
  activeExam = exam;
  examAnswers = {};
  examFlags = {};
  examCurrentIdx = 0;
  activeFontSize = 100;

  const userKey = loggedUser.username || loggedUser.nisn;
  const sessionKey = `autosave_${userKey}_${activeExam.id}`;
  const savedSession = JSON.parse(localStorage.getItem(sessionKey));

  if (savedSession) {
    if (confirm("Ditemukan sesi sebelumnya yang belum disubmit. Lanjutkan?")) {
      examAnswers = savedSession.answers || {};
      examFlags = savedSession.flags || {};
      examCurrentIdx = savedSession.currentIdx || 0;
      examTimeLeft = savedSession.timeLeft;
    } else {
      examTimeLeft = exam.duration * 60;
    }
  } else {
    examTimeLeft = exam.duration * 60;
  }

  showView("exam-room-view");
  document.getElementById("exam-room-title").innerText = activeExam.title;
  document.getElementById("exam-room-subject").innerText = activeExam.subject;
  renderExamGridNavigation();
  renderExamQuestion();
  startExamTimer();
}

function startExamTimer() {
  if (examTimerInterval) clearInterval(examTimerInterval);
  const timerDisplay = document.getElementById("exam-timer-span");

  const updateTimer = () => {
    if (examTimeLeft <= 0) {
      clearInterval(examTimerInterval);
      alert("Waktu ujian habis! Jawaban Anda akan langsung disubmit.");
      autoSubmitExam();
      return;
    }
    examTimeLeft--;
    saveExamProgressAutosave();

    const min = Math.floor(examTimeLeft / 60);
    const sec = examTimeLeft % 60;
    timerDisplay.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

    if (examTimeLeft < 300) {
      timerDisplay.parentElement.classList.add("timer-critical");
    } else {
      timerDisplay.parentElement.classList.remove("timer-critical");
    }
  };

  updateTimer();
  examTimerInterval = setInterval(updateTimer, 1000);
}

function renderExamGridNavigation() {
  const container = document.getElementById("exam-questions-grid");
  const count = activeExam.questions.length;

  container.innerHTML = Array.from({ length: count }, (_, i) => {
    let stateClass = "";
    if (examAnswers[i]) stateClass = "answered";
    if (examFlags[i]) stateClass = "flagged";
    if (examCurrentIdx === i) stateClass += " current";
    return `<button class="q-grid-btn ${stateClass}" onclick="jumpToQuestion(${i})">${i + 1}</button>`;
  }).join('');
}

function renderExamQuestion() {
  const q = activeExam.questions[examCurrentIdx];
  const qArea = document.getElementById("exam-question-area");

  document.getElementById("exam-question-number-badge").innerText = `SOAL NOMOR ${examCurrentIdx + 1} dari ${activeExam.questions.length}`;

  const progressPercent = ((examCurrentIdx + 1) / activeExam.questions.length) * 100;
  document.getElementById("exam-progress-bar-fill").style.width = `${progressPercent}%`;
  qArea.style.fontSize = `${activeFontSize}%`;

  qArea.innerHTML = `
    <div class="exam-q-text" style="margin-bottom: 20px;">${q.text}</div>
    <div class="exam-options-container">
      ${q.options.map(opt => `
        <button class="exam-option-button ${examAnswers[examCurrentIdx] === opt.key ? 'selected' : ''}" onclick="selectExamOption('${opt.key}')">
          <span class="exam-option-key">${opt.key}</span>
          <span>${opt.text}</span>
        </button>
      `).join('')}
    </div>
  `;

  const prevBtn = document.getElementById("exam-btn-prev");
  const nextBtn = document.getElementById("exam-btn-next");
  const submitBtn = document.getElementById("exam-btn-submit");

  prevBtn.disabled = examCurrentIdx === 0;
  prevBtn.style.opacity = examCurrentIdx === 0 ? 0.4 : 1;

  if (examCurrentIdx === activeExam.questions.length - 1) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }

  const flagBtn = document.getElementById("exam-btn-flag");
  if (examFlags[examCurrentIdx]) {
    flagBtn.style.background = "var(--clay-warning-bg)";
    flagBtn.style.boxShadow = "var(--clay-warning-shadow)";
    flagBtn.style.color = "white";
    flagBtn.innerHTML = `<i data-lucide="help-circle" style="width:14px;height:14px;margin-right:4px;"></i> Batal Ragu-ragu`;
  } else {
    flagBtn.style.background = "var(--clay-neutral-bg)";
    flagBtn.style.boxShadow = "var(--clay-neutral-shadow)";
    flagBtn.style.color = "var(--text-main)";
    flagBtn.innerHTML = `<i data-lucide="help-circle" style="width:14px;height:14px;margin-right:4px;"></i> Ragu-Ragu`;
  }

  refreshIcons();
}

function selectExamOption(key) {
  examAnswers[examCurrentIdx] = key;
  renderExamQuestion();
  renderExamGridNavigation();
}

function toggleExamFlag() {
  examFlags[examCurrentIdx] = !examFlags[examCurrentIdx];
  renderExamQuestion();
  renderExamGridNavigation();
}

function prevQuestion() {
  if (examCurrentIdx > 0) { examCurrentIdx--; renderExamQuestion(); renderExamGridNavigation(); }
}

function nextQuestion() {
  if (examCurrentIdx < activeExam.questions.length - 1) { examCurrentIdx++; renderExamQuestion(); renderExamGridNavigation(); }
}

function jumpToQuestion(idx) {
  examCurrentIdx = idx;
  renderExamQuestion();
  renderExamGridNavigation();
}

function changeExamFontSize(action) {
  if (action === 'increase' && activeFontSize < 160) activeFontSize += 15;
  else if (action === 'decrease' && activeFontSize > 85) activeFontSize -= 15;
  else if (action === 'reset') activeFontSize = 100;
  document.getElementById("exam-question-area").style.fontSize = `${activeFontSize}%`;
}

function saveExamProgressAutosave() {
  if (!activeExam) return;
  const userKey = loggedUser.username || loggedUser.nisn;
  localStorage.setItem(`autosave_${userKey}_${activeExam.id}`, JSON.stringify({
    answers: examAnswers, flags: examFlags, currentIdx: examCurrentIdx, timeLeft: examTimeLeft
  }));
}

function clearExamProgressAutosave() {
  if (!activeExam) return;
  const userKey = loggedUser.username || loggedUser.nisn;
  localStorage.removeItem(`autosave_${userKey}_${activeExam.id}`);
}

function submitExamManual() {
  const totalQ = activeExam.questions.length;
  const answeredQ = Object.keys(examAnswers).length;
  const unansweredQ = totalQ - answeredQ;

  let confirmMsg = "Apakah Anda yakin ingin mengakhiri ujian dan menyerahkan lembar jawaban?";
  if (unansweredQ > 0) confirmMsg += `\n\nPeringatan: ${unansweredQ} soal BELUM dijawab.`;
  if (Object.values(examFlags).some(v => v === true)) confirmMsg += `\n\nPeringatan: Masih ada soal yang ditandai "Ragu-ragu".`;

  if (confirm(confirmMsg)) finishExamSession();
}

function autoSubmitExam() { finishExamSession(); }

function finishExamSession() {
  if (examTimerInterval) clearInterval(examTimerInterval);

  let correctCount = 0;
  activeExam.questions.forEach((q, idx) => {
    if (examAnswers[idx] === q.correctAnswer) correctCount++;
  });

  const totalQuestions = activeExam.questions.length;
  const score = Math.round((correctCount / totalQuestions) * 100);

  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];
  const userKey = loggedUser.username || loggedUser.nisn;
  const newResult = {
    id: "res-" + Date.now(),
    studentName: loggedUser.name,
    nisn: userKey,
    examId: activeExam.id,
    examTitle: activeExam.title,
    score, totalQuestions,
    correctAnswers: correctCount,
    date: new Date().toISOString(),
    answers: examAnswers
  };

  results.push(newResult);
  localStorage.setItem("cbt_results", JSON.stringify(results));
  clearExamProgressAutosave();

  document.getElementById("exam-timer-span").parentElement.classList.remove("timer-critical");

  if (score >= (activeExam.kkm || 65) && typeof confetti === "function") {
    triggerConfettiCelebration();
  }

  loadExamReview(newResult.id);
}

function triggerConfettiCelebration() {
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  }());
}

// =================== REVIEW EXAM ===================
function loadExamReview(resultId) {
  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const result = results.find(r => r.id === resultId);
  const exam = exams.find(e => e.id === (result ? result.examId : ""));

  if (!result || !exam) { alert("Data riwayat ujian tidak ditemukan."); return; }

  activeReviewResult = result;
  showView("review-exam-view");

  const kkm = exam.kkm || 65;
  const isPass = result.score >= kkm;

  document.getElementById("review-exam-title").innerText = result.examTitle;
  document.getElementById("review-score-value").innerText = `${result.score}%`;

  const statusEl = document.getElementById("review-status-text");
  statusEl.innerHTML = isPass
    ? `<span class="badge-score pass" style="font-size:1rem; padding:6px 18px;">LULUS KKM (Minimal ${kkm}%)</span>`
    : `<span class="badge-score fail" style="font-size:1rem; padding:6px 18px;">TIDAK LULUS KKM (Minimal ${kkm}%)</span>`;

  document.getElementById("review-correct-count").innerText = `${result.correctAnswers} / ${result.totalQuestions}`;
  document.getElementById("review-wrong-count").innerText = `${result.totalQuestions - result.correctAnswers}`;

  const questionsContainer = document.getElementById("review-questions-list");
  questionsContainer.innerHTML = exam.questions.map((q, idx) => {
    const studentAnswer = result.answers[idx];
    const isCorrect = studentAnswer === q.correctAnswer;

    return `
      <div class="review-card">
        <div class="review-header">
          <span style="font-weight:800; color:#3b82f6;">PERTANYAAN NOMOR ${idx + 1}</span>
          <span class="review-status-label ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '<i data-lucide="check-circle" style="width:14px;height:14px;display:inline;vertical-align:middle;margin-right:4px;"></i> Jawaban Benar' : '<i data-lucide="x-circle" style="width:14px;height:14px;display:inline;vertical-align:middle;margin-right:4px;"></i> Jawaban Salah'}
          </span>
        </div>
        <div class="exam-q-text" style="font-size:1.02rem; margin-bottom:15px;">${q.text}</div>
        <div class="review-option-display">
          ${q.options.map(opt => {
            let stateClass = "normal";
            let indicator = "";
            if (opt.key === q.correctAnswer) {
              stateClass = "correct-choice";
              indicator = ` <span style="font-size:0.8rem; font-weight:700;">(Kunci Jawaban Benar)</span>`;
            } else if (opt.key === studentAnswer && !isCorrect) {
              stateClass = "wrong-choice";
              indicator = ` <span style="font-size:0.8rem; font-weight:700;">(Pilihan Anda - Salah)</span>`;
            }
            return `
              <div class="review-option-row ${stateClass}">
                <strong style="background:rgba(0,0,0,0.05); padding:4px 8px; border-radius:6px;">${opt.key}</strong>
                <span>${opt.text} ${indicator}</span>
              </div>
            `;
          }).join('')}
        </div>
        <div class="review-explanation-box" style="margin-top:15px;">
          <label style="font-weight:700; font-size:0.75rem; color:var(--text-muted);">
            <i data-lucide="info" style="width:13px;height:13px;display:inline;vertical-align:middle;margin-right:4px;"></i> Pembahasan Soal:
          </label>
          <textarea class="explanation-textarea" readonly>${q.explanation || 'Tidak ada teks pembahasan untuk soal ini.'}</textarea>
        </div>
      </div>
    `;
  }).join('');

  refreshIcons();
}

function closeReviewAndReturn() {
  activeReviewResult = null;
  if (currentRole === "admin") {
    showView("admin-dashboard-view");
  } else if (currentRole === "guru") {
    showView("teacher-dashboard-view");
  } else {
    initStudentDashboard();
  }
}

// =================== EXPOSE GLOBALS ===================
window.currentRole = currentRole;
window.loggedUser = loggedUser;
window.activeExam = activeExam;
window.examAnswers = examAnswers;
window.examFlags = examFlags;
window.examCurrentIdx = examCurrentIdx;
window.examTimeLeft = examTimeLeft;
window.activeFontSize = activeFontSize;
window.selectedExamId = selectedExamId;
window.showView = showView;
window.refreshIcons = refreshIcons;
window.confirmStartExam = confirmStartExam;
window.changeExamFontSize = changeExamFontSize;
window.toggleExamFlag = toggleExamFlag;
window.prevQuestion = prevQuestion;
window.nextQuestion = nextQuestion;
window.jumpToQuestion = jumpToQuestion;
window.submitExamManual = submitExamManual;
window.closeReviewAndReturn = closeReviewAndReturn;
window.loadExamReview = loadExamReview;
window.selectExamOption = selectExamOption;
