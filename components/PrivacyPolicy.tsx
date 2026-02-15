
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-right">
      <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl border border-stone-100">
        <h2 className="text-4xl font-bold text-emerald-950 mb-8 pb-4 border-b-2 border-emerald-100">سياسة الخصوصية</h2>
        
        <section className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">تمهيد</h3>
            <p className="text-slate-600 leading-relaxed">
              نحن في "ديرة" نقدّر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية تعاملنا مع المعلومات التي قد تشاركها معنا أثناء تصفحك للموقع.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">جمع المعلومات</h3>
            <p className="text-slate-600 leading-relaxed">
              لا نقوم بجمع أي بيانات شخصية حساسة بشكل تلقائي. المعلومات التي نجمعها تقتصر على ما تقدمه لنا بمحض إرادتك عبر نموذج "اتصل بنا" (مثل الاسم والبريد الإلكتروني) لغرض التواصل معك فقط.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">استخدام الكوكيز (Cookies)</h3>
            <p className="text-slate-600 leading-relaxed">
              نستخدم ملفات تعريف الارتباط الأساسية لضمان عمل الموقع بشكل صحيح وتحسين تجربة المستخدم، مثل حفظ لغتك المفضلة أو إعدادات تصفحك.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">مشاركة البيانات</h3>
            <p className="text-slate-600 leading-relaxed">
              نتعهد بعدم بيع أو تأجير بياناتك لأي طرف ثالث. خصوصيتك هي أولويتنا القصوى في جميع مراحل تطوير المشروع.
            </p>
          </div>

          <div className="p-6 bg-emerald-50 rounded-2xl italic text-emerald-800 border-r-4 border-emerald-500">
            باستخدامك لموقع ديرة، فإنك توافق على ممارساتنا المتعلقة بالخصوصية المذكورة أعلاه.
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
