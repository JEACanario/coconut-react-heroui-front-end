import { useEffect, useState } from "react";

import CoconutCard from "./coconut_card";
import { useAuth } from "./auth_provider";

import { siteConfig } from "@/config/site";
import "../styles/coconut_controller.css";
import CoconutViewCard from "./coconut_view_card";
import { select, Spacer } from "@heroui/react";

type Coconut = {
  id: string;
  status: string;
  isbn: string;
  coverUrl: string;
  startDate: string;
  endDate: string;
  userId: string;
  user: string;
  entries: string;
};

export default function CoconutController() {
  const auth = useAuth(); //might not be necessary, but useful for future auth checks
  const [active_selection, setActiveSelection] = useState(false);
  const [coconuts, setCoconuts] = useState(new Array<Coconut>());
  const [selected_coconut, setSelectedCoconut] = useState<Coconut>();

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

  function HandleSelection(coconut: Coconut): void {
    setSelectedCoconut(coconut);
    setActiveSelection(true);
  }

  function HandleBack() {
    setSelectedCoconut({} as Coconut);
    setActiveSelection(false);
    console.log(selected_coconut);
  }

  useEffect(
    function () {
      GetUserCoconuts();
    },
    [auth],
  );

  return (
    <>
      {active_selection ? (
        <CoconutViewCard coconut={selected_coconut} onBack={HandleBack} />
      ) : (
        <div className="card_grid flex-grid flex-wrap justify-between flex-gap-4">
          {coconuts.map((coconut) => (
            <>
              <CoconutCard
                key={coconut.id}
                cover_url={coconut.coverUrl}
                id={coconut.id}
                isbn={coconut.isbn}
                on_press={() => HandleSelection(coconut)}
              />
              <Spacer x={4} />
            </>
          ))}
        </div>
      )}
    </>
  );
}
