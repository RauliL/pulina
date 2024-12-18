import React, {
  FormEvent,
  FunctionComponent,
  MouseEvent,
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
  isValidChannel,
  VALID_CHANNEL_NAME_PATTERN,
} from "../../../../common";
import { useClient } from "../../../hooks";

const JoinChannelView: FunctionComponent = () => {
  const client = useClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [channel, setChannel] = useState<string>(
    window.localStorage.getItem("channel") || "#",
  );
  const [isValid, setIsValid] = useState<boolean>(isValidChannel(channel));

  const handleGeneralClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setChannel("#general");
    setIsValid(true);
  };

  const handleChannelUpdate = (event: FormEvent<HTMLInputElement>) => {
    setChannel(event.currentTarget.value);
    setIsValid(isValidChannel(channel));
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    window.localStorage.setItem("channel", channel);
    client.send({ type: ClientEventType.JOIN, channel });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="jumbotron mt-4 w-100">
        <p>
          You haven't joined any channels yet. Give a name of a channel you
          wish to join.
        </p>
        <p>
          Hint: Try{" "}
          <a href="#" onClick={handleGeneralClick}>
            #general
          </a>{" "}
          if you are not sure which channel to join.
        </p>
        <FormGroup>
          <Label for="channel">Name of the channel:</Label>
          <InputGroup>
            <Input
              defaultValue={channel}
              pattern={VALID_CHANNEL_NAME_PATTERN.source}
              maxLength={151}
              onChange={handleChannelUpdate}
              innerRef={inputRef}
            />
            {!isValid && (
              <div className="invalid-feedback">
                Given channel name is invalid.
              </div>
            )}
          </InputGroup>
        </FormGroup>
        <Button type="submit">Join channel</Button>
      </Form>
    </Container>
  );
};

JoinChannelView.displayName = "ChannelListView";

export default JoinChannelView;
