import { HelpCircle, ChevronDown, ChevronUp, Phone, Mail, Info, ShieldCheck, Building, User, ArrowLeft } from 'lucide-react';
import { FAQ_DATA, SUPPORT_INFO, BRAND_CONTACT } from '../data/mockData';
import SocialMatrix from '../components/SocialMatrix';

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-100 last:border-0 overflow-hidden">
    <button 
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left group"
    >
      <span className={`text-sm font-black transition-colors ${isOpen ? 'text-emerald-600' : 'text-gray-700 group-hover:text-emerald-500'}`}>
        {question}
      </span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0 ml-4" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-300 shrink-0 ml-4" />
      )}
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
      <p className="text-xs text-gray-500 leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
        {answer}
      </p>
    </div>
  </div>
);

const SupportView = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('consumer');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = activeTab === 'enterprise' ? FAQ_DATA.enterprise_procurement_faq : FAQ_DATA.general_consumer_faq;

  return (
    <div className="pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-emerald-800 pt-12 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/30 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-900/40 rounded-full -ml-24 -mb-24 blur-2xl"></div>
        
        <button 
          onClick={onBack}
          className="bg-white/10 backdrop-blur-md text-white p-2 rounded-xl mb-6 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-3xl font-black text-white mb-2 flex items-center">
          <HelpCircle className="w-8 h-8 mr-3 text-emerald-400" /> 支援中心
        </h1>
        <p className="text-emerald-100/70 text-xs font-medium">我們隨時準備為您的永續生活提供協助</p>
      </div>

      {/* Tabs */}
      <div className="px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-1.5 shadow-xl shadow-emerald-900/5 border border-emerald-50 flex gap-2">
          <button 
            onClick={() => { setActiveTab('consumer'); setOpenIndex(0); }}
            className={`flex-1 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'consumer' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <User className="w-4 h-4" /> 一般消費者
          </button>
          <button 
            onClick={() => { setActiveTab('enterprise'); setOpenIndex(0); }}
            className={`flex-1 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'enterprise' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <Building className="w-4 h-4" /> 企業 ESG 採購
          </button>
        </div>
      </div>

      {/* FAQ List */}
      <div className="px-6 mt-8">
        <div className="space-y-1">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            />
          ))}
        </div>
      </div>

      {/* About Us & Contact Section */}
      <div className="mt-12 px-6 space-y-8">
        {/* About Us */}
        <div className="bg-stone-50 rounded-[2.5rem] p-8 border border-stone-100">
          <h3 className="text-sm font-black text-emerald-800 mb-4 flex items-center uppercase tracking-widest">
            <Info className="w-4 h-4 mr-2" /> 關於阿古力
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed font-medium">
            阿古力社會企業由「財團法人豐泰文教基金會」於 2016 年獨資成立，初衷是為了推廣永續農業與友善食農。我們深耕雲林，透過支持無農藥、無化肥的友善耕作，守護台灣土地，並為小農解決銷路不穩的困境。
          </p>
        </div>

        {/* 安心檢驗報告 */}
        <div className="bg-emerald-50/30 rounded-[2.5rem] p-8 border border-emerald-100">
          <h3 className="text-sm font-black text-emerald-800 mb-6 flex items-center uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 mr-2" /> 安心檢驗報告
          </h3>
          <p className="text-[10px] text-emerald-600/60 mb-6 font-bold leading-relaxed">
            我們堅持第三方公正單位檢驗，為您的食安嚴格把關。點擊下方分類查看最新報告。
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '優質好米', id: 'rice' },
              { label: '在地特產', id: 'processed' },
              { label: '生鮮蔬果', id: 'veggies' },
              { label: '友善加工', id: 'factory' }
            ].map(report => (
              <a 
                key={report.id}
                href="https://www.agric.tw/blogs/%E6%AA%A2%E9%A9%93%E5%A0%B1%E5%91%8A" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white p-5 rounded-2xl border border-emerald-100 flex flex-col items-center gap-3 hover:shadow-lg hover:shadow-emerald-900/5 transition-all active:scale-95 group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-gray-700">{report.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div className="bg-amber-50/50 rounded-[2.5rem] p-8 border border-amber-100/50">
          <h3 className="text-sm font-black text-amber-800 mb-4 flex items-center uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 mr-2" /> 退換貨說明
          </h3>
          <p className="text-[11px] text-amber-700/80 leading-relaxed font-medium">
            {SUPPORT_INFO.return_policy}
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center text-center">
          <h3 className="text-lg font-black text-gray-900 mb-6">仍有疑問？聯絡我們</h3>
          <div className="flex flex-col gap-4 w-full">
            <a href="tel:056337510" className="flex items-center justify-center gap-3 bg-gray-50 hover:bg-emerald-50 py-4 rounded-2xl transition-colors border border-gray-100">
              <Phone className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-black text-gray-700">(05) 6337510</span>
            </a>
            <a href="mailto:hello@agric.tw" className="flex items-center justify-center gap-3 bg-gray-50 hover:bg-emerald-50 py-4 rounded-2xl transition-colors border border-gray-100">
              <Mail className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-black text-gray-700">hello@agric.tw</span>
            </a>
          </div>
          <p className="mt-6 text-[10px] text-gray-400 font-bold">服務時間：週一至週五 09:00 - 17:00</p>
        </div>

        {/* 關注我們 Social Matrix */}
        <div className="mt-12">
          <SocialMatrix className="!bg-white shadow-xl shadow-gray-200/50" />
        </div>
      </div>
    </div>
  );
};

export default SupportView;
