# 📋 مستخرج أرقام القضايا والتواريخ

### أداة استخراج بيانات القضايا القضائية

أداة ويب بسيطة تستخرج أرقام القضايا وتواريخ الإحالة من النصوص القضائية، وتُجهّزها للنسخ المباشر إلى برامج مثل Word أو Excel

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222222?style=for-the-badge&logo=github)](https://abosalehg-ui.github.io/case-extractor/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/بدون_مكتبات-✓-4CAF50?style=for-the-badge)]()

[🌐 تجربة الأداة مباشرة](https://abosalehg-ui.github.io/case-extractor/) · [📝 الإبلاغ عن مشكلة](https://github.com/abosalehg-ui/case-extractor/issues)

---

## 📌 المشكلة التي تحلّها

عند العمل على تقارير القضايا، يحتاج الموظف إلى نسخ عشرات الأرقام والتواريخ يدوياً من نصوص طويلة — وهذا مصدر للأخطاء وضياع الوقت. الأداة تُنجز هذا في ثانية واحدة.

---

## ✨ ما تستخرجه الأداة

| النوع | الصيغة المعتمدة | مثال |
| --- | --- | --- |
| رقم القضية | 10 أرقام متصلة | `4500123456` |
| تاريخ الإحالة | يوم/شهر/سنة | `15/03/1446` |

- تُزيل التكرارات تلقائياً وتحتفظ بالترتيب الأصلي
- تدعم النسخ بضغطة واحدة لكل حقل

---

## 🚀 طريقة الاستخدام

1. افتح [رابط الأداة](https://abosalehg-ui.github.io/case-extractor/)
2. الصق النص في حقل الإدخال
3. اضغط **استخراج البيانات** — أو الصق النص مباشرة، يعمل تلقائياً
4. انسخ النتائج بزر النسخ

---

## 🛠️ التقنية المستخدمة

ملف HTML واحد — بدون مكتبات خارجية ولا اتصال بالإنترنت. يعمل محلياً في المتصفح مباشرة.

---

## 💻 التشغيل المحلي

```bash
git clone https://github.com/abosalehg-ui/case-extractor.git
cd case-extractor
# افتح index.html في المتصفح
```

---

## 📂 هيكل المشروع

```
case-extractor/
├── index.html   # الأداة كاملة في ملف واحد
└── README.md
```

---

## 👤 المطوّر

**عبدالكريم العبود**

[![GitHub](https://img.shields.io/badge/GitHub-abosalehg--ui-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abosalehg-ui)

---

صُنع بـ ❤️ لخدمة العمل القضائي في المملكة العربية السعودية
