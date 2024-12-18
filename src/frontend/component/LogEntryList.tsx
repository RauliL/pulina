import React from "react";

import { LogEntry } from "../types/log";

import LogEntryListItem from "./LogEntryListItem";

export type Props = {
  list: LogEntry[];
};

const style: React.CSSProperties = {
  overflowY: "auto",
  fontFamily: '"Fira Mono", monospace',
};

export default class LogEntryList extends React.Component<Props> {
  private containerRef: React.RefObject<HTMLDivElement | null>;

  public constructor(props: Props) {
    super(props);

    this.containerRef = React.createRef<HTMLDivElement | null>();
  }

  public getSnapshotBeforeUpdate(prevProps: Props) {
    if (prevProps.list.length < this.props.list.length) {
      const container = this.containerRef.current;

      if (container) {
        return container.scrollHeight - container.scrollTop;
      }
    }

    return null;
  }

  public componentDidUpdate(
    prevProps: Props,
    state: {},
    snapshot: number | null,
  ) {
    if (snapshot !== null) {
      const container = this.containerRef.current;

      if (container) {
        container.scrollTop = container.scrollHeight - snapshot;
      }
    }
  }

  public render() {
    return (
      <div className="container-fluid" style={style} ref={this.containerRef}>
        {this.props.list.map((entry) => (
          <LogEntryListItem key={entry.id} entry={entry} />
        ))}
      </div>
    );
  }
}
