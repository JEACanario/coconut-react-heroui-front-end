import { useEffect, useState } from "react";

import CoconutCard from "./coconut_card";
import { useAuth } from "./auth_provider";

import { siteConfig } from "@/config/site";

type Coconut = {
  name: string;
  cover_url: string;
};

export default function CoconutController() {
  const auth = useAuth();
  const [coconuts, setCoconuts] = useState(new Array<Coconut>());

  function GetUserCoconuts() {
    fetch(siteConfig.api_endpoints.user_coconuts, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCoconuts(data));
  }

  useEffect(function () {
    GetUserCoconuts();
  }, []);
  console.log(coconuts);

  return (
    <>
      <h1>Successfully authed {auth.user}</h1>
      {coconuts.map((coconut) => (
        <CoconutCard key={coconut.name} />
      ))}
    </>
  );
}

function CoconutList() {
  return {};
}
