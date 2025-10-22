export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CoCoNuT",
  description: "COntent COmpanion Note UTility",
  navItems: [],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  api_endpoints: {
    register: "https://localhost:7260/register",
    login_cookie: "https://localhost:7260/login?useCookies=true",
    login_token: "https://localhost:7260/login",
    user_coconuts: "https://localhost:7260/coconut/",
    coconut_entries: "https://localhost:7260/coconut/",
    coconut_path: "https://localhost:7260/coconut/",
    entry_path: "https://localhost:7260/entry/",
  },
  links: {
    github: "/",
    twitter: "/",
    docs: "/",
    discord: "/",
    sponsor: "/",
  },
};
