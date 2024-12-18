import React, { FunctionComponent } from "react";
import { Col, Row } from "reactstrap";

import {
  InfoLogEntry,
  LogEntry,
  LogEntryType,
  MessageLogEntry,
} from "../../../../client";
import LogEntryTimestamp from "./LogEntryTimestamp";

export type Props = {
  entry: LogEntry;
};

const renderInfoEntry = (entry: InfoLogEntry) => (
  <>
    {entry.type === LogEntryType.INFO && (
      <>
        <span className="mr-1">*</span>&nbsp;
      </>
    )}
    <span>{entry.text}</span>
  </>
);

const renderMessageEntry = (entry: MessageLogEntry) => (
  <>
    <span className="mr-1">
      &lt;
      <span className={entry.isHighlight ? "text-warning" : ""}>
        {entry.source}
      </span>
      &gt;
    </span>
    &nbsp;
    <span>{entry.text}</span>
  </>
);

const renderEntry = (entry: LogEntry) => {
  switch (entry.type) {
    case LogEntryType.ERROR:
    case LogEntryType.INFO:
      return renderInfoEntry(entry as InfoLogEntry);

    case LogEntryType.MESSAGE:
      return renderMessageEntry(entry as MessageLogEntry);
  }
};

const getEntryClassName = (entry: LogEntry): string | undefined => {
  switch (entry.type) {
    case LogEntryType.ERROR:
      return "text-danger";

    case LogEntryType.INFO:
      return "text-success";

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

LogEntryListItem.displayName = "LogEntryListItem";

export default LogEntryListItem;
