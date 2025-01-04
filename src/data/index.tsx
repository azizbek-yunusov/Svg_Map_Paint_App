import { MdOutlineDashboard, MdPayment } from "react-icons/md";
import { PiMoneyDuotone, PiUsers } from "react-icons/pi";
import { BsBank } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaCodeBranch } from "react-icons/fa";

export const sideBar = [
  {
    name: "overview",
    to: "/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "banks",
    to: "/dashboard/banks",
    icon: <BsBank />,
  },
  {
    name: "sectors",
    to: "/dashboard/sectors",
    icon: <FaCodeBranch />,
  },
  {
    name: "customers",
    to: "/dashboard/customers",
    icon: <HiOutlineUserGroup />,
  },
  {
    name: "customers",
    to: "/dashboard/customers",
    icon: <HiOutlineUserGroup />,
  },
  {
    name: "users",
    to: "/dashboard/users",
    icon: <PiUsers />,
  },
];

export const sideUserBar = [
  {
    name: "overview",
    to: "/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    name: "payments",
    to: "/dashboard/payments",
    icon: <MdPayment />,
  },
  {
    name: "payment",
    to: "/dashboard/payment",
    icon: <PiMoneyDuotone />,
  },
];

export const sounds = [
  {
    label: "iphone",
    value: "/music/iphone.mp3",
  },
  {
    label: "message-incoming",
    value: "/music/message-incoming.mp3",
  },
  {
    label: "correct-answer-tone",
    value: "/music/correct-answer-tone.wav",
  },
  {
    label: "mixkit-message-pop-alert",
    value: "/music/mixkit-message-pop-alert.mp3",
  },
  {
    label: "new-notification",
    value: "/music/new-notification.mp3",
  },
  {
    label: "notification-sound",
    value: "/music/notification-sound.mp3",
  },
  {
    label: "system-notification",
    value: "/music/system-notification.mp3",
  },
  
];

export const langs = [
  {
    id: 1,
    title: "O'zbekcha",
    short: "O'zb",
    flag: "/images/icons/uzbekistan.png",
    lang: "oz",
  },
  {
    id: 2,
    flag: "/images/icons/uzbekistan.png",
    title: "Ўзбекча",
    short: "Ўзб",
    lang: "uz",
  },
  {
    id: 3,
    flag: "/images/icons/russia.png",
    title: "Русский",
    short: "Рус",
    lang: "ru",
  },
];
export const positions = [
  {
    value: "01",
    label: "cero",
  },
  {
    value: "02",
    label: "deputy-director-general",
  },
  {
    value: "1",
    label: "branch-1",
  },
  {
    value: "2",
    label: "branch-1",
  },
];
// karakalpakstan, andijan, bukhara, jizzakh, kashkadarya, navoi, namangan, samarkand, surkhandarya, syrdarya, tashkent, ferghana, xorezm, tashkent-sity
export const branchKeys = [
  {
    label: "karakalpakstan",
    value: "karakalpakstan",
  },
  {
    label: "andijan",
    value: "andijan",
  },
  {
    label: "bukhara",
    value: "bukhara",
  },
  {
    label: "jizzakh",
    value: "jizzakh",
  },
  {
    label: "kashkadarya",
    value: "kashkadarya",
  },
  {
    label: "navoi",
    value: "navoi",
  },
  {
    label: "namangan",
    value: "namangan",
  },
  {
    label: "samarkand",
    value: "samarkand",
  },
  {
    label: "surkhandarya",
    value: "surkhandarya",
  },
  {
    label: "syrdarya",
    value: "syrdarya",
  },
  {
    label: "tashkent",
    value: "tashkent",
  },
  {
    label: "ferghana",
    value: "ferghana",
  },
  {
    label: "xorezm",
    value: "xorezm",
  },
  {
    label: "tashkent-sity",
    value: "tashkent-sity",
  },
];

export const regions = [
  {
    id: 1,
    key: "karakalpakstan-region",
  },
  {
    id: 2,
    key: "andijan-region",
  },
  {
    id: 3,
    key: "bukhara-region",
  },
  {
    id: 4,
    key: "jizzah-region",
  },
  {
    id: 5,
    key: "kashkadarya-region",
  },
  {
    id: 6,
    key: "navoi-region",
  },
  {
    id: 7,
    key: "namangan-region",
  },
  {
    id: 8,
    key: "samarkand-region",
  },
  {
    id: 9,
    key: "surkhandarya-region",
  },
  {
    id: 10,
    key: "syrdarya-region",
  },
  {
    id: 11,
    key: "tashkent-region",
  },
  {
    id: 12,
    key: "ferghana-region",
  },
  {
    id: 13,
    key: "khorezm-region",
  },
  {
    id: 14,
    key: "tashkent-sity-region",
  },
  {
    id: 101,
    key: "kazakhstan",
  },
  {
    id: 102,
    key: "kyrgyzstan",
  },
  {
    id: 103,
    key: "tajikistan",
  },
  {
    id: 104,
    key: "afghanistan",
  },
  {
    id: 105,
    key: "turkmenistan",
  },
  {
    id: 106,
    key: "russia",
  },
];
