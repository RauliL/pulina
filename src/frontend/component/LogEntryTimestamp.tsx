import { format } from "date-fns";
import React, { FunctionComponent } from "react";

export interface Props {
  timestamp: number;
}

export const LogEntryTimestamp: FunctionComponent<Props> = ({ timestamp }) => (
  <span title={format(timestamp, "yyyy-MM-dd HH:mm:ss")}>
    {format(timestamp, "HH:mm")}
  </span>
);

export default LogEntryTimestamp;
