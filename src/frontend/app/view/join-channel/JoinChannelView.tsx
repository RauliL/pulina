import React, {
  FormEvent,
  FunctionComponent,
  MouseEvent,
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
  MAXIMUM_CHANNEL_NAME_LENGTH,
  VALID_CHANNEL_NAME_PATTERN,
  isValidChannel,
} from "../../../../common";
import { useClient } from "../../../hooks";
import { RootState } from "../../../store";
import { PopularChannels } from "./components";

export type JoinChannelViewProps = {
  className: string;
};

const JoinChannelView: FunctionComponent<JoinChannelViewProps> = ({
  className,
}) => {
  const client = useClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [channel, setChannel] = useState<string>(
    window.localStorage.getItem("channel") || "#",
  );
  const [isValid, setIsValid] = useState<boolean | undefined>(
    channel !== "#" ? isValidChannel(channel) : undefined,
  );
  const error = useSelector<RootState, string | undefined>(
    (state) => state.client.error,
  );

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
    <Col lg={10} md={12} className={className}>
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
                value={channel}
                pattern={VALID_CHANNEL_NAME_PATTERN.source}
                maxLength={MAXIMUM_CHANNEL_NAME_LENGTH}
                onChange={handleChannelUpdate}
                innerRef={inputRef}
              />
              {error && <div className="invalid-feedback">{error}</div>}
              {isValid === false && (
                <div className="invalid-feedback">
                  Given channel name is invalid.
                </div>
              )}
            </InputGroup>
          </FormGroup>
          <Button type="submit">Join channel</Button>
        </Form>
        <PopularChannels />
      </Container>
    </Col>
  );
};

JoinChannelView.displayName = "ChannelListView";

export default JoinChannelView;
