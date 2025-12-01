import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { FormEvent, useState } from "react";

import { siteConfig } from "@/config/site";

export default function RegistrationForm() {
  let [message, setMessage] = useState("");
  const handleReset = () => {
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    {
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.currentTarget));

      const response = await fetch(siteConfig.api_endpoints.register, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: data.Email, password: data.Password }),
      });
      //@todo override user name with /update/

      if (response.ok) {
        setMessage("Account Created! Please login!");
      } else {
        const feedback = await response.json();

        setMessage(`${feedback.title} ${JSON.stringify(feedback.errors)}`);
      }
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
        errorMessage="Please enter a password"
        label="Password"
        labelPlacement="outside"
        name="Password"
        placeholder="Enter your Password"
        type="Password"
      />
      <p>{message}</p>
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Register
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
    </Form>
  );
}
