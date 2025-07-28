import type { Entry } from "@/types/entry";

import { BaselineEdit } from "./icons";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Textarea,
  Input,
  DatePicker,
} from "@heroui/react";

import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import { useState } from "react";

export interface EntryCardProps {
  entry: Entry;
  edit: boolean;
}

export default function EntryCard(props: EntryCardProps) {
  const [edit, setEdit] = useState(props.edit);
  const entry = props.entry;
  const [title, setTitle] = useState(entry.title || "Untitled Entry");
  const creationDate =
    parseAbsoluteToLocal(entry.creationDate.toISOString()) ||
    parseAbsoluteToLocal(
      today(getLocalTimeZone()).toDate(getLocalTimeZone()).toISOString(),
    );

  const [date, setDate] = useState<ZonedDateTime>(creationDate);
  const [content, setContent] = useState(entry.content);

  console.log("EntryCard", entry);

  function handleEdit(e: PressEvent): void {
    if (edit) saveChanges();

    setEdit((prev) => !prev);
  }

  function saveChanges() {
    entry.title = title;
    entry.content = content;
    entry.creationDate = date.toDate();
    console.log("Changes saved for entry:", entry);
  }

  return (
    <>
      <Card className="min-w-[800px] flex">
        <CardHeader className="flex justify-between items-center self-center">
          <div className="self-center">
            <Input
              className="self-center justify-center  flex-grow"
              isReadOnly={!edit}
              placeholder="Enter your title"
              value={title}
              variant={edit ? "bordered" : "underlined"}
              onValueChange={setTitle}
            />
          </div>
          <div className="gap-4 items-center justify-self-end">
            <Button
              isIconOnly
              aria-label="Like"
              color="secondary"
              variant={edit ? "faded" : "light"}
              onPress={(e) => handleEdit(e)}
            >
              <BaselineEdit />
            </Button>
          </div>
        </CardHeader>

        <CardBody>
          <Textarea
            className=""
            isReadOnly={!edit}
            placeholder="Enter your thoughts here..."
            value={content}
            variant={edit ? "bordered" : "underlined"}
            onValueChange={setContent}
          />
        </CardBody>

        <CardFooter>
          <DatePicker
            hideTimeZone
            aria-label="entry date"
            isReadOnly={!edit}
            granularity="day"
            className="max-w-[284px]"
            value={date}
            onChange={setDate}
            variant={edit ? "bordered" : "underlined"}
          />
        </CardFooter>
      </Card>
    </>
  );
}
function saveChanges() {
  throw new Error("Function not implemented.");
}
