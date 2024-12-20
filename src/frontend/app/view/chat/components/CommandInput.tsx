import { startsWith } from "lodash";
import React, {
  FormEvent,
  FunctionComponent,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Form, Input, Row } from "reactstrap";

import { isBlank, isValidNick } from "../../../../../common";
import { parseCommand } from "../../../../command-parser";
import {
  useClient,
  useCurrentChannel,
  useCurrentNick,
} from "../../../../hooks";
import { AppDispatch, clientSlice } from "../../../../store";

const CommandInput: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const client = useClient();
  const nick = useCurrentNick();
  const currentChannel = useCurrentChannel();
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const currentInput = input;

    event.preventDefault();
    setInput("");

    // Ignore empty input.
    if (isBlank(currentInput)) {
      return;
    }

    // TODO: Allow commands to be parsed even without channel.
    if (!currentChannel) {
      return;
    }

    // Attempt to parse the input into a command.
    parseCommand(currentChannel, currentInput.trim())
      .then((event) => {
        client.send(event);
      })
      .catch((error) => {
        // TODO: Figure out a way to display error messages when there isn't an
        // current channel.
        dispatch(
          clientSlice.actions.onError({
            channel: currentChannel.name,
            text: error,
          }),
        );
      });
  };

  const handleChangeInput = (event: FormEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    event.preventDefault();

    if (isValidNick(input)) {
      const match = currentChannel?.users.find(
        (user) => user.nick !== nick && startsWith(user.nick, input),
      );

      if (match) {
        setInput(`${match}: `);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="border-top">
      <Container>
        <Row>
          <Col lg={11} className="mt-2 mb-2">
            <Input
              value={input}
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
              style={{ fontFamily: '"Fira Code", monospace' }}
              innerRef={inputRef}
            />
          </Col>
          <Col lg={1} className="mt-2 mb-2">
            <Button type="submit" block>
              Send
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

CommandInput.displayName = "CommandInput";

export default CommandInput;
