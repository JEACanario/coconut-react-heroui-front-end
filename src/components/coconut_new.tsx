import { Card, CardFooter, Image, Button, Form, Input } from "@heroui/react";
import { hasOwnProperty, useState } from "react";
import { debounce } from "ts-debounce";

export default function CoconutNew() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

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
    e.preventDefault();
    handleSearch(e.currentTarget.Title.value);
  };

  function handleSelect(olid: string): void {
    console.log("Selected book:", olid);
    // If the book is already selected, deselect it
    // Otherwise, set it as the selected book
    if (olid == selectedBook) {
      setSelectedBook(null);

      return;
    }
    setSelectedBook(olid);
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
            const func = debounce(() => handleSearch(e.target.value), 500);
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
              (!selectedBook || book.cover_i === selectedBook) && (
                <Card
                  isPressable
                  isFooterBlurred
                  key={book.olid}
                  className="border-none"
                  radius="lg"
                  onPress={() => handleSelect(book.cover_i)}
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
          <p>{selectedBook}</p>
        </div>
      )}
    </>
  );
}
