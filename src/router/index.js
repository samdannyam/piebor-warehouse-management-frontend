import { createRouter, createWebHistory } from "vue-router";

// Import your Vue components for different routes
import Layout from "../layouts/Default.vue";
import HomePage from "../views/DashBoard.vue";
// import Login from "../views/Login.vue";
// import Workers from "../views/RealTime.vue";
// import Attendance from "../views/Attendance.vue";
// import DataPush from "../views/PushTest.vue";
// import DevOption from "../devTools/DevOption.vue";
import DataTable from "../views/DataTable.vue";
import V2p from "../views/v2.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        { path: "/", name: "Dashboard", component: HomePage },
        { path: "/dataTable", component: DataTable },
        { path: "/v2", component: V2p },
        // { path: "/dataPush", name: "PushData", component: DataPush },
        // { path: "/poll", name: "Poll", component: Workers },
        // { path: "/attendance", name: "Attendance", component: Attendance },
      ],
    },

    // {
    //   path: "/login",
    //   component: Login,
    // },
    // {
    //   path: "/DevOption",
    //   component: DevOption,
    // },
  ],
});
// first route to login
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");
//   if (to.path === "/login") {
//     next();
//   } else {
//     if (!token) {
//       next("/login");
//     } else {
//       next();
//     }
//   }
// });

export default router;
