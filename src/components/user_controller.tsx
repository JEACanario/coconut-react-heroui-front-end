import { MouseEvent, useRef, useState } from "react";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { useAuth } from "@/components/auth_provider";

import "../styles/user_controller.css";

export default function LandingLoginOptions() {
  const [action, setAction] = useState("");
  const formRef = useRef<HTMLDivElement | null>(null);

  let [option, setOption] = useState("none");

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
      case "#login":
        option === "login" ? setOption("") : setOption("login");
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
        >
          <GithubIcon size={20} />
          Create Account
        </Button>
      </div>
      <div
        ref={formRef}
        className="content-parent"
        style={
          option === "login"
            ? { height: formRef.current?.scrollHeight + "px" }
            : { height: "0px" }
        }
      >
        <Form
          className="w-full max-w-xs flex flex-col gap-4"
          onReset={() => setAction("reset")}
          onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));

            setAction(`submit ${JSON.stringify(data)}`);
          }}
        >
          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
          />

          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Password"
            labelPlacement="outside"
            name="Password"
            placeholder="Enter your password"
            type="Password"
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button type="reset" variant="flat">
              Reset
            </Button>
          </div>
          {action && (
            <div className="text-small text-default-500">
              Action: <code>{action}</code>
            </div>
          )}
        </Form>
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
