import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home/Home.vue";
import About from "../pages/about/About.vue";
import Carrier from "../pages/career/career.vue";
import Contact from "../pages/contact/contact.vue";
import Idea from "../pages/idea/idea.vue";
import Service from "../pages/services/service.vue";
import Work from "../pages/work/work.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/careers",
    component: Carrier,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/ideas",
    component: Idea,
  },
  {
    path: "/services",
    component: Service,
  },
  {
    path: "/work",
    component: Work,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
