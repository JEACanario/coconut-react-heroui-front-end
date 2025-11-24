import type { Entry } from "@/types/entry";

import { Image } from "@heroui/react";
import { useEffect, useState } from "react";

import EntryCard from "./entry_card";

import { siteConfig } from "@/config/site";

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

export interface CoconutViewCardProps {
  coconut: Coconut;
  onBack: () => void;
}

export default function CoconutViewCard(props: CoconutViewCardProps) {
  const [entries, setEntries] = useState(new Array<Entry>());
  const [noEntries, setNoEntries] = useState({ status: false });
  const [coconut, setCoconut] = useState<Coconut>({
    id: "",
    status: "",
    isbn: "",
    coverUrl: "",
    startDate: "",
    endDate: "",
    userId: "",
    user: "",
    entries: "",
  });
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");

  const blankEntry: Entry = {
    id: "",
    title: "Create New Entry ?",
    content: "Edit me!",
    creationDate: new Date(),
    coconutId: coconut.id,
  };

  const cover_url = `https://covers.openlibrary.org/b/olid/${props.coconut.isbn}-M.jpg`;

  const book_info_url = `https://openlibrary.org/api/books?bibkeys=OLID:${props.coconut.isbn}&jscmd=data&format=json`;

  function GetCoconutEntries(id: string): void {
    // Get the related entries from API

    fetch(`${siteConfig.api_endpoints.coconut_path}${id}/entry`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        let data2 = data.map((entry: any) => ({
          ...entry,
          creationDate: new Date(entry.creationDate),
        }));

        setEntries(data2);

        setNoEntries({ status: data2.length === 0 });
      });

    // Set the cover URL and book info URL
    setCoconut((prev) => ({
      ...prev,
      coverUrl: `https://covers.openlibrary.org/b/olid/${coconut.isbn}-M.jpg`,
    }));

    // Fetch book details using Open Library API
    fetch(book_info_url, {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        var key = Object.keys(data)[0];
        const book = data[key];

        setTitle(book.title);
        setSubtitle(book.subtitle);
        setAuthor(book.authors[0].name);
      });
  }

  function HandleBack() {
    setTitle("");
    setSubtitle("");
    setAuthor("");
    props.onBack();
  }

  useEffect(
    function () {
      GetCoconutEntries(props.coconut.id);
    },
    [props.coconut.id],
  );

  return (
    <div className="coconut-view-card flex gap-10 justify-between">
      <div className="coconut-details w-400">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <h4>by {author}</h4>
        {/* Left Side Image */}
        <button
          className="coconut-cover flex items-center justify-center"
          onClick={() => HandleBack()}
        >
          <Image
            alt="Card background"
            className="object-cover rounded-xl wrapper"
            height={500}
            src={cover_url}
            width={300}
          />
        </button>
        <p>Details for Coconut ID: {coconut.id}</p>
        {/* Boook details go here */}
      </div>
      <div className="coconut-entry-list flex flex-start flex-col items-center gap-4 w-900">
        {/* Entry list */}
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            edit={false}
            entry={entry}
            onCreateOrDelete={() => GetCoconutEntries(props.coconut.id)}
          /> // Render each entry using EntryCard component
        ))}
        <EntryCard
          key={noEntries.status ? "new-entry" : "blank-entry"}
          edit={noEntries.status ? true : false}
          entry={{ ...blankEntry, coconutId: props.coconut.id }}
          onCreateOrDelete={() => GetCoconutEntries(props.coconut.id)}
        />
      </div>
    </div>
  );
}
