import { Banks } from "@/pages/Bank";
import CustomersList from "@/pages/Customer/CustomersList";
import Org from "@/pages/Org";
import Overview from "@/pages/Overview";
import Payment from "@/pages/Payment";
import Paying from "@/pages/Payment/Paying";
import PaymentList from "@/pages/Payment/PaymentList";
import PaymentView from "@/pages/Payment/PaymentView";
import Purpose from "@/pages/Purpose";
import { Sectors } from "@/pages/Sector";
import { Cabinet, Users } from "@/pages/User";

export const adminRoutes = [
  {
    path: "/dashboard",
    element: <Overview />,
  },
  {
    path: "/dashboard/users",
    element: <Users />,
  },
  {
    path: "/dashboard/customers",
    element: <CustomersList />,
  },
  {
    path: "/dashboard/sectors",
    element: <Sectors />,
  },
  {
    path: "/dashboard/banks",
    element: <Banks />,
  },
  {
    path: "/dashboard/payments",
    element: <PaymentList />,
  },
  {
    path: "/dashboard/payments/:id",
    element: <PaymentView />,
  },
  {
    path: "/dashboard/cabinet",
    element: <Cabinet />,
  },
  {
    path: "/dashboard/payment",
    element: <Payment />,
  },
  {
    path: "/dashboard/payment/paying",
    element: <Paying />,
  },
  {
    path: "/dashboard/org",
    element: <Org />,
  },
  {
    path: "/dashboard/purposes",
    element: <Purpose />,
  },
];
