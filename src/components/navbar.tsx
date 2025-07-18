import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { useAuth } from "./auth_provider";
import { LogOutButton } from "./user_controller";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
// import { TwitterIcon, GithubIcon, DiscordIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const auth = useAuth();

  return (
    <HeroUINavbar shouldHideOnScroll maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">CoCoNuT</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
{/*           {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))} */}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {auth.user && (
          <NavbarItem className="hidden sm:flex gap-2">
            <LogOutButton />
          </NavbarItem>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};
