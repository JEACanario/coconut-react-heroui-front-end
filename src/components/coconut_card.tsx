import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useState } from "react";

export interface CoconutCardProps {
  id: string;
  isbn: string;

  cover_url: string;

  on_press: (id: string) => void;
}

export default function CoconutCard(details: CoconutCardProps) {
  const cover_url = `https://covers.openlibrary.org/b/olid/${details.isbn}-M.jpg`;
  const book_info_url = `https://openlibrary.org/api/books?bibkeys=OLID:${details.isbn}&jscmd=data&format=json`;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");

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

  function HandlePress() {
    details.on_press(details.id);
  }

  return (
    <Card
      isPressable
      className="py-4 mb-4 max-w-[340px] min-w-[340px]"
      onPress={HandlePress}
    >
      <CardHeader className="pb-0 pt-2 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{author}</p>
        <h4 className="font-bold text-large text-left">{title}</h4>
        <small className="text-default-500">{subtitle} </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex items-center justify-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl wrapper"
          height={500}
          src={cover_url}
          width={300}
        />
      </CardBody>
    </Card>
  );
}
