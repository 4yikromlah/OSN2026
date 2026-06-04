// Supabase client helper for SMASA-Online (browser)
// - Reads Vite env vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
// - Falls back to localStorage when Supabase is not configured

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = (SUPABASE_URL && SUPABASE_KEY) ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

function logNotConfigured() {
  console.warn('[supabase-client] Supabase not configured — falling back to localStorage.');
}

// LocalStorage helpers (fallback)
function lsGet(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
}
function lsSet(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Exports: isConfigured, getClient
export function isSupabaseConfigured() {
  return !!supabase;
}

export function getSupabaseClient() {
  return supabase;
}

// ====== Data model helpers ======
// We'll use simple table names: exams (jsonb column: data), teachers, students, results, settings

// Exams (store entire exam object as jsonb in column `data`)
export async function getExams() {
  if (!supabase) { return lsGet('cbt_exams') || []; }
  const { data, error } = await supabase.from('exams').select('id, data').order('id', { ascending: true });
  if (error) throw error;
  return (data || []).map(r => ({ id: r.id, ...r.data }));
}

export async function createExam(exam) {
  if (!supabase) {
    const exams = lsGet('cbt_exams') || [];
    exams.push(exam);
    lsSet('cbt_exams', exams);
    return exam;
  }
  const { data, error } = await supabase.from('exams').insert([{ id: exam.id, data: exam }]);
  if (error) throw error;
  return data[0];
}

export async function updateExam(examId, patch) {
  if (!supabase) {
    const exams = lsGet('cbt_exams') || [];
    const idx = exams.findIndex(e => e.id === examId);
    if (idx === -1) throw new Error('exam not found');
    exams[idx] = { ...exams[idx], ...patch };
    lsSet('cbt_exams', exams);
    return exams[idx];
  }
  const { data, error } = await supabase.from('exams').update({ data: patch }).eq('id', examId);
  if (error) throw error;
  return data[0];
}

// Teachers
export async function getTeachers() {
  if (!supabase) return lsGet('cbt_teachers') || [];
  const { data, error } = await supabase.from('teachers').select('*');
  if (error) throw error;
  return data;
}
export async function createTeacher(t) {
  if (!supabase) {
    const all = lsGet('cbt_teachers') || [];
    all.push(t);
    lsSet('cbt_teachers', all);
    return t;
  }
  const { data, error } = await supabase.from('teachers').insert([t]);
  if (error) throw error;
  return data[0];
}

// Students
export async function getStudents() {
  if (!supabase) return lsGet('cbt_students') || [];
  const { data, error } = await supabase.from('students').select('*');
  if (error) throw error;
  return data;
}
export async function createStudent(s) {
  if (!supabase) {
    const all = lsGet('cbt_students') || [];
    all.push(s);
    lsSet('cbt_students', all);
    return s;
  }
  const { data, error } = await supabase.from('students').insert([s]);
  if (error) throw error;
  return data[0];
}

// Results (exam attempts)
export async function getResults() {
  if (!supabase) return lsGet('cbt_results') || [];
  const { data, error } = await supabase.from('results').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data;
}
export async function createResult(r) {
  if (!supabase) {
    const all = lsGet('cbt_results') || [];
    all.push(r);
    lsSet('cbt_results', all);
    return r;
  }
  const { data, error } = await supabase.from('results').insert([r]);
  if (error) throw error;
  return data[0];
}

// Admin/settings
export async function getSettings() {
  if (!supabase) return lsGet('cbt_settings') || {};
  const { data, error } = await supabase.from('settings').select('key, value');
  if (error) throw error;
  return (data || []).reduce((acc, row) => { acc[row.key] = row.value; return acc; }, {});
}

export async function setSetting(key, value) {
  if (!supabase) {
    const s = lsGet('cbt_settings') || {};
    s[key] = value;
    lsSet('cbt_settings', s);
    return { key, value };
  }
  const upsert = await supabase.from('settings').upsert({ key, value });
  if (upsert.error) throw upsert.error;
  return { key, value };
}

// ===== Migration helper (used by separate script) =====
export async function pushLocalStorageToSupabase({ dryRun = false } = {}) {
  if (!supabase) { throw new Error('Supabase not configured'); }

  const localExams = lsGet('cbt_exams') || [];
  const localTeachers = lsGet('cbt_teachers') || [];
  const localStudents = lsGet('cbt_students') || [];
  const localResults = lsGet('cbt_results') || [];
  const localSettings = lsGet('cbt_settings') || {};

  const summary = { exams: localExams.length, teachers: localTeachers.length, students: localStudents.length, results: localResults.length };

  if (dryRun) return summary;

  // Insert exams (id + data)
  for (const ex of localExams) {
    const payload = { id: ex.id, data: ex };
    const { error } = await supabase.from('exams').upsert(payload);
    if (error) throw error;
  }

  // Teachers
  if (localTeachers.length > 0) {
    const { error } = await supabase.from('teachers').upsert(localTeachers);
    if (error) throw error;
  }

  // Students
  if (localStudents.length > 0) {
    const { error } = await supabase.from('students').upsert(localStudents);
    if (error) throw error;
  }

  // Results
  if (localResults.length > 0) {
    const { error } = await supabase.from('results').upsert(localResults);
    if (error) throw error;
  }

  // Settings
  const entries = Object.entries(localSettings || {}).map(([k, v]) => ({ key: k, value: v }));
  if (entries.length > 0) {
    const { error } = await supabase.from('settings').upsert(entries);
    if (error) throw error;
  }

  return summary;
}

// default export convenience
export default {
  isSupabaseConfigured,
  getSupabaseClient,
  getExams,
  createExam,
  updateExam,
  getTeachers,
  createTeacher,
  getStudents,
  createStudent,
  getResults,
  createResult,
  getSettings,
  setSetting,
  pushLocalStorageToSupabase
};
