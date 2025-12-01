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
    register: "https://coconut-gtcrbzgmckekarcb.westeurope-01.azurewebsites.net/register",
    login_cookie: "https://coconut-gtcrbzgmckekarcb.westeurope-01.azurewebsites.net/login?useCookies=true",
    login_token: "https://coconut-gtcrbzgmckekarcb.westeurope-01.azurewebsites.net/login",
    user_coconuts: "https://coconut-gtcrbzgmckekarcb.westeurope-01.azurewebsites.net/coconut/",
    coconut_entries: "https://coconut-gtcrbzgmckekarcb.westeurope-01.azurewebsites.net/coconut/",
    coconut_path: "https://coconut-gtcrbzgmckekarcb.westeurope-01.azurewebsites.net/coconut/",
    entry_path: "https://coconut-gtcrbzgmckekarcb.westeurope-01.azurewebsites.net/entry/",
    logout: "https://coconut-gtcrbzgmckekarcb.westeurope-01.azurewebsites.net/logout",
  },
  links: {
    github: "/",
    twitter: "/",
    docs: "/",
    discord: "/",
    sponsor: "/",
  },
};
