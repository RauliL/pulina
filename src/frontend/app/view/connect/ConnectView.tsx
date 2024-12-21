import React, {
  FormEvent,
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from "reactstrap";

import {
  ClientEventType,
  MAXIMUM_NICK_LENGTH,
  VALID_NICK_PATTERN,
  isValidNick,
} from "../../../../common";
import { useClient } from "../../../hooks";
import { RootState } from "../../../store";

export type ConnectViewProps = {
  className: string;
};

const ConnectView: FunctionComponent<ConnectViewProps> = ({ className }) => {
  const client = useClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [nick, setNick] = useState<string>(
    window.localStorage.getItem("nick") || "",
  );
  const [isValid, setIsValid] = useState<boolean | undefined>(
    nick.length > 0 ? isValidNick(nick) : undefined,
  );
  const error = useSelector<RootState, string | undefined>(
    (state) => state.client.error,
  );

  const handleNickUpdate = (event: FormEvent<HTMLInputElement>) => {
    setNick(event.currentTarget.value);
    setIsValid(isValidNick(event.currentTarget.value));
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidNick(nick)) {
      window.localStorage.setItem("nick", nick);
      client.send({ type: ClientEventType.HELLO, nick });
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Col lg={10} md={12} className={className}>
      <Container>
        <Form onSubmit={handleSubmit} className="jumbotron mt-4 w-100">
          <p>You need a nickname in order to join the chat.</p>
          <FormGroup>
            <Label for="nick">Nickname:</Label>
            <InputGroup>
              <Input
                pattern={VALID_NICK_PATTERN.source}
                maxLength={MAXIMUM_NICK_LENGTH}
                defaultValue={nick ?? ""}
                onChange={handleNickUpdate}
                className={error || isValid === false ? "is-invalid" : ""}
                innerRef={inputRef}
              />
              {error && <div className="invalid-feedback">{error}</div>}
              {!isValid && (
                <div className="invalid-feedback">
                  Given nickname is invalid.
                </div>
              )}
            </InputGroup>
          </FormGroup>
          <Button type="submit">Connect</Button>
        </Form>
      </Container>
    </Col>
  );
};

ConnectView.displayName = "ConnectView";

export default ConnectView;
