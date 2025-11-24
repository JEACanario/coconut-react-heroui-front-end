import { siteConfig } from "@/config/site";
import {
  Card,
  CardFooter,
  Image,
  Button,
  Form,
  Input,
  PressEvent,
} from "@heroui/react";
import { useState } from "react";
import { debounce } from "ts-debounce";

import { useAuth } from "./auth_provider";

export interface CoconutNewProps {
  onNew: () => void;
}

export default function CoconutNew({ onNew }: CoconutNewProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [newCoconutBook, setNewCoconutBook] = useState<Book | null>(null);
  const auth = useAuth();

  type Book = {
    title: string;
    author_name: string[];
    olid: string;
    cover_i: number;
  };

  const handleSearch = (input: string) => {
    if (input?.length >= 3) setQuery(input);

    setSelectedBook(null);

    console.log("Searching for:", input);

    async function getResults(query: string) {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=10`,
      );
      const data = await response.json();
      console.log("Search results:", data);
      setResults(data?.docs);
    }

    if (input.length >= 3) {
      getResults(input);
    } else {
      setResults([]);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setResults([]);
    setSelectedBook(null);
    setNewCoconutBook(null);
    e.preventDefault();
    handleSearch(e.currentTarget.Title.value);
  };

  function handleSelect(book: Book): void {
    console.log("Selected book:", book.olid);
    // If the book is already selected, deselect it
    // Otherwise, set it as the selected book
    if (book.olid == selectedBook) {
      setSelectedBook(null);
      setNewCoconutBook(null);

      return;
    }
    setNewCoconutBook(book);
    setSelectedBook(book.olid);
    console.log("New Coconut Book:", newCoconutBook);
  }

  async function createCoconut(e: PressEvent) {
    console.log(`Creating coconut...`);
    console.log("New Coconut Book at create:", newCoconutBook);

    e.target.classList.toggle("invisible");
    if (!newCoconutBook) {
      console.error("No book selected for coconut creation.");
      return;
    }
    // This will need to be replaced with additional data at some point
    const coconutData = {
      Id: 0,
      Status: 0,
      Isbn: newCoconutBook.olid,
      CoverUrl: `https://covers.openlibrary.org/b/id/${newCoconutBook.cover_i}-M.jpg`,
      StartDate: "0001-01-01",
      EndDate: "0001-01-01",
      UserId: null,
      User: null,
      Entries: [],
    };

    const res = await fetch(siteConfig.api_endpoints.coconut_path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(coconutData),
    });
    onNew();
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Create a New Coconut</h1>
      <p className="mb-4">Search for a book to start your coconut.</p>
      <Form className="w-full max-w-xs" onSubmit={onSubmit}>
        <Input
          isRequired
          errorMessage="Please enter a valid title"
          label="Title"
          labelPlacement="outside"
          name="Title"
          placeholder="Search for a book by title"
          type="title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log("Input changed:", e.target.value);
            const func = debounce(() => handleSearch(e.target.value), 1000);
            func();
          }}
        />
        <Button type="submit" variant="bordered">
          Search
        </Button>
      </Form>
      {results.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {results.map(
            (book) =>
              (!selectedBook || book.cover_edition_key === selectedBook) && (
                <Card
                  isPressable
                  isFooterBlurred
                  key={book.cover_edition_key}
                  className="border-none"
                  radius="lg"
                  onPress={() => {
                    console.log(`${book.cover_edition_key} ${book.title}`);

                    handleSelect({
                      olid: book.cover_edition_key,
                      title: book.title,
                      author_name: book.author_name,
                      cover_i: book.cover_i,
                    });
                  }}
                >
                  <Image
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    className="object-cover h-80"
                  />
                  <CardFooter className="justify-between before:bg-white/10 border-white/20 flex-col border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className="text-tiny text-white/80">{book.title}</p>
                    <p className="text-tiny text-white/80">
                      {" "}
                      {book.author_name?.length > 0 ? book.author_name[0] : ""}
                    </p>
                  </CardFooter>
                </Card>
              ),
          )}
        </div>
      )}
      {selectedBook && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Selected Book</h2>
          <Button
            color="primary"
            onPress={(e) => {
              createCoconut(e);
            }}
          >
            Create Coconut
          </Button>
        </div>
      )}
    </>
  );
}
