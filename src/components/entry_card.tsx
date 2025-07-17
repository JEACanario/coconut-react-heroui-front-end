import type { Entry } from "@/types/entry";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@heroui/react";

export interface EntryCardProps {
  entry: Entry;
  edit: boolean;
}

export default function EntryCard(props: EntryCardProps) {
  const entry = props.entry;
  const title = entry.title || "Untitled Entry";
  const creationDate = entry.creationDate
    ? new Date(entry.creationDate).toLocaleDateString()
    : "Unknown Date";
  const content = entry.content || "No content available.";

  console.log("EntryCard", entry);

  return (
    <>
      <Card className="min-w-[800px] flex flex-col">
        <CardHeader className="flex justify-center">
          <div className="flex flex-col">
            <p className="text-md">{title} </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{content}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <p className="text-small">{creationDate}</p>
        </CardFooter>
      </Card>
    </>
  );
}
