import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
// import { Checkbox } from "@heroui/checkbox";
import { FormEvent } from "react";

import { useAuth } from "./auth_provider";

export default function LoginForm() {
  const auth = useAuth();

  const handleReset = () => {};
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    {
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.currentTarget));

      auth.login({
        email: data.Email as string,
        password: data.Password as string,

        //remember me funnctionality to be implemented later
        remember: "true",
      });
    }
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid e-mail"
        label="E-mail"
        labelPlacement="outside"
        name="Email"
        placeholder="Enter your e-mail"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid password"
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

      {/*  <Checkbox defaultSelected name="Remember" size="sm" value="true">
        Remember me?
      </Checkbox> */}
    </Form>
  );
}
