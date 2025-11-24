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
} from "@heroui/react";
import {
  getLocalTimeZone,
  parseAbsoluteToLocal,
  parseZonedDateTime,
  today,
  ZonedDateTime,
} from "@internationalized/date";
import { useState } from "react";

import {
  BaselineClear,
  BaselineDelete,
  BaselineEdit,
  BaselineSave,
} from "./icons";

import { siteConfig } from "@/config/site";

export interface EntryCardProps {
  entry: Entry;
  edit: boolean;
  onCreateOrDelete: () => void;
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

  const [date, setDate] = useState(parseZonedDateTime(creationDate.toString()));
  const [content, setContent] = useState(entry.content);

  function handleEdit(): void {
    setEdit((prev) => !prev);
  }

  function saveChanges() {
    entry.title = title;
    entry.content = content;
    entry.creationDate = date.toDate();
    creationDate = date;

    // Update the entry in the backend or state management as needed

    var entry_payload = {
      id: entry.id,
      title: entry.title,
      content: entry.content,
      creationDate: entry.creationDate.toISOString().split("T")[0],
      coconutId: entry.coconutId,
    };

    fetch(`${siteConfig.api_endpoints.entry_path}${entry.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(entry_payload),
    });
  }

  function handleSave(): void {
    if (entry.id !== "") {
      saveChanges();
      handleEdit();
    } else {
      // Creating a new entry
      const newEntryData = {
        title: title,
        content: content,
        creationDate: date.toDate().toISOString().split("T")[0],
        coconutId: entry.coconutId,
      };

      fetch(`${siteConfig.api_endpoints.entry_path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(newEntryData),
      })
        .then((response) => response.json())
        .then(() => {
          // Update the entry with the returned data (like the new ID)
          // entry.id = data.id;
          handleEdit();
          props.onCreateOrDelete();
        });
    }
  }

  function handleClear(): void {
    setTitle(entry.title);
    setContent(entry.content);
    setDate(creationDate);
    handleEdit();
  }

  function handleDelete(): void {
    if (!confirm("Are you sure you want to delete this entry?")) {
      return;
    }

    fetch(`${siteConfig.api_endpoints.entry_path}${entry.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        props.onCreateOrDelete();
        // Notify parent component to remove this entry from the list
        // You may want to add a callback prop like onDelete={() => props.onDelete(entry.id)}
      } else {
      }
    });
  }

  function setDateProxy(newDate: ZonedDateTime | null) {
    if (newDate === null) return;
    setDate(newDate);
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
            {entry.id !== "" && edit && (
              <Button
                isIconOnly
                aria-label="Delete"
                color="danger"
                variant="light"
                onPress={handleDelete}
              >
                <BaselineDelete />
              </Button>
            )}
            {edit && (
              <Button
                isIconOnly
                aria-label="Like"
                color="secondary"
                variant={edit ? "faded" : "light"}
                onPress={() => handleClear()}
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
                onPress={() => handleSave()}
              >
                <BaselineSave />
              </Button>
            ) : (
              <Button
                isIconOnly
                aria-label="Like"
                color="secondary"
                variant={edit ? "faded" : "light"}
                onPress={() => handleEdit()}
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
            className="max-w-[284px]"
            granularity="day"
            isReadOnly={!edit}
            value={date}
            variant={edit ? "bordered" : "underlined"}
            onChange={setDateProxy}
          />
        </CardFooter>
      </Card>
    </>
  );
}
