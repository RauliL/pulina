import * as React from 'react';
import { Button, Form, FormGroup, Input, InputGroup, Label } from 'reactstrap';

import { isValidNick } from '../../common/utils';

export interface StateProps {
  /** Error message reported by the server. */
  errorMessage?: string;
}

export type Props = StateProps & {
  onSubmit: (nick: string) => void;
}

export interface State {
  nick?: string;
  isValid: boolean;
}

export default class NickForm extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = { isValid: true };
  }

  public render() {
    const { errorMessage } = this.props;
    const { isValid } = this.state;

    return (
      <Form
        onSubmit={this.onSubmit}
        className="jumbotron w-50 mt-4 ml-auto mr-auto"
      >
        <p>You need a nickname in order to join the chat.</p>
        <FormGroup>
          <Label for="nick">Nickname:</Label>
          <InputGroup>
            <Input
              id="nick"
              pattern="^[a-zA-Z0-9-_]{1,15}$"
              maxLength={15}
              onChange={this.onUpdateNick}
              className={errorMessage || !isValid ? 'is-invalid' : ''}
            />
            {errorMessage && <div className="invalid-feedback">
              {errorMessage}
            </div>}
            {!isValid && <div className="invalid-feedback">
              Given nickname is invalid.
            </div>}
          </InputGroup>
        </FormGroup>
        <Button type="submit">Connect</Button>
      </Form>
    );
  }

  public componentDidMount() {
    const input = document.getElementById('nick');

    if (input) {
      input.focus();
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
