import { format } from "date-fns";
import React, { FunctionComponent } from "react";

export type LogEntryTimestampProps = {
  timestamp: number;
};

export const LogEntryTimestamp: FunctionComponent<LogEntryTimestampProps> = ({
  timestamp,
}) => (
  <span title={format(timestamp, "yyyy-MM-dd HH:mm:ss")}>
    {format(timestamp, "HH:mm")}
  </span>
);

LogEntryTimestamp.displayName = "LogEntryTimestamp";

export default LogEntryTimestamp;
