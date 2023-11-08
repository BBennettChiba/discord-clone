import React from "react";

type Props = {
  body: string;
};

export const EditMessage = ({ body }: Props) => {
  console.log(body);
  return <div>{body} edit</div>;
};
