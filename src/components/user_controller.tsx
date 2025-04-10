import { MouseEvent } from "react";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { useAuth } from "@/components/auth_provider";

export default function LandingLoginOptions() {
  const auth = useAuth();

  const loginHandler = (e: MouseEvent) => {
    switch ((e.currentTarget as Element).id) {
      case "#guest":
        const data = {
          email: "guest@nomail.com",
          password: "fake",
          remember_me: false,
        };

        auth.login(data);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <Button
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Login
        </Button>
        <Button
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          Create Account
        </Button>
      </div>

      <div className="mt-8">
        <Button
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          id="#guest"
          onMouseDown={(event) => loginHandler(event)}
        >
          <span>
            Try a non-permanent <Code color="primary">guest account</Code>
          </span>
        </Button>
      </div>
    </>
  );
}

export function LogOutButton() {
  const auth = useAuth();

  const logoutHandler = () => {
    auth.logout();
  };

  return (
    <Button
      className={buttonStyles({ variant: "bordered", radius: "full" })}
      onMouseDown={logoutHandler}
    >
      Log Out
    </Button>
  );
}
