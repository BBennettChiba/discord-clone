import React, {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useState,
  useEffect,
} from "react";
import { useEditMessage } from "@/contexts/EditMessageContext";
import { useClickAway } from "@/hooks";

type Props = {
  body: string;
};

export const EditMessage = ({ body }: Props) => {
  const [newBody, setNewBody] = useState(body);
  const { setEditId } = useEditMessage();
  const [rows, setRows] = useState(1);
  const ref = useClickAway<HTMLTextAreaElement>(() => setEditId(null));

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNewBody(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === "Enter" && event.shiftKey) return;
    if (event.key === "Enter") event.preventDefault();
    if (event.key === "Enter" && body.length > 0) {
      // mutate({
      // body,
      // channelId,
      // parentId: replyTarget,
      // });
      console.log("mutate");
    }
  };

  useEffect(() => {
    const numberOfBreaks = (newBody.match(/\n/g) || []).length;
    setRows(numberOfBreaks + 1);
  }, [newBody, setRows]);

  return (
    <div className="pr-4">
      <textarea
        className="align-botttom w-full resize-none appearance-none overflow-hidden rounded-lg bg-neutral-600 bg-opacity-70 p-4 text-gray-300 focus:outline-none"
        rows={rows}
        ref={ref}
        value={newBody}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
