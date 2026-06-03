(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const J=[{id:"exam-1",title:"Penilaian Akhir Semester - Matematika Dasar",subject:"MATEMATIKA",duration:15,kkm:65,status:"AKTIF",questions:[{id:"q1_1",text:"Jika 3x + 7 = 22, berapakah nilai x?",options:[{key:"A",text:"3"},{key:"B",text:"4"},{key:"C",text:"5"},{key:"D",text:"6"},{key:"E",text:"7"}],correctAnswer:"C",explanation:`Kurangi kedua sisi dengan 7:
3x = 22 - 7
3x = 15

Bagi kedua sisi dengan 3:
x = 15 / 3
x = 5.`},{id:"q1_2",text:"Berapakah hasil dari 25% dari 200?",options:[{key:"A",text:"25"},{key:"B",text:"40"},{key:"C",text:"50"},{key:"D",text:"60"},{key:"E",text:"75"}],correctAnswer:"C",explanation:`Persentase dihitung dengan rumus:
(Persen / 100) * Nilai

(25 / 100) * 200 = 0.25 * 200 = 50.`},{id:"q1_3",text:"Berapakah nilai dari 2^5 (dua pangkat lima)?",options:[{key:"A",text:"10"},{key:"B",text:"16"},{key:"C",text:"25"},{key:"D",text:"32"},{key:"E",text:"64"}],correctAnswer:"D",explanation:`Perpangkatan adalah perkalian berulang:
2^5 = 2 * 2 * 2 * 2 * 2
2 * 2 = 4
4 * 2 = 8
8 * 2 = 16
16 * 2 = 32.`},{id:"q1_4",text:"Jika sebuah segitiga memiliki alas 10 cm dan tinggi 8 cm, berapakah luas segitiga tersebut?",options:[{key:"A",text:"20 cm²"},{key:"B",text:"40 cm²"},{key:"C",text:"80 cm²"},{key:"D",text:"100 cm²"},{key:"E",text:"160 cm²"}],correctAnswer:"B",explanation:`Rumus luas segitiga adalah:
Luas = 1/2 * alas * tinggi

Luas = 1/2 * 10 cm * 8 cm
Luas = 5 cm * 8 cm = 40 cm².`},{id:"q1_5",text:"Berapakah median dari data berikut: 3, 5, 7, 9, 11, 13, 15?",options:[{key:"A",text:"7"},{key:"B",text:"8"},{key:"C",text:"9"},{key:"D",text:"10"},{key:"E",text:"11"}],correctAnswer:"C",explanation:`Median adalah nilai tengah setelah data diurutkan.
Data: 3, 5, 7, 9, 11, 13, 15 (sudah berurutan).
Jumlah data (n) = 7 (ganjil).
Nilai tengah berada di posisi ke-(7 + 1) / 2 = data ke-4.
Data ke-4 adalah 9.`}]},{id:"exam-2",title:"Penilaian Harian - Tata Bahasa Indonesia",subject:"BAHASA INDONESIA",duration:10,kkm:70,status:"AKTIF",questions:[{id:"q2_1",text:"Manakah di bawah ini yang merupakan kalimat efektif dan hemat kata?",options:[{key:"A",text:"Bagi semua siswa-siswa diharapkan hadir tepat waktu."},{key:"B",text:"Semua siswa diharapkan hadir tepat waktu."},{key:"C",text:"Kehadiran daripada semua siswa sangat diharapkan."},{key:"D",text:"Untuk para siswa-siswi semuanya agar hadir tepat waktu."},{key:"E",text:"Diharapkan kehadiran siswa sekalian untuk hadir tepat waktu."}],correctAnswer:"B",explanation:`Kalimat efektif harus logis, hemat, dan memenuhi kaidah tata bahasa.
- Opsi A pemborosan kata ('bagi semua siswa-siswa').
- Opsi B sangat efektif dan lugas.
- Opsi C menggunakan kata hubung yang salah ('daripada').
- Opsi D pleonasme ('para siswa-siswi semuanya').
- Opsi E bertele-tele.`},{id:"q2_2",text:"Penulisan kata serapan yang benar sesuai PUEBI terdapat pada kalimat...",options:[{key:"A",text:"Apotik itu tutup sejak kemarin sore."},{key:"B",text:"Analisa data harus dilakukan dengan teliti."},{key:"C",text:"Sistem pembelajaran daring dinilai sangat efektif."},{key:"D",text:"Jadwal praktek dokter spesialis anak diubah."},{key:"E",text:"Kwitansi pembayaran kuliah harus disimpan."}],correctAnswer:"C",explanation:`Mari kita analisis kebahasaan masing-masing kata serapan:
- Apotik (salah) -> Apotek (baku)
- Analisa (salah) -> Analisis (baku)
- Sistem (benar/baku)
- Praktek (salah) -> Praktik (baku)
- Kwitansi (salah) -> Kuitansi (baku)

Maka penulisan kata serapan yang benar adalah pada kalimat C.`}]}];function P(){if(localStorage.getItem("cbt_exams")||localStorage.setItem("cbt_exams",JSON.stringify(J)),localStorage.getItem("cbt_admin_password")||localStorage.setItem("cbt_admin_password","admin123"),localStorage.getItem("cbt_admin_username")||localStorage.setItem("cbt_admin_username","admin"),!localStorage.getItem("cbt_teachers")){const a=[{id:"teacher-1",name:"Budi Santoso, S.Pd.",nip:"198005122005011002",subject:"Matematika"},{id:"teacher-2",name:"Siti Rahma, M.Pd.",nip:"198511232008122001",subject:"Bahasa Indonesia"}];localStorage.setItem("cbt_teachers",JSON.stringify(a))}if(!localStorage.getItem("cbt_students")){const a=[{id:"student-1",name:"Ahmad Dani",nisn:"0052345671",class:"XII MIPA 1"},{id:"student-2",name:"Citra Lestari",nisn:"0052345672",class:"XII MIPA 2"}];localStorage.setItem("cbt_students",JSON.stringify(a))}if(!localStorage.getItem("cbt_results")){const a=[{id:"res-1",studentName:"Ahmad Dani",nisn:"0052345671",examId:"exam-1",examTitle:"Penilaian Akhir Semester - Matematika Dasar",score:80,totalQuestions:5,correctAnswers:4,date:"2026-06-02T09:30:00Z",answers:{0:"C",1:"C",2:"D",3:"B",4:"A"}},{id:"res-2",studentName:"Citra Lestari",nisn:"0052345672",examId:"exam-2",examTitle:"Penilaian Harian - Tata Bahasa Indonesia",score:50,totalQuestions:2,correctAnswers:1,date:"2026-06-03T10:15:00Z",answers:{0:"B",1:"A"}}];localStorage.setItem("cbt_results",JSON.stringify(a))}}P();window.DEFAULT_EXAMS=J;window.initDatabase=P;let m=null;function Z(){b(),C(),T(),M(),_(),q(),O()}function b(){const a=JSON.parse(localStorage.getItem("cbt_exams"))||[],n=JSON.parse(localStorage.getItem("cbt_results"))||[];if(document.getElementById("stat-total-exams").innerText=a.length,document.getElementById("stat-total-attempts").innerText=n.length,n.length>0){const e=n.reduce((s,o)=>s+o.score,0),i=Math.round(e/n.length);document.getElementById("stat-average-score").innerText=i+"%"}else document.getElementById("stat-average-score").innerText="0%";const t=localStorage.getItem("cbt_admin_password")||"admin123";document.getElementById("stat-default-password").innerText=t}function C(){const a=document.querySelectorAll(".tab-nav-btn");a.forEach(n=>{n.addEventListener("click",()=>{a.forEach(e=>e.classList.remove("active")),n.classList.add("active"),document.getElementById("admin-tab-exams").classList.add("hidden"),document.getElementById("admin-tab-teachers").classList.add("hidden"),document.getElementById("admin-tab-students").classList.add("hidden"),document.getElementById("admin-tab-results").classList.add("hidden");const t=n.getAttribute("data-tab");t==="exams"?document.getElementById("admin-tab-exams").classList.remove("hidden"):t==="teachers"?(document.getElementById("admin-tab-teachers").classList.remove("hidden"),M()):t==="students"?(document.getElementById("admin-tab-students").classList.remove("hidden"),_()):t==="results"&&(document.getElementById("admin-tab-results").classList.remove("hidden"),q()),refreshIcons()})})}function O(){m=null;const a=document.getElementById("exam-detail-panel");a.innerHTML=`
    <div class="empty-state-view">
      <i data-lucide="book-open" style="width: 50px; height: 50px; stroke-width: 1.5; color: var(--text-light)"></i>
      <p>Silakan pilih atau tambahkan paket ujian di panel sebelah kiri untuk mulai mengelola atau mengundurkan soal-soal.</p>
    </div>
  `,refreshIcons()}function T(){const a=JSON.parse(localStorage.getItem("cbt_exams"))||[],n=document.getElementById("admin-exam-list");if(a.length===0){n.innerHTML='<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 20px;">Belum ada paket ujian terdaftar.</p>';return}n.innerHTML=a.map(t=>`
      <div class="exam-item-card ${m===t.id?"selected":""}" onclick="selectExam('${t.id}')">
        <span class="exam-item-badge">${t.subject}</span>
        <div class="exam-item-title">${t.title}</div>
        <div class="exam-item-info-row">
          <div class="exam-item-meta">
            <i data-lucide="clock" style="width: 13px; height: 13px; margin-right: 3px; display: inline-block; vertical-align: middle;"></i> ${t.duration} Menit
            <span style="color: var(--text-light); margin: 0 4px;">•</span>
            <i data-lucide="help-circle" style="width: 13px; height: 13px; margin-right: 3px; display: inline-block; vertical-align: middle;"></i> ${t.questions.length} Soal
          </div>
          <div class="exam-item-actions">
            <span class="status-active-badge ${t.status==="AKTIF"?"":"hidden"}">
              <i data-lucide="eye" style="width: 12px; height: 12px;"></i> ${t.status}
            </span>
            <button class="btn-delete-item" onclick="event.stopPropagation(); confirmDeleteExam('${t.id}')" title="Hapus Paket Ujian">
              <i data-lucide="trash-2" style="width: 15px; height: 15px;"></i>
            </button>
          </div>
        </div>
      </div>
    `).join(""),refreshIcons()}function N(a){m=a,T();const t=(JSON.parse(localStorage.getItem("cbt_exams"))||[]).find(i=>i.id===a);if(!t){O();return}const e=document.getElementById("exam-detail-panel");e.innerHTML=`
    <div class="right-scroll-container">
      <div class="detail-section-title">
        <span>Pengaturan Paket Ujian</span>
        <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">ID: ${t.id}</span>
      </div>
      
      <!-- Form Settings -->
      <div class="detail-grid-settings">
        <div class="form-group">
          <label>Mata Pelajaran</label>
          <input type="text" id="edit-exam-subject" class="form-input" value="${t.subject}" placeholder="Misal: MATEMATIKA">
        </div>
        <div class="form-group">
          <label>Judul Ujian</label>
          <input type="text" id="edit-exam-title" class="form-input" value="${t.title}" placeholder="Misal: Penilaian Akhir Semester">
        </div>
        <div class="form-group">
          <label>Durasi (Menit)</label>
          <input type="number" id="edit-exam-duration" class="form-input" value="${t.duration}" min="1">
        </div>
        <div class="form-group">
          <label>Kriteria Ketuntasan Minimal (KKM)</label>
          <input type="number" id="edit-exam-kkm" class="form-input" value="${t.kkm||65}" min="0" max="100">
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="edit-exam-status" class="form-input" style="height: 45px;">
            <option value="AKTIF" ${t.status==="AKTIF"?"selected":""}>AKTIF</option>
            <option value="NONAKTIF" ${t.status==="NONAKTIF"?"selected":""}>NONAKTIF</option>
          </select>
        </div>
        <div class="form-group" style="justify-content: flex-end;">
          <button class="btn-clay-primary" onclick="saveExamConfig()" style="height: 45px; justify-content: center; cursor: pointer;">
            <i data-lucide="save" style="width: 16px; height: 16px;"></i> Simpan Konfigurasi
          </button>
        </div>
      </div>

      <!-- Import Section -->
      <div class="detail-section-title">
        <span>Import Soal dari Microsoft Word (.docx)</span>
      </div>
      
      <div class="word-import-dropzone" onclick="document.getElementById('word-file-input').click()">
        <i data-lucide="file-text" style="width: 36px; height: 36px;"></i>
        <p>Klik di sini untuk mengunggah atau drag & drop file Word (.docx) soal Anda.</p>
        <div class="format-tip">Format soal: Pertanyaan ditulis baris baru, diikuti pilihan opsi (A., B., C., D., E.), lalu kunci jawaban (Kunci: [A-E]), dan penjelasan (Pembahasan: [Teks pembahasan]).</div>
        <input type="file" id="word-file-input" accept=".docx" style="display: none;" onchange="handleWordFileUpload(event)">
      </div>

      <!-- Questions Header -->
      <div class="detail-section-title">
        <span>Daftar Pertanyaan (${t.questions.length} Soal)</span>
        <button class="btn-add-exam" onclick="openAddQuestionModal()" style="background: var(--clay-success-bg); box-shadow: var(--clay-success-shadow); color: white; cursor: pointer;">
          <i data-lucide="plus-circle" style="width: 14px; height: 14px;"></i> Tambah Soal Manual
        </button>
      </div>

      <!-- Questions List -->
      <div class="admin-questions-list" style="display: flex; flex-direction: column; gap: 20px;">
        ${K(t.questions)}
      </div>
    </div>
  `,refreshIcons()}function K(a){return a.length===0?'<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 20px;">Belum ada soal terdaftar untuk paket ini. Gunakan fitur import Word atau tambah manual.</p>':a.map((n,t)=>`
      <div class="q-admin-card">
        <div class="q-admin-header">
          <span class="q-admin-no">SOAL NOMOR ${t+1}</span>
          <div style="display: flex; gap: 10px;">
            <button class="btn-delete-item" onclick="openEditQuestionModal('${n.id}')" title="Edit Soal">
              <i data-lucide="edit-3" style="width: 15px; height: 15px; color: #3b82f6;"></i>
            </button>
            <button class="btn-delete-item" onclick="confirmDeleteQuestion('${n.id}')" title="Hapus Soal">
              <i data-lucide="trash-2" style="width: 15px; height: 15px; color: #ef4444;"></i>
            </button>
          </div>
        </div>
        <div class="q-admin-text">${n.text}</div>
        <div class="q-admin-options-list">
          ${n.options.map(e=>`
            <div class="q-admin-option ${n.correctAnswer===e.key?"correct":""}">
              <strong>${e.key}.</strong> ${e.text}
            </div>
          `).join("")}
        </div>
        <div class="review-explanation-box">
          <label>Pembahasan Jawaban Benar:</label>
          <div class="q-admin-explanation">${n.explanation||"Tidak ada pembahasan."}</div>
        </div>
      </div>
    `).join("")}function Y(){if(!m)return;const a=document.getElementById("edit-exam-subject").value.trim(),n=document.getElementById("edit-exam-title").value.trim(),t=parseInt(document.getElementById("edit-exam-duration").value),e=parseInt(document.getElementById("edit-exam-kkm").value),i=document.getElementById("edit-exam-status").value;if(!a||!n||isNaN(t)||t<=0||isNaN(e)){alert("Harap isi semua input konfigurasi dengan benar!");return}const s=JSON.parse(localStorage.getItem("cbt_exams"))||[],o=s.findIndex(l=>l.id===m);o!==-1&&(s[o].subject=a.toUpperCase(),s[o].title=n,s[o].duration=t,s[o].kkm=e,s[o].status=i,localStorage.setItem("cbt_exams",JSON.stringify(s)),alert("Konfigurasi ujian berhasil disimpan!"),T(),b())}function ee(a){const n=a.target.files[0];if(!n)return;const t=new FileReader;t.onload=function(e){const i=e.target.result;mammoth.extractRawText({arrayBuffer:i}).then(function(s){const o=s.value,l=H(o);if(l.length===0){alert("Gagal membaca soal! Pastikan format file Word sesuai petunjuk.");return}confirm(`Berhasil memindai ${l.length} soal dari file Word. Apakah Anda yakin ingin mengimpor soal-soal ini ke dalam paket?`)&&Q(l)}).catch(function(s){console.error(s),alert("Eror saat membaca berkas Word: "+s.message)})},t.readAsArrayBuffer(n)}function H(a){const n=a.split(`
`).map(i=>i.trim()).filter(i=>i.length>0),t=[];let e=null;for(let i=0;i<n.length;i++){const s=n[i],o=s.match(/^([A-E])\.\s*(.*)/i),l=s.match(/^(Kunci|Kunci Jawaban|Answer)\s*:\s*([A-E])/i),g=s.match(/^(Pembahasan|Explanation)\s*:\s*(.*)/i),d=s.match(/^(\d+)\.\s*(.*)/);if(o)e&&e.options.push({key:o[1].toUpperCase(),text:o[2].trim()});else if(l)e&&(e.correctAnswer=l[2].toUpperCase());else if(g){if(e){e.explanation=g[2].trim();let p=i+1;for(;p<n.length;){const x=n[p];if(x.match(/^\d+\./)||x.match(/^[A-E]\./i)||x.match(/^(Kunci|Answer|Pembahasan|Explanation)\s*:/i))break;e.explanation+=`
`+x,i=p,p++}}}else d?(e&&t.push(e),e={id:"imported_"+Date.now()+"_"+Math.random().toString(36).substr(2,5),text:d[2].trim(),options:[],correctAnswer:"",explanation:""}):e&&e.options.length===0&&!e.correctAnswer&&(e.text+=`
`+s)}return e&&t.push(e),t.filter(i=>i.text&&i.options.length>=2&&i.correctAnswer)}function Q(a){if(!m)return;const n=JSON.parse(localStorage.getItem("cbt_exams"))||[],t=n.findIndex(e=>e.id===m);t!==-1&&(n[t].questions=[...n[t].questions,...a],localStorage.setItem("cbt_exams",JSON.stringify(n)),N(m),b())}function te(a){a.preventDefault();const n=document.getElementById("new-exam-subject").value.trim().toUpperCase(),t=document.getElementById("new-exam-title").value.trim(),e=parseInt(document.getElementById("new-exam-duration").value),i=parseInt(document.getElementById("new-exam-kkm").value);if(!n||!t||isNaN(e)||e<=0||isNaN(i)){alert("Harap lengkapi semua input data!");return}const s=JSON.parse(localStorage.getItem("cbt_exams"))||[],o={id:"exam-"+Date.now(),title:t,subject:n,duration:e,kkm:i,status:"NONAKTIF",questions:[]};s.push(o),localStorage.setItem("cbt_exams",JSON.stringify(s)),R(),T(),b(),N(o.id)}function ne(a){if(confirm("Apakah Anda yakin ingin menghapus paket ujian ini? Seluruh data soal di dalamnya akan terhapus secara permanen.")){const t=(JSON.parse(localStorage.getItem("cbt_exams"))||[]).filter(e=>e.id!==a);localStorage.setItem("cbt_exams",JSON.stringify(t)),m===a&&O(),T(),b()}}function ae(a){if(confirm("Hapus soal ini?")){const n=JSON.parse(localStorage.getItem("cbt_exams"))||[],t=n.findIndex(e=>e.id===m);t!==-1&&(n[t].questions=n[t].questions.filter(e=>e.id!==a),localStorage.setItem("cbt_exams",JSON.stringify(n)),N(m),b())}}let A=null;function ie(){A=null,document.getElementById("q-modal-title").innerText="Tambah Soal Baru",document.getElementById("q-text-input").value="",document.getElementById("q-opt-A").value="",document.getElementById("q-opt-B").value="",document.getElementById("q-opt-C").value="",document.getElementById("q-opt-D").value="",document.getElementById("q-opt-E").value="",document.getElementById("q-correct-answer").value="A",document.getElementById("q-explanation-input").value="",document.getElementById("question-modal").classList.remove("hidden"),refreshIcons()}function se(a){var i,s,o,l,g;A=a;const e=(JSON.parse(localStorage.getItem("cbt_exams"))||[]).find(d=>d.id===m).questions.find(d=>d.id===a);e&&(document.getElementById("q-modal-title").innerText="Edit Soal",document.getElementById("q-text-input").value=e.text,document.getElementById("q-opt-A").value=((i=e.options.find(d=>d.key==="A"))==null?void 0:i.text)||"",document.getElementById("q-opt-B").value=((s=e.options.find(d=>d.key==="B"))==null?void 0:s.text)||"",document.getElementById("q-opt-C").value=((o=e.options.find(d=>d.key==="C"))==null?void 0:o.text)||"",document.getElementById("q-opt-D").value=((l=e.options.find(d=>d.key==="D"))==null?void 0:l.text)||"",document.getElementById("q-opt-E").value=((g=e.options.find(d=>d.key==="E"))==null?void 0:g.text)||"",document.getElementById("q-correct-answer").value=e.correctAnswer,document.getElementById("q-explanation-input").value=e.explanation||"",document.getElementById("question-modal").classList.remove("hidden"),refreshIcons())}function F(){document.getElementById("question-modal").classList.add("hidden"),A=null}function oe(a){a.preventDefault();const n=document.getElementById("q-text-input").value.trim(),t=document.getElementById("q-opt-A").value.trim(),e=document.getElementById("q-opt-B").value.trim(),i=document.getElementById("q-opt-C").value.trim(),s=document.getElementById("q-opt-D").value.trim(),o=document.getElementById("q-opt-E").value.trim(),l=document.getElementById("q-correct-answer").value,g=document.getElementById("q-explanation-input").value.trim();if(!n||!t||!e||!i||!s||!o){alert("Harap lengkapi pertanyaan dan seluruh 5 pilihan ganda!");return}const d=JSON.parse(localStorage.getItem("cbt_exams"))||[],p=d.findIndex(x=>x.id===m);if(p!==-1){const x={id:A||"manual_"+Date.now(),text:n,options:[{key:"A",text:t},{key:"B",text:e},{key:"C",text:i},{key:"D",text:s},{key:"E",text:o}],correctAnswer:l,explanation:g};if(A){const S=d[p].questions.findIndex(B=>B.id===A);S!==-1&&(d[p].questions[S]=x)}else d[p].questions.push(x);localStorage.setItem("cbt_exams",JSON.stringify(d)),F(),N(m),b()}}function de(){document.getElementById("add-exam-modal").classList.remove("hidden"),refreshIcons()}function R(){document.getElementById("add-exam-modal").classList.add("hidden"),document.getElementById("add-exam-form").reset()}function M(){const a=JSON.parse(localStorage.getItem("cbt_teachers"))||[],n=document.getElementById("teachers-table-body");n.innerHTML=a.map((t,e)=>`
    <tr>
      <td>${e+1}</td>
      <td><strong>${t.nip}</strong></td>
      <td>${t.name}</td>
      <td>${t.subject}</td>
      <td>
        <button class="btn-delete-item" onclick="deleteTeacher('${t.id}')">
          <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #ef4444;"></i>
        </button>
      </td>
    </tr>
  `).join(""),refreshIcons()}function le(){document.getElementById("add-teacher-modal").classList.remove("hidden"),refreshIcons()}function U(){document.getElementById("add-teacher-modal").classList.add("hidden"),document.getElementById("add-teacher-form").reset()}function re(a){a.preventDefault();const n=document.getElementById("teacher-nip").value.trim(),t=document.getElementById("teacher-name").value.trim(),e=document.getElementById("teacher-subject").value.trim();if(!n||!t||!e){alert("Lengkapi semua input!");return}const i=JSON.parse(localStorage.getItem("cbt_teachers"))||[];i.push({id:"teacher-"+Date.now(),nip:n,name:t,subject:e}),localStorage.setItem("cbt_teachers",JSON.stringify(i)),U(),M()}function ce(a){if(confirm("Hapus data guru ini?")){let n=JSON.parse(localStorage.getItem("cbt_teachers"))||[];n=n.filter(t=>t.id!==a),localStorage.setItem("cbt_teachers",JSON.stringify(n)),M()}}function _(){const a=JSON.parse(localStorage.getItem("cbt_students"))||[],n=document.getElementById("students-table-body");n.innerHTML=a.map((t,e)=>`
    <tr>
      <td>${e+1}</td>
      <td><strong>${t.nisn}</strong></td>
      <td>${t.name}</td>
      <td>${t.class}</td>
      <td>
        <button class="btn-delete-item" onclick="deleteStudent('${t.id}')">
          <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #ef4444;"></i>
        </button>
      </td>
    </tr>
  `).join(""),refreshIcons()}function me(){document.getElementById("add-student-modal").classList.remove("hidden"),refreshIcons()}function z(){document.getElementById("add-student-modal").classList.add("hidden"),document.getElementById("add-student-form").reset()}function ue(a){a.preventDefault();const n=document.getElementById("student-nisn").value.trim(),t=document.getElementById("student-name").value.trim(),e=document.getElementById("student-class").value.trim();if(!n||!t||!e){alert("Lengkapi semua input!");return}const i=JSON.parse(localStorage.getItem("cbt_students"))||[];i.push({id:"student-"+Date.now(),nisn:n,name:t,class:e}),localStorage.setItem("cbt_students",JSON.stringify(i)),z(),_()}function ge(a){if(confirm("Hapus data siswa ini?")){let n=JSON.parse(localStorage.getItem("cbt_students"))||[];n=n.filter(t=>t.id!==a),localStorage.setItem("cbt_students",JSON.stringify(n)),_()}}function q(){const a=JSON.parse(localStorage.getItem("cbt_results"))||[],n=JSON.parse(localStorage.getItem("cbt_exams"))||[],t=document.getElementById("results-table-body");if(a.length===0){t.innerHTML='<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">Belum ada riwayat ujian yang direkam.</td></tr>';return}t.innerHTML=a.map((e,i)=>{const s=n.find(d=>d.id===e.examId),o=s&&s.kkm||65,l=e.score>=o,g=new Date(e.date).toLocaleString("id-ID",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});return`
      <tr>
        <td>${i+1}</td>
        <td><strong>${e.studentName}</strong> <span style="font-size:0.75rem; color: var(--text-muted);">(${e.nisn})</span></td>
        <td>${e.examTitle}</td>
        <td>${g}</td>
        <td>
          <span class="badge-score ${l?"pass":"fail"}">${e.score}% (KKM: ${o})</span>
        </td>
        <td>
          <button class="btn-delete-item" onclick="deleteResult('${e.id}')" title="Hapus Log">
            <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #ef4444;"></i>
          </button>
        </td>
      </tr>
    `}).join(""),refreshIcons()}function pe(a){if(confirm("Hapus log hasil pengerjaan ini?")){let n=JSON.parse(localStorage.getItem("cbt_results"))||[];n=n.filter(t=>t.id!==a),localStorage.setItem("cbt_results",JSON.stringify(n)),q(),b()}}function xe(){const a=JSON.parse(localStorage.getItem("cbt_results"))||[];if(a.length===0){alert("Tidak ada data hasil untuk diekspor!");return}let n="data:text/csv;charset=utf-8,";n+=`No,Nama Siswa,NISN,Paket Ujian,Waktu Pengerjaan,Skor Akhir
`,a.forEach((i,s)=>{const o=[s+1,`"${i.studentName}"`,`"${i.nisn}"`,`"${i.examTitle}"`,`"${new Date(i.date).toLocaleString("id-ID")}"`,`"${i.score}%"`].join(",");n+=o+`
`});const t=encodeURI(n),e=document.createElement("a");e.setAttribute("href",t),e.setAttribute("download","Hasil_Ujian_SMASA_Online_"+Date.now()+".csv"),document.body.appendChild(e),e.click(),document.body.removeChild(e)}window.selectedExamId=m;window.initAdminPanel=Z;window.renderAdminStats=b;window.setupAdminTabEvents=C;window.showEmptyState=O;window.renderAdminExamList=T;window.selectExam=N;window.renderAdminQuestions=K;window.saveExamConfig=Y;window.handleWordFileUpload=ee;window.parseWordContent=H;window.importQuestionsToExam=Q;window.createNewExamPackage=te;window.confirmDeleteExam=ne;window.confirmDeleteQuestion=ae;window.openAddQuestionModal=ie;window.openEditQuestionModal=se;window.closeQuestionModal=F;window.saveQuestionForm=oe;window.openAddExamModal=de;window.closeAddExamModal=R;window.renderTeachersList=M;window.openAddTeacherModal=le;window.closeAddTeacherModal=U;window.saveTeacherForm=re;window.deleteTeacher=ce;window.renderStudentsList=_;window.openAddStudentModal=me;window.closeAddStudentModal=z;window.saveStudentForm=ue;window.deleteStudent=ge;window.renderResultsList=q;window.deleteResult=pe;window.exportResultsToCSV=xe;let E=null,u=null,r=null,f={},w={},c=0,k=null,h=0,y=100;document.addEventListener("DOMContentLoaded",()=>{he();const a=localStorage.getItem("cbt_theme")||"light";document.documentElement.setAttribute("data-theme",a),W(a),ye(),v("login-view")});function I(){window.lucide&&window.lucide.createIcons()}function he(){const a=document.getElementById("header-clock-text");if(!a)return;const n=()=>{const t=new Date,e={weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1};let i=t.toLocaleDateString("id-ID",e);i=i.replace("pukul","pukul").replace(".",":"),a.innerText=`${i} WIB`};n(),setInterval(n,1e3)}function v(a){document.getElementById("login-view").classList.add("hidden"),document.getElementById("student-dashboard-view").classList.add("hidden"),document.getElementById("exam-room-view").classList.add("hidden"),document.getElementById("review-exam-view").classList.add("hidden"),document.getElementById("admin-dashboard-view").classList.add("hidden"),document.getElementById(a).classList.remove("hidden");const n=document.querySelector("header");a==="login-view"?n.classList.add("hidden"):(n.classList.remove("hidden"),fe()),a==="admin-dashboard-view"&&initAdminPanel(),I()}function fe(){const a=document.getElementById("header-user-role"),n=document.getElementById("header-user-status");E==="admin"?(a.innerText="ACTIVE USER",n.innerHTML='<i data-lucide="shield" style="width: 14px; height: 14px; margin-right: 4px;"></i> Administrator',n.style.color="#10b981"):E==="siswa"&&u&&(a.innerText=`NISN: ${u.nisn}`,n.innerHTML=`<i data-lucide="user" style="width: 14px; height: 14px; margin-right: 4px;"></i> ${u.name}`,n.style.color="#3b82f6"),I()}function ye(){const a=document.querySelectorAll(".login-role-btn");a.forEach(n=>{n.addEventListener("click",()=>{a.forEach(e=>e.classList.remove("active")),n.classList.add("active"),n.getAttribute("data-role")==="admin"?(document.getElementById("login-student-fields").classList.add("hidden"),document.getElementById("login-admin-fields").classList.remove("hidden")):(document.getElementById("login-student-fields").classList.remove("hidden"),document.getElementById("login-admin-fields").classList.add("hidden"))})}),document.getElementById("btn-do-login").addEventListener("click",be),document.getElementById("btn-logout").addEventListener("click",ke),document.getElementById("btn-theme-toggle").addEventListener("click",we)}function we(){const n=(document.documentElement.getAttribute("data-theme")||"light")==="light"?"dark":"light";document.documentElement.setAttribute("data-theme",n),localStorage.setItem("cbt_theme",n),W(n)}function W(a){const n=document.getElementById("btn-theme-toggle");n&&(a==="dark"?n.innerHTML='<i data-lucide="sun"></i>':n.innerHTML='<i data-lucide="moon"></i>',I())}function be(){if(document.querySelector(".login-role-btn.active").getAttribute("data-role")==="admin"){const t=document.getElementById("login-admin-username").value.trim(),e=document.getElementById("login-admin-password").value.trim(),i=localStorage.getItem("cbt_admin_password")||"admin123",s=localStorage.getItem("cbt_admin_username")||"admin";t===s&&e===i?(E="admin",u="Administrator",v("admin-dashboard-view"),document.getElementById("login-admin-username").value="",document.getElementById("login-admin-password").value=""):alert("Username atau Password Administrator salah!")}else{const t=document.getElementById("login-student-name").value.trim(),e=document.getElementById("login-student-nisn").value.trim();if(!t||!e){alert("Harap masukkan Nama Lengkap dan NISN Anda!");return}const i=JSON.parse(localStorage.getItem("cbt_students"))||[];let s=i.find(o=>o.nisn===e);s?(s.name=t,localStorage.setItem("cbt_students",JSON.stringify(i))):(s={id:"student-"+Date.now(),name:t,nisn:e,class:"XII MIPA 1"},i.push(s),localStorage.setItem("cbt_students",JSON.stringify(i))),E="siswa",u=s,V()}}function ke(){confirm("Apakah Anda yakin ingin keluar dari sistem?")&&(k&&clearInterval(k),E=null,u=null,r=null,selectedExamId=null,v("login-view"))}function V(){v("student-dashboard-view"),document.getElementById("student-welcome-name").innerText=u.name,ve(),Ee(),Ie()}function Ie(){const a=JSON.parse(localStorage.getItem("cbt_exams"))||[],t=(JSON.parse(localStorage.getItem("cbt_results"))||[]).filter(e=>e.nisn===u.nisn);if(document.getElementById("stud-stat-total-exams").innerText=a.filter(e=>e.status==="AKTIF").length,document.getElementById("stud-stat-total-attempts").innerText=t.length,t.length>0){const e=t.reduce((s,o)=>s+o.score,0),i=Math.round(e/t.length);document.getElementById("stud-stat-average-score").innerText=i+"%"}else document.getElementById("stud-stat-average-score").innerText="0%";if(t.length>0){const e=t[t.length-1],i=a.find(o=>o.id===e.examId),s=i?i.kkm:65;document.getElementById("stud-stat-last-kkm").innerText=e.score>=s?"Tuntas KKM":"Belum Tuntas"}else document.getElementById("stud-stat-last-kkm").innerText="-"}function ve(){const a=JSON.parse(localStorage.getItem("cbt_exams"))||[],n=document.getElementById("student-available-exams"),t=a.filter(e=>e.status==="AKTIF");if(t.length===0){n.innerHTML='<p style="color: var(--text-muted); font-size: 0.88rem; grid-column: 1/-1;">Belum ada paket ujian aktif saat ini.</p>';return}n.innerHTML=t.map(e=>`
      <div class="exam-item-card" style="box-shadow: var(--nm-outset-shadow); cursor: default;">
        <span class="exam-item-badge">${e.subject}</span>
        <div class="exam-item-title" style="margin: 5px 0 10px 0;">${e.title}</div>
        <div class="exam-item-info-row">
          <div class="exam-item-meta">
            <i data-lucide="clock" style="width: 14px; height: 14px; margin-right: 4px;"></i> ${e.duration} Menit
            <span style="color: var(--text-light); margin: 0 4px;">•</span>
            <i data-lucide="help-circle" style="width: 14px; height: 14px; margin-right: 4px;"></i> ${e.questions.length} Soal
          </div>
          <button class="btn-clay-primary" onclick="confirmStartExam('${e.id}')" style="padding: 6px 14px; font-size: 0.75rem; border-radius: 10px;">
            <i data-lucide="play" style="width: 12px; height: 12px; margin-right: 4px;"></i> Ikuti Ujian
          </button>
        </div>
      </div>
    `).join(""),I()}function Ee(){const a=JSON.parse(localStorage.getItem("cbt_results"))||[],n=JSON.parse(localStorage.getItem("cbt_exams"))||[],t=document.getElementById("student-attempts-body"),e=a.filter(i=>i.nisn===u.nisn);if(e.length===0){t.innerHTML='<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">Anda belum mengikuti ujian apa pun.</td></tr>';return}t.innerHTML=e.map((i,s)=>{const o=n.find(p=>p.id===i.examId),l=o&&o.kkm||65,g=i.score>=l,d=new Date(i.date).toLocaleString("id-ID",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});return`
      <tr>
        <td>${s+1}</td>
        <td>${i.examTitle}</td>
        <td>${d}</td>
        <td>
          <span class="badge-score ${g?"pass":"fail"}">${i.score}% (KKM: ${l})</span>
        </td>
        <td>
          <button class="btn-clay-neutral" onclick="loadExamReview('${i.id}')" style="padding: 6px 12px; font-size: 0.72rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
            <i data-lucide="file-text" style="width: 13px; height: 13px;"></i> Detail Pembahasan
          </button>
        </td>
      </tr>
    `}).join(""),I()}function Se(a){const t=(JSON.parse(localStorage.getItem("cbt_exams"))||[]).find(e=>e.id===a);if(t){if(t.questions.length===0){alert("Maaf, paket ujian ini belum memiliki pertanyaan soal. Silakan hubungi guru.");return}confirm(`Mulai pengerjaan "${t.title}"?
Durasi: ${t.duration} menit.

Klik OK untuk memulai.`)&&Be(t)}}function Be(a){r=a,f={},w={},c=0,y=100;const n=`autosave_${u.nisn}_${r.id}`,t=JSON.parse(localStorage.getItem(n));t&&confirm("Ditemukan sesi pengerjaan sebelumnya yang belum disubmit. Ingin memulihkan jawaban dan melanjutkan ujian?")?(f=t.answers||{},w=t.flags||{},c=t.currentIdx||0,h=t.timeLeft):h=a.duration*60,v("exam-room-view"),document.getElementById("exam-room-title").innerText=r.title,document.getElementById("exam-room-subject").innerText=r.subject,L(),$(),Ae()}function Ae(){k&&clearInterval(k);const a=document.getElementById("exam-timer-span"),n=()=>{if(h<=0){clearInterval(k),alert("Waktu ujian telah habis! Jawaban Anda akan langsung disubmit."),De();return}h--,Oe();const t=Math.floor(h/60),e=h%60;a.innerText=`${t.toString().padStart(2,"0")}:${e.toString().padStart(2,"0")}`,h<300?a.parentElement.classList.add("timer-critical"):a.parentElement.classList.remove("timer-critical")};n(),k=setInterval(n,1e3)}function L(){const a=document.getElementById("exam-questions-grid"),n=r.questions.length;a.innerHTML=Array.from({length:n},(t,e)=>{let i="";return f[e]&&(i="answered"),w[e]&&(i="flagged"),c===e&&(i+=" current"),`
      <button class="q-grid-btn ${i}" onclick="jumpToQuestion(${e})">
        ${e+1}
      </button>
    `}).join("")}function $(){const a=r.questions[c],n=document.getElementById("exam-question-area");document.getElementById("exam-question-number-badge").innerText=`SOAL NOMOR ${c+1} dari ${r.questions.length}`;const t=(c+1)/r.questions.length*100;document.getElementById("exam-progress-bar-fill").style.width=`${t}%`,n.style.fontSize=`${y}%`,n.innerHTML=`
    <div class="exam-q-text" style="margin-bottom: 20px;">${a.text}</div>
    <div class="exam-options-container">
      ${a.options.map(l=>`
          <button class="exam-option-button ${f[c]===l.key?"selected":""}" onclick="selectExamOption('${l.key}')">
            <span class="exam-option-key">${l.key}</span>
            <span>${l.text}</span>
          </button>
        `).join("")}
    </div>
  `;const e=document.getElementById("exam-btn-prev"),i=document.getElementById("exam-btn-next"),s=document.getElementById("exam-btn-submit");c===0?(e.disabled=!0,e.style.opacity=.4):(e.disabled=!1,e.style.opacity=1),c===r.questions.length-1?(i.classList.add("hidden"),s.classList.remove("hidden")):(i.classList.remove("hidden"),s.classList.add("hidden"));const o=document.getElementById("exam-btn-flag");w[c]?(o.style.background="var(--clay-warning-bg)",o.style.boxShadow="var(--clay-warning-shadow)",o.style.color="white",o.innerHTML='<i data-lucide="help-circle" style="width: 14px; height: 14px; margin-right: 4px;"></i> Batal Ragu-ragu'):(o.style.background="var(--clay-neutral-bg)",o.style.boxShadow="var(--clay-neutral-shadow)",o.style.color="var(--text-main)",o.innerHTML='<i data-lucide="help-circle" style="width: 14px; height: 14px; margin-right: 4px;"></i> Ragu-Ragu'),I()}function Te(a){f[c]=a,$(),L()}function Le(){w[c]=!w[c],$(),L()}function $e(){c>0&&(c--,$(),L())}function Ne(){c<r.questions.length-1&&(c++,$(),L())}function Me(a){c=a,$(),L()}function _e(a){a==="increase"&&y<160?y+=15:a==="decrease"&&y>85?y-=15:a==="reset"&&(y=100),document.getElementById("exam-question-area").style.fontSize=`${y}%`}function Oe(){if(!r)return;const a=`autosave_${u.nisn}_${r.id}`,n={answers:f,flags:w,currentIdx:c,timeLeft:h};localStorage.setItem(a,JSON.stringify(n))}function qe(){if(!r)return;const a=`autosave_${u.nisn}_${r.id}`;localStorage.removeItem(a)}function je(){const a=r.questions.length,n=Object.keys(f).length,t=a-n;let e="Apakah Anda yakin ingin mengakhiri ujian dan menyerahkan lembar jawaban?";t>0&&(e+=`

Peringatan: Terdapat ${t} soal yang BELUM dijawab.`),Object.values(w).some(s=>s===!0)&&(e+=`

Peringatan: Anda masih menandai opsi "Ragu-ragu" di beberapa soal.`),confirm(e)&&X()}function De(){X()}function X(){k&&clearInterval(k);let a=0;r.questions.forEach((o,l)=>{f[l]===o.correctAnswer&&a++});const n=r.questions.length,t=Math.round(a/n*100),e=JSON.parse(localStorage.getItem("cbt_results"))||[],i={id:"res-"+Date.now(),studentName:u.name,nisn:u.nisn,examId:r.id,examTitle:r.title,score:t,totalQuestions:n,correctAnswers:a,date:new Date().toISOString(),answers:f};e.push(i),localStorage.setItem("cbt_results",JSON.stringify(e)),qe(),document.getElementById("exam-timer-span").parentElement.classList.remove("timer-critical"),t>=(r.kkm||65)&&typeof confetti=="function"&&Je(),G(i.id)}function Je(){const n=Date.now()+2500;(function t(){confetti({particleCount:3,angle:60,spread:55,origin:{x:0}}),confetti({particleCount:3,angle:120,spread:55,origin:{x:1}}),Date.now()<n&&requestAnimationFrame(t)})()}function G(a){const n=JSON.parse(localStorage.getItem("cbt_results"))||[],t=JSON.parse(localStorage.getItem("cbt_exams"))||[],e=n.find(d=>d.id===a),i=t.find(d=>d.id===(e?e.examId:""));if(!e||!i){alert("Data riwayat ujian tidak ditemukan.");return}v("review-exam-view");const s=i.kkm||65,o=e.score>=s;document.getElementById("review-exam-title").innerText=e.examTitle,document.getElementById("review-score-value").innerText=`${e.score}%`;const l=document.getElementById("review-status-text");o?l.innerHTML=`<span class="badge-score pass" style="font-size: 1rem; padding: 6px 18px;">LULUS KKM (Minimal ${s}%)</span>`:l.innerHTML=`<span class="badge-score fail" style="font-size: 1rem; padding: 6px 18px;">TIDAK LULUS KKM (Minimal ${s}%)</span>`,document.getElementById("review-correct-count").innerText=`${e.correctAnswers} / ${e.totalQuestions}`,document.getElementById("review-wrong-count").innerText=`${e.totalQuestions-e.correctAnswers}`;const g=document.getElementById("review-questions-list");g.innerHTML=i.questions.map((d,p)=>{const x=e.answers[p],S=x===d.correctAnswer;return`
      <div class="review-card">
        <div class="review-header">
          <span style="font-weight: 800; color: #3b82f6;">PERTANYAAN NOMOR ${p+1}</span>
          <span class="review-status-label ${S?"correct":"incorrect"}">
            ${S?'<i data-lucide="check-circle" style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 4px;"></i> Jawaban Benar':'<i data-lucide="x-circle" style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 4px;"></i> Jawaban Salah'}
          </span>
        </div>
        <div class="exam-q-text" style="font-size: 1.02rem; margin-bottom: 15px;">${d.text}</div>
        
        <div class="review-option-display">
          ${d.options.map(B=>{let j="normal",D="";return B.key===d.correctAnswer?(j="correct-choice",D=' <span style="font-size:0.8rem; font-weight:700;">(Kunci Jawaban Benar)</span>'):B.key===x&&!S&&(j="wrong-choice",D=' <span style="font-size:0.8rem; font-weight:700;">(Pilihan Anda - Salah)</span>'),`
              <div class="review-option-row ${j}">
                <strong style="background: rgba(0,0,0,0.05); padding: 4px 8px; border-radius: 6px;">${B.key}</strong>
                <span>${B.text} ${D}</span>
              </div>
            `}).join("")}
        </div>

        <div class="review-explanation-box" style="margin-top: 15px;">
          <label style="font-weight: 700; font-size: 0.75rem; color: var(--text-muted);"><i data-lucide="info" style="width: 13px; height: 13px; display: inline; vertical-align: middle; margin-right: 4px;"></i> Pembahasan Soal:</label>
          <textarea class="explanation-textarea" readonly>${d.explanation||"Tidak ada teks pembahasan khusus untuk soal ini."}</textarea>
        </div>
      </div>
    `}).join(""),I()}function Pe(){E==="admin"?v("admin-dashboard-view"):V()}window.currentRole=E;window.loggedUser=u;window.activeExam=r;window.examAnswers=f;window.examFlags=w;window.examCurrentIdx=c;window.examTimeLeft=h;window.activeFontSize=y;window.showView=v;window.confirmStartExam=Se;window.changeExamFontSize=_e;window.toggleExamFlag=Le;window.prevQuestion=$e;window.nextQuestion=Ne;window.jumpToQuestion=Me;window.submitExamManual=je;window.closeReviewAndReturn=Pe;window.loadExamReview=G;window.selectExamOption=Te;window.refreshIcons=I;
