import React from "react";

type Props = {
  params: { channel: string };
};

const Channel = ({ params: { channel } }: Props) => (
  <div className="flex-1">{channel}</div>
);

export default Channel;
