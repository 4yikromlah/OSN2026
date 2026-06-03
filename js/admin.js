// Logika Administratif SMASA-Online CBT - v2.0 dengan fitur lengkap

let selectedExamId = null;
let selectedQuestionsForBulkDelete = new Set();

// =================== INISIALISASI PANEL ADMIN ===================
function initAdminPanel() {
  renderAdminStats();
  setupAdminTabEvents();
  renderAdminExamList();
  renderTeachersList();
  renderStudentsList();
  renderResultsList();
  showEmptyState();
}

// =================== STATS CARDS ===================
function renderAdminStats() {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];

  document.getElementById("stat-total-exams").innerText = exams.length;
  document.getElementById("stat-total-attempts").innerText = results.length;

  if (results.length > 0) {
    const sum = results.reduce((acc, curr) => acc + curr.score, 0);
    document.getElementById("stat-average-score").innerText = Math.round(sum / results.length) + "%";
  } else {
    document.getElementById("stat-average-score").innerText = "0%";
  }

  const defaultPass = localStorage.getItem("cbt_admin_password") || "admin321";
  document.getElementById("stat-default-password").innerText = defaultPass;
}

// =================== TAB NAVIGATION ===================
function setupAdminTabEvents() {
  const tabs = document.querySelectorAll(".tab-nav-btn[data-tab]");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      ["admin-tab-exams", "admin-tab-teachers", "admin-tab-students", "admin-tab-results"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
      });

      const targetTab = tab.getAttribute("data-tab");
      if (targetTab === "exams") {
        document.getElementById("admin-tab-exams").classList.remove("hidden");
      } else if (targetTab === "teachers") {
        document.getElementById("admin-tab-teachers").classList.remove("hidden");
        renderTeachersList();
      } else if (targetTab === "students") {
        document.getElementById("admin-tab-students").classList.remove("hidden");
        renderStudentsList();
      } else if (targetTab === "results") {
        document.getElementById("admin-tab-results").classList.remove("hidden");
        renderResultsList();
      }

      refreshIcons();
    });
  });
}

// =================== EMPTY STATE ===================
function showEmptyState() {
  selectedExamId = null;
  selectedQuestionsForBulkDelete = new Set();
  const rightPanel = document.getElementById("exam-detail-panel");
  if (!rightPanel) return;
  rightPanel.innerHTML = `
    <div class="empty-state-view">
      <i data-lucide="book-open" style="width: 50px; height: 50px; stroke-width: 1.5; color: var(--text-light)"></i>
      <p>Silakan pilih atau tambahkan paket ujian di panel sebelah kiri untuk mulai mengelola soal-soal.</p>
    </div>
  `;
  refreshIcons();
}

// =================== DAFTAR PAKET UJIAN ===================
function renderAdminExamList() {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const listContainer = document.getElementById("admin-exam-list");
  if (!listContainer) return;

  if (exams.length === 0) {
    listContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 20px;">Belum ada paket ujian terdaftar.</p>`;
    return;
  }

  listContainer.innerHTML = exams.map(exam => `
    <div class="exam-item-card ${selectedExamId === exam.id ? 'selected' : ''}" onclick="selectExam('${exam.id}')">
      <span class="exam-item-badge">${exam.subject}</span>
      <div class="exam-item-title">${exam.title}</div>
      <div class="exam-item-info-row">
        <div class="exam-item-meta">
          <i data-lucide="clock" style="width: 13px; height: 13px; margin-right: 3px; display: inline-block; vertical-align: middle;"></i> ${exam.duration} Menit
          <span style="color: var(--text-light); margin: 0 4px;">•</span>
          <i data-lucide="help-circle" style="width: 13px; height: 13px; margin-right: 3px; display: inline-block; vertical-align: middle;"></i> ${exam.questions.length} Soal
        </div>
        <div class="exam-item-actions">
          <span class="status-active-badge ${exam.status === 'AKTIF' ? '' : 'hidden'}">
            <i data-lucide="eye" style="width: 12px; height: 12px;"></i> ${exam.status}
          </span>
          <button class="btn-delete-item" onclick="event.stopPropagation(); confirmDeleteExam('${exam.id}')" title="Hapus Paket Ujian">
            <i data-lucide="trash-2" style="width: 15px; height: 15px;"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  refreshIcons();
}

// =================== DETAIL PAKET UJIAN ===================
function selectExam(examId) {
  selectedExamId = examId;
  selectedQuestionsForBulkDelete = new Set();
  renderAdminExamList();

  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const exam = exams.find(e => e.id === examId);
  if (!exam) { showEmptyState(); return; }

  const rightPanel = document.getElementById("exam-detail-panel");
  rightPanel.innerHTML = `
    <div class="right-scroll-container">
      <div class="detail-section-title">
        <span>Pengaturan Paket Ujian</span>
        <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">ID: ${exam.id}</span>
      </div>

      <!-- Form Settings -->
      <div class="detail-grid-settings">
        <div class="form-group">
          <label>Mata Pelajaran</label>
          <input type="text" id="edit-exam-subject" class="form-input" value="${exam.subject}">
        </div>
        <div class="form-group">
          <label>Judul Ujian</label>
          <input type="text" id="edit-exam-title" class="form-input" value="${exam.title}">
        </div>
        <div class="form-group">
          <label>Durasi (Menit)</label>
          <input type="number" id="edit-exam-duration" class="form-input" value="${exam.duration}" min="1">
        </div>
        <div class="form-group">
          <label>KKM</label>
          <input type="number" id="edit-exam-kkm" class="form-input" value="${exam.kkm || 65}" min="0" max="100">
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="edit-exam-status" class="form-input" style="height: 45px;">
            <option value="AKTIF" ${exam.status === 'AKTIF' ? 'selected' : ''}>AKTIF</option>
            <option value="NONAKTIF" ${exam.status === 'NONAKTIF' ? 'selected' : ''}>NONAKTIF</option>
          </select>
        </div>
        <div class="form-group" style="justify-content: flex-end;">
          <button class="btn-clay-primary" onclick="saveExamConfig()" style="height: 45px; justify-content: center; cursor: pointer;">
            <i data-lucide="save" style="width: 16px; height: 16px;"></i> Simpan Konfigurasi
          </button>
        </div>
      </div>

      <!-- Import Word -->
      <div class="detail-section-title">
        <span>Import Soal dari Microsoft Word (.docx)</span>
      </div>
      <div class="word-import-dropzone" onclick="document.getElementById('word-file-input').click()">
        <i data-lucide="file-text" style="width: 36px; height: 36px;"></i>
        <p>Klik di sini atau drag & drop file Word (.docx) soal Anda.</p>
        <div class="format-tip">Format: Nomor soal (1. Teks), opsi (A. teks), Kunci: [A-E], Pembahasan: [teks]</div>
        <input type="file" id="word-file-input" accept=".docx" style="display: none;" onchange="handleWordFileUpload(event)">
      </div>

      <!-- Questions Header with Bulk Actions -->
      <div class="detail-section-title" style="flex-wrap: wrap; gap: 8px;">
        <span>Daftar Pertanyaan (${exam.questions.length} Soal)</span>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <button class="btn-ai-generate" onclick="openAIGenerateModal()" style="cursor: pointer;">
            <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i> Buat Soal dengan AI
          </button>
          <button class="btn-add-exam" onclick="openAddQuestionModal()" style="background: var(--clay-success-bg); box-shadow: var(--clay-success-shadow); color: white; cursor: pointer;">
            <i data-lucide="plus-circle" style="width: 14px; height: 14px;"></i> Tambah Manual
          </button>
        </div>
      </div>

      <!-- Bulk Delete Toolbar -->
      <div class="bulk-delete-toolbar" id="bulk-delete-toolbar" style="display: none;">
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 700; font-size: 0.85rem;">
            <input type="checkbox" id="select-all-questions-cb" onchange="toggleSelectAllQuestions(this.checked)" style="width: 16px; height: 16px; cursor: pointer;">
            Pilih Semua
          </label>
          <span id="selected-count-label" style="color: var(--text-muted); font-size: 0.82rem;">0 soal dipilih</span>
          <button class="btn-clay-danger" id="btn-delete-selected" onclick="deleteSelectedQuestions()" style="padding: 6px 14px; font-size: 0.8rem; cursor: pointer; display: none;">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> Hapus Soal Terpilih
          </button>
        </div>
      </div>

      <!-- Questions List -->
      <div class="admin-questions-list" id="admin-questions-list-container" style="display: flex; flex-direction: column; gap: 20px;">
        ${renderAdminQuestions(exam.questions)}
      </div>
    </div>
  `;

  // Show bulk toolbar
  if (exam.questions.length > 0) {
    document.getElementById("bulk-delete-toolbar").style.display = "block";
  }

  refreshIcons();
}

// =================== RENDER SOAL ADMIN ===================
function renderAdminQuestions(questions) {
  if (questions.length === 0) {
    return `<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 20px;">Belum ada soal. Gunakan AI, import Word, atau tambah manual.</p>`;
  }

  return questions.map((q, idx) => `
    <div class="q-admin-card" id="q-card-${q.id}">
      <div class="q-admin-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" class="q-checkbox" data-qid="${q.id}" onchange="toggleQuestionSelection('${q.id}', this.checked)"
            style="width: 16px; height: 16px; cursor: pointer; accent-color: #ef4444;"
            ${selectedQuestionsForBulkDelete.has(q.id) ? 'checked' : ''}>
          <span class="q-admin-no">SOAL NOMOR ${idx + 1}</span>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn-delete-item" onclick="openEditQuestionModal('${q.id}')" title="Edit Soal">
            <i data-lucide="edit-3" style="width: 15px; height: 15px; color: #3b82f6;"></i>
          </button>
          <button class="btn-delete-item" onclick="confirmDeleteQuestion('${q.id}')" title="Hapus Soal">
            <i data-lucide="trash-2" style="width: 15px; height: 15px; color: #ef4444;"></i>
          </button>
        </div>
      </div>
      <div class="q-admin-text">${q.text}</div>
      <div class="q-admin-options-list">
        ${q.options.map(opt => `
          <div class="q-admin-option ${q.correctAnswer === opt.key ? 'correct' : ''}">
            <strong>${opt.key}.</strong> ${opt.text}
          </div>
        `).join('')}
      </div>
      <div class="review-explanation-box">
        <label>Pembahasan Jawaban Benar:</label>
        <div class="q-admin-explanation">${q.explanation || 'Tidak ada pembahasan.'}</div>
      </div>
    </div>
  `).join('');
}

// =================== CHECKBOX BULK DELETE ===================
function toggleQuestionSelection(qId, isChecked) {
  if (isChecked) {
    selectedQuestionsForBulkDelete.add(qId);
  } else {
    selectedQuestionsForBulkDelete.delete(qId);
  }
  updateBulkDeleteUI();
}

function toggleSelectAllQuestions(isChecked) {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const exam = exams.find(e => e.id === selectedExamId);
  if (!exam) return;

  selectedQuestionsForBulkDelete = isChecked ? new Set(exam.questions.map(q => q.id)) : new Set();

  // Update all checkboxes
  document.querySelectorAll(".q-checkbox").forEach(cb => {
    cb.checked = isChecked;
  });

  updateBulkDeleteUI();
}

function updateBulkDeleteUI() {
  const count = selectedQuestionsForBulkDelete.size;
  const label = document.getElementById("selected-count-label");
  const btn = document.getElementById("btn-delete-selected");
  if (label) label.innerText = `${count} soal dipilih`;
  if (btn) btn.style.display = count > 0 ? "flex" : "none";
}

function deleteSelectedQuestions() {
  if (selectedQuestionsForBulkDelete.size === 0) return;
  if (!confirm(`Hapus ${selectedQuestionsForBulkDelete.size} soal terpilih secara permanen?`)) return;

  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const examIdx = exams.findIndex(e => e.id === selectedExamId);
  if (examIdx !== -1) {
    exams[examIdx].questions = exams[examIdx].questions.filter(q => !selectedQuestionsForBulkDelete.has(q.id));
    localStorage.setItem("cbt_exams", JSON.stringify(exams));
    selectedQuestionsForBulkDelete = new Set();
    selectExam(selectedExamId);
    renderAdminStats();
  }
}

// =================== SIMPAN KONFIGURASI UJIAN ===================
function saveExamConfig() {
  if (!selectedExamId) return;
  const subject = document.getElementById("edit-exam-subject").value.trim();
  const title = document.getElementById("edit-exam-title").value.trim();
  const duration = parseInt(document.getElementById("edit-exam-duration").value);
  const kkm = parseInt(document.getElementById("edit-exam-kkm").value);
  const status = document.getElementById("edit-exam-status").value;

  if (!subject || !title || isNaN(duration) || duration <= 0 || isNaN(kkm)) {
    alert("Harap isi semua input konfigurasi dengan benar!");
    return;
  }

  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const examIdx = exams.findIndex(e => e.id === selectedExamId);
  if (examIdx !== -1) {
    exams[examIdx].subject = subject.toUpperCase();
    exams[examIdx].title = title;
    exams[examIdx].duration = duration;
    exams[examIdx].kkm = kkm;
    exams[examIdx].status = status;
    localStorage.setItem("cbt_exams", JSON.stringify(exams));
    alert("Konfigurasi ujian berhasil disimpan!");
    renderAdminExamList();
    renderAdminStats();
  }
}

// =================== IMPORT WORD ===================
function handleWordFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    mammoth.extractRawText({ arrayBuffer: e.target.result })
      .then(result => {
        const parsed = parseWordContent(result.value);
        if (parsed.length === 0) {
          alert("Gagal membaca soal! Pastikan format file Word sesuai petunjuk.");
          return;
        }
        if (confirm(`Berhasil memindai ${parsed.length} soal. Impor sekarang?`)) {
          importQuestionsToExam(parsed);
        }
      })
      .catch(err => alert("Eror saat membaca berkas Word: " + err.message));
  };
  reader.readAsArrayBuffer(file);
}

function parseWordContent(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const questions = [];
  let currentQuestion = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const optMatch = line.match(/^([A-E])\.\s*(.*)/i);
    const keyMatch = line.match(/^(Kunci|Kunci Jawaban|Answer)\s*:\s*([A-E])/i);
    const expMatch = line.match(/^(Pembahasan|Explanation)\s*:\s*(.*)/i);
    const qNumMatch = line.match(/^(\d+)\.\s*(.*)/);

    if (optMatch) {
      if (currentQuestion) currentQuestion.options.push({ key: optMatch[1].toUpperCase(), text: optMatch[2].trim() });
    } else if (keyMatch) {
      if (currentQuestion) currentQuestion.correctAnswer = keyMatch[2].toUpperCase();
    } else if (expMatch) {
      if (currentQuestion) {
        currentQuestion.explanation = expMatch[2].trim();
        let j = i + 1;
        while (j < lines.length) {
          const nextLine = lines[j];
          if (nextLine.match(/^\d+\./) || nextLine.match(/^[A-E]\./i) || nextLine.match(/^(Kunci|Pembahasan)\s*:/i)) break;
          currentQuestion.explanation += '\n' + nextLine;
          i = j; j++;
        }
      }
    } else if (qNumMatch) {
      if (currentQuestion) questions.push(currentQuestion);
      currentQuestion = {
        id: 'imported_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        text: qNumMatch[2].trim(),
        options: [],
        correctAnswer: '',
        explanation: ''
      };
    } else {
      if (currentQuestion && currentQuestion.options.length === 0 && !currentQuestion.correctAnswer) {
        currentQuestion.text += '\n' + line;
      }
    }
  }

  if (currentQuestion) questions.push(currentQuestion);
  return questions.filter(q => q.text && q.options.length >= 2 && q.correctAnswer);
}

function importQuestionsToExam(newQuestions) {
  if (!selectedExamId) return;
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const examIdx = exams.findIndex(e => e.id === selectedExamId);
  if (examIdx !== -1) {
    exams[examIdx].questions = [...exams[examIdx].questions, ...newQuestions];
    localStorage.setItem("cbt_exams", JSON.stringify(exams));
    selectExam(selectedExamId);
    renderAdminStats();
  }
}

// =================== AI GENERATE SOAL ===================
function openAIGenerateModal() {
  const modal = document.getElementById("ai-generate-modal");
  if (modal) modal.classList.remove("hidden");
  refreshIcons();
}

function closeAIGenerateModal() {
  const modal = document.getElementById("ai-generate-modal");
  if (modal) modal.classList.add("hidden");
  const output = document.getElementById("ai-result-preview");
  if (output) output.innerHTML = "";
}

function generateAIQuestions() {
  const topic = document.getElementById("ai-topic-input").value.trim();
  const count = parseInt(document.getElementById("ai-count-input").value) || 3;
  const difficulty = document.getElementById("ai-difficulty-select").value;

  if (!topic) { alert("Masukkan topik soal terlebih dahulu!"); return; }
  if (!selectedExamId) { alert("Pilih paket ujian terlebih dahulu!"); closeAIGenerateModal(); return; }

  const statusEl = document.getElementById("ai-generate-status");
  if (statusEl) {
    statusEl.innerHTML = `<div class="ai-loading-state"><i data-lucide="loader" style="width:20px;height:20px;"></i> Menghasilkan ${count} soal tentang "${topic}"...</div>`;
    refreshIcons();
  }

  // Simulasi AI (template soal realistis)
  setTimeout(() => {
    const generated = generateSimulatedQuestions(topic, count, difficulty);
    const preview = document.getElementById("ai-result-preview");
    if (preview) {
      preview.innerHTML = `
        <div style="border-top: 1px solid var(--border-color); padding-top: 15px; margin-top: 10px;">
          <strong style="color: #10b981; font-size: 0.85rem;">✓ ${generated.length} soal berhasil dibuat! Pratinjau:</strong>
          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 10px; max-height: 300px; overflow-y: auto;">
            ${generated.map((q, i) => `
              <div style="background: var(--bg-card); border-radius: 12px; padding: 12px; border: 1px solid var(--border-color);">
                <strong style="font-size: 0.78rem; color: var(--text-muted);">Soal ${i + 1}</strong>
                <p style="margin: 6px 0; font-size: 0.88rem;">${q.text}</p>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${q.options.map(opt => `<span style="font-size:0.75rem; padding:2px 8px; border-radius:6px; background:${opt.key === q.correctAnswer ? 'rgba(16,185,129,0.15)' : 'rgba(0,0,0,0.05)'}; font-weight:${opt.key === q.correctAnswer ? '700' : '400'};">${opt.key}. ${opt.text}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; gap: 10px; margin-top: 15px; justify-content: flex-end;">
            <button class="btn-clay-neutral" onclick="closeAIGenerateModal()" style="cursor:pointer;">Batal</button>
            <button class="btn-clay-primary" onclick="importAIQuestions()" style="cursor:pointer;">
              <i data-lucide="check-circle" style="width:14px;height:14px;"></i> Impor ${generated.length} Soal ke Ujian
            </button>
          </div>
        </div>
      `;
      window._pendingAIQuestions = generated;
    }
    if (statusEl) statusEl.innerHTML = "";
    refreshIcons();
  }, 1800);
}

function generateSimulatedQuestions(topic, count, difficulty) {
  const templates = [
    {
      text: `Manakah pernyataan yang BENAR tentang ${topic}?`,
      options: [
        { key: "A", text: `${topic} adalah konsep fundamental dalam ilmu pengetahuan.` },
        { key: "B", text: `${topic} tidak memiliki penerapan dalam kehidupan sehari-hari.` },
        { key: "C", text: `${topic} hanya dipelajari di tingkat perguruan tinggi.` },
        { key: "D", text: `${topic} merupakan teori yang sudah usang.` },
        { key: "E", text: `${topic} tidak berhubungan dengan bidang sains.` }
      ],
      correctAnswer: "A",
      explanation: `${topic} merupakan konsep fundamental yang memiliki banyak penerapan dalam kehidupan sehari-hari dan terus dikembangkan di berbagai bidang ilmu pengetahuan.`
    },
    {
      text: `Apa yang dimaksud dengan "${topic}" dalam konteks pembelajaran?`,
      options: [
        { key: "A", text: "Suatu proses yang tidak terstruktur" },
        { key: "B", text: "Metode pengajaran tradisional" },
        { key: "C", text: `Pemahaman mendalam tentang ${topic} beserta aplikasinya` },
        { key: "D", text: "Hafalan tanpa pemahaman" },
        { key: "E", text: "Proses yang hanya dilakukan sekali" }
      ],
      correctAnswer: "C",
      explanation: `Dalam konteks pembelajaran, ${topic} mengacu pada pemahaman mendalam yang melibatkan konsep, prinsip, dan penerapannya secara komprehensif.`
    },
    {
      text: `Berikut ini merupakan contoh penerapan ${topic} dalam kehidupan nyata, KECUALI...`,
      options: [
        { key: "A", text: "Penggunaan dalam industri modern" },
        { key: "B", text: "Penerapan di bidang teknologi" },
        { key: "C", text: "Aplikasi dalam penelitian ilmiah" },
        { key: "D", text: "Tidak ditemukan dalam kehidupan sehari-hari" },
        { key: "E", text: "Digunakan dalam pendidikan" }
      ],
      correctAnswer: "D",
      explanation: `${topic} memiliki banyak penerapan nyata dalam kehidupan sehari-hari, industri, teknologi, dan penelitian. Pilihan D adalah pernyataan yang salah.`
    },
    {
      text: `Tingkat kesulitan "${difficulty}" dari materi ${topic} menunjukkan bahwa...`,
      options: [
        { key: "A", text: `Materi ${topic} memerlukan pemahaman mendalam dan analisis kritis.` },
        { key: "B", text: "Materi ini dapat dipahami tanpa belajar." },
        { key: "C", text: "Materi ini tidak penting untuk dikuasai." },
        { key: "D", text: "Materi hanya diperlukan untuk ujian saja." },
        { key: "E", text: "Materi ini tidak ada hubungannya dengan ilmu lain." }
      ],
      correctAnswer: "A",
      explanation: `Tingkat kesulitan ${difficulty} menunjukkan bahwa diperlukan pemahaman mendalam, analisis, dan kemampuan berpikir kritis untuk menguasai materi ${topic}.`
    },
    {
      text: `Dalam mempelajari ${topic}, langkah manakah yang paling tepat dilakukan pertama kali?`,
      options: [
        { key: "A", text: "Langsung mengerjakan soal latihan tanpa memahami konsep." },
        { key: "B", text: "Memahami definisi dan konsep dasar terlebih dahulu." },
        { key: "C", text: "Menghafal rumus tanpa memahami penggunaannya." },
        { key: "D", text: "Mengabaikan materi prasyarat yang belum dikuasai." },
        { key: "E", text: "Belajar secara acak tanpa urutan yang jelas." }
      ],
      correctAnswer: "B",
      explanation: `Dalam mempelajari ${topic}, langkah pertama yang tepat adalah memahami definisi dan konsep dasar. Pemahaman konsep yang kuat adalah pondasi untuk menguasai materi lebih lanjut.`
    }
  ];

  return Array.from({ length: Math.min(count, templates.length) }, (_, i) => ({
    ...templates[i],
    id: 'ai_' + Date.now() + '_' + i
  }));
}

function importAIQuestions() {
  if (!window._pendingAIQuestions || window._pendingAIQuestions.length === 0) return;
  importQuestionsToExam(window._pendingAIQuestions);
  window._pendingAIQuestions = null;
  closeAIGenerateModal();
  alert("Soal AI berhasil diimpor ke paket ujian!");
}

// =================== TAMBAH PAKET UJIAN ===================
function createNewExamPackage(event) {
  event.preventDefault();
  const subject = document.getElementById("new-exam-subject").value.trim().toUpperCase();
  const title = document.getElementById("new-exam-title").value.trim();
  const duration = parseInt(document.getElementById("new-exam-duration").value);
  const kkm = parseInt(document.getElementById("new-exam-kkm").value);

  if (!subject || !title || isNaN(duration) || duration <= 0 || isNaN(kkm)) {
    alert("Harap lengkapi semua input data!");
    return;
  }

  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const newExam = {
    id: "exam-" + Date.now(),
    title, subject, duration, kkm,
    status: "NONAKTIF",
    createdBy: window.currentTeacherId || "admin",
    questions: []
  };

  exams.push(newExam);
  localStorage.setItem("cbt_exams", JSON.stringify(exams));
  closeAddExamModal();
  renderAdminExamList();
  renderAdminStats();
  selectExam(newExam.id);
}

function confirmDeleteExam(examId) {
  if (confirm("Hapus paket ujian ini beserta seluruh soal di dalamnya?")) {
    const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
    localStorage.setItem("cbt_exams", JSON.stringify(exams.filter(e => e.id !== examId)));
    if (selectedExamId === examId) showEmptyState();
    renderAdminExamList();
    renderAdminStats();
  }
}

function confirmDeleteQuestion(qId) {
  if (confirm("Hapus soal ini?")) {
    const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
    const examIdx = exams.findIndex(e => e.id === selectedExamId);
    if (examIdx !== -1) {
      exams[examIdx].questions = exams[examIdx].questions.filter(q => q.id !== qId);
      localStorage.setItem("cbt_exams", JSON.stringify(exams));
      selectExam(selectedExamId);
      renderAdminStats();
    }
  }
}

// =================== MODAL SOAL ===================
let editingQuestionId = null;

function openAddQuestionModal() {
  editingQuestionId = null;
  document.getElementById("q-modal-title").innerText = "Tambah Soal Baru";
  ["q-text-input", "q-opt-A", "q-opt-B", "q-opt-C", "q-opt-D", "q-opt-E", "q-explanation-input"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("q-correct-answer").value = "A";
  document.getElementById("question-modal").classList.remove("hidden");
  refreshIcons();
}

function openEditQuestionModal(qId) {
  editingQuestionId = qId;
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const exam = exams.find(e => e.id === selectedExamId);
  const q = exam && exam.questions.find(quest => quest.id === qId);
  if (!q) return;

  document.getElementById("q-modal-title").innerText = "Edit Soal";
  document.getElementById("q-text-input").value = q.text;
  ["A", "B", "C", "D", "E"].forEach(key => {
    document.getElementById(`q-opt-${key}`).value = q.options.find(o => o.key === key)?.text || "";
  });
  document.getElementById("q-correct-answer").value = q.correctAnswer;
  document.getElementById("q-explanation-input").value = q.explanation || "";
  document.getElementById("question-modal").classList.remove("hidden");
  refreshIcons();
}

function closeQuestionModal() {
  document.getElementById("question-modal").classList.add("hidden");
  editingQuestionId = null;
}

function saveQuestionForm(event) {
  event.preventDefault();
  const text = document.getElementById("q-text-input").value.trim();
  const opts = ["A", "B", "C", "D", "E"].map(k => ({ key: k, text: document.getElementById(`q-opt-${k}`).value.trim() }));
  const correctAnswer = document.getElementById("q-correct-answer").value;
  const explanation = document.getElementById("q-explanation-input").value.trim();

  if (!text || opts.some(o => !o.text)) {
    alert("Harap lengkapi pertanyaan dan semua 5 pilihan ganda!");
    return;
  }

  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const examIdx = exams.findIndex(e => e.id === selectedExamId);
  if (examIdx !== -1) {
    const qObj = { id: editingQuestionId || "manual_" + Date.now(), text, options: opts, correctAnswer, explanation };
    if (editingQuestionId) {
      const qIdx = exams[examIdx].questions.findIndex(q => q.id === editingQuestionId);
      if (qIdx !== -1) exams[examIdx].questions[qIdx] = qObj;
    } else {
      exams[examIdx].questions.push(qObj);
    }
    localStorage.setItem("cbt_exams", JSON.stringify(exams));
    closeQuestionModal();
    selectExam(selectedExamId);
    renderAdminStats();
  }
}

function openAddExamModal() {
  document.getElementById("add-exam-modal").classList.remove("hidden");
  refreshIcons();
}

function closeAddExamModal() {
  document.getElementById("add-exam-modal").classList.add("hidden");
  document.getElementById("add-exam-form").reset();
}

// =================== TAB: KELOLA GURU ===================
let editingTeacherId = null;

function renderTeachersList() {
  const teachers = JSON.parse(localStorage.getItem("cbt_teachers")) || [];
  const tbody = document.getElementById("teachers-table-body");
  if (!tbody) return;

  if (teachers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:20px;">Belum ada guru terdaftar.</td></tr>`;
    return;
  }

  tbody.innerHTML = teachers.map((t, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${t.name}</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">${t.nip || '-'}</span></td>
      <td><span class="subject-badge">${t.subject}</span></td>
      <td><code style="background:var(--bg-input); padding:2px 8px; border-radius:6px; font-size:0.8rem;">${t.username}</code></td>
      <td><code style="background:var(--bg-input); padding:2px 8px; border-radius:6px; font-size:0.8rem;">${t.password || '-'}</code></td>
      <td>
        <div style="display:flex; gap:6px; align-items:center;">
          <button class="btn-delete-item" onclick="openEditTeacherModal('${t.id}')" title="Edit Guru">
            <i data-lucide="edit-3" style="width: 14px; height: 14px; color: #3b82f6;"></i>
          </button>
          <button class="btn-delete-item" onclick="deleteTeacher('${t.id}')" title="Hapus Guru">
            <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #ef4444;"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  refreshIcons();
}

function openAddTeacherModal() {
  editingTeacherId = null;
  document.getElementById("teacher-modal-title").innerText = "Tambah Guru Baru";
  document.getElementById("add-teacher-form").reset();
  document.getElementById("add-teacher-modal").classList.remove("hidden");
  refreshIcons();
}

function closeAddTeacherModal() {
  document.getElementById("add-teacher-modal").classList.add("hidden");
  document.getElementById("add-teacher-form").reset();
  editingTeacherId = null;
}

function saveTeacherForm(event) {
  event.preventDefault();
  const nip = document.getElementById("teacher-nip").value.trim();
  const name = document.getElementById("teacher-name").value.trim();
  const subject = document.getElementById("teacher-subject").value.trim();
  const username = document.getElementById("teacher-username").value.trim();
  const password = document.getElementById("teacher-password").value.trim();

  if (!name || !subject || !username || !password) {
    alert("Harap lengkapi semua field yang wajib diisi!");
    return;
  }

  const teachers = JSON.parse(localStorage.getItem("cbt_teachers")) || [];

  if (editingTeacherId) {
    // Mode edit
    const idx = teachers.findIndex(t => t.id === editingTeacherId);
    if (idx !== -1) {
      teachers[idx] = { ...teachers[idx], nip, name, subject, username, password };
    }
    editingTeacherId = null;
  } else {
    // Mode tambah
    teachers.push({ id: "teacher-" + Date.now(), nip, name, subject, username, password });
  }

  localStorage.setItem("cbt_teachers", JSON.stringify(teachers));
  closeAddTeacherModal();
  renderTeachersList();
}

function openEditTeacherModal(tId) {
  const teachers = JSON.parse(localStorage.getItem("cbt_teachers")) || [];
  const t = teachers.find(tr => tr.id === tId);
  if (!t) return;

  editingTeacherId = tId;
  document.getElementById("teacher-modal-title").innerText = "Edit Data Guru";
  document.getElementById("teacher-name").value = t.name;
  document.getElementById("teacher-subject").value = t.subject;
  document.getElementById("teacher-nip").value = t.nip || "";
  document.getElementById("teacher-username").value = t.username || "";
  document.getElementById("teacher-password").value = t.password || "";
  document.getElementById("add-teacher-modal").classList.remove("hidden");
  refreshIcons();
}

function deleteTeacher(tId) {
  if (confirm("Hapus data guru ini? Guru tidak bisa login setelah dihapus.")) {
    let teachers = JSON.parse(localStorage.getItem("cbt_teachers")) || [];
    localStorage.setItem("cbt_teachers", JSON.stringify(teachers.filter(t => t.id !== tId)));
    renderTeachersList();
  }
}

// =================== TAB: KELOLA SISWA ===================
let studentSearchQuery = "";

function renderStudentsList(filterQuery) {
  let students = JSON.parse(localStorage.getItem("cbt_students")) || [];
  const tbody = document.getElementById("students-table-body");
  if (!tbody) return;

  if (filterQuery !== undefined) studentSearchQuery = filterQuery.toLowerCase();

  if (studentSearchQuery) {
    students = students.filter(s =>
      s.name.toLowerCase().includes(studentSearchQuery) ||
      (s.username || "").toLowerCase().includes(studentSearchQuery) ||
      (s.subject || "").toLowerCase().includes(studentSearchQuery)
    );
  }

  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:20px;">${studentSearchQuery ? 'Tidak ada siswa yang cocok dengan pencarian.' : 'Belum ada siswa terdaftar.'}</td></tr>`;
    return;
  }

  tbody.innerHTML = students.map((s, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${s.name}</strong></td>
      <td>
        <span class="subject-badge">${s.subject || '-'}</span>
      </td>
      <td>
        <code style="background:var(--bg-input); padding:2px 8px; border-radius:6px; font-size:0.8rem;">${s.username || s.nisn || '-'}</code>
      </td>
      <td>
        <code style="background:var(--bg-input); padding:2px 8px; border-radius:6px; font-size:0.8rem;">${s.password || '-'}</code>
      </td>
      <td>
        <div style="display:flex; gap:6px; align-items:center;">
          <button class="btn-delete-item" onclick="openEditStudentModal('${s.id}')" title="Edit Siswa">
            <i data-lucide="edit-3" style="width: 14px; height: 14px; color: #3b82f6;"></i>
          </button>
          <button class="btn-delete-item" onclick="deleteStudent('${s.id}')" title="Hapus Siswa">
            <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #ef4444;"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  refreshIcons();
}

let editingStudentId = null;

function openAddStudentModal() {
  editingStudentId = null;
  document.getElementById("student-modal-title").innerText = "Tambah Siswa Baru";
  document.getElementById("add-student-form").reset();
  document.getElementById("add-student-modal").classList.remove("hidden");
  refreshIcons();
}

function closeAddStudentModal() {
  document.getElementById("add-student-modal").classList.add("hidden");
  document.getElementById("add-student-form").reset();
  editingStudentId = null;
}

function saveStudentForm(event) {
  event.preventDefault();
  const name = document.getElementById("student-name").value.trim();
  const subject = document.getElementById("student-subject-input").value.trim();
  const username = document.getElementById("student-username").value.trim();
  const password = document.getElementById("student-password").value.trim();

  if (!name || !subject || !username || !password) {
    alert("Harap lengkapi semua data siswa!");
    return;
  }

  const students = JSON.parse(localStorage.getItem("cbt_students")) || [];

  if (editingStudentId) {
    // Mode edit
    const idx = students.findIndex(s => s.id === editingStudentId);
    if (idx !== -1) {
      students[idx] = { ...students[idx], name, subject, username, password };
    }
    editingStudentId = null;
  } else {
    // Mode tambah
    students.push({ id: "student-" + Date.now(), name, subject, username, password });
  }

  localStorage.setItem("cbt_students", JSON.stringify(students));
  closeAddStudentModal();
  renderStudentsList();
}

function openEditStudentModal(sId) {
  const students = JSON.parse(localStorage.getItem("cbt_students")) || [];
  const s = students.find(st => st.id === sId);
  if (!s) return;

  editingStudentId = sId;
  document.getElementById("student-modal-title").innerText = "Edit Data Siswa";
  document.getElementById("student-name").value = s.name;
  document.getElementById("student-subject-input").value = s.subject || "";
  document.getElementById("student-username").value = s.username || s.nisn || "";
  document.getElementById("student-password").value = s.password || "";
  document.getElementById("add-student-modal").classList.remove("hidden");
  refreshIcons();
}

function deleteStudent(sId) {
  if (confirm("Hapus data siswa ini?")) {
    let students = JSON.parse(localStorage.getItem("cbt_students")) || [];
    localStorage.setItem("cbt_students", JSON.stringify(students.filter(s => s.id !== sId)));
    renderStudentsList();
  }
}

// Download Template CSV Siswa
function downloadStudentTemplate() {
  const csvContent = "data:text/csv;charset=utf-8,Nama Lengkap,Mata Pelajaran,Username,Password\nAhmad Contoh,Matematika,ahmad.contoh,siswa123\nSiti Contoh,Bahasa Indonesia,siti.contoh,siswa123\n";
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "template_import_siswa.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Import CSV/XLS Siswa
function handleStudentCSVImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length <= 1) { alert("File CSV kosong atau hanya berisi header!"); return; }

    const students = JSON.parse(localStorage.getItem("cbt_students")) || [];
    let importedCount = 0;
    let skippedCount = 0;

    // Skip header baris pertama
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length < 4) { skippedCount++; continue; }
      const [name, subject, username, password] = cols;
      if (!name || !username) { skippedCount++; continue; }
      students.push({ id: "student-" + Date.now() + '_' + i, name, subject, username, password: password || 'siswa123' });
      importedCount++;
    }

    localStorage.setItem("cbt_students", JSON.stringify(students));
    alert(`Import selesai!\n✓ Berhasil: ${importedCount} siswa\n✗ Dilewati (tidak lengkap): ${skippedCount} data`);
    renderStudentsList();
    event.target.value = ""; // Reset input file
  };

  reader.readAsText(file);
}

// =================== TAB: HASIL UJIAN ===================
let resultsFilterExamId = "";
let resultsSearchQuery = "";

function renderResultsList() {
  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];

  // Populate dropdown filter paket ujian jika belum ada
  const filterSelect = document.getElementById("results-filter-exam");
  if (filterSelect && filterSelect.options.length <= 1) {
    exams.forEach(ex => {
      const opt = document.createElement("option");
      opt.value = ex.id;
      opt.text = ex.title;
      filterSelect.appendChild(opt);
    });
  }

  let filtered = [...results];
  if (resultsFilterExamId) {
    filtered = filtered.filter(r => r.examId === resultsFilterExamId);
  }
  if (resultsSearchQuery) {
    filtered = filtered.filter(r =>
      r.studentName.toLowerCase().includes(resultsSearchQuery) ||
      (r.nisn || "").toLowerCase().includes(resultsSearchQuery)
    );
  }

  const tbody = document.getElementById("results-table-body");
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:20px;">Tidak ada data hasil ujian yang sesuai filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((r, idx) => {
    const exam = exams.find(e => e.id === r.examId);
    const kkm = exam ? (exam.kkm || 65) : 65;
    const isPass = r.score >= kkm;
    const formattedDate = new Date(r.date).toLocaleString("id-ID", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });

    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${r.studentName}</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">(${r.nisn || '-'})</span></td>
        <td>${r.examTitle}</td>
        <td>${formattedDate}</td>
        <td><span class="badge-score ${isPass ? 'pass' : 'fail'}">${r.score}% (KKM: ${kkm})</span></td>
        <td>
          <button class="btn-delete-item" onclick="deleteResult('${r.id}')" title="Hapus Log">
            <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #ef4444;"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  refreshIcons();
}

function filterResultsByExam(examId) {
  resultsFilterExamId = examId;
  renderResultsList();
}

function searchResults(query) {
  resultsSearchQuery = query.toLowerCase();
  renderResultsList();
}

function deleteResult(resId) {
  if (confirm("Hapus log hasil pengerjaan ini?")) {
    let results = JSON.parse(localStorage.getItem("cbt_results")) || [];
    localStorage.setItem("cbt_results", JSON.stringify(results.filter(r => r.id !== resId)));
    renderResultsList();
    renderAdminStats();
  }
}

function exportResultsToCSV() {
  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];
  let filtered = [...results];

  if (resultsFilterExamId) {
    filtered = filtered.filter(r => r.examId === resultsFilterExamId);
  }

  if (filtered.length === 0) {
    alert("Tidak ada data hasil ujian untuk diekspor!");
    return;
  }

  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const selectedExam = exams.find(e => e.id === resultsFilterExamId);
  const fileName = selectedExam
    ? `Hasil_Ujian_${selectedExam.title.replace(/\s/g, '_')}`
    : "Hasil_Ujian_Semua_Paket";

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "No,Nama Siswa,Username/NISN,Paket Ujian,Waktu Pengerjaan,Skor Akhir,Status\n";

  filtered.forEach((r, idx) => {
    const exam = exams.find(e => e.id === r.examId);
    const kkm = exam ? (exam.kkm || 65) : 65;
    const status = r.score >= kkm ? "LULUS" : "TIDAK LULUS";
    const row = [
      idx + 1,
      `"${r.studentName}"`,
      `"${r.nisn || '-'}"`,
      `"${r.examTitle}"`,
      `"${new Date(r.date).toLocaleString('id-ID')}"`,
      `"${r.score}%"`,
      `"${status}"`
    ].join(",");
    csvContent += row + "\n";
  });

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", fileName + "_" + Date.now() + ".csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// =================== INISIALISASI PANEL GURU ===================
function initTeacherPanel(teacherSubject) {
  renderTeacherStats(teacherSubject);
  setupTeacherTabEvents(teacherSubject);
  renderTeacherExamList(teacherSubject);
  renderTeacherStudentList(teacherSubject);
  renderTeacherResultsList(teacherSubject);
}

function renderTeacherStats(subject) {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];
  const students = JSON.parse(localStorage.getItem("cbt_students")) || [];

  const myExams = exams.filter(e => e.subject.toUpperCase() === subject.toUpperCase() || (e.subject.toUpperCase().includes(subject.toUpperCase())));
  const myStudents = students.filter(s => (s.subject || "").toLowerCase() === subject.toLowerCase());
  const myResults = results.filter(r => myExams.some(e => e.id === r.examId));

  const statEls = {
    "teacher-stat-exams": myExams.length,
    "teacher-stat-students": myStudents.length,
    "teacher-stat-results": myResults.length
  };

  Object.entries(statEls).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  });

  const avgEl = document.getElementById("teacher-stat-avg");
  if (avgEl && myResults.length > 0) {
    const avg = Math.round(myResults.reduce((acc, r) => acc + r.score, 0) / myResults.length);
    avgEl.innerText = avg + "%";
  } else if (avgEl) {
    avgEl.innerText = "0%";
  }
}

function setupTeacherTabEvents(teacherSubject) {
  const tabs = document.querySelectorAll(".teacher-tab-btn[data-teacher-tab]");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      ["teacher-tab-exams", "teacher-tab-students", "teacher-tab-results"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
      });

      const targetTab = tab.getAttribute("data-teacher-tab");
      if (targetTab === "exams") {
        document.getElementById("teacher-tab-exams").classList.remove("hidden");
        renderTeacherExamList(teacherSubject);
      } else if (targetTab === "students") {
        document.getElementById("teacher-tab-students").classList.remove("hidden");
        renderTeacherStudentList(teacherSubject);
      } else if (targetTab === "results") {
        document.getElementById("teacher-tab-results").classList.remove("hidden");
        renderTeacherResultsList(teacherSubject);
      }

      refreshIcons();
    });
  });
}

function renderTeacherExamList(teacherSubject) {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const myExams = exams.filter(e =>
    e.subject.toUpperCase().includes(teacherSubject.toUpperCase()) ||
    teacherSubject.toUpperCase().includes(e.subject.toUpperCase())
  );

  const container = document.getElementById("teacher-exam-list-container");
  if (!container) return;

  if (myExams.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:30px;">Belum ada paket ujian untuk mata pelajaran Anda.</p>`;
    return;
  }

  container.innerHTML = `
    <div style="padding: 20px 25px; display: flex; flex-direction: column; gap: 15px;">
      ${myExams.map(exam => `
        <div class="exam-item-card" style="box-shadow: var(--nm-outset-shadow);">
          <span class="exam-item-badge">${exam.subject}</span>
          <div class="exam-item-title">${exam.title}</div>
          <div class="exam-item-info-row">
            <div class="exam-item-meta">
              <i data-lucide="clock" style="width:13px;height:13px;margin-right:3px;display:inline;vertical-align:middle;"></i> ${exam.duration} Menit
              <span style="color:var(--text-light);margin:0 4px;">•</span>
              <i data-lucide="help-circle" style="width:13px;height:13px;margin-right:3px;display:inline;vertical-align:middle;"></i> ${exam.questions.length} Soal
            </div>
            <span class="status-active-badge ${exam.status === 'AKTIF' ? '' : 'hidden'}">
              <i data-lucide="eye" style="width:12px;height:12px;"></i> ${exam.status}
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  refreshIcons();
}

function renderTeacherStudentList(teacherSubject) {
  const students = JSON.parse(localStorage.getItem("cbt_students")) || [];
  const myStudents = students.filter(s => (s.subject || "").toLowerCase() === teacherSubject.toLowerCase());

  const container = document.getElementById("teacher-students-container");
  if (!container) return;

  if (myStudents.length === 0) {
    container.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:20px;">Tidak ada siswa untuk mata pelajaran ini.</td></tr>`;
    return;
  }

  container.innerHTML = myStudents.map((s, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${s.name}</strong></td>
      <td><span class="subject-badge">${s.subject || '-'}</span></td>
      <td><code style="background:var(--bg-input); padding:2px 8px; border-radius:6px; font-size:0.8rem;">${s.username || s.nisn || '-'}</code></td>
    </tr>
  `).join('');

  refreshIcons();
}

function renderTeacherResultsList(teacherSubject) {
  const exams = JSON.parse(localStorage.getItem("cbt_exams")) || [];
  const results = JSON.parse(localStorage.getItem("cbt_results")) || [];
  const myExams = exams.filter(e => e.subject.toUpperCase().includes(teacherSubject.toUpperCase()));
  const myResults = results.filter(r => myExams.some(e => e.id === r.examId));

  const tbody = document.getElementById("teacher-results-body");
  if (!tbody) return;

  if (myResults.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:20px;">Belum ada hasil ujian untuk mata pelajaran ini.</td></tr>`;
    return;
  }

  tbody.innerHTML = myResults.map((r, idx) => {
    const exam = myExams.find(e => e.id === r.examId);
    const kkm = exam ? (exam.kkm || 65) : 65;
    const isPass = r.score >= kkm;
    const date = new Date(r.date).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${r.studentName}</strong></td>
        <td>${r.examTitle}</td>
        <td>${date}</td>
        <td><span class="badge-score ${isPass ? 'pass' : 'fail'}">${r.score}% (KKM: ${kkm})</span></td>
      </tr>
    `;
  }).join('');

  refreshIcons();
}

// =================== EXPOSE GLOBALS ===================
window.initAdminPanel = initAdminPanel;
window.renderAdminStats = renderAdminStats;
window.setupAdminTabEvents = setupAdminTabEvents;
window.showEmptyState = showEmptyState;
window.renderAdminExamList = renderAdminExamList;
window.selectExam = selectExam;
window.renderAdminQuestions = renderAdminQuestions;
window.saveExamConfig = saveExamConfig;
window.handleWordFileUpload = handleWordFileUpload;
window.parseWordContent = parseWordContent;
window.importQuestionsToExam = importQuestionsToExam;
window.createNewExamPackage = createNewExamPackage;
window.confirmDeleteExam = confirmDeleteExam;
window.confirmDeleteQuestion = confirmDeleteQuestion;
window.openAddQuestionModal = openAddQuestionModal;
window.openEditQuestionModal = openEditQuestionModal;
window.closeQuestionModal = closeQuestionModal;
window.saveQuestionForm = saveQuestionForm;
window.openAddExamModal = openAddExamModal;
window.closeAddExamModal = closeAddExamModal;
window.openAddTeacherModal = openAddTeacherModal;
window.closeAddTeacherModal = closeAddTeacherModal;
window.saveTeacherForm = saveTeacherForm;
window.deleteTeacher = deleteTeacher;
window.openEditTeacherModal = openEditTeacherModal;
window.renderTeachersList = renderTeachersList;
window.openAddStudentModal = openAddStudentModal;
window.closeAddStudentModal = closeAddStudentModal;
window.saveStudentForm = saveStudentForm;
window.openEditStudentModal = openEditStudentModal;
window.deleteStudent = deleteStudent;
window.renderStudentsList = renderStudentsList;
window.downloadStudentTemplate = downloadStudentTemplate;
window.handleStudentCSVImport = handleStudentCSVImport;
window.renderResultsList = renderResultsList;
window.filterResultsByExam = filterResultsByExam;
window.searchResults = searchResults;
window.deleteResult = deleteResult;
window.exportResultsToCSV = exportResultsToCSV;
window.toggleQuestionSelection = toggleQuestionSelection;
window.toggleSelectAllQuestions = toggleSelectAllQuestions;
window.deleteSelectedQuestions = deleteSelectedQuestions;
window.openAIGenerateModal = openAIGenerateModal;
window.closeAIGenerateModal = closeAIGenerateModal;
window.generateAIQuestions = generateAIQuestions;
window.importAIQuestions = importAIQuestions;
window.initTeacherPanel = initTeacherPanel;
window.renderTeacherStats = renderTeacherStats;
window.renderTeacherExamList = renderTeacherExamList;
window.renderTeacherStudentList = renderTeacherStudentList;
window.renderTeacherResultsList = renderTeacherResultsList;
