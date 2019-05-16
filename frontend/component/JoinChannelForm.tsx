import * as React from 'react';
import { Button, Form, FormGroup, Input, InputGroup, Label } from 'reactstrap';

import { isValidChannelName } from '../../common/utils';

export interface Props {
  onSubmit: (channel: string) => void;
}

export interface State {
  channel?: string;
  isValid: boolean;
}

export default class JoinChannelForm extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      channel: '#',
      isValid: true,
    };
  }

  public render() {
    const { isValid } = this.state;

    return (
      <Form
        onSubmit={this.onSubmit}
        className="jumbotron w-50 mt-4 ml-auto mr-auto"
      >
        <p>
          You haven't joined any channels yet. Give a name of a channel you
          wish to join.
        </p>
        <p>
          Hint: Try <a href="#" onClick={this.onClickGeneral}>#general</a> if
          you are not sure which channel to join.
        </p>
        <FormGroup>
          <Label for="channel">Name of the channel:</Label>
          <InputGroup>
            <Input
              id="channel"
              defaultValue={this.state.channel}
              pattern="^#[a-zA-Z0-9-_]{1,150}$"
              maxLength={151}
              onChange={this.onUpdateChannel}
            />
            {!isValid && <div className="invalid-feedback">
              Given channel name is invalid.
            </div>}
          </InputGroup>
        </FormGroup>
        <Button type="submit">Join channel</Button>
      </Form>
    );
  }

  public componentDidMount() {
    const input = document.getElementById('channel');

    if (input) {
      input.focus();
    }
  }

  private onClickGeneral = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.props.onSubmit('#general');
  };

  private onUpdateChannel = (event: React.FormEvent<HTMLInputElement>) => {
    const channel = event.currentTarget.value;

    this.setState({
      channel,
      isValid: isValidChannelName(channel),
    });
  };

  private onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    const { channel } = this.state;

    event.preventDefault();

    if (!channel || !isValidChannelName(channel)) {
      return;
    }

    this.props.onSubmit(channel);
  };
}
