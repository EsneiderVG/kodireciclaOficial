import messages from "@/const/messages"
// import { PencilSquareIcon } from "@heroicons/react/24/solid"
import { Button } from "@material-tailwind/react"
import { MouseEventHandler } from "react"

export const SaveButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <Button
      id={messages.title.SAVE}
      disabled={disabled}
      className="m-2"
      type="submit"
    >
      <span>{messages.title.SAVE} </span>
    </Button>
  )
}

export const CancelButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <Button
      id={messages.title.CANCEL}
      className="m-2"
      onClick={onClick}
    >
      <span>{messages.title.CANCEL} </span>
    </Button>
  )
}

export const EditButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <Button
      id={messages.title.EDIT}
      size="sm"
      className="text-xs m-2"
      onClick={onClick}
    >
      <span className="flex">{messages.title.EDIT} </span>
      {/* <span className="flex">{messages.title.EDIT} <PencilSquareIcon className="ml-2 w-4" /></span> */}
    </Button>
  )
}