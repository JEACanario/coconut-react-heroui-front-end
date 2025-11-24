import { useEffect, useState } from "react";

import CoconutNew from "./coconut_new";
import CoconutCard from "./coconut_card";
import { useAuth } from "./auth_provider";

import { siteConfig } from "@/config/site";
import "../styles/coconut_controller.css";
import CoconutViewCard from "./coconut_view_card";
import { Button, select, Spacer } from "@heroui/react";

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
  const [start_new, setStartNew] = useState(false);

  function GetUserCoconuts() {
    fetch(siteConfig.api_endpoints.user_coconuts, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
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

  function HandleNewCoconut(): void {
    start_new ? setStartNew(false) : setStartNew(true);
  }
  function HandleCoconutCreated() {
    setStartNew(false);
    GetUserCoconuts();
    HandleBack();
  }

  return (
    <>
      <Button
        fullWidth={true}
        color="primary"
        variant="light"
        onPress={HandleNewCoconut}
      >
        {start_new ? "Back to your coconuts" : "Start a new Coconut?"}
      </Button>

      {/* // If start_new is true, show the form to create a new coconut */}

      {start_new && <CoconutNew onNew={HandleCoconutCreated} />}

      {/*       // If active_selection is true and start_new is disabled, show the CoconutViewCard
      // Otherwise, show the list of coconuts */}
      {active_selection && !start_new ? (
        <CoconutViewCard coconut={selected_coconut} onBack={HandleBack} />
      ) : (
        !start_new && (
          <div className="card_grid justify-between">
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
        )
      )}
    </>
  );
}
