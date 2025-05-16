import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { FormEvent } from "react";

export default function RegistrationForm() {
  const handleReset = () => {};
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    {
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.currentTarget));

      console.log(data);
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
        errorMessage="Please enter desiredcross  username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="E-mail"
        labelPlacement="outside"
        name="E-mail"
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
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
    </Form>
  );
}
