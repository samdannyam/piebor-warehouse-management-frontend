import { createRouter, createWebHistory } from "vue-router";

// Import your Vue components for different routes
import Layout from "../layouts/Default.vue";
import Login from "../views/Login.vue";
import V2p from "../views/v2.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        { path: "/", component: V2p },
      ],
    },

    {
      path: "/login",
      component: Login,
    },
    // {
    //   path: "/DevOption",
    //   component: DevOption,
    // },
  ],
});
// first route to login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.path === "/login") {
    next();
  } else {
    if (!token) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
