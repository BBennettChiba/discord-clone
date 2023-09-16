import React from "react";

type Props = {
  params: { channel: string };
};

const Channel = ({ params: { channel } }: Props): JSX.Element => (
  <div className="flex-1 bg-zinc-700">{channel}</div>
);

export default Channel;
