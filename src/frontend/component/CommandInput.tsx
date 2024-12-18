import { startsWith, trim } from "lodash";
import React from "react";
import { Button, Col, Container, Form, Input, Row } from "reactstrap";

import { ClientCommand } from "../../common/command";
import { isBlank, isValidNick } from "../../common/utils";

import { parseCommand } from "../command-parser";
import { Channel } from "../types/channel";

export type StateProps = {
  /** Nickname of the user itself. */
  nick?: string;
  /** List of nicknames on the current channel. */
  users?: string[];
};

export type OwnProps = {
  /** Currently viewed channel. */
  currentChannel: Channel;
  /** Callback for sending a command. */
  onCommand: <T extends ClientCommand>(command: T) => void;
  /** Callback for notifying about command errors. */
  onCommandError: (errorMessage: string) => void;
};

export type Props = StateProps & OwnProps;

export type State = {
  input: string;
};

export default class CommandInput extends React.Component<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement | null>;

  public constructor(props: Props) {
    super(props);

    this.state = { input: "" };
    this.inputRef = React.createRef<HTMLInputElement | null>();
  }

  public componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  public render() {
    return (
      <Form onSubmit={this.onSubmit} className="border-top">
        <Container>
          <Row>
            <Col lg={11} className="mt-2 mb-2">
              <Input
                value={this.state.input}
                onChange={this.onChangeInput}
                onKeyDown={this.onKeyDown}
                style={{ fontFamily: '"Fira Code", monospace' }}
                innerRef={this.inputRef}
              />
            </Col>
            <Col lg={1} className="mt-2 mb-2">
              <Button type="submit" block={true}>
                Send
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    );
  }

  private onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const { input } = this.state;

    event.preventDefault();
    this.setState({ input: "" });

    // Ignore empty input.
    if (!input || isBlank(input)) {
      return;
    }

    // Attempt to parse the input into a command.
    parseCommand(this.props.currentChannel, trim(input))
      .then(this.props.onCommand)
      .catch(this.props.onCommandError);
  };

  private onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ input: event.currentTarget.value });
  };

  private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    event.preventDefault();

    if (this.props.users && isValidNick(this.state.input)) {
      const users = this.props.users.filter(
        (nick) =>
          nick !== this.props.nick && startsWith(nick, this.state.input),
      );

      if (users.length > 0) {
        this.setState({ input: `${users[0]}: ` });
      }
    }
  };
}
