export const PRODUCTS = [
  { 
    id: 1, 
    category: "熱銷商品", 
    name: "脆爆BON米香-莓果BeLieve", 
    price: 160, 
    specs: "120g/包",
    origin: "雲林縣斗南鎮",
    certifications: ["ISO22000", "HACCP"],
    storage: "常溫保存，避免陽光直射",
    image: "https://images.unsplash.com/photo-1528588641076-3aa43eaafdfb?auto=format&fit=crop&q=80&w=400",
    description: "採用在地契作好米，搭配嚴選莓果，低溫烘焙保留營養，口感清脆不黏牙。"
  },
  { 
    id: 2, 
    category: "熱銷商品", 
    name: "米樂拾穗方塊酥", 
    price: 350, 
    specs: "450g/罐",
    origin: "嘉義縣民雄鄉",
    certifications: ["產銷履歷"],
    storage: "常溫保存",
    image: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?auto=format&fit=crop&q=80&w=400",
    description: "純手工製作，層次分明，鹹甜適中，是辦公室下午茶的首選。"
  },
  { 
    id: 3, 
    category: "熱銷商品", 
    name: "糙吉萊斯禮盒", 
    price: 480, 
    specs: "糙米餅x2 + 方塊酥x1",
    origin: "雲林/嘉義",
    certifications: ["三章一Q"],
    storage: "常溫保存",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400",
    description: "結合阿古力精選農產，精美包裝，是送給長輩與企業客戶的最佳健康禮選。"
  },
  { 
    id: 4, 
    category: "耘鄉好米", 
    name: "耘鄉有機白米 2Kg (台南11號)", 
    price: 320, 
    specs: "2kg/包",
    origin: "雲林縣古坑鄉",
    certifications: ["有機認證", "三章一Q"],
    storage: "建議冷藏以保持口感",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    description: "來自純淨水源灌溉，有機農法栽種，米粒飽滿Q彈，散發淡淡飯香。"
  },
  { 
    id: 5, 
    category: "耘鄉好米", 
    name: "土豆鳥永續米(白米)", 
    price: 120, 
    specs: "600g/包",
    origin: "雲林縣莿桐鄉",
    certifications: ["友善契作", "保育認證"],
    storage: "常溫保存",
    image: "https://images.unsplash.com/photo-1631526435010-09a25b29cb40?auto=format&fit=crop&q=80&w=400",
    description: "透過保護土豆鳥棲地，推廣不噴藥、不捕鳥的永續耕作，讓您吃得安心，也守護生態。"
  },
  { 
    id: 6, 
    category: "小農特產", 
    name: "小農百香果凍-400g-輕巧裝", 
    price: 100, 
    specs: "400g/袋 (約20入)",
    origin: "南投縣埔里鎮",
    certifications: ["無防腐劑"],
    storage: "常溫或冷藏皆可",
    image: "https://images.unsplash.com/photo-1550828520-4cb496926bfc?auto=format&fit=crop&q=80&w=400",
    description: "素貞大姊親手栽種的百香果，新鮮萃取果汁，口感滑順，每一口都是土地的芬芳。"
  },
  { 
    id: 7, 
    category: "在地好物", 
    name: "粒美麥(養生黑糖)", 
    price: 100, 
    specs: "300g/包",
    origin: "嘉義縣阿里山",
    certifications: ["手作認證"],
    storage: "常溫保存",
    image: "https://images.unsplash.com/photo-1595856752763-718617781b0a?auto=format&fit=crop&q=80&w=400",
    description: "遵循古法熬製，保留甘蔗原始營養，香氣濃郁，適合沖泡或烹飪使用。"
  },
  { 
    id: 8, 
    category: "禮盒專區", 
    name: "耘鄉糙米餅-蝦子口味 5包", 
    price: 500, 
    specs: "50g/包 x 5",
    origin: "彰化縣大城鄉",
    certifications: ["ISO22000"],
    storage: "常溫保存",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=400",
    description: "全穀糙米製作，搭配鮮蝦研磨入料，非油炸，是全家人的健康零嘴。"
  }
];

export const STORIES = [
  { 
    id: 1, 
    type: "故事", 
    title: "一日花：村姑素貞與不願放棄的百香果", 
    key_figures: "素貞", 
    related_product_id: 6,
    description: "即使面臨氣候變遷與病蟲害，素貞依然堅持無農藥友善耕作，守護每一顆百香果的純粹。這是一段關於韌性與土地共生的動人故事。", 
    image: "https://images.unsplash.com/photo-1595856752763-718617781b0a?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    id: 2, 
    type: "故事", 
    title: "從工廠到農場，打斷手骨顛倒勇的有機創業之路", 
    key_figures: "在地農夫", 
    related_product_id: 4,
    description: "從機械工廠的高薪職位回到屏東農村，用雙手重新找回土地的生命力。面臨初期的連續虧損，他如何堅持並打造出如今的有機綠洲？", 
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    id: 3, 
    type: "故事", 
    title: "小農故事－凃先生", 
    key_figures: "凃先生", 
    related_product_id: 5,
    description: "腳踏實地的在地農夫，用最樸實的方式，種出最安心的作物。他相信只有健康的土地，才能孕育出有生命力的果實。", 
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    id: 4, 
    type: "活動", 
    title: "豐泰家庭日｜豐心聚愛，益起同行", 
    key_figures: "豐泰同仁與家人", 
    related_product_id: 3,
    description: "2025 年豐泰家庭日首次以園遊會形式登場，透過食農工作坊與生態產地體驗，帶領上千個家庭親近友善農業，將環境永續理念深植於企業文化之中。", 
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400" 
  }
];

export const ESG_DATA = {
  esg_services: [
    "綠色採購與客製化訂單（含企業高階商務禮贈）",
    "企業員工餐廳有機及友善食材供應",
    "員工家庭專屬的有機食材訂閱方案",
    "長期友善契作與保價收購專案",
    "企業家庭日、食農教育、生態工作坊與產地體驗活動辦理",
    "六級化二級加工農產品開發（解決農產剩餘產能並實踐食物零浪費）"
  ],
  key_trends: [
    "企業採購由「價格導向」轉向「價值導向」",
    "將有機農業納入 TNFD 框架，投資自然資本",
    "導入智慧農業技術與全流程追蹤，強化 ESG 數據透明度",
    "轉向「區域集群採購」以強化供應鏈韌性並降低碳足跡"
  ],
  target_clients: [
    "大型金融業（如金控公司）",
    "高科技與半導體製造業",
    "面臨 TNFD 國際準則落地的上市櫃企業",
    "企業福委會與永續部門"
  ]
};

export const RESTAURANTS = [
  "Ooh Cha Cha 自然食",
  "呷米共食廚房",
  "家咖哩",
  "食在地 台灣素",
  "有蟲咬物文創餐屋",
  "飛魚食染"
];

export const SUPPORT_INFO = {
  shipping: [
    { title: "常溫配送", price: 150, free_threshold: 1500, description: "全台本島快速到貨" },
    { title: "冷藏配送", price: 250, free_threshold: 2500, description: "採用黑貓宅急便或專業冷鏈，確保鮮度" }
  ],
  return_policy: "農產品具易腐性，除運送過程損毀或品項不符外，恕不接受退貨。若有毀損請於收貨 24 小時內拍照聯繫客服。",
  faq: [
    { q: "下單後多久會收到？", a: "契作農產品通常於下單後 3-5 個工作天出貨，遇天候因素將另行通知。" },
    { q: "如何查詢我的訂單？", a: "目前系統採用 LINE 官方帳號同步，您可以登入會員中心或點擊下方 LINE 按鈕查詢。" },
    { q: "有提供企業大量採購優惠嗎？", a: "有的，請前往 ESG 專區點擊「聯絡專人規劃」，我們將提供客製化報價。" }
  ]
};
