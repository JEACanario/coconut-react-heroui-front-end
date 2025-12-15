import { MouseEvent, useRef, useState } from "react";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";

import LoginForm from "./login_form";
import RegistrationForm from "./registration_form";

import { siteConfig } from "@/config/site";
import { RegisterBook } from "@/components/icons";
import { useAuth } from "@/components/auth_provider";

import "../styles/user_controller.css";

export default function LandingLoginOptions() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const registerFormRef = useRef<HTMLDivElement | null>(null);
  let [option, setOption] = useState("none");

  const auth = useAuth();

  const loginHandler = (e: MouseEvent) => {
    switch ((e.currentTarget as Element).id) {
      case "#guest":
        const data = {
          email: "guest@nomail.com",
          password: "fake",
          remember: "false",
        };

        auth.login(data);
        break;
      case "#login":
        option === "login" ? setOption("none") : setOption("login");
        break;
      case "#register":
        option === "register" ? setOption("none") : setOption("register");
        break;

      default:
        setOption("none");
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
          id="#login"
          onMouseDown={(event) => {
            loginHandler(event);
          }}
        >
          Login
        </Button>
        <Button
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
          id="#register"
          onMouseDown={(event) => {
            loginHandler(event);
          }}
        >
          <RegisterBook size={20} />
          Create Account
        </Button>
      </div>
      <div
        ref={formRef}
        className="content-parent"
        style={
          option === "login"
            ? {
                height:
                  (
                    Number.parseInt(String(formRef.current?.scrollHeight)) + 40
                  ).toString() + "px",
              }
            : { height: "0px" }
        }
      >
        <LoginForm />
      </div>

      <div
        ref={registerFormRef}
        className="content-parent"
        style={
          option === "register"
            ? {
                height:
                  (
                    Number.parseInt(String(formRef.current?.scrollHeight)) + 40
                  ).toString() + "px",
              }
            : { height: "0px" }
        }
      >
        <RegistrationForm />
      </div>

      <div className="mt-8">
        <Button
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          id="#guest"
          onMouseDown={(event) => loginHandler(event)}
        >
          <span>
            Try a non-permanent <Code color="primary">guest account</Code>
            <Code color="warning"> Feature currently undergoing rework. Accounts can be created with any e-mail-like address </Code>
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
