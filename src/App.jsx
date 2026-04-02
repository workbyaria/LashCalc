import React, { useMemo, useState, useEffect } from "react";

/**
 * 美睫算算 LashCalc - 核心組件
 * 2026 1 20 最新修正並新增營收報表功能
 */

// 內建 SplashScreen
const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 650);
    const hideTimer = setTimeout(() => setIsVisible(false), 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center",
        "transition-opacity duration-300 ease-out",
        isFadingOut ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          "w-20 h-20 bg-[#BA797D] rounded-3xl flex items-center justify-center mb-4",
          "transition-transform duration-500 ease-out",
          isFadingOut ? "scale-[0.98]" : "scale-100",
        ].join(" ")}
        style={{ animation: "floatY 1.6s ease-in-out infinite" }}
      >
        <img
          src="/logo-mark.png"
          alt="LashCalc logo"
          className="w-20 h-20"
          draggable="false"
        />
      </div>

      <h1
        className={[
          "text-xl font-bold tracking-widest text-[#9E606F]",
          "transition-all duration-500 ease-out",
          isFadingOut
            ? "opacity-0 translate-y-[2px]"
            : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        LashCalc
      </h1>

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

// 圖示組件 - 使用內建 SVG 以確保跨平台兼容性
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    settings: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    chart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    trash: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    download: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    plus: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
    minus: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
    copy: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    ),
    check: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
    list: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    ),
    package: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.27 6.96 8.73 5.05 8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
    tag: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    chevronLeft: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    ),
    chevronRight: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    ),
    instagram: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="6" ry="6"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37Z"></path>
        <path d="M17.5 6.5h.01"></path>
      </svg>
    ),
    mail: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16v16H4z" opacity="0"></path>
        <path d="M4 6h16" />
        <path d="M4 6l8 6 8-6" />
        <path d="M4 6v12h16V6" />
      </svg>
    ),
    copyright: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M15.5 9.5a3.5 3.5 0 1 0 0 5" />
        <path d="M9 12a3.5 3.5 0 0 0 6.5 0" opacity="0" />
      </svg>
    ),
  };
  return <span className={className}>{icons[name] || null}</span>;
};

// 主題樣式配置
const theme = {
  primary: "#BA797D",
  textMain: "#9E606F",
  textMuted: "#A99CA0",
  selectedBg: "#F1DFDC",
  selectedBorder: "#BA797D",
  accent: "#BA797D",
  fontSize: {
    sectionTitle: "1rem",
    label: "0.7rem",
    btnMain: "0.875rem",
    btnSub: "0.75rem",
    baseBtnMain: "0.875rem",
    baseBtnSub: "0.75rem",
  },
};

const LOCALE_STORAGE_KEY = "app_locale";

const SUPPORTED_LOCALES = /** @type {const} */ (["zh-TW", "zh-CN", "en"]);

/** @typedef {(typeof SUPPORTED_LOCALES)[number]} AppLocale */

const normalizeLocale = (raw) => {
  if (!raw) return "zh-TW";
  const v = String(raw).trim();
  if (v === "zh-TW" || v === "zh-HK" || v === "zh-MO") return "zh-TW";
  if (v === "zh-CN" || v === "zh-SG" || v === "zh") return "zh-CN";
  if (v.startsWith("zh")) {
    // 粗略處理 zh-XX：若包含 Hans 視為簡體，否則預設繁體
    return v.toLowerCase().includes("hans") ? "zh-CN" : "zh-TW";
  }
  if (v.startsWith("en")) return "en";
  return "zh-TW";
};

const detectLocaleFromNavigator = () => {
  if (typeof navigator === "undefined") return "zh-TW";
  const langs = [
    navigator.language,
    ...(navigator.languages || []),
  ].filter(Boolean);
  for (const l of langs) {
    const n = normalizeLocale(l);
    if (SUPPORTED_LOCALES.includes(n)) return n;
  }
  return "zh-TW";
};

const getInitialLocale = () => {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(/** @type {any} */ (stored))) {
      return /** @type {AppLocale} */ (stored);
    }
  } catch {
    // ignore
  }
  return detectLocaleFromNavigator();
};

/** @type {Record<AppLocale, Record<string, string>>} */
const UI_STRINGS = {
  "zh-TW": {
    appTitle: "美睫算算 LashCalc",
    languageLabel: "介面語言",
    languageHint: "預設會依你的系統語言自動選擇；你也可以在這裡手動覆寫並記住。",
    language_zhTW: "繁體中文",
    language_zhCN: "简体中文",
    language_en: "English",

    studioNameLabel: "工作室名稱 Studio Name",
    studioNameHint: "※ 名稱將顯示於消費明細抬頭",

    pricingTitle: "價格設定",
    pricingLabel: "Pricing",

    sectionRemovalTitle: "卸除睫毛",
    sectionRemovalLabel: "Removal",
    sectionServiceTypeTitle: "服務類型",
    sectionServiceTypeLabel: "Service",
    sectionRefillPricingTitle: "補睫毛",
    sectionRefillPricingLabel: "Refill",
    sectionBaseAdminLabel: "Categories",
    sectionAddonsTitle: "加購造型",
    sectionAddonsLabel: "Add-ons",
    sectionSpaTitle: "護理保養",
    sectionSpaLabel: "Spa & Care",
    sectionOthersTitle: "產品加購",
    sectionOthersLabel: "Products",
    sectionProductLabel: "Products",
    sectionDiscountTitle: "優惠折抵",
    sectionDiscountLabel: "Discount",

    perFinger: "/ 指",
    perProductUnit: "/ 件",

    otherService: "其他",

    refillPricingSettingsTitle: "補睫毛（結帳顯示）",
    refillModeWeeks: "依週數",
    refillModeRoots: "依根數",
    refillPricingModeHint: "選擇結帳時要顯示週數方案或根數方案。兩組價格皆可在此編輯。",
    newRefillWeekTitle: "新增週數方案",
    newRefillRootTitle: "新增根數方案",
    refillTierNamePh: "方案名稱",
    ariaDeleteRefillWeek: "刪除週數方案",
    ariaDeleteRefillRoot: "刪除根數方案",
    errRefillTierName: "請輸入方案名稱",
    errRefillTierDup: "此方案名稱已存在",

    lineServiceType: "服務類型",
    lineRefillPricing: "補睫毛計價",

    discountNone: "無",
    discount95: "95折",
    discount9: "9折",
    discount85: "85折",
    discount8: "8折",
    discountFixed: "折 ${v}",
    discountCustom: "自定義折抵",

    reportsTitle: "營收報表",
    reportsLabel: "Reports",
    monthQuery: "查詢月份",
    revenueMonth: "當月營收",
    visitsMonth: "當月服務人次",
    checkoutRecords: "結帳紀錄",
    exportCsv: "匯出 CSV",
    noRecordsMonth: "該月份尚無紀錄",

    saveChanges: "儲存修改",

    bottomDiscounted: "已折抵",
    copy: "複製",
    copied: "已複製",
    checkout: "結帳",

    modalTitle: "消費明細",
    back: "返回",
    copyAndClose: "複製並關閉",

    newAddonTitle: "新增加購項目",
    addonNamePh: "加購名稱",
    addItem: "新增項目",
    ariaDeleteAddon: "刪除加購項目",

    newProductTitle: "新增產品項目",
    productNamePh: "產品名稱",
    ariaDeleteProduct: "刪除產品項目",

    newBaseTitle: "在類別下新增子款式",
    baseNamePh: "子款式名稱（例：100 根/泰式）",
    newBaseCategoryTitle: "新增款式類別",
    baseCategoryPh: "類別名稱（例：自然款）",
    baseSubCategoryLabel: "所屬類別",
    baseEmptyHint: "此類別尚無子款式，請至設定新增",
    ariaDeleteBase: "刪除子款式",
    ariaDeleteBaseCategory: "刪除款式類別",

    newRemovalTitle: "新增卸除服務項目",
    removalNamePh: "美睫服務名稱",
    ariaDeleteRemoval: "刪除卸除睫毛服務項目",

    newSpaTitle: "新增護理項目",
    spaNamePh: "護理名稱",
    ariaDeleteSpa: "刪除護理項目",

    errAddonName: "請輸入加購名稱",
    errPrice: "請輸入有效價格",
    errAddonDup: "此加購名稱已存在",
    errProductName: "請輸入產品名稱",
    errProductDup: "此產品名稱已存在",
    errBaseName: "請輸入子款式名稱",
    errBaseDup: "此類別下已有相同子款式名稱",
    errBaseCategoryName: "請輸入類別名稱",
    errBaseCategoryDup: "此類別名稱已存在",
    errBaseSubName: "請輸入子款式名稱",
    errBaseSubDup: "此類別下已有相同子款式名稱",
    errRemovalName: "請輸入卸除/補睫毛服務名稱",
    errRemovalDup: "此卸除/補睫毛服務名稱已存在",
    errSpaName: "請輸入護理服務名稱",
    errSpaDup: "此護理服務名稱已存在",

    summaryTitle: "消費明細",
    summaryThanks: "感謝您的預約，祝您有美好的一天！",
    summaryDiscount: "優惠折抵",
    summaryTotal: "總計",
    lineProduct: "產品加購",
    lineOther: "其他服務",

    recordFallback: "其他服務",

    csvHeader: "日期時間,施作項目,總金額",
    csvFilename: "美睫營收報表_${month}.csv",

    greetingMorningLine1: "早安，${name}",
    greetingMorningLine2: "願今天預約也滿滿！",
    greetingAfternoonLine1: "午安，${name}",
    greetingAfternoonLine2: "今天也要開開心心工作唷！",
    greetingNightLine1: "晚安，${name}",
    greetingNightLine2: "忙碌中也別忘了好好休息、吃飯喔！",
  },
  "zh-CN": {
    appTitle: "美睫算算 LashCalc",
    languageLabel: "界面语言",
    languageHint: "默认会跟随你的系统语言；你也可以在这里手动覆盖并记住。",
    language_zhTW: "繁体中文",
    language_zhCN: "简体中文",
    language_en: "English",

    studioNameLabel: "工作室名称 Studio Name",
    studioNameHint: "※ 名称将显示在消费明细抬头",

    pricingTitle: "价格设置",
    pricingLabel: "Pricing",

    sectionRemovalTitle: "卸除睫毛",
    sectionRemovalLabel: "Removal",
    sectionServiceTypeTitle: "服务类型",
    sectionServiceTypeLabel: "Service",
    sectionRefillPricingTitle: "补睫毛计价",
    sectionRefillPricingLabel: "Refill",
    sectionBaseAdminLabel: "Categories",
    sectionAddonsTitle: "加购造型",
    sectionAddonsLabel: "Add-ons",
    sectionSpaTitle: "护理保养",
    sectionSpaLabel: "Spa & Care",
    sectionOthersTitle: "产品加购",
    sectionOthersLabel: "Products",
    sectionProductLabel: "Products",
    sectionDiscountTitle: "优惠抵扣",
    sectionDiscountLabel: "Discount",

    perFinger: "/ 指",
    perProductUnit: "/ 件",

    otherService: "其他",

    refillPricingSettingsTitle: "补睫毛计价（结账显示）",
    refillModeWeeks: "按周数",
    refillModeRoots: "按根数",
    refillPricingModeHint: "选择结账时显示周数方案或根数方案。两组价格均可在此编辑。",
    newRefillWeekTitle: "新增周数方案",
    newRefillRootTitle: "新增根数方案",
    refillTierNamePh: "方案名称",
    ariaDeleteRefillWeek: "删除周数方案",
    ariaDeleteRefillRoot: "删除根数方案",
    errRefillTierName: "请输入方案名称",
    errRefillTierDup: "该方案名称已存在",

    lineServiceType: "服务类型",
    lineRefillPricing: "补睫毛计价",

    discountNone: "无",
    discount95: "95折",
    discount9: "9折",
    discount85: "85折",
    discount8: "8折",
    discountFixed: "减 ${v}",
    discountCustom: "自定义抵扣",

    reportsTitle: "营收报表",
    reportsLabel: "Reports",
    monthQuery: "查询月份",
    revenueMonth: "当月营收",
    visitsMonth: "当月服务人次",
    checkoutRecords: "结账记录",
    exportCsv: "导出 CSV",
    noRecordsMonth: "该月份暂无记录",

    saveChanges: "保存修改",

    bottomDiscounted: "已抵扣",
    copy: "复制",
    copied: "已复制",
    checkout: "结账",

    modalTitle: "消费明细",
    back: "返回",
    copyAndClose: "复制并关闭",

    newAddonTitle: "新增加购项目",
    addonNamePh: "加购名称",
    addItem: "新增项目",
    ariaDeleteAddon: "删除加购项目",

    newProductTitle: "新增产品项目",
    productNamePh: "产品名称",
    ariaDeleteProduct: "删除产品项目",

    newBaseTitle: "在大类下新增子款式",
    baseNamePh: "子款式名称",
    newBaseCategoryTitle: "新增款式大类",
    baseCategoryPh: "大类名称（例：自然款）",
    baseSubCategoryLabel: "所属大类",
    baseEmptyHint: "此大类尚无子款式，请至设置新增",
    ariaDeleteBase: "删除子款式",
    ariaDeleteBaseCategory: "删除款式大类",

    newRemovalTitle: "新增卸除/补睫毛服务项目",
    removalNamePh: "卸除/补睫毛服务名称",
    ariaDeleteRemoval: "删除卸除/补睫毛服务项目",

    newSpaTitle: "新增 SPA 服务项目",
    spaNamePh: "SPA 服务名称",
    ariaDeleteSpa: "删除 SPA 服务项目",

    errAddonName: "请输入加购名称",
    errPrice: "请输入有效价格",
    errAddonDup: "该加购名称已存在",
    errProductName: "请输入产品名称",
    errProductDup: "该产品名称已存在",
    errBaseName: "请输入子款式名称",
    errBaseDup: "该大类下已有相同子款式名称",
    errBaseCategoryName: "请输入大类名称",
    errBaseCategoryDup: "该大类名称已存在",
    errBaseSubName: "请输入子款式名称",
    errBaseSubDup: "该大类下已有相同子款式名称",
    errRemovalName: "请输入卸除/补睫毛服务名称",
    errRemovalDup: "此卸除/补睫毛服务名称已存在",
    errSpaName: "请输入 SPA 服务名称",
    errSpaDup: "此 SPA 服务名称已存在",

    summaryTitle: "消费明细",
    summaryThanks: "感谢您的预约，祝您有美好的一天！",
    summaryDiscount: "优惠抵扣",
    summaryTotal: "总计",
    lineProduct: "产品加购",
    lineOther: "其他服务",

    recordFallback: "其他服务",

    csvHeader: "日期时间,施作项目,总金额",
    csvFilename: "美睫营收报表_${month}.csv",

    greetingMorningLine1: "早安，${name}",
    greetingMorningLine2: "愿今天预约也满满！",
    greetingAfternoonLine1: "午安，${name}",
    greetingAfternoonLine2: "今天也要美美开工～",
    greetingNightLine1: "晚安，${name}",
    greetingNightLine2: "忙碌中也别忘了好好休息、吃饭喔！",
  },
  en: {
    appTitle: "LashCalc",
    languageLabel: "Language",
    languageHint:
      "Defaults to your system language.",
    language_zhTW: "Traditional Chinese",
    language_zhCN: "Simplified Chinese",
    language_en: "English",

    studioNameLabel: "Studio name",
    studioNameHint: "※ This name appears at the top of receipts.",

    pricingTitle: "Pricing",
    pricingLabel: "Pricing",

    sectionRemovalTitle: "Eyelash removal",
    sectionRemovalLabel: "Removal",
    sectionServiceTypeTitle: "Service type",
    sectionServiceTypeLabel: "Service",
    sectionRefillPricingTitle: "Refill pricing",
    sectionRefillPricingLabel: "Refill",
    sectionBaseAdminLabel: "Categories",
    sectionAddonsTitle: "Add-ons",
    sectionAddonsLabel: "Add-ons",
    sectionSpaTitle: "Spa & Care",
    sectionSpaLabel: "Spa & Care",
    sectionOthersTitle: "Product add-ons",
    sectionOthersLabel: "Products",
    sectionProductLabel: "Products",
    sectionDiscountTitle: "Discounts",
    sectionDiscountLabel: "Discount",

    perFinger: "/ nail",
    perProductUnit: "/ pc",

    otherService: "Other",

    refillPricingSettingsTitle: "Refill pricing (checkout)",
    refillModeWeeks: "By week",
    refillModeRoots: "By root count",
    refillPricingModeHint:
      "Choose whether checkout shows week-based or root-based tiers. You can edit both lists below.",
    newRefillWeekTitle: "Add week tier",
    newRefillRootTitle: "Add root tier",
    refillTierNamePh: "Tier name",
    ariaDeleteRefillWeek: "Delete week tier",
    ariaDeleteRefillRoot: "Delete root tier",
    errRefillTierName: "Please enter a tier name",
    errRefillTierDup: "This tier name already exists",

    lineServiceType: "Service type",
    lineRefillPricing: "Refill pricing",

    discountNone: "None",
    discount95: "5% off",
    discount9: "10% off",
    discount85: "15% off",
    discount8: "20% off",
    discountFixed: "-$${v}",
    discountCustom: "Custom discount",

    reportsTitle: "Reports",
    reportsLabel: "Reports",
    monthQuery: "Month",
    revenueMonth: "Revenue",
    visitsMonth: "Clients",
    checkoutRecords: "Checkout history",
    exportCsv: "Export CSV",
    noRecordsMonth: "No records for this month",

    saveChanges: "Save",

    bottomDiscounted: "Discounted",
    copy: "Copy",
    copied: "Copied",
    checkout: "Checkout",

    modalTitle: "Receipt",
    back: "Back",
    copyAndClose: "Copy & close",

    newAddonTitle: "Add add-on item",
    addonNamePh: "Item name",
    addItem: "Add item",
    ariaDeleteAddon: "Delete add-on item",

    newProductTitle: "Add product item",
    productNamePh: "Product name",
    ariaDeleteProduct: "Delete product item",

    newBaseTitle: "Add sub-style under a category",
    baseNamePh: "Sub-style name",
    newBaseCategoryTitle: "Add style category",
    baseCategoryPh: "Category (e.g. Classic)",
    baseSubCategoryLabel: "Category",
    baseEmptyHint: "No sub-styles yet — add them in Settings",
    ariaDeleteBase: "Delete sub-style",
    ariaDeleteBaseCategory: "Delete style category",

    newRemovalTitle: "Add removal/refill service item",
    removalNamePh: "Removal/refill service name",
    ariaDeleteRemoval: "Delete removal/refill service item",

    newSpaTitle: "Add SPA service item",
    spaNamePh: "SPA service name",
    ariaDeleteSpa: "Delete spa service item",

    errAddonName: "Please enter an item name",
    errPrice: "Please enter a valid price",
    errAddonDup: "This item name already exists",
    errProductName: "Please enter a product name",
    errProductDup: "This product name already exists",
    errBaseName: "Please enter a sub-style name",
    errBaseDup: "This sub-style already exists in the category",
    errBaseCategoryName: "Please enter a category name",
    errBaseCategoryDup: "This category name already exists",
    errBaseSubName: "Please enter a sub-style name",
    errBaseSubDup: "This sub-style already exists in the category",
    errRemovalName: "Please enter a removal/refill service name",
    errRemovalDup: "This removal/refill service name already exists",
    errSpaName: "Please enter a spa service name",
    errSpaDup: "This spa service name already exists",

    summaryTitle: "Receipt",
    summaryThanks: "Thank you for booking, have a great day!",
    summaryDiscount: "Discounts",
    summaryTotal: "Total",
    lineProduct: "Product add-on",
    lineOther: "Other services",

    recordFallback: "Other services",

    csvHeader: "Date/time,Service items,Total",
    csvFilename: "nail_revenue_${month}.csv",

    greetingMorningLine1: "Good morning, ${name}",
    greetingMorningLine2: "Hope your bookings are full today!",
    greetingAfternoonLine1: "Good afternoon, ${name}",
    greetingAfternoonLine2: "Have a great shift today!",
    greetingNightLine1: "Good evening, ${name}",
    greetingNightLine2: "Don’t forget to rest and eat well.",
  },
};

const tString = (locale, key, vars) => {
  const table = UI_STRINGS[locale] || UI_STRINGS["zh-TW"];
  let s = table[key] ?? UI_STRINGS["zh-TW"][key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      s = s.replaceAll(`\${${k}}`, String(v));
    });
  }
  return s;
};

/** @type {Record<AppLocale, Record<string, Record<string, string>>>} */
const PRICE_LABELS = {
  "zh-TW": {
    removal: {
      "本店 / 純卸除": "本店 / 純卸除",
      "本店 / 卸除續作": "本店 / 卸除續作",
      "他店 / 純卸除": "他店 / 純卸除",
      "他店 / 卸除續作": "他店 / 卸除續作",
    },
    base: {
      自然款: "自然款",
      濃密款: "濃密款",
      設計款: "設計款",
      客製款: "客製款",
    },
    baseStyle: {
      "100 根": "100 根",
      "120 根": "120 根",
      "150 根": "150 根",
      "200 根": "200 根",
      "250 根": "250 根",
      "300 根": "300 根",
      "400 根": "400 根",
      "500 根": "500 根",
      "600 根": "600 根",
      "200根": "200 根",
      "250根": "250 根",
      "300根": "300 根",
      "400根": "400 根",
      "500根": "500 根",
      "600根": "600 根",
      依現場: "依現場",
      仙子: "仙子",
      韓系: "韓系",
      漫畫: "漫畫",
      泰式: "泰式",
    },
    addons: {
      "根數(每根)": "根數",
      下睫毛: "下睫毛",
    },
    spa: {
      睫毛SPA: "睫毛SPA",
      深層清潔: "深層清潔",
      睫毛角蛋白: "睫毛角蛋白",
    },
    products: {
      睫毛雨衣: "睫毛雨衣",
      睫毛滋養液: "睫毛滋養液",
    },
    serviceType: {
      新接: "新嫁接",
      補睫毛: "補睫毛",
    },
    refill: {
      "1週內": "1 週內",
      "2週內": "2 週內",
      "3週內": "3 週內",
      "4週內": "4 週內",
      "50根": "50 根",
      "80根": "80 根",
      "100根": "100 根",
    },
  },
  "zh-CN": {
    removal: {
      "本店 / 純卸除": "本店 / 纯卸除",
      "本店 / 卸除續作": "本店 / 卸除续作",
      "他店 / 純卸除": "他店 / 纯卸除",
      "他店 / 卸除續作": "他店 / 卸除续作",
    },
    base: {
      自然款: "自然款",
      濃密款: "浓密款",
      設計款: "设计款",
      客製款: "客制款",
    },
    baseStyle: {
      "100 根": "100 根",
      "120 根": "120 根",
      "150 根": "150 根",
      "200 根": "200 根",
      "250 根": "250 根",
      "300 根": "300 根",
      "400 根": "400 根",
      "500 根": "500 根",
      "600 根": "600 根",
      "200根": "200 根",
      "250根": "250 根",
      "300根": "300 根",
      "400根": "400 根",
      "500根": "500 根",
      "600根": "600 根",
      依現場: "依现场",
      仙子: "仙子",
      韓系: "韩系",
      漫畫: "漫画",
      泰式: "泰式",
    },
    addons: {
      "根数(每根)": "根数",
      下睫毛: "下睫毛",
    },
    spa: {
      睫毛SPA: "睫毛SPA",
      深層清潔: "深层清洁",
      睫毛角蛋白: "睫毛角蛋白",
    },
    products: {
      睫毛雨衣: "睫毛雨衣",
      睫毛滋養液: "睫毛滋养液",
    },
    serviceType: {
      新嫁接: "新嫁接",
      補睫毛: "补睫毛",
    },
    refill: {
      "1週內": "1 周内",
      "2週內": "2 周内",
      "3週內": "3 周内",
      "4週內": "4 周内",
      "50根": "50 根",
      "80根": "80 根",
      "100根": "100 根",
    },
  },
  en: {
    removal: {
      "本店 / 純卸甲": "Soak-off removal only",
      "本店 / 卸甲續作": "Soak-off removal + new set",
      "他店 / 純卸甲": "Foreign removal",
      "他店 / 卸甲續作": "Foreign removal + new set",
    },
    base: {
      自然款: "Classic",
      濃密款: "Volume",
      設計款: "Design",
      客製款: "Custom",
    },
    baseStyle: {
      "100 根": "100 roots",
      "120 根": "120 roots",
      "150 根": "150 roots",
      "200 根": "200 roots",
      "250 根": "250 roots",
      "300 根": "300 roots",
      "400 根": "400 roots",
      "500 根": "500 roots",
      "600 根": "600 roots",
      "100根": "100 roots",
      "120根": "120 roots",
      "150根": "150 roots",
      "200根": "200 roots",
      "250根": "250 roots",
      "300根": "300 roots",
      "400根": "400 roots",
      "500根": "500 roots",
      "600根": "600 roots",
      依現場: "On-site quote",
      仙子: "Wispy",
      韓系: "Korean",
      漫畫: "Anime",
      泰式: "Thai",
    },
    addons: {
      "根數(每根)": "Root count",
      下睫毛: "Lower lashes",
      延甲: "Nail Extensions",
      水晶: "Builder Gel",
      手繪: "Hand-painted Designs",
      裝飾: "Nail Art",
    },
    spa: {
      睫毛SPA: "Lash SPA",
      深層清潔: "Deep Cleaning",
      睫毛角蛋白: "Lash Keratin",
    },
    products: {
      睫毛雨衣: "Lash top coat",
      睫毛生長液: "Lash growth serum",
    },
    serviceType: {
      新接: "New set",
      補睫毛: "Refill",
    },
    refill: {
      "1週內": "Within 1 wk",
      "2週內": "Within 2 wks",
      "3週內": "Within 3 wks",
      "4週內": "Within 4 wks",
      "50根": "50 roots",
      "80根": "80 roots",
      "100根": "100 roots",
    },
  },
};

const priceItemLabel = (locale, cat, key) => {
  const map = PRICE_LABELS[locale]?.[cat]?.[key];
  if (map) return map;
  return key;
};

/** @param {{ category: string, style: string } | null} sel */
const formatBaseSelectionLabel = (locale, sel) => {
  if (!sel) return "";
  const cat = priceItemLabel(locale, "base", sel.category);
  const st = priceItemLabel(locale, "baseStyle", sel.style);
  return `${cat} · ${st}`;
};

/** 款式／補睫毛計價子按鈕數量 → 網格：1＝滿寬一列；3 的倍數＝單列最多三欄；其餘＝單列最多兩欄 */
const getBaseRootButtonGridClass = (n) => {
  if (n <= 1) return "grid grid-cols-1 gap-2";
  if (n % 3 === 0) return "grid grid-cols-3 gap-2";
  return "grid grid-cols-2 gap-2";
};

const LOWER_LASH_ADDON_KEY = "下睫毛";

const LOWER_LASH_PRESETS = [10, 15, 20];

// 加購造型：下睫毛為每根單價 × 根數（10/15/20 快選，按鈕僅顯示數字）
const DEFAULT_ADDONS = {
  [LOWER_LASH_ADDON_KEY]: 0,
};

/** 自舊版移除「根數(每根)」預設加購 */
const LEGACY_ROOT_COUNT_ADDON_KEY = "根數(每根)";
const CUSTOM_ADDONS_STORAGE_KEY = "nail_custom_addons";

/** 舊版平面結構（僅供從 localStorage 遷移） */
const DEFAULT_BASE_STYLES_FLAT_LEGACY = {
  自然款: 900,
  濃密款: 1000,
  造型款: 1200,
  客製款: 1400,
};

/** 款式類別 → 根數方案（子按鈕標籤）→ 單價 */
const DEFAULT_BASE_NESTED = {
  自然款: { "100 根": 0, "120 根": 0, "150 根": 0 },
  濃密款: {
    "200 根": 0,
    "250 根": 0,
    "300 根": 0,
    "400 根": 0,
    "500 根": 0,
    "600 根": 0,
  },
  設計款: { 仙子: 0, 韓系: 0, 漫畫: 0, 泰式: 0 },
  客製款: { 依現場: 0 },
};

const CUSTOM_BASE_STYLES_STORAGE_KEY = "nail_custom_base_styles";

// V2: 平面覆蓋（舊版）；V3: 類別＋子款式巢狀
const BASE_STYLES_OVERRIDE_STORAGE_KEY = "lash_base_styles_v2";
const BASE_STYLES_NESTED_STORAGE_KEY = "lash_base_styles_v3";
const ADDONS_OVERRIDE_STORAGE_KEY = "lash_addons_v2";

const SPA_OVERRIDE_STORAGE_KEY = "lash_spa_v2";
const REMOVAL_OVERRIDE_STORAGE_KEY = "lash_removal_v2";
const PRODUCTS_OVERRIDE_STORAGE_KEY = "lash_products_v1";
const REFILL_CONFIG_STORAGE_KEY = "lash_refill_config_v1";

/** 款式預設（自然／濃密子按鈕等）更新時遞增，載入前清除舊儲存以套用最新 DEFAULT_BASE_NESTED */
const BASE_DEFAULTS_SCHEMA_VERSION = 3;
const BASE_DEFAULTS_VERSION_STORAGE_KEY = "lash_base_defaults_version";

(function migrateBaseDefaultsSchemaIfNeeded() {
  try {
    const v = localStorage.getItem(BASE_DEFAULTS_VERSION_STORAGE_KEY);
    if (v === String(BASE_DEFAULTS_SCHEMA_VERSION)) return;
    localStorage.removeItem(BASE_STYLES_NESTED_STORAGE_KEY);
    localStorage.removeItem(BASE_STYLES_OVERRIDE_STORAGE_KEY);
    localStorage.removeItem(CUSTOM_BASE_STYLES_STORAGE_KEY);
    localStorage.setItem(
      BASE_DEFAULTS_VERSION_STORAGE_KEY,
      String(BASE_DEFAULTS_SCHEMA_VERSION)
    );
  } catch {
    // ignore
  }
})();

const SERVICE_TYPE_NEW = "新嫁接";
const SERVICE_TYPE_REFILL = "補睫毛";
const REFILL_MODE_WEEKS = "weeks";
const REFILL_MODE_ROOTS = "roots";

const DEFAULT_REFILL_WEEKS = {
  "1週內": 0,
  "2週內": 0,
  "3週內": 0,
  "4週內": 0,
};
const DEFAULT_REFILL_ROOTS = {
  "50根": 0,
  "80根": 0,
  "100根": 0,
};

/** 產品加購：品項 → 單價（預設兩項，店家可於設定調整／增刪） */
const DEFAULT_PRODUCTS = {
  睫毛雨衣: 0,
  睫毛生長液: 0,
};

const DEFAULT_SPA_SERVICES = {
  睫毛SPA: 300,
  深層清潔: 1000,
  睫毛角蛋白: 500,
};
const CUSTOM_SPA_STORAGE_KEY = "nail_custom_spa";

const getStoredCustomAddons = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_ADDONS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([name, price]) =>
          typeof name === "string" &&
          name.trim() &&
          typeof price === "number" &&
          Number.isFinite(price) &&
          price >= 0
      )
    );
  } catch {
    return {};
  }
};

const getStoredCustomBaseStyles = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_BASE_STYLES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([name, price]) =>
          typeof name === "string" &&
          name.trim() &&
          typeof price === "number" &&
          Number.isFinite(price) &&
          price >= 0
      )
    );
  } catch {
    return {};
  }
};

const getStoredOverrideMap = (storageKey) => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const entries = Object.entries(parsed).filter(
      ([name, price]) =>
        typeof name === "string" &&
        name.trim() &&
        typeof price === "number" &&
        Number.isFinite(price) &&
        price >= 0
    );
    return Object.fromEntries(entries);
  } catch {
    return null;
  }
};

/** 將任意已存資料正規化為 類別→{子款式→價格}（含舊版平面價） */
const normalizeBaseNested = (parsed) => {
  if (!parsed || typeof parsed !== "object") return null;
  const out = {};
  for (const [cat, val] of Object.entries(parsed)) {
    if (typeof cat !== "string" || !cat.trim()) continue;
    if (typeof val === "number" && Number.isFinite(val) && val >= 0) {
      out[cat] = { [cat]: val };
      continue;
    }
    if (val && typeof val === "object" && !Array.isArray(val)) {
      const styles = Object.fromEntries(
        Object.entries(val).filter(
          ([sn, p]) =>
            typeof sn === "string" &&
            sn.trim() &&
            typeof p === "number" &&
            Number.isFinite(p) &&
            p >= 0
        )
      );
      out[cat] = styles;
    }
  }
  return Object.keys(out).length ? out : null;
};

const migrateLegacyFlatBase = (flat) => {
  const nested = {};
  for (const [cat, price] of Object.entries(flat)) {
    if (typeof price !== "number" || !Number.isFinite(price) || price < 0)
      continue;
    const categoryKey = cat === "造型款" ? "設計款" : cat;
    nested[categoryKey] = { ...(nested[categoryKey] || {}), [cat]: price };
  }
  return nested;
};

const getStoredBaseNested = () => {
  try {
    const rawV3 = localStorage.getItem(BASE_STYLES_NESTED_STORAGE_KEY);
    if (rawV3) {
      const n = normalizeBaseNested(JSON.parse(rawV3));
      if (n) return n;
    }
  } catch {
    // ignore
  }
  try {
    const rawV2 = localStorage.getItem(BASE_STYLES_OVERRIDE_STORAGE_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      const n = normalizeBaseNested(parsed);
      if (n) return n;
    }
  } catch {
    // ignore
  }
  const flat = getStoredOverrideMap(BASE_STYLES_OVERRIDE_STORAGE_KEY);
  if (flat && Object.keys(flat).length) return migrateLegacyFlatBase(flat);
  const custom = getStoredCustomBaseStyles();
  if (custom && Object.keys(custom).length)
    return migrateLegacyFlatBase(custom);
  return null;
};

const getStoredAddonsOverride = () =>
  getStoredOverrideMap(ADDONS_OVERRIDE_STORAGE_KEY);

const getStoredSpaOverride = () => getStoredOverrideMap(SPA_OVERRIDE_STORAGE_KEY);

const getStoredRemovalOverride = () =>
  getStoredOverrideMap(REMOVAL_OVERRIDE_STORAGE_KEY);

const getStoredProductsOverride = () =>
  getStoredOverrideMap(PRODUCTS_OVERRIDE_STORAGE_KEY);

const normalizePriceMap = (o) => {
  if (!o || typeof o !== "object") return null;
  const entries = Object.entries(o).filter(
    ([k, v]) =>
      typeof k === "string" &&
      k.trim() &&
      typeof v === "number" &&
      Number.isFinite(v) &&
      v >= 0
  );
  return entries.length ? Object.fromEntries(entries) : null;
};

const getStoredRefillConfig = () => {
  try {
    const raw = localStorage.getItem(REFILL_CONFIG_STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!p || typeof p !== "object") return null;
    const mode =
      p.mode === REFILL_MODE_ROOTS ? REFILL_MODE_ROOTS : REFILL_MODE_WEEKS;
    return {
      mode,
      weeks: normalizePriceMap(p.weeks),
      roots: normalizePriceMap(p.roots),
    };
  } catch {
    return null;
  }
};

const getStoredCustomSpa = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_SPA_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([name, price]) =>
          typeof name === "string" &&
          name.trim() &&
          typeof price === "number" &&
          Number.isFinite(price) &&
          price >= 0
      )
    );
  } catch {
    return {};
  }
};

const getStoredRecords = () => {
  try {
    const raw = localStorage.getItem("nail_records");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const App = () => {
  // 狀態管理
  const [locale, setLocale] = useState(() => getInitialLocale());
  const [studioName, setStudioName] = useState(
    () => localStorage.getItem("studioName") || "My Studio"
  );
  const [view, setView] = useState("calculator");
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newAddonName, setNewAddonName] = useState("");
  const [newAddonPrice, setNewAddonPrice] = useState("");
  const [addonFormError, setAddonFormError] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [productFormError, setProductFormError] = useState("");
  const [refillPricingMode, setRefillPricingMode] = useState(() => {
    const c = getStoredRefillConfig();
    return c?.mode === REFILL_MODE_ROOTS ? REFILL_MODE_ROOTS : REFILL_MODE_WEEKS;
  });
  const [newRefillWeekName, setNewRefillWeekName] = useState("");
  const [newRefillWeekPrice, setNewRefillWeekPrice] = useState("");
  const [newRefillRootName, setNewRefillRootName] = useState("");
  const [newRefillRootPrice, setNewRefillRootPrice] = useState("");
  const [refillWeekFormError, setRefillWeekFormError] = useState("");
  const [refillRootFormError, setRefillRootFormError] = useState("");
  const [newBaseCategoryName, setNewBaseCategoryName] = useState("");
  const [newSubStyleCategory, setNewSubStyleCategory] = useState("");
  const [newSubStyleName, setNewSubStyleName] = useState("");
  const [newSubStylePrice, setNewSubStylePrice] = useState("");
  const [baseFormError, setBaseFormError] = useState("");
  const [newRemovalName, setNewRemovalName] = useState("");
  const [newRemovalPrice, setNewRemovalPrice] = useState("");
  const [removalFormError, setRemovalFormError] = useState("");
  const [newSpaName, setNewSpaName] = useState("");
  const [newSpaPrice, setNewSpaPrice] = useState("");
  const [spaFormError, setSpaFormError] = useState("");
  const [records, setRecords] = useState(() => getStoredRecords());

  const t = useMemo(() => {
    return (key, vars) => tString(locale, key, vars);
  }, [locale]);

  // 報表專用月份選擇狀態
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  // 同步介面語言
  useEffect(() => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale]);

  useEffect(() => {
    setAddonFormError("");
    setProductFormError("");
    setBaseFormError("");
    setRemovalFormError("");
    setSpaFormError("");
    setNewBaseCategoryName("");
    setNewSubStyleName("");
    setNewSubStylePrice("");
    setNewProductName("");
    setNewProductPrice("");
    setNewRefillWeekName("");
    setNewRefillWeekPrice("");
    setNewRefillRootName("");
    setNewRefillRootPrice("");
    setRefillWeekFormError("");
    setRefillRootFormError("");
  }, [locale]);

  // 同步工作室名稱
  useEffect(() => localStorage.setItem("studioName", studioName), [studioName]);
  // 同步紀錄
  useEffect(
    () => localStorage.setItem("nail_records", JSON.stringify(records)),
    [records]
  );

  // 獲取當前年份
  const currentYear = new Date().getFullYear();
  const developerName = "Friendly Cat Group";

  // 價格設定
  const [prices, setPrices] = useState(() => ({
    removal:
      getStoredRemovalOverride() ?? {
        "本店 / 純卸除": 300,
        "本店 / 卸除續作": 100,
        "他店 / 純卸除": 500,
        "他店 / 卸除續作": 300,
      },
    base: getStoredBaseNested() ?? { ...DEFAULT_BASE_NESTED },
    addons: (() => {
      const merged = {
        ...DEFAULT_ADDONS,
        ...(getStoredAddonsOverride() ?? {}),
        ...getStoredCustomAddons(),
      };
      const { [LEGACY_ROOT_COUNT_ADDON_KEY]: _removed, ...rest } = merged;
      return rest;
    })(),
    spa:
      getStoredSpaOverride() ?? {
        ...DEFAULT_SPA_SERVICES,
        ...getStoredCustomSpa(),
      },
    products: getStoredProductsOverride() ?? { ...DEFAULT_PRODUCTS },
    refillWeeks: (() => {
      const c = getStoredRefillConfig();
      return c?.weeks ?? { ...DEFAULT_REFILL_WEEKS };
    })(),
    refillRoots: (() => {
      const c = getStoredRefillConfig();
      return c?.roots ?? { ...DEFAULT_REFILL_ROOTS };
    })(),
  }));

  const [selections, setSelections] = useState({
    serviceType: null,
    removal: null,
    base: null,
    refill: null,
    addons: {},
    spa: [],
    products: {},
    customOther: 0,
    discountType: "none",
    discountVal: 0,
  });

  // 同步自訂加購到本機儲存
  useEffect(() => {
    const customAddons = Object.fromEntries(
      Object.entries(prices.addons).filter(([name]) => !(name in DEFAULT_ADDONS))
    );
    // V2 override: 支援刪除預設項目並持久化
    localStorage.setItem(
      ADDONS_OVERRIDE_STORAGE_KEY,
      JSON.stringify(prices.addons)
    );
    // 舊 key：保留相容用
    localStorage.setItem(CUSTOM_ADDONS_STORAGE_KEY, JSON.stringify(customAddons));
  }, [prices.addons]);

  // 同步款式（類別＋子款式）到本機儲存
  useEffect(() => {
    try {
      localStorage.setItem(
        BASE_STYLES_NESTED_STORAGE_KEY,
        JSON.stringify(prices.base)
      );
    } catch {
      // ignore
    }
  }, [prices.base]);

  // 同步自訂 SPA 到本機儲存
  useEffect(() => {
    // V2 override：支援刪除預設項目並持久化（包含預設項目刪除）
    localStorage.setItem(SPA_OVERRIDE_STORAGE_KEY, JSON.stringify(prices.spa));
    // 舊 key：僅保留自訂項目（相容舊版資料）
    const customSpa = Object.fromEntries(
      Object.entries(prices.spa).filter(
        ([name]) => !(name in DEFAULT_SPA_SERVICES)
      )
    );
    localStorage.setItem(CUSTOM_SPA_STORAGE_KEY, JSON.stringify(customSpa));
  }, [prices.spa]);

  // 同步自訂 Removal 到本機儲存（支援新增/刪除）
  useEffect(() => {
    localStorage.setItem(
      REMOVAL_OVERRIDE_STORAGE_KEY,
      JSON.stringify(prices.removal)
    );
  }, [prices.removal]);

  useEffect(() => {
    try {
      localStorage.setItem(
        PRODUCTS_OVERRIDE_STORAGE_KEY,
        JSON.stringify(prices.products)
      );
    } catch {
      // ignore
    }
  }, [prices.products]);

  useEffect(() => {
    try {
      localStorage.setItem(
        REFILL_CONFIG_STORAGE_KEY,
        JSON.stringify({
          mode: refillPricingMode,
          weeks: prices.refillWeeks,
          roots: prices.refillRoots,
        })
      );
    } catch {
      // ignore
    }
  }, [refillPricingMode, prices.refillWeeks, prices.refillRoots]);

  // 計算邏輯
  const getSubtotal = () => {
    let subtotal = 0;
    if (selections.base) {
      const { category, style } = selections.base;
      subtotal += prices.base[category]?.[style] || 0;
    }
    if (
      selections.serviceType === SERVICE_TYPE_REFILL &&
      selections.refill
    ) {
      const tbl =
        refillPricingMode === REFILL_MODE_WEEKS
          ? prices.refillWeeks
          : prices.refillRoots;
      subtotal += tbl[selections.refill] || 0;
    }
    Object.keys(selections.addons).forEach((key) => {
      subtotal += (prices.addons[key] || 0) * (selections.addons[key] || 0);
    });
    selections.spa.forEach((item) => {
      subtotal += prices.spa[item] || 0;
    });
    Object.keys(selections.products || {}).forEach((key) => {
      subtotal +=
        (prices.products[key] || 0) * (selections.products[key] || 0);
    });
    subtotal += Number(selections.customOther) || 0;
    if (selections.removal) subtotal += prices.removal[selections.removal] || 0;
    return subtotal;
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    if (selections.discountType === "percent")
      return Math.round(subtotal * (1 - selections.discountVal));
    if (selections.discountType === "fixed") return selections.discountVal;
    return 0;
  };

  const calculateTotal = () => Math.max(0, getSubtotal() - getDiscountAmount());

  const generateSummaryText = () => {
    let text = `🤍 ${studioName} ${t("summaryTitle")} 🤍\n----------------------\n`;
    if (selections.serviceType)
      text += `▫️ ${t("lineServiceType")}: ${priceItemLabel(
        locale,
        "serviceType",
        selections.serviceType
      )}\n`;
    if (selections.base) {
      const { category, style } = selections.base;
      text += `▫️ ${formatBaseSelectionLabel(locale, selections.base)}: $${
        prices.base[category]?.[style] ?? 0
      }\n`;
    }
    if (
      selections.serviceType === SERVICE_TYPE_REFILL &&
      selections.refill
    ) {
      const tbl =
        refillPricingMode === REFILL_MODE_WEEKS
          ? prices.refillWeeks
          : prices.refillRoots;
      text += `▫️ ${t("lineRefillPricing")}: ${priceItemLabel(
        locale,
        "refill",
        selections.refill
      )} $${tbl[selections.refill] ?? 0}\n`;
    }
    Object.keys(selections.addons).forEach((key) => {
      if (selections.addons[key] > 0)
        text += `▫️ ${priceItemLabel(locale, "addons", key)} x${
          selections.addons[key]
        }: $${prices.addons[key] * selections.addons[key]}\n`;
    });
    selections.spa.forEach((item) => {
      text += `▫️ ${priceItemLabel(locale, "spa", item)}: $${prices.spa[item]}\n`;
    });
    Object.keys(selections.products || {}).forEach((key) => {
      const q = selections.products[key] || 0;
      if (q > 0)
        text += `▫️ ${priceItemLabel(locale, "products", key)} x${q}: $${
          (prices.products[key] || 0) * q
        }\n`;
    });
    if (selections.customOther > 0)
      text += `▫️ ${t("lineOther")}: $${selections.customOther}\n`;
    if (selections.removal)
      text += `▫️ ${priceItemLabel(locale, "removal", selections.removal)}: $${
        prices.removal[selections.removal]
      }\n`;
    const discount = getDiscountAmount();
    if (discount > 0)
      text += `----------------------\n🤍 ${t("summaryDiscount")}: -$${discount}\n`;
    text += `----------------------\n🤍 ${t("summaryTotal")}: $${calculateTotal()}\n\n ${t(
      "summaryThanks"
    )}`;
    return text;
  };

  const copyToClipboard = () => {
    const text = generateSummaryText();
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    document.body.removeChild(textArea);
  };

  // 完成結帳並儲存紀錄
  const finalizePayment = () => {
    const total = calculateTotal();
    const itemsSummary = [
      selections.serviceType
        ? `${t("lineServiceType")}:${priceItemLabel(
            locale,
            "serviceType",
            selections.serviceType
          )}`
        : null,
      selections.base ? formatBaseSelectionLabel(locale, selections.base) : null,
      selections.serviceType === SERVICE_TYPE_REFILL && selections.refill
        ? `${priceItemLabel(locale, "refill", selections.refill)}`
        : null,
      ...Object.keys(selections.addons || {})
        .filter((k) => (selections.addons[k] || 0) > 0)
        .map(
          (k) =>
            `${priceItemLabel(locale, "addons", k)} x${selections.addons[k]}`
        ),
      ...selections.spa.map((item) => priceItemLabel(locale, "spa", item)),
      ...Object.keys(selections.products || {})
        .filter((k) => (selections.products[k] || 0) > 0)
        .map(
          (k) =>
            `${priceItemLabel(locale, "products", k)} x${selections.products[k]}`
        ),
      selections.customOther > 0 ? `${t("lineOther")}` : null,
      selections.removal
        ? priceItemLabel(locale, "removal", selections.removal)
        : null,
    ]
      .filter(Boolean)
      .join(", ");
    const now = new Date();
    const dateLocale =
      locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : "zh-TW";
    const newRecord = {
      id: Date.now(),
      date: now.toLocaleString(dateLocale, { hour12: false }), // 例如 "2024/1/19 23:45:00"
      items: itemsSummary || t("recordFallback"),
      amount: total,
      // 輔助過濾欄位
      month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}`,
    };
    setRecords((prev) => [newRecord, ...prev]);
    copyToClipboard();
    setShowModal(false);
    // 重置選擇
    setSelections({
      serviceType: null,
      removal: null,
      base: null,
      refill: null,
      addons: {},
      spa: [],
      products: {},
      customOther: 0,
      discountType: "none",
      discountVal: 0,
    });
  };

  const deleteRecord = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // 月份切換邏輯
  const changeMonth = (offset) => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const date = new Date(year, month - 1 + offset, 1);
    setSelectedMonth(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    );
  };

  // 過濾當前選定月份的紀錄
  const filteredRecords = records.filter((r) => {
    // 兼容舊數據：如果紀錄沒有 month 屬性，嘗試從 date 字串解析
    if (r.month) return r.month === selectedMonth;
    const dateParts = r.date.split("/");
    if (dateParts.length >= 2) {
      const m = `${dateParts[0]}-${String(dateParts[1]).padStart(2, "0")}`;
      return m === selectedMonth;
    }
    return false;
  });

  // 營收導出 CSV (僅導出目前所選月份)
  const exportToCSV = () => {
    if (filteredRecords.length === 0) return;
    let csvContent = `\uFEFF${t("csvHeader")}\n`;
    filteredRecords.forEach((r) => {
      csvContent += `${r.date},"${r.items}",${r.amount}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = t("csvFilename", { month: selectedMonth });
    link.click();
  };

  const toggleBaseSelection = (category, style) => {
    setSelections((prev) => {
      const cur = prev.base;
      if (
        cur &&
        cur.category === category &&
        cur.style === style
      ) {
        return { ...prev, base: null };
      }
      return { ...prev, base: { category, style } };
    });
  };

  const setServiceType = (type) => {
    setSelections((prev) => {
      const nextType = prev.serviceType === type ? null : type;
      return {
        ...prev,
        serviceType: nextType,
        refill: nextType === SERVICE_TYPE_REFILL ? prev.refill : null,
      };
    });
  };

  const toggleRefillTier = (key) => {
    setSelections((prev) => ({
      ...prev,
      refill: prev.refill === key ? null : key,
    }));
  };

  const toggleSelection = (category, item) => {
    setSelections((prev) => {
      if (category === "removal")
        return { ...prev, [category]: prev[category] === item ? null : item };
      if (category === "spa")
        return {
          ...prev,
          spa: prev.spa.includes(item)
            ? prev.spa.filter((i) => i !== item)
            : [...prev.spa, item],
        };
      return prev;
    });
  };

  const getAddonUnitLabel = (addonKey) => {
    if (addonKey === LOWER_LASH_ADDON_KEY)
      return locale === "en" ? "/root" : "/根";
    return "";
  };

  const addCustomAddon = () => {
    const name = newAddonName.trim();
    const price = Number(newAddonPrice);

    if (!name) {
      setAddonFormError(t("errAddonName"));
      return;
    }

    if (Number.isNaN(price) || price < 0) {
      setAddonFormError(t("errPrice"));
      return;
    }

    if (prices.addons[name] !== undefined) {
      setAddonFormError(t("errAddonDup"));
      return;
    }

    setPrices((prev) => ({
      ...prev,
      addons: { ...prev.addons, [name]: price },
    }));
    setNewAddonName("");
    setNewAddonPrice("");
    setAddonFormError("");
  };

  const removeCustomAddon = (name) => {
    setPrices((prev) => {
      const nextAddons = { ...prev.addons };
      delete nextAddons[name];
      return { ...prev, addons: nextAddons };
    });

    setSelections((prev) => {
      if (prev.addons[name] === undefined) return prev;
      const nextSelectedAddons = { ...prev.addons };
      delete nextSelectedAddons[name];
      return { ...prev, addons: nextSelectedAddons };
    });
  };

  const addCustomProduct = () => {
    const name = newProductName.trim();
    const price = Number(newProductPrice);

    if (!name) {
      setProductFormError(t("errProductName"));
      return;
    }

    if (Number.isNaN(price) || price < 0) {
      setProductFormError(t("errPrice"));
      return;
    }

    if (prices.products[name] !== undefined) {
      setProductFormError(t("errProductDup"));
      return;
    }

    setPrices((prev) => ({
      ...prev,
      products: { ...prev.products, [name]: price },
    }));
    setNewProductName("");
    setNewProductPrice("");
    setProductFormError("");
  };

  const removeCustomProduct = (name) => {
    setPrices((prev) => {
      const next = { ...prev.products };
      delete next[name];
      return { ...prev, products: next };
    });

    setSelections((prev) => {
      if (prev.products[name] === undefined) return prev;
      const nextSel = { ...prev.products };
      delete nextSel[name];
      return { ...prev, products: nextSel };
    });
  };

  const addRefillWeekTier = () => {
    const name = newRefillWeekName.trim();
    const price = Number(newRefillWeekPrice);
    if (!name) {
      setRefillWeekFormError(t("errRefillTierName"));
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setRefillWeekFormError(t("errPrice"));
      return;
    }
    if (prices.refillWeeks[name] !== undefined) {
      setRefillWeekFormError(t("errRefillTierDup"));
      return;
    }
    setPrices((prev) => ({
      ...prev,
      refillWeeks: { ...prev.refillWeeks, [name]: price },
    }));
    setNewRefillWeekName("");
    setNewRefillWeekPrice("");
    setRefillWeekFormError("");
  };

  const removeRefillWeekTier = (name) => {
    setPrices((prev) => {
      const next = { ...prev.refillWeeks };
      delete next[name];
      return { ...prev, refillWeeks: next };
    });
    setSelections((prev) =>
      prev.refill === name ? { ...prev, refill: null } : prev
    );
  };

  const addRefillRootTier = () => {
    const name = newRefillRootName.trim();
    const price = Number(newRefillRootPrice);
    if (!name) {
      setRefillRootFormError(t("errRefillTierName"));
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setRefillRootFormError(t("errPrice"));
      return;
    }
    if (prices.refillRoots[name] !== undefined) {
      setRefillRootFormError(t("errRefillTierDup"));
      return;
    }
    setPrices((prev) => ({
      ...prev,
      refillRoots: { ...prev.refillRoots, [name]: price },
    }));
    setNewRefillRootName("");
    setNewRefillRootPrice("");
    setRefillRootFormError("");
  };

  const removeRefillRootTier = (name) => {
    setPrices((prev) => {
      const next = { ...prev.refillRoots };
      delete next[name];
      return { ...prev, refillRoots: next };
    });
    setSelections((prev) =>
      prev.refill === name ? { ...prev, refill: null } : prev
    );
  };

  const addBaseCategory = () => {
    const name = newBaseCategoryName.trim();
    if (!name) {
      setBaseFormError(t("errBaseCategoryName"));
      return;
    }
    if (prices.base[name] !== undefined) {
      setBaseFormError(t("errBaseCategoryDup"));
      return;
    }
    setPrices((prev) => ({
      ...prev,
      base: { ...prev.base, [name]: {} },
    }));
    setNewBaseCategoryName("");
    setBaseFormError("");
    setNewSubStyleCategory(name);
  };

  const addBaseSubStyle = () => {
    const cat =
      newSubStyleCategory.trim() || Object.keys(prices.base)[0] || "";
    const styleName = newSubStyleName.trim();
    const price = Number(newSubStylePrice);

    if (!cat) {
      setBaseFormError(t("errBaseCategoryName"));
      return;
    }
    if (!styleName) {
      setBaseFormError(t("errBaseSubName"));
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setBaseFormError(t("errPrice"));
      return;
    }
    if (prices.base[cat]?.[styleName] !== undefined) {
      setBaseFormError(t("errBaseSubDup"));
      return;
    }

    setPrices((prev) => ({
      ...prev,
      base: {
        ...prev.base,
        [cat]: { ...(prev.base[cat] || {}), [styleName]: price },
      },
    }));
    setNewSubStyleName("");
    setNewSubStylePrice("");
    setBaseFormError("");
  };

  const removeBaseStyle = (category, styleName) => {
    setPrices((prev) => {
      const styles = { ...(prev.base[category] || {}) };
      delete styles[styleName];
      return {
        ...prev,
        base: { ...prev.base, [category]: styles },
      };
    });
    setSelections((prev) => {
      const cur = prev.base;
      if (cur?.category === category && cur?.style === styleName) {
        return { ...prev, base: null };
      }
      return prev;
    });
  };

  const removeBaseCategory = (category) => {
    setPrices((prev) => {
      const next = { ...prev.base };
      delete next[category];
      return { ...prev, base: next };
    });
    setSelections((prev) => {
      if (prev.base?.category === category) return { ...prev, base: null };
      return prev;
    });
    setNewSubStyleCategory((c) => (c === category ? "" : c));
  };

  const addCustomRemoval = () => {
    const name = newRemovalName.trim();
    const price = Number(newRemovalPrice);

    if (!name) {
      setRemovalFormError(t("errRemovalName"));
      return;
    }

    if (Number.isNaN(price) || price < 0) {
      setRemovalFormError(t("errPrice"));
      return;
    }

    if (prices.removal[name] !== undefined) {
      setRemovalFormError(t("errRemovalDup"));
      return;
    }

    setPrices((prev) => ({
      ...prev,
      removal: { ...prev.removal, [name]: price },
    }));
    setNewRemovalName("");
    setNewRemovalPrice("");
    setRemovalFormError("");
  };

  const removeCustomRemoval = (name) => {
    setPrices((prev) => {
      const nextRemoval = { ...prev.removal };
      delete nextRemoval[name];
      return { ...prev, removal: nextRemoval };
    });

    setSelections((prev) => {
      if (prev.removal !== name) return prev;
      return { ...prev, removal: null };
    });
  };

  const addCustomSpa = () => {
    const name = newSpaName.trim();
    const price = Number(newSpaPrice);

    if (!name) {
      setSpaFormError(t("errSpaName"));
      return;
    }

    if (Number.isNaN(price) || price < 0) {
      setSpaFormError(t("errPrice"));
      return;
    }

    if (prices.spa[name] !== undefined) {
      setSpaFormError(t("errSpaDup"));
      return;
    }

    setPrices((prev) => ({
      ...prev,
      spa: { ...prev.spa, [name]: price },
    }));
    setNewSpaName("");
    setNewSpaPrice("");
    setSpaFormError("");
  };

  const removeCustomSpa = (name) => {
    setPrices((prev) => {
      const nextSpa = { ...prev.spa };
      delete nextSpa[name];
      return { ...prev, spa: nextSpa };
    });

    setSelections((prev) => {
      if (!prev.spa.includes(name)) return prev;
      return { ...prev, spa: prev.spa.filter((i) => i !== name) };
    });
  };

  const SectionHeader = ({ title, label }) => (
    <div className="flex justify-between items-baseline mb-4 pr-1">
      <h2
        style={{ fontSize: theme.fontSize.sectionTitle }}
        className="font-bold"
      >
        {title}
      </h2>
      {label ? (
        <span
          style={{ fontSize: theme.fontSize.label, color: theme.textMuted }}
          className="font-medium uppercase tracking-widest"
        >
          {label}
        </span>
      ) : null}
    </div>
  );

  const greetingLines = useMemo(() => {
    const hour = new Date().getHours();
    const name = studioName;
    if (hour >= 5 && hour <= 11) {
      return {
        line1: tString(locale, "greetingMorningLine1", { name }),
        line2: tString(locale, "greetingMorningLine2", { name }),
      };
    }
    if (hour >= 12 && hour <= 17) {
      return {
        line1: tString(locale, "greetingAfternoonLine1", { name }),
        line2: tString(locale, "greetingAfternoonLine2", { name }),
      };
    }
    return {
      line1: tString(locale, "greetingNightLine1", { name }),
      line2: tString(locale, "greetingNightLine2", { name }),
    };
  }, [locale, studioName]);

  return (
    <div
      className="min-h-screen bg-[#FBF2ED] text-[#9E606F]"
      style={{
        paddingBottom:
          view === "calculator"
            ? "calc(116px + env(safe-area-inset-bottom, 0px))"
            : "calc(40px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <SplashScreen />

      {/* 導航欄 */}
      <header
        className="bg-white border-b sticky top-0 z-30 px-6 flex justify-between items-center shadow-sm"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 18px)",
          paddingBottom: "18px",
          minHeight: "calc(56px + env(safe-area-inset-top, 0px))",
        }}
      >
        <button
          type="button"
          onClick={() => setView("calculator")}
          className="flex items-center gap-3 text-left"
        >
          <div className="w-9 h-9 bg-[#BA797D] rounded-xl flex items-center justify-center">
            <img
              src="/logo-mark.png"
              alt="LashCalc"
              className="w-10 h-10"
              draggable="false"
            />
          </div>
          <h1 className="text-xl font-bold text-[#9E606F]">
            {t("appTitle")}
          </h1>
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() =>
              setView(view === "reports" ? "calculator" : "reports")
            }
            className={`${
              view === "reports" ? "text-[#BA797D]" : "text-stone-400"
            }`}
          >
            <Icon name="chart" size={22} />
          </button>
          <button
            type="button"
            onClick={() => setView(view === "admin" ? "calculator" : "admin")}
            className={`${
              view === "admin" ? "text-[#BA797D]" : "text-stone-400"
            }`}
          >
            <Icon name="settings" size={22} />
          </button>
        </div>
      </header>

      {view === "calculator" && (
        <div className="p-5 max-w-lg mx-auto space-y-8">
          <p
            className="w-full text-center text-[#C07F80] font-bold leading-snug py-2.5 px-4 bg-white/60 border border-stone-200 rounded-3xl"
            style={{ fontSize: theme.fontSize.btnMain }}
          >
            <span className="block">{greetingLines.line1}</span>
            <span className="block mt-1 font-semibold text-[#C07F80]">
              {greetingLines.line2}
            </span>
          </p>
          {/* 1. 服務類型 */}
          <section>
            <SectionHeader
              title={t("sectionServiceTypeTitle")}
              label={t("sectionServiceTypeLabel")}
            />
            <div className="grid grid-cols-2 gap-3">
              {[SERVICE_TYPE_NEW, SERVICE_TYPE_REFILL].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setServiceType(st)}
                  className={`p-4 rounded-2xl border transition-all text-center ${
                    selections.serviceType === st
                      ? "border-[#BA797D] bg-[#F1DFDC]"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="font-bold"
                  >
                    {priceItemLabel(locale, "serviceType", st)}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 2. 款式類別：自然款／濃密款／設計款／客製款 — 各為獨立區塊，子按鈕為根數方案 */}
          {Object.entries(prices.base).map(([category, styles]) => {
            const entries = Object.entries(styles);
            const n = entries.length;
            const gridClass = getBaseRootButtonGridClass(n);
            return (
              <section key={category}>
                <SectionHeader
                  title={priceItemLabel(locale, "base", category)}
                  label={priceItemLabel("en", "base", category)}
                />
                {n === 0 ? (
                  <p className="text-xs text-stone-400 bg-white/80 border border-dashed border-stone-200 rounded-xl px-3 py-2">
                    {t("baseEmptyHint")}
                  </p>
                ) : (
                  <div className={gridClass}>
                    {entries.map(([styleName, price]) => (
                      <button
                        key={`${category}-${styleName}`}
                        type="button"
                        onClick={() => toggleBaseSelection(category, styleName)}
                        className={`rounded-xl border transition-all text-center ${
                          n === 1
                            ? "w-full px-4 py-4 min-h-[52px]"
                            : "p-3"
                        } ${
                          selections.base?.category === category &&
                          selections.base?.style === styleName
                            ? "border-[#BA797D] bg-[#F1DFDC]"
                            : "border-stone-200 bg-white"
                        }`}
                      >
                        <div
                          style={{ fontSize: theme.fontSize.baseBtnMain }}
                          className="font-bold leading-snug"
                        >
                          {priceItemLabel(locale, "baseStyle", styleName)}
                        </div>
                        <div
                          style={{ fontSize: theme.fontSize.baseBtnSub }}
                          className="text-[#A99CA0]"
                        >
                          ${price}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {/* 3. 補睫毛（僅選「補睫毛」時；依設定顯示週數或根數方案） */}
          {selections.serviceType === SERVICE_TYPE_REFILL && (
            <section>
              <SectionHeader
                title={t("sectionRefillPricingTitle")}
                label={t("sectionRefillPricingLabel")}
              />
              {(() => {
                const activeRefill =
                  refillPricingMode === REFILL_MODE_WEEKS
                    ? prices.refillWeeks
                    : prices.refillRoots;
                const keys = Object.keys(activeRefill);
                if (keys.length === 0) {
                  return (
                    <p className="text-xs text-stone-400 bg-white/80 border border-dashed border-stone-200 rounded-xl px-3 py-2">
                      {t("baseEmptyHint")}
                    </p>
                  );
                }
                const refillGridClass = getBaseRootButtonGridClass(
                  keys.length
                ).replace("gap-2", "gap-3");
                return (
                  <div className={refillGridClass}>
                    {keys.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleRefillTier(key)}
                        className={`p-4 rounded-2xl border transition-all text-center ${
                          selections.refill === key
                            ? "border-[#BA797D] bg-[#F1DFDC]"
                            : "border-stone-200 bg-white"
                        }`}
                      >
                        <div
                          style={{ fontSize: theme.fontSize.btnMain }}
                          className="font-bold"
                        >
                          {priceItemLabel(locale, "refill", key)}
                        </div>
                        <div
                          style={{ fontSize: theme.fontSize.btnSub }}
                          className="text-[#A99CA0]"
                        >
                          ${activeRefill[key]}
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </section>
          )}

          {/* 4. 加購造型 */}
          <section>
            <SectionHeader
              title={t("sectionAddonsTitle")}
              label={t("sectionAddonsLabel")}
            />
            <div className="space-y-3">
              {Object.keys(prices.addons).map((item) => (
                <div
                  key={item}
                  className="bg-white p-4 rounded-2xl border border-stone-200 flex justify-between items-center"
                >
                  <div className="flex items-baseline gap-2">
                    <div
                      style={{ fontSize: theme.fontSize.btnMain }}
                      className="font-bold"
                    >
                      {priceItemLabel(locale, "addons", item)}
                    </div>
                    <div
                      style={{ fontSize: theme.fontSize.btnSub }}
                      className="text-[#A99CA0]"
                    >
                      ${prices.addons[item]} {getAddonUnitLabel(item)}
                    </div>
                  </div>
                  {item === LOWER_LASH_ADDON_KEY ? (
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelections((p) => ({
                              ...p,
                              addons: {
                                ...p.addons,
                                [item]: Math.max(0, (p.addons[item] || 0) - 1),
                              },
                            }))
                          }
                          className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center"
                        >
                          <Icon name="minus" size={14} />
                        </button>
                        <input
                          type="number"
                          value={selections.addons[item] || 0}
                          onChange={(e) =>
                            setSelections((p) => ({
                              ...p,
                              addons: {
                                ...p.addons,
                                [item]: parseInt(e.target.value, 10) || 0,
                              },
                            }))
                          }
                          onFocus={(e) => e.target.select()}
                          className="w-10 text-center font-bold text-[#BA797D] bg-transparent outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setSelections((p) => ({
                              ...p,
                              addons: {
                                ...p.addons,
                                [item]: (p.addons[item] || 0) + 1,
                              },
                            }))
                          }
                          className="w-8 h-8 rounded-lg bg-[#BA797D] text-white flex items-center justify-center"
                        >
                          <Icon name="plus" size={14} />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        {LOWER_LASH_PRESETS.map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() =>
                              setSelections((p) => ({
                                ...p,
                                addons: { ...p.addons, [item]: n },
                              }))
                            }
                            className="px-2 py-1 rounded-lg text-xs font-bold border border-stone-200 text-[#BA797D] hover:bg-[#F1DFDC] transition-colors min-w-[2.25rem] text-center"
                          >
                            {String(n)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelections((p) => ({
                            ...p,
                            addons: {
                              ...p.addons,
                              [item]: Math.max(0, (p.addons[item] || 0) - 1),
                            },
                          }))
                        }
                        className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center"
                      >
                        <Icon name="minus" size={14} />
                      </button>
                      <input
                        type="number"
                        value={selections.addons[item] || 0}
                        onChange={(e) =>
                          setSelections((p) => ({
                            ...p,
                            addons: {
                              ...p.addons,
                              [item]: parseInt(e.target.value, 10) || 0,
                            },
                          }))
                        }
                        onFocus={(e) => e.target.select()}
                        className="w-10 text-center font-bold text-[#BA797D] bg-transparent outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSelections((p) => ({
                            ...p,
                            addons: {
                              ...p.addons,
                              [item]: (p.addons[item] || 0) + 1,
                            },
                          }))
                        }
                        className="w-8 h-8 rounded-lg bg-[#BA797D] text-white flex items-center justify-center"
                      >
                        <Icon name="plus" size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 5. 護理保養 */}
          <section>
            <SectionHeader
              title={t("sectionSpaTitle")}
              label={t("sectionSpaLabel")}
            />
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(prices.spa).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleSelection("spa", item)}
                  className={`p-4 rounded-2xl border transition-all text-center ${
                    selections.spa.includes(item)
                      ? "border-[#BA797D] bg-[#F1DFDC]"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="font-bold"
                  >
                    {priceItemLabel(locale, "spa", item)}
                  </div>
                  <div
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="text-[#A99CA0]"
                  >
                    ${prices.spa[item]}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 6. 產品加購 */}
          <section>
            <SectionHeader
              title={t("sectionOthersTitle")}
              label={t("sectionOthersLabel")}
            />
            <div className="space-y-3">
              {Object.keys(prices.products).map((item) => (
                <div
                  key={item}
                  className="bg-white p-4 rounded-2xl border border-stone-200 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="bg-stone-100 p-2 rounded-lg text-[#BA797D] shrink-0">
                      <Icon name="package" size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        style={{ fontSize: theme.fontSize.btnMain }}
                        className="font-bold truncate"
                      >
                        {priceItemLabel(locale, "products", item)}
                      </span>
                      <span
                        style={{ fontSize: theme.fontSize.btnSub }}
                        className="text-[#A99CA0]"
                      >
                        ${prices.products[item]}
                        {t("perProductUnit")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setSelections((p) => ({
                          ...p,
                          products: {
                            ...p.products,
                            [item]: Math.max(0, (p.products[item] || 0) - 1),
                          },
                        }))
                      }
                      className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center"
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <input
                      type="number"
                      value={selections.products[item] || 0}
                      onChange={(e) =>
                        setSelections((p) => ({
                          ...p,
                          products: {
                            ...p.products,
                            [item]: parseInt(e.target.value, 10) || 0,
                          },
                        }))
                      }
                      onFocus={(e) => e.target.select()}
                      className="w-10 text-center font-bold text-[#BA797D] bg-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSelections((p) => ({
                          ...p,
                          products: {
                            ...p.products,
                            [item]: (p.products[item] || 0) + 1,
                          },
                        }))
                      }
                      className="w-8 h-8 rounded-lg bg-[#BA797D] text-white flex items-center justify-center"
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-stone-100 p-2 rounded-lg text-[#BA797D]">
                    <Icon name="plus" size={18} />
                  </div>
                  <span
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="font-bold"
                  >
                    {t("otherService")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 text-sm">$</span>
                  <input
                    type="number"
                    className="w-20 text-right font-bold text-[#BA797D] bg-stone-50 rounded-lg p-2 focus:outline-none"
                    value={selections.customOther || ""}
                    onChange={(e) =>
                      setSelections((p) => ({
                        ...p,
                        customOther: parseInt(e.target.value) || 0,
                      }))
                    }
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 7. 卸除睫毛 */}
          <section>
            <SectionHeader
              title={t("sectionRemovalTitle")}
              label={t("sectionRemovalLabel")}
            />
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(prices.removal).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleSelection("removal", item)}
                  className={`p-4 rounded-2xl border transition-all text-center ${
                    selections.removal === item
                      ? "border-[#BA797D] bg-[#F1DFDC]"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="font-bold"
                  >
                    {priceItemLabel(locale, "removal", item)}
                  </div>
                  <div
                    style={{ fontSize: theme.fontSize.btnSub }}
                    className="text-[#A99CA0]"
                  >
                    ${prices.removal[item]}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 8. 優惠折抵 */}
          <section className="mb-8">
            <SectionHeader
              title={t("sectionDiscountTitle")}
              label={t("sectionDiscountLabel")}
            />
            <div className="bg-white rounded-[1.25rem] p-5 border border-dashed border-[#BA797D] space-y-4 shadow-sm">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {[
                  { k: "none", l: t("discountNone"), t: "none", v: 0 },
                  { k: "p95", l: t("discount95"), t: "percent", v: 0.95 },
                  { k: "p9", l: t("discount9"), t: "percent", v: 0.9 },
                  { k: "p85", l: t("discount85"), t: "percent", v: 0.85 },
                  { k: "p8", l: t("discount8"), t: "percent", v: 0.8 },
                ].map((d) => (
                  <button
                    key={d.k}
                    type="button"
                    onClick={() =>
                      setSelections((p) => ({
                        ...p,
                        discountType: d.t,
                        discountVal: d.v,
                      }))
                    }
                    className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selections.discountType === d.t &&
                      selections.discountVal === d.v
                        ? "border-[#BA797D] bg-[#F1DFDC] text-[#BA797D]"
                        : "border-stone-200 text-stone-400"
                    }`}
                  >
                    {d.l}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {[50, 100, 200].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setSelections((p) => ({
                        ...p,
                        discountType: "fixed",
                        discountVal: v,
                      }))
                    }
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selections.discountType === "fixed" &&
                      selections.discountVal === v
                        ? "border-[#BA797D] bg-[#F1DFDC] text-[#A99CA0]"
                        : "border-stone-200 text-stone-400"
                    }`}
                  >
                    {t("discountFixed", { v })}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Icon name="tag" size={16} />{" "}
                  <span className="text-xs">{t("discountCustom")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#A99CA0] font-bold text-xs">-$</span>
                  <input
                    type="number"
                    className="w-16 text-right font-bold text-[#A99CA0] bg-stone-50 rounded-lg p-1.5 focus:outline-none"
                    value={
                      selections.discountType === "fixed" &&
                      ![50, 100, 200].includes(selections.discountVal)
                        ? selections.discountVal
                        : ""
                    }
                    onChange={(e) =>
                      setSelections((p) => ({
                        ...p,
                        discountType: "fixed",
                        discountVal: parseInt(e.target.value) || 0,
                      }))
                    }
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 新增與優化：營收報表頁面 (含月份切換) */}
      {view === "reports" && (
        <div className="p-6 max-w-md mx-auto">
          <SectionHeader title={t("reportsTitle")} label={t("reportsLabel")} />

          {/* 月份切換控制項 */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-stone-100 mb-6 shadow-sm">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="w-10 h-10 flex items-center justify-center text-[#BA797D] hover:bg-[#F1DFDC] rounded-xl transition-colors"
            >
              <Icon name="chevronLeft" size={20} />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[12px] text-stone-400 font-bold uppercase tracking-widest leading-none mb-1">
                {t("monthQuery")}
              </span>
              <span className="text-lg font-black text-[#BA797D]">
                {selectedMonth.replace("-", " / ")}
              </span>
            </div>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="w-10 h-10 flex items-center justify-center text-[#BA797D] hover:bg-[#F1DFDC] rounded-xl transition-colors"
            >
              <Icon name="chevronRight" size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
              <p className="text-center text-[12px] text-stone-400 font-bold uppercase mb-1">
                {t("revenueMonth")}
              </p>
              <p className="text-center text-2xl font-black text-[#BA797D]">
                $
                {filteredRecords
                  .reduce((acc, r) => acc + r.amount, 0)
                  .toLocaleString(
                    locale === "en"
                      ? "en-US"
                      : locale === "zh-CN"
                        ? "zh-CN"
                        : "zh-TW"
                  )}
              </p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
              <p className="text-center text-[12px] text-stone-400 font-bold uppercase mb-1">
                {t("visitsMonth")}
              </p>
              <p className="text-center text-2xl font-black text-[#BA797D]">
                {filteredRecords.length}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3
              className="font-bold"
              style={{ fontSize: theme.fontSize.sectionTitle }}
            >
              {t("checkoutRecords")}
            </h3>
            <button
              type="button"
              onClick={exportToCSV}
              className="text-[#BA797D] text-xs font-bold flex items-center gap-1"
            >
              <Icon name="download" size={14} /> {t("exportCsv")}
            </button>
          </div>

          <div className="space-y-3">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-10 text-stone-300 text-sm italic">
                {t("noRecordsMonth")}
              </div>
            ) : (
              filteredRecords.map((r) => (
                <div
                  key={r.id}
                  className="bg-white p-4 rounded-2xl border border-stone-100 flex justify-between items-center"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-[10px] text-stone-400">{r.date}</p>
                    <p className="text-sm font-bold truncate">{r.items}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-[#BA797D]">
                      ${r.amount}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteRecord(r.id)}
                      className="text-stone-200 hover:text-red-400"
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 管理介面 */}
      {view === "admin" && (
        <div className="p-6 max-w-md mx-auto">
          <div className="mb-10 p-6 bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
            <label className="text-[10px] font-bold text-stone-400 mb-2 block uppercase tracking-widest">
              {t("studioNameLabel")}
            </label>
            <input
              type="text"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="w-full text-xl font-bold text-[#BA797D] bg-transparent outline-none border-b-2 border-stone-100 focus:border-[#BA797D] pb-2"
            />
            <p className="text-[10px] text-stone-300 mt-3 font-medium">
              {t("studioNameHint")}
            </p>
          </div>

          <div className="mb-10 p-6 bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
            <label className="text-[10px] font-bold text-stone-400 mb-2 block uppercase tracking-widest">
              {t("languageLabel")}
            </label>
            <select
              value={locale}
              onChange={(e) => setLocale(/** @type {AppLocale} */ (e.target.value))}
              className="w-full text-sm font-bold bg-stone-50 rounded-2xl px-3 py-3 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
            >
              <option value="zh-TW">{t("language_zhTW")}</option>
              <option value="zh-CN">{t("language_zhCN")}</option>
              <option value="en">{t("language_en")}</option>
            </select>
            <p className="text-[10px] text-stone-300 mt-3 font-medium leading-relaxed">
              {t("languageHint")}
            </p>
          </div>

          <h3 className="text-base font-bold mb-3 flex items-baseline">
            {t("pricingTitle")}
            <span className="ml-auto text-[10px] uppercase font-bold text-stone-400 tracking-widest">
              {t("pricingLabel")}
            </span>
          </h3>

          {["removal", "base", "addons", "spa", "products"].map((cat) => {
            const items = prices[cat];
            return (
            <div
              key={cat}
              className="bg-white p-6 rounded-[2rem] mb-6 border border-stone-50 shadow-sm"
            >
              <h4 className="text-[10px] font-bold text-stone-400 mb-2 uppercase">
                {{
                  removal: t("sectionRemovalLabel"),
                  base: t("sectionBaseAdminLabel"),
                  addons: t("sectionAddonsLabel"),
                  spa: t("sectionSpaLabel"),
                  products: t("sectionProductLabel"),
                }[cat] || cat}
              </h4>

              {cat !== "base" ? (
                Object.entries(items).map(([name, price]) => (
                  <div
                    key={name}
                    className="flex justify-between items-baseline py-2 border-b border-stone-100"
                  >
                    <span className="text-sm font-bold flex-1 pr-2">
                      {priceItemLabel(locale, cat, name)}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={price}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          setPrices((prev) => ({
                            ...prev,
                            [cat]: {
                              ...prev[cat],
                              [name]: Number(e.target.value),
                            },
                          }))
                        }
                        className="w-20 text-center font-bold bg-stone-50 rounded-3xl px-3 py-1 text-[#BA797D] outline-none shadow-sm"
                      />
                      {cat === "addons" && (
                        <button
                          type="button"
                          onClick={() => removeCustomAddon(name)}
                          className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                          aria-label={`${t("ariaDeleteAddon")}: ${name}`}
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      )}

                      {cat === "products" && (
                        <button
                          type="button"
                          onClick={() => removeCustomProduct(name)}
                          className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                          aria-label={`${t("ariaDeleteProduct")}: ${name}`}
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      )}

                      {cat === "removal" && (
                        <button
                          type="button"
                          onClick={() => removeCustomRemoval(name)}
                          className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                          aria-label={`${t("ariaDeleteRemoval")}: ${name}`}
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      )}

                      {cat === "spa" && (
                        <button
                          type="button"
                          onClick={() => removeCustomSpa(name)}
                          className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                          aria-label={`${t("ariaDeleteSpa")}: ${name}`}
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                Object.entries(items).map(([category, styles]) => (
                  <div
                    key={category}
                    className="mb-4 pb-4 border-b border-stone-100 last:mb-0 last:pb-0 last:border-0"
                  >
                    <div className="flex justify-between items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-[#9E606F]">
                        {priceItemLabel(locale, "base", category)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeBaseCategory(category)}
                        className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors shrink-0"
                        aria-label={`${t("ariaDeleteBaseCategory")}: ${category}`}
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                    {Object.entries(styles).map(([styleName, price]) => (
                      <div
                        key={styleName}
                        className="flex justify-between items-baseline py-2 border-b border-stone-50"
                      >
                        <span className="text-sm font-bold flex-1 pr-2 pl-1">
                          {priceItemLabel(locale, "baseStyle", styleName)}
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={price}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) =>
                              setPrices((prev) => ({
                                ...prev,
                                base: {
                                  ...prev.base,
                                  [category]: {
                                    ...prev.base[category],
                                    [styleName]: Number(e.target.value),
                                  },
                                },
                              }))
                            }
                            className="w-20 text-center font-bold bg-stone-50 rounded-3xl px-3 py-1 text-[#BA797D] outline-none shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeBaseStyle(category, styleName)}
                            className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                            aria-label={`${t("ariaDeleteBase")}: ${styleName}`}
                          >
                            <Icon name="trash" size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}

              {cat === "addons" && (
                <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
                  <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                    {t("newAddonTitle")}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newAddonName}
                      onChange={(e) => {
                        setNewAddonName(e.target.value);
                        if (addonFormError) setAddonFormError("");
                      }}
                      placeholder={t("addonNamePh")}
                      className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
                    />
                    <div className="w-24 flex items-center gap-1 min-w-0">
                      <span className="text-stone-400 text-xs font-bold flex-none">$</span>
                      <input
                        type="number"
                        min="0"
                        value={newAddonPrice}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          setNewAddonPrice(e.target.value);
                          if (addonFormError) setAddonFormError("");
                        }}
                        placeholder="0"
                        className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#BA797D] outline-none border border-stone-100 focus:border-[#BA797D] min-w-0"
                      />
                    </div>
                  </div>
                  {addonFormError && (
                    <p className="text-[11px] text-rose-500 font-medium mb-2">
                      {addonFormError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={addCustomAddon}
                    className="w-full py-2.5 rounded-2xl bg-[#BA797D] text-white text-sm font-bold shadow-sm"
                  >
                    {t("addItem")}
                  </button>
                </div>
              )}

              {cat === "products" && (
                <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
                  <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                    {t("newProductTitle")}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newProductName}
                      onChange={(e) => {
                        setNewProductName(e.target.value);
                        if (productFormError) setProductFormError("");
                      }}
                      placeholder={t("productNamePh")}
                      className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
                    />
                    <div className="w-24 flex items-center gap-1 min-w-0">
                      <span className="text-stone-400 text-xs font-bold flex-none">$</span>
                      <input
                        type="number"
                        min="0"
                        value={newProductPrice}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          setNewProductPrice(e.target.value);
                          if (productFormError) setProductFormError("");
                        }}
                        placeholder="0"
                        className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#BA797D] outline-none border border-stone-100 focus:border-[#BA797D] min-w-0"
                      />
                    </div>
                  </div>
                  {productFormError && (
                    <p className="text-[11px] text-rose-500 font-medium mb-2">
                      {productFormError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={addCustomProduct}
                    className="w-full py-2.5 rounded-2xl bg-[#BA797D] text-white text-sm font-bold shadow-sm"
                  >
                    {t("addItem")}
                  </button>
                </div>
              )}

              {cat === "base" && (
                <div className="mt-4 pt-4 border-t border-dashed border-stone-200 space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                      {t("newBaseCategoryTitle")}
                    </p>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newBaseCategoryName}
                        onChange={(e) => {
                          setNewBaseCategoryName(e.target.value);
                          if (baseFormError) setBaseFormError("");
                        }}
                        placeholder={t("baseCategoryPh")}
                        className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addBaseCategory}
                      className="w-full py-2.5 rounded-2xl bg-[#BA797D] text-white text-sm font-bold shadow-sm"
                    >
                      {t("addItem")}
                    </button>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                      {t("newBaseTitle")}
                    </p>
                    <label className="text-[10px] font-bold text-stone-400 mb-1 block">
                      {t("baseSubCategoryLabel")}
                    </label>
                    <select
                      value={
                        newSubStyleCategory ||
                        Object.keys(prices.base)[0] ||
                        ""
                      }
                      onChange={(e) => {
                        setNewSubStyleCategory(e.target.value);
                        if (baseFormError) setBaseFormError("");
                      }}
                      className="w-full text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2.5 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D] mb-2"
                    >
                      {Object.keys(prices.base).length === 0 ? (
                        <option value="">{t("baseCategoryPh")}</option>
                      ) : (
                        Object.keys(prices.base).map((k) => (
                          <option key={k} value={k}>
                            {priceItemLabel(locale, "base", k)}
                          </option>
                        ))
                      )}
                    </select>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newSubStyleName}
                        onChange={(e) => {
                          setNewSubStyleName(e.target.value);
                          if (baseFormError) setBaseFormError("");
                        }}
                        placeholder={t("baseNamePh")}
                        className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
                      />
                      <div className="w-24 flex items-center gap-1 min-w-0">
                        <span className="text-stone-400 text-xs font-bold flex-none">
                          $
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={newSubStylePrice}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => {
                            setNewSubStylePrice(e.target.value);
                            if (baseFormError) setBaseFormError("");
                          }}
                          placeholder="0"
                          className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#BA797D] outline-none border border-stone-100 focus:border-[#BA797D] min-w-0"
                        />
                      </div>
                    </div>
                    {baseFormError && (
                      <p className="text-[11px] text-rose-500 font-medium mb-2">
                        {baseFormError}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={addBaseSubStyle}
                      className="w-full py-2.5 rounded-2xl bg-[#BA797D] text-white text-sm font-bold shadow-sm"
                    >
                      {t("addItem")}
                    </button>
                  </div>
                </div>
              )}

              {cat === "removal" && (
                <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
                  <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                    {t("newRemovalTitle")}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newRemovalName}
                      onChange={(e) => {
                        setNewRemovalName(e.target.value);
                        if (removalFormError) setRemovalFormError("");
                      }}
                      placeholder={t("removalNamePh")}
                      className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
                    />
                    <div className="w-24 flex items-center gap-1 min-w-0">
                      <span className="text-stone-400 text-xs font-bold flex-none">$</span>
                      <input
                        type="number"
                        min="0"
                        value={newRemovalPrice}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          setNewRemovalPrice(e.target.value);
                          if (removalFormError) setRemovalFormError("");
                        }}
                        placeholder="0"
                        className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#BA797D] outline-none border border-stone-100 focus:border-[#BA797D] min-w-0"
                      />
                    </div>
                  </div>
                  {removalFormError && (
                    <p className="text-[11px] text-rose-500 font-medium mb-2">
                      {removalFormError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={addCustomRemoval}
                    className="w-full py-2.5 rounded-2xl bg-[#BA797D] text-white text-sm font-bold shadow-sm"
                  >
                    {t("addItem")}
                  </button>
                </div>
              )}

              {cat === "spa" && (
                <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
                  <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                    {t("newSpaTitle")}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newSpaName}
                      onChange={(e) => {
                        setNewSpaName(e.target.value);
                        if (spaFormError) setSpaFormError("");
                      }}
                      placeholder={t("spaNamePh")}
                      className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
                    />
                    <div className="w-24 flex items-center gap-1 min-w-0">
                      <span className="text-stone-400 text-xs font-bold flex-none">$</span>
                      <input
                        type="number"
                        min="0"
                        value={newSpaPrice}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          setNewSpaPrice(e.target.value);
                          if (spaFormError) setSpaFormError("");
                        }}
                        placeholder="0"
                        className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#BA797D] outline-none border border-stone-100 focus:border-[#BA797D] min-w-0"
                      />
                    </div>
                  </div>
                  {spaFormError && (
                    <p className="text-[11px] text-rose-500 font-medium mb-2">
                      {spaFormError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={addCustomSpa}
                    className="w-full py-2.5 rounded-2xl bg-[#BA797D] text-white text-sm font-bold shadow-sm"
                  >
                    {t("addItem")}
                  </button>
                </div>
              )}
            </div>
            );
          })}
          <div className="bg-white p-6 rounded-[2rem] mb-6 border border-stone-50 shadow-sm">
            <h4 className="text-[10px] font-bold text-stone-400 mb-2 uppercase">
              {t("refillPricingSettingsTitle")}
            </h4>
            <p className="text-[10px] text-stone-400 mb-3 leading-relaxed">
              {t("refillPricingModeHint")}
            </p>
            <label className="text-[10px] font-bold text-stone-400 mb-1 block uppercase tracking-widest">
              {t("sectionRefillPricingTitle")}
            </label>
            <select
              value={refillPricingMode}
              onChange={(e) =>
                setRefillPricingMode(
                  e.target.value === REFILL_MODE_ROOTS
                    ? REFILL_MODE_ROOTS
                    : REFILL_MODE_WEEKS
                )
              }
              className="w-full text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2.5 text-[#9E606F] mb-4 outline-none border border-stone-100 focus:border-[#BA797D]"
            >
              <option value={REFILL_MODE_WEEKS}>{t("refillModeWeeks")}</option>
              <option value={REFILL_MODE_ROOTS}>{t("refillModeRoots")}</option>
            </select>

            <p className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest">
              {t("refillModeWeeks")}
            </p>
            {Object.entries(prices.refillWeeks).map(([name, price]) => (
              <div
                key={name}
                className="flex justify-between items-baseline py-2 border-b border-stone-100"
              >
                <span className="text-sm font-bold flex-1 pr-2">
                  {priceItemLabel(locale, "refill", name)}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={price}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      setPrices((prev) => ({
                        ...prev,
                        refillWeeks: {
                          ...prev.refillWeeks,
                          [name]: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-20 text-center font-bold bg-stone-50 rounded-3xl px-3 py-1 text-[#BA797D] outline-none shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeRefillWeekTier(name)}
                    className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                    aria-label={`${t("ariaDeleteRefillWeek")}: ${name}`}
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-dashed border-stone-200">
              <p className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest">
                {t("newRefillWeekTitle")}
              </p>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newRefillWeekName}
                  onChange={(e) => {
                    setNewRefillWeekName(e.target.value);
                    if (refillWeekFormError) setRefillWeekFormError("");
                  }}
                  placeholder={t("refillTierNamePh")}
                  className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
                />
                <div className="w-24 flex items-center gap-1 min-w-0">
                  <span className="text-stone-400 text-xs font-bold flex-none">$</span>
                  <input
                    type="number"
                    min="0"
                    value={newRefillWeekPrice}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      setNewRefillWeekPrice(e.target.value);
                      if (refillWeekFormError) setRefillWeekFormError("");
                    }}
                    placeholder="0"
                    className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#BA797D] outline-none border border-stone-100 focus:border-[#BA797D] min-w-0"
                  />
                </div>
              </div>
              {refillWeekFormError && (
                <p className="text-[11px] text-rose-500 font-medium mb-2">
                  {refillWeekFormError}
                </p>
              )}
              <button
                type="button"
                onClick={addRefillWeekTier}
                className="w-full py-2.5 rounded-2xl bg-[#BA797D] text-white text-sm font-bold shadow-sm"
              >
                {t("addItem")}
              </button>
            </div>

            <p className="text-[10px] font-bold text-stone-400 mb-2 mt-6 uppercase tracking-widest">
              {t("refillModeRoots")}
            </p>
            {Object.entries(prices.refillRoots).map(([name, price]) => (
              <div
                key={name}
                className="flex justify-between items-baseline py-2 border-b border-stone-100"
              >
                <span className="text-sm font-bold flex-1 pr-2">
                  {priceItemLabel(locale, "refill", name)}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={price}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      setPrices((prev) => ({
                        ...prev,
                        refillRoots: {
                          ...prev.refillRoots,
                          [name]: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-20 text-center font-bold bg-stone-50 rounded-3xl px-3 py-1 text-[#BA797D] outline-none shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeRefillRootTier(name)}
                    className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                    aria-label={`${t("ariaDeleteRefillRoot")}: ${name}`}
                  >
                    <Icon name="trash" size={14} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-dashed border-stone-200">
              <p className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest">
                {t("newRefillRootTitle")}
              </p>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newRefillRootName}
                  onChange={(e) => {
                    setNewRefillRootName(e.target.value);
                    if (refillRootFormError) setRefillRootFormError("");
                  }}
                  placeholder={t("refillTierNamePh")}
                  className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#9E606F] outline-none border border-stone-100 focus:border-[#BA797D]"
                />
                <div className="w-24 flex items-center gap-1 min-w-0">
                  <span className="text-stone-400 text-xs font-bold flex-none">$</span>
                  <input
                    type="number"
                    min="0"
                    value={newRefillRootPrice}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      setNewRefillRootPrice(e.target.value);
                      if (refillRootFormError) setRefillRootFormError("");
                    }}
                    placeholder="0"
                    className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#BA797D] outline-none border border-stone-100 focus:border-[#BA797D] min-w-0"
                  />
                </div>
              </div>
              {refillRootFormError && (
                <p className="text-[11px] text-rose-500 font-medium mb-2">
                  {refillRootFormError}
                </p>
              )}
              <button
                type="button"
                onClick={addRefillRootTier}
                className="w-full py-2.5 rounded-2xl bg-[#BA797D] text-white text-sm font-bold shadow-sm"
              >
                {t("addItem")}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setView("calculator")}
            className="w-full p-4 bg-[#BA797D] text-white rounded-[1.25rem] font-bold shadow-lg"
          >
            {t("saveChanges")}
          </button>
        </div>
      )}

      {/* 底部浮動結帳欄 */}
      {view === "calculator" && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 z-20"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "18px",
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 18px)",
          }}
        >
          <div className="max-w-md mx-auto flex justify-between items-end">
            <div>
              {getDiscountAmount() > 0 && (
                <p className="text-xs text-[#BA797D] font-bold mb-1">
                  {t("bottomDiscounted")} -${getDiscountAmount()}
                </p>
              )}
              <div className="flex items-baseline">
                <span className="text-[#BA797D] font-bold text-xl">$</span>
                <span className="text-4xl font-black text-[#BA797D] leading-none">
                  {calculateTotal().toLocaleString(
                    locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : "zh-TW"
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className={`px-5 py-3 rounded-2xl font-bold flex items-center gap-1 transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-stone-100 text-[#BA797D]"
                }`}
              >
                <Icon name={copied ? "check" : "copy"} size={16} />{" "}
                {copied ? t("copied") : t("copy")}
              </button>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="bg-[#BA797D] text-white px-6 py-3 rounded-2xl font-bold"
              >
                {t("checkout")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 結帳明細彈窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-center font-bold mb-4">{t("modalTitle")}</h3>
            <div className="bg-stone-50 p-4 rounded-2xl mb-4 max-h-60 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono">
                {generateSummaryText()}
              </pre>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl bg-stone-100 font-bold text-stone-500"
              >
                {t("back")}
              </button>
              <button
                type="button"
                onClick={finalizePayment}
                className="flex-[2] bg-[#BA797D] text-white py-3 px-6 rounded-xl font-bold"
              >
                {t("copyAndClose")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部資訊 */}
      <footer className="mt-5 mb-1 max-w-lg mx-auto px-5 text-center pt-4">
        <div className="text-[10px] font-medium tracking-widest text-[#9E606F]/50 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>LashCalc</span>
          <span aria-label="copyright">©</span>
          <span>{currentYear}</span>
          <span className="text-[#9E606F]/35">•</span>
          <a
            href="https://friendlycatgroup.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#9E606F]/70 underline underline-offset-[3px] decoration-[#9E606F]/35 hover:text-[#9E606F] hover:decoration-[#9E606F]/60 transition-colors"
          >
            {developerName}
          </a>
        </div>

        <div
          className="mt-2.5 flex items-center justify-center gap-5"
          role="group"
          aria-label="Social & contact"
        >
          <a
            href="https://instagram.com/friendlycatgroup"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram: @friendlycatgroup"
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] -m-1 text-[#BA797D] hover:text-[#BA797D] active:scale-95 transition-[color,transform] duration-200"
          >
            <Icon name="instagram" size={22} />
          </a>
          <a
            href="mailto:friendlycatgroup@gmail.com"
            aria-label="Email: friendlycatgroup@gmail.com"
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] -m-1 text-[#BA797D] hover:text-[#BA797D] active:scale-95 transition-[color,transform] duration-200"
          >
            <Icon name="mail" size={22} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
