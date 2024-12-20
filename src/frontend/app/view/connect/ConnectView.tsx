import React, {
  FormEvent,
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from "reactstrap";
import {
  ClientEventType,
  isValidNick,
  VALID_NICK_PATTERN,
} from "../../../../common";
import { useClient } from "../../../hooks";

const ConnectView: FunctionComponent = () => {
  const client = useClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [nick, setNick] = useState<string>(
    window.localStorage.getItem("nick") || "",
  );
  const [isValid, setIsValid] = useState<boolean | undefined>(
    nick.length > 0 ? isValidNick(nick) : undefined,
  );
  const [error] = useState<string | undefined>();

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
    <Container>
      <Form onSubmit={handleSubmit} className="jumbotron mt-4 w-100">
        <p>You need a nickname in order to join the chat.</p>
        <FormGroup>
          <Label for="nick">Nickname:</Label>
          <InputGroup>
            <Input
              pattern={VALID_NICK_PATTERN.source}
              maxLength={15}
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
  );
};

ConnectView.displayName = "ConnectView";

export default ConnectView;
