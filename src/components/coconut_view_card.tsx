import { dateInput, Image } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

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

type Entry = {
  id: string;
  title: string;
  creationDate: Date;
  content: string;
  coconutId: string;
};

export interface CoconutViewCardProps {
  coconut: Coconut;
  onBack: () => void;
}

export default function CoconutViewCard(props: CoconutViewCardProps) {
  const [entries, setEntries] = useState(new Array<Entry>());
  const [selected_entry, setSelectedEntry] = useState(new Array<Entry>());
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

  const cover_url = `https://covers.openlibrary.org/b/olid/${props.coconut.isbn}-M.jpg`;

  const book_info_url = `https://openlibrary.org/api/books?bibkeys=OLID:${props.coconut.isbn}&jscmd=data&format=json`;

  function GetCoconutEntries(id: string): void {
    //Get the coconut details from API
    /*     fetch(`${siteConfig.api_endpoints.coconut_path}${id}/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCoconut(data));
 */

    console.log(props);
    // Get the related entries from API

    fetch(`${siteConfig.api_endpoints.coconut_path}${id}/entry`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEntries(data);
      });

    // Show entries in the console
    console.log(entries);

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
        console.log(data);
        var key = Object.keys(data)[0];
        const book = data[key];

        setTitle(book.title);
        setSubtitle(book.subtitle);
        setAuthor(book.authors[0].name);
      });
  }

  function HandleSelection(id: string): void {
    setSelectedEntry(id);
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
    [props.id],
  );

  return (
    <div className="coconut-view-card flex">
      <div className="coconut-details">
        <h2>{title}</h2>
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
        <div className="entries-list">
          {entries.map((entry) => (
            <div key={entry.id} className="entry-item">
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              <small>
                Created on: {new Date(entry.creationDate).toLocaleDateString()}
              </small>
            </div>
          ))}
          {/* Additional details and functionality can be added here */}
        </div>
      </div>
      <div className="coconut-display">
        <p>Details go here</p>
      </div>
    </div>
  );
}
function setTitle(title: any) {
  throw new Error("Function not implemented.");
}
