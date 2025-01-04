import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type SizeType = "small" | "middle" | "large" | undefined;

interface TableSettings {
  size: SizeType;
  bordered: boolean;
  collHeader: boolean;
  checkbox: boolean;
  pagination: boolean;
  paginationPosition: string;
  separate: boolean;
  max: boolean;
}

interface PaymentTableSettings {
  id: boolean;
  payNumber: boolean;
  documentNumber: boolean;
  clientName: boolean;
  clientNumber: boolean;
  clientInn: boolean;
  summa: boolean;
  bank: boolean;
  bankCode: boolean;
  bankName: boolean;
  code: boolean;
  purpose: boolean;
  sector: boolean;
  cursiv: boolean;
  payStatus: boolean;
  user: boolean;
  createdAt: boolean;
  status: boolean;
  action: boolean;
  groupButtons: boolean;
  userClient: boolean;
}
interface NotificationSettings {
  disabled: boolean;
  isSound: boolean;
  sound: string;
}
interface BackgrounImage {
  src: string;
  name: string;
}
interface SettingsState {
  lang: string;
  theme: string;
  side: boolean;
  sidebar: string;
  table: TableSettings;
  notif: NotificationSettings;
  bg: BackgrounImage;
  pirimary: string;
  started: boolean;
  paycoll: PaymentTableSettings;
}
const saveTableToLocalStorage = (table: SettingsState["table"]) => {
  localStorage.setItem("tableSettings", JSON.stringify(table));
};

const loadTableFromLocalStorage = (): SettingsState["table"] => {
  const savedTable = localStorage.getItem("tableSettings");
  return savedTable
    ? JSON.parse(savedTable)
    : {
        size: "middle",
        bordered: true,
        collHeader: true,
        checkbox: false,
        pagination: true,
        paginationPosition: "BottomRight",
        separate: false,
        max: true,
      };
};

const savePayTableToLocalStorage = (paycoll: SettingsState["paycoll"]) => {
  localStorage.setItem("paycoll", JSON.stringify(paycoll));
};

const loadPayTableFromLocalStorage = (): SettingsState["paycoll"] => {
  const savedTable = localStorage.getItem("paycoll");
  return savedTable
    ? JSON.parse(savedTable)
    : {
        id: true,
        payNumber: true,
        documentNumber: false,
        clientName: true,
        clientNumber: true,
        clientInn: false,
        summa: true,
        bank: true,
        bankCode: false,
        bankName: false,
        code: true,
        purpose: false,
        sector: true,
        cursiv: false,
        payStatus: true,
        user: true,
        createdAt: true,
        status: true,
        action: true,
        userClient: false,
        groupButtons: false,
      };
};
const saveNotifyToLocalStorage = (notif: SettingsState["notif"]) => {
  localStorage.setItem("notifySettings", JSON.stringify(notif));
};

const loadNotifyFromLocalStorage = (): SettingsState["notif"] => {
  const savedNotify = localStorage.getItem("notifySettings");
  return savedNotify
    ? JSON.parse(savedNotify)
    : {
        disabled: true,
        isSound: true,
        sound: "/music/iphone.mp3",
      };
};
const saveBgToLocalStorage = (bg: SettingsState["bg"]) => {
  localStorage.setItem("bg", JSON.stringify(bg));
};

const loadbBgFromLocalStorage = (): SettingsState["bg"] => {
  const savedNotify = localStorage.getItem("bg");
  return savedNotify
    ? JSON.parse(savedNotify)
    : {
        src: "/images/backgrounds/finance-chart.jpg",
        name: "finance-chart.jpg",
      };
};

const initialState: SettingsState = {
  lang: localStorage.getItem("i18nextLng") || "oz",
  theme: localStorage.getItem("theme") || "light",
  side: localStorage.getItem("sidebar") === "open" ? true : false,
  sidebar: localStorage.getItem("sidebar-color") || "dark",
  table: loadTableFromLocalStorage(),
  notif: loadNotifyFromLocalStorage(),
  bg: loadbBgFromLocalStorage(),
  pirimary: localStorage.getItem("color") || "0f8adb",
  started: localStorage.getItem("started") === "open" ? true : false,
  paycoll: loadPayTableFromLocalStorage(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      state.theme = action.payload;
    },
    toggleSidebarTheme(state, action) {
      state.sidebar = action.payload;
      localStorage.setItem("sidebar-color", action.payload);
    },
    setColor(state, { payload }) {
      state.pirimary = payload;
      localStorage.setItem("color", payload);
    },
    toggleLang(state, action) {
      state.lang = action.payload;
    },
    toggleSideBar(state) {
      localStorage.setItem("sidebar", `${!state.side ? "open" : "close"}`);
      state.side = !state.side;
    },
    geStartedClose(state) {
      localStorage.setItem("started", "open");
      state.started = true;
    },
    geStartedOpen(state) {
      localStorage.setItem("started", "close");
      state.started = false;
    },
    setSettingAuthBg(
      state: any,
      action: PayloadAction<{ src: string; name: string }>
    ) {
      state.bg = action.payload;
      saveBgToLocalStorage(state.bg);
    },
    setSettingTable<K extends keyof TableSettings>(
      state: any,
      action: PayloadAction<{ key: K; value: TableSettings[K] }>
    ) {
      const { key, value } = action.payload;
      state.table[key] = value;
      saveTableToLocalStorage(state.table);
    },
    setSettingPayTable<K extends keyof PaymentTableSettings>(
      state: any,
      action: PayloadAction<{ key: K; value: PaymentTableSettings[K] }>
    ) {
      const { key, value } = action.payload;
      state.paycoll[key] = value;
      savePayTableToLocalStorage(state.paycoll);
    },
    setSettingNotify<K extends keyof NotificationSettings>(
      state: any,
      action: PayloadAction<{ key: K; value: NotificationSettings[K] }>
    ) {
      const { key, value } = action.payload;
      state.notif[key] = value;
      saveNotifyToLocalStorage(state.notif);
    },
    resetSettingsState() {
      return initialState;
    },
    setGlobalState(state, action) {
      Object.assign(state, action.payload);
      if (action.payload.theme) {
        const body = document.body;
        if (action.payload.theme === "dark") {
          if (!body.hasAttribute("theme-mode")) {
            body.setAttribute("theme-mode", "dark");
          }
        } else {
          if (body.hasAttribute("theme-mode")) {
            body.removeAttribute("theme-mode");
          }
        }
      }
    },
  },
});
export const {
  toggleTheme,
  toggleLang,
  toggleSideBar,
  toggleSidebarTheme,
  setGlobalState,
  setSettingTable,
  setSettingNotify,
  setSettingAuthBg,
  setSettingPayTable,
  geStartedClose,
  geStartedOpen,
  setColor,
  resetSettingsState,
} = settingsSlice.actions;

export default settingsSlice.reducer;
