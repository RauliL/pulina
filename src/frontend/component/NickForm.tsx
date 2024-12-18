import React from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
} from "reactstrap";

import { isValidNick } from "../../common/utils";

export interface StateProps {
  /** Error message reported by the server. */
  errorMessage?: string;
}

export type Props = StateProps & {
  onSubmit: (nick: string) => void;
};

export interface State {
  nick?: string;
  isValid: boolean;
}

export default class NickForm extends React.Component<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement | null>;

  public constructor(props: Props) {
    super(props);

    this.state = {
      nick: window.localStorage.getItem("nick") || undefined,
      isValid: true,
    };

    this.inputRef = React.createRef<HTMLInputElement | null>();
  }

  public render() {
    const { errorMessage } = this.props;
    const { isValid } = this.state;

    return (
      <Container>
        <Form onSubmit={this.onSubmit} className="jumbotron mt-4 w-100">
          <p>You need a nickname in order to join the chat.</p>
          <FormGroup>
            <Label for="nick">Nickname:</Label>
            <InputGroup>
              <Input
                pattern="^[a-zA-Z0-9-_]{1,15}$"
                maxLength={15}
                defaultValue={this.state.nick}
                onChange={this.onUpdateNick}
                className={errorMessage || !isValid ? "is-invalid" : ""}
                innerRef={this.inputRef}
              />
              {errorMessage && (
                <div className="invalid-feedback">{errorMessage}</div>
              )}
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
  }

  public componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  private onUpdateNick = (event: React.FormEvent<HTMLInputElement>) => {
    const nick = event.currentTarget.value;

    this.setState({
      nick,
      isValid: isValidNick(nick),
    });
  };

  private onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const { nick } = this.state;

    event.preventDefault();

    if (!nick || !isValidNick(nick)) {
      return;
    }

    this.props.onSubmit(nick);
  };
}
