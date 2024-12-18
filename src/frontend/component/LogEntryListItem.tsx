import React, { FunctionComponent } from "react";
import { Col, Row } from "reactstrap";

import {
  ErrorLogEntry,
  JoinLogEntry,
  LogEntry,
  LogEntryType,
  MessageLogEntry,
  PartLogEntry,
  QuitLogEntry,
} from "../types/log";

import LogEntryTimestamp from "./LogEntryTimestamp";

export type Props = {
  entry: LogEntry;
};

const renderJoinEntry = (entry: JoinLogEntry) => (
  <>
    <span className="mr-1">*</span>
    <span>{`${entry.nick} has joined ${entry.channel}`}</span>
  </>
);

const renderPartEntry = (entry: PartLogEntry) => (
  <>
    <span className="mr-1">*</span>
    <span>{`${entry.nick} has left ${entry.channel}`}</span>
  </>
);

const renderQuitEntry = (entry: QuitLogEntry) => (
  <>
    <span className="mr-1">*</span>
    <span>{`${entry.nick} has quit`}</span>
  </>
);

const renderMessageEntry = (entry: MessageLogEntry) => (
  <>
    <span className="mr-1">
      &lt;
      <span className={entry.isHighlight ? "text-warning" : ""}>
        {entry.nick}
      </span>
      &gt;
    </span>
    <span>{entry.message}</span>
  </>
);

const renderErrorEntry = (entry: ErrorLogEntry) => entry.message;

const renderEntry = (entry: LogEntry) => {
  switch (entry.type) {
    case LogEntryType.JOIN:
      return renderJoinEntry(entry as JoinLogEntry);

    case LogEntryType.PART:
      return renderPartEntry(entry as PartLogEntry);

    case LogEntryType.QUIT:
      return renderQuitEntry(entry as QuitLogEntry);

    case LogEntryType.MESSAGE:
      return renderMessageEntry(entry as MessageLogEntry);

    case LogEntryType.ERROR:
      return renderErrorEntry(entry as ErrorLogEntry);
  }
};

const getEntryClassName = (entry: LogEntry): string | undefined => {
  switch (entry.type) {
    case LogEntryType.JOIN:
    case LogEntryType.PART:
      return "text-success";

    case LogEntryType.QUIT:
      return "text-info";

    case LogEntryType.ERROR:
      return "text-danger";

    default:
      return undefined;
  }
};

const LogEntryListItem: FunctionComponent<Props> = ({ entry }) => (
  <Row>
    <Col lg="auto" className="pl-2 pr-2 text-secondary">
      <LogEntryTimestamp timestamp={entry.timestamp} />
    </Col>
    <Col className={`text-break ${getEntryClassName(entry)}`}>
      {renderEntry(entry)}
    </Col>
  </Row>
);

export default LogEntryListItem;
