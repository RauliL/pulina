import React, {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useRef,
} from "react";

import { LogEntry } from "../../../../client";
import LogEntryListItem from "./LogEntryListItem";

const style: CSSProperties = {
  overflowY: "auto",
  fontFamily: '"Fira Mono", monospace',
};

export type LogEntryListProps = {
  list: LogEntry[];
};

const LogEntryList: FunctionComponent<LogEntryListProps> = ({ list }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (list.length > 0) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [list]);

  return (
    <div className="container-fluid" style={style} ref={containerRef}>
      {list.map((entry) => (
        <LogEntryListItem key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

LogEntryList.displayName = "LogEntryList";

export default LogEntryList;
