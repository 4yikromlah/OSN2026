// Database Soal Default untuk SMASA-Online CBT
// File ini bertugas untuk menginisialisasi bank soal di LocalStorage jika belum ada.

const DEFAULT_EXAMS = [
  {
    id: "exam-1",
    title: "Penilaian Akhir Semester - Matematika Dasar",
    subject: "MATEMATIKA",
    duration: 15,
    kkm: 65,
    status: "AKTIF",
    createdBy: "teacher-1",
    questions: [
      {
        id: "q1_1",
        text: "Jika 3x + 7 = 22, berapakah nilai x?",
        options: [
          { key: "A", text: "3" },
          { key: "B", text: "4" },
          { key: "C", text: "5" },
          { key: "D", text: "6" },
          { key: "E", text: "7" }
        ],
        correctAnswer: "C",
        explanation: "Kurangi kedua sisi dengan 7:\n3x = 22 - 7\n3x = 15\n\nBagi kedua sisi dengan 3:\nx = 15 / 3\nx = 5."
      },
      {
        id: "q1_2",
        text: "Berapakah hasil dari 25% dari 200?",
        options: [
          { key: "A", text: "25" },
          { key: "B", text: "40" },
          { key: "C", text: "50" },
          { key: "D", text: "60" },
          { key: "E", text: "75" }
        ],
        correctAnswer: "C",
        explanation: "Persentase dihitung dengan rumus:\n(Persen / 100) * Nilai\n\n(25 / 100) * 200 = 0.25 * 200 = 50."
      },
      {
        id: "q1_3",
        text: "Berapakah nilai dari 2^5 (dua pangkat lima)?",
        options: [
          { key: "A", text: "10" },
          { key: "B", text: "16" },
          { key: "C", text: "25" },
          { key: "D", text: "32" },
          { key: "E", text: "64" }
        ],
        correctAnswer: "D",
        explanation: "Perpangkatan adalah perkalian berulang:\n2^5 = 2 * 2 * 2 * 2 * 2\n2 * 2 = 4\n4 * 2 = 8\n8 * 2 = 16\n16 * 2 = 32."
      },
      {
        id: "q1_4",
        text: "Jika sebuah segitiga memiliki alas 10 cm dan tinggi 8 cm, berapakah luas segitiga tersebut?",
        options: [
          { key: "A", text: "20 cm²" },
          { key: "B", text: "40 cm²" },
          { key: "C", text: "80 cm²" },
          { key: "D", text: "100 cm²" },
          { key: "E", text: "160 cm²" }
        ],
        correctAnswer: "B",
        explanation: "Rumus luas segitiga adalah:\nLuas = 1/2 * alas * tinggi\n\nLuas = 1/2 * 10 cm * 8 cm\nLuas = 5 cm * 8 cm = 40 cm²."
      },
      {
        id: "q1_5",
        text: "Berapakah median dari data berikut: 3, 5, 7, 9, 11, 13, 15?",
        options: [
          { key: "A", text: "7" },
          { key: "B", text: "8" },
          { key: "C", text: "9" },
          { key: "D", text: "10" },
          { key: "E", text: "11" }
        ],
        correctAnswer: "C",
        explanation: "Median adalah nilai tengah setelah data diurutkan.\nData: 3, 5, 7, 9, 11, 13, 15 (sudah berurutan).\nJumlah data (n) = 7 (ganjil).\nNilai tengah berada di posisi ke-(7 + 1) / 2 = data ke-4.\nData ke-4 adalah 9."
      }
    ]
  },
  {
    id: "exam-2",
    title: "Penilaian Harian - Tata Bahasa Indonesia",
    subject: "BAHASA INDONESIA",
    duration: 10,
    kkm: 70,
    status: "AKTIF",
    createdBy: "teacher-2",
    questions: [
      {
        id: "q2_1",
        text: "Manakah di bawah ini yang merupakan kalimat efektif dan hemat kata?",
        options: [
          { key: "A", text: "Bagi semua siswa-siswa diharapkan hadir tepat waktu." },
          { key: "B", text: "Semua siswa diharapkan hadir tepat waktu." },
          { key: "C", text: "Kehadiran daripada semua siswa sangat diharapkan." },
          { key: "D", text: "Untuk para siswa-siswi semuanya agar hadir tepat waktu." },
          { key: "E", text: "Diharapkan kehadiran siswa sekalian untuk hadir tepat waktu." }
        ],
        correctAnswer: "B",
        explanation: "Kalimat efektif harus logis, hemat, dan memenuhi kaidah tata bahasa.\n- Opsi A pemborosan kata ('bagi semua siswa-siswa').\n- Opsi B sangat efektif dan lugas.\n- Opsi C menggunakan kata hubung yang salah ('daripada').\n- Opsi D pleonasme ('para siswa-siswi semuanya').\n- Opsi E bertele-tele."
      },
      {
        id: "q2_2",
        text: "Penulisan kata serapan yang benar sesuai PUEBI terdapat pada kalimat...",
        options: [
          { key: "A", text: "Apotik itu tutup sejak kemarin sore." },
          { key: "B", text: "Analisa data harus dilakukan dengan teliti." },
          { key: "C", text: "Sistem pembelajaran daring dinilai sangat efektif." },
          { key: "D", text: "Jadwal praktek dokter spesialis anak diubah." },
          { key: "E", text: "Kwitansi pembayaran kuliah harus disimpan." }
        ],
        correctAnswer: "C",
        explanation: "Mari kita analisis kebahasaan masing-masing kata serapan:\n- Apotik (salah) -> Apotek (baku)\n- Analisa (salah) -> Analisis (baku)\n- Sistem (benar/baku)\n- Praktek (salah) -> Praktik (baku)\n- Kwitansi (salah) -> Kuitansi (baku)\n\nMaka penulisan kata serapan yang benar adalah pada kalimat C."
      }
    ]
  }
];

// Fungsi inisialisasi database soal
function initDatabase() {
  if (!localStorage.getItem("cbt_exams")) {
    localStorage.setItem("cbt_exams", JSON.stringify(DEFAULT_EXAMS));
  }

  // Admin credentials - password diubah ke admin321
  if (!localStorage.getItem("cbt_admin_password")) {
    localStorage.setItem("cbt_admin_password", "admin321");
  }
  if (!localStorage.getItem("cbt_admin_username")) {
    localStorage.setItem("cbt_admin_username", "admin");
  }

  // Data guru default (dengan username & password untuk login guru)
  if (!localStorage.getItem("cbt_teachers")) {
    const defaultTeachers = [
      {
        id: "teacher-1",
        name: "Budi Santoso, S.Pd.",
        nip: "198005122005011002",
        subject: "Matematika",
        username: "budi.santoso",
        password: "guru123"
      },
      {
        id: "teacher-2",
        name: "Siti Rahma, M.Pd.",
        nip: "198511232008122001",
        subject: "Bahasa Indonesia",
        username: "siti.rahma",
        password: "guru123"
      }
    ];
    localStorage.setItem("cbt_teachers", JSON.stringify(defaultTeachers));
  }

  // Data siswa default (dengan username & password untuk login)
  if (!localStorage.getItem("cbt_students")) {
    const defaultStudents = [
      {
        id: "student-1",
        name: "Ahmad Sudjiwo",
        username: "ahmadsudjiwo",
        subject: "Matematika",
        password: "siswa123"
      },
      {
        id: "student-2",
        name: "Diana Safitri",
        username: "dianasafitri",
        subject: "Bahasa Indonesia",
        password: "siswa123"
      },
      {
        id: "student-3",
        name: "Rendi Pratama",
        username: "rendipratama",
        subject: "Matematika",
        password: "siswa123"
      }
    ];
    localStorage.setItem("cbt_students", JSON.stringify(defaultStudents));
  }

  // Data riwayat hasil ujian default
  if (!localStorage.getItem("cbt_results")) {
    const defaultResults = [
      {
        id: "res-1",
        studentName: "Ahmad Sudjiwo",
        nisn: "ahmadsudjiwo",
        examId: "exam-1",
        examTitle: "Penilaian Akhir Semester - Matematika Dasar",
        score: 80,
        totalQuestions: 5,
        correctAnswers: 4,
        date: "2026-06-02T09:30:00Z",
        answers: { 0: "C", 1: "C", 2: "D", 3: "B", 4: "A" }
      },
      {
        id: "res-2",
        studentName: "Diana Safitri",
        nisn: "dianasafitri",
        examId: "exam-2",
        examTitle: "Penilaian Harian - Tata Bahasa Indonesia",
        score: 50,
        totalQuestions: 2,
        correctAnswers: 1,
        date: "2026-06-03T10:15:00Z",
        answers: { 0: "B", 1: "A" }
      }
    ];
    localStorage.setItem("cbt_results", JSON.stringify(defaultResults));
  }
}

// Jalankan inisialisasi
initDatabase();

// Expose globally
window.DEFAULT_EXAMS = DEFAULT_EXAMS;
window.initDatabase = initDatabase;
