import type { Entry } from "@/types/entry";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Textarea,
  Input,
  DatePicker,
  PressEvent,
} from "@heroui/react";
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import { useState } from "react";

import { BaselineClear, BaselineEdit, BaselineSave } from "./icons";
import { siteConfig } from "@/config/site";

export interface EntryCardProps {
  entry: Entry;
  edit: boolean;
}

export default function EntryCard(props: EntryCardProps) {
  const [edit, setEdit] = useState(props.edit);
  const entry = props.entry;
  const [title, setTitle] = useState(entry.title || "Untitled Entry");
  let creationDate =
    parseAbsoluteToLocal(entry.creationDate.toISOString()) ||
    parseAbsoluteToLocal(
      today(getLocalTimeZone()).toDate(getLocalTimeZone()).toISOString(),
    );

  const [date, setDate] = useState<ZonedDateTime>(creationDate);
  const [content, setContent] = useState(entry.content);

  console.log("EntryCard", entry);

  function handleEdit(e: PressEvent): void {
    setEdit((prev) => !prev);
  }

  function saveChanges() {
    entry.title = title;
    entry.content = content;
    entry.creationDate = date.toDate();
    creationDate = date;
    console.log("Changes saved for entry:", entry);
  }

  function handleSave(e: PressEvent): void {
    if(entry.id !== ""){
    saveChanges();
    handleEdit(e);
    console.log("Changes saved for entry:", entry);

    } else {
      // Creating a new entry
      const newEntryData = {
        title: title,
        content: content,
        creationDate: date.toDate().toISOString(),
        coconutId: entry.coconutId,
      };

      fetch(
        `${siteConfig.api_endpoints.coconut_path}${entry.coconutId}/entry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(newEntryData),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("New entry created:", data);
          // Update the entry with the returned data (like the new ID)
          entry.id = data.id;
          handleEdit(e);
        })
        .catch((error) => {
          console.error("Error creating new entry:", error);
        });
    }
  }

  function handleClear(e: PressEvent): void {
    setTitle(entry.title);
    setContent(entry.content);
    setDate(creationDate);
    handleEdit(e);
    console.log("Changes cleared for entry:", entry);
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
          <div className="gap-4 items-center flex justify-self-end">
            {edit && (
              <Button
                isIconOnly
                aria-label="Like"
                color="secondary"
                variant={edit ? "faded" : "light"}
                onPress={(e) => handleClear(e)}
              >
                <BaselineClear />
              </Button>
            )}
            {edit ? (
              <Button
                isIconOnly
                aria-label="Like"
                color="secondary"
                variant={edit ? "faded" : "light"}
                onPress={(e) => handleSave(e)}
              >
                <BaselineSave />
              </Button>
            ) : (
              <Button
                isIconOnly
                aria-label="Like"
                color="secondary"
                variant={edit ? "faded" : "light"}
                onPress={(e) => handleEdit(e)}
              >
                <BaselineEdit />
              </Button>
            )}
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
            variant={edit ? "bordered" : "underlined"}
            onChange={setDate}
          />
        </CardFooter>
      </Card>
    </>
  );
}
