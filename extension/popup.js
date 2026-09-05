const CASE_RE = /\b\d{10}\b/g;
const DATE_RE = /\b\d{2}\/\d{2}\/\d{4}\b/g;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  requestAnimationFrame(() => { t.style.opacity = '1'; });
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => { t.style.display = 'none'; }, 300);
  }, 2500);
}

// يزيل التكرار مع الحفاظ على الترتيب الأصلي
function uniq(list) {
  return [...new Set(list)];
}

function render(cases, dates) {
  document.getElementById('caseNumbers').value = cases.join('\n');
  document.getElementById('dates').value = dates.join('\n');
  document.getElementById('caseCount').textContent = cases.length;
  document.getElementById('dateCount').textContent = dates.length;
}

function extractData(silent) {
  const text = document.getElementById('inputText').value;
  if (!text.trim()) {
    if (!silent) showToast('⚠️ يرجى لصق النص أولاً');
    return;
  }

  const cases = uniq(text.match(CASE_RE) || []);
  const dates = uniq(text.match(DATE_RE) || []);
  render(cases, dates);
  saveState(text, cases, dates);

  if (cases.length === 0 && dates.length === 0) {
    showToast('⚠️ لم يتم العثور على بيانات');
  } else {
    showToast(`✅ تم الاستخراج — ${cases.length} قضية، ${dates.length} تاريخ`);
  }
}

function copyText(id, btn) {
  const val = document.getElementById(id).value;
  if (!val) { showToast('⚠️ لا يوجد نص للنسخ'); return; }

  const done = () => {
    const orig = btn.textContent;
    btn.textContent = '✓ تم النسخ';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
    showToast('✅ تم النسخ إلى الحافظة');
  };

  navigator.clipboard.writeText(val).then(done).catch(() => {
    const ta = document.getElementById(id);
    ta.select();
    document.execCommand('copy');
    done();
  });
}

// النص المحدد في الصفحة إن وُجد، وإلا نص الصفحة كاملاً
function grabPageText() {
  const selected = window.getSelection().toString();
  return selected.trim() ? selected : document.body.innerText;
}

async function extractFromPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) { showToast('⚠️ تعذّر الوصول إلى التبويب'); return; }

    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: grabPageText
    });

    const text = (result && result.result) || '';
    if (!text.trim()) { showToast('⚠️ الصفحة لا تحتوي على نص'); return; }

    document.getElementById('inputText').value = text;
    extractData();
  } catch (e) {
    // صفحات النظام ومتجر الإضافات وملفات PDF المدمجة لا تسمح بحقن السكربت
    showToast('⚠️ لا يمكن القراءة من هذه الصفحة — الصق النص يدوياً');
  }
}

function saveState(input, cases, dates) {
  chrome.storage.local.set({ lastState: { input, cases, dates } });
}

async function restoreState() {
  const { lastState } = await chrome.storage.local.get('lastState');
  if (!lastState) return;
  document.getElementById('inputText').value = lastState.input || '';
  render(lastState.cases || [], lastState.dates || []);
}

document.addEventListener('DOMContentLoaded', () => {
  restoreState();

  document.getElementById('btnExtract').addEventListener('click', () => extractData());
  document.getElementById('btnPage').addEventListener('click', extractFromPage);

  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => copyText(btn.dataset.target, btn));
  });

  document.getElementById('inputText').addEventListener('paste', () => {
    setTimeout(() => extractData(true), 100);
  });
});
