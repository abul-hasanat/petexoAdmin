
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import AllItemList from "views/item/allItemList.js";
import StoreList from "views/Store/StoreList.js";
import ReviewList from "views/review/ReviewList.js";
import Signout from "views/authentication/signout.js"
import Membership from "views/Membership/membership-approve.js"
import Featured from "views/FeatureProduct/approveIsFeatured.js"
import Category from "views/Category/category.js";





   const   dashboardRoutes  = [

   
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
      
    {
      path: "/category",
      name: "Category",
      rtlName: "لوحة القيادة",
      icon: BubbleChart,
      component: Category,
      layout: "/admin"
    },
    {
      path: "/user",
      name: "User Profile",
      rtlName: "ملف تعريفي للمستخدم",
      icon: Person,
      component: UserProfile,
      layout: "/admin"
    },

    // {
    //   path: "/item",
    //   name: "Item Entry",
    //   rtlName: "ملف تعريفي للمستخدم",
    //   icon: Person,
    //   component: ItemList,
    //   layout: "/admin"
    // },
    {
      path: "/table",
      name: "User List",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: TableList,
      layout: "/admin"
    },
    {
      path: "/all-item-list",
      name: "Item List",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: AllItemList,
      layout: "/admin"
    },
    {
      path: "/store-list",
      name: "Store List",
      rtlName: "طباعة",
      icon: LibraryBooks,
      component: StoreList,
      layout: "/admin"
    },
    {
      path: "/review-list",
      name: "Review List",
      rtlName: "الرموز",
      icon: BubbleChart,
      component: ReviewList,
      layout: "/admin"
    },

    {
      path: "/membership-list",
      name: "Membership",
      rtlName: "الرموز",
      icon: BubbleChart,
      component: Membership,
      layout: "/admin"
    },
       
    {
      path: "/feature-product",
      name: "Feature Product",
      rtlName: "ملف تعريفي للمستخدم",
      icon: Person,
      component: Featured,
      layout: "/admin"
    },
    
    // {
    //   path: "/rtl-page",
    //   name: "Support Tikets",
    //   rtlName: "پشتیبانی از راست به چپ",
    //   icon: Language,
    //   component: RTLPage,
    //   layout: "/store"
    // },
    // {
    //   path: "/icons",
    //   name: "Review List",
    //   rtlName: "الرموز",
    //   icon: BubbleChart,
    //   component: Icons,
    //   layout: "/store"
    // },
    {
      path: "/signout",
      name: "Signout",
      rtlName: "الرموز",
      icon: BubbleChart,
      component: Signout,
      layout: "/admin"
    }
   
    
  ]


    export default dashboardRoutes
 



