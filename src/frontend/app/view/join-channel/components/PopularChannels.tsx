import React, { FunctionComponent, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "reactstrap";

import { ClientEventType, ListResult } from "../../../../../common";
import { useClient } from "../../../../hooks";
import { RootState } from "../../../../store";

const PopularChannels: FunctionComponent = () => {
  const client = useClient();
  const results = useSelector<RootState, ListResult[] | undefined>(
    (state) => state.client.listResults,
  );

  const handleSelect = (channel: string) => () => {
    client.send({
      type: ClientEventType.JOIN,
      channel,
    });
  };

  useEffect(() => {
    client.list();
  }, [client]);

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <>
      <p className="mt-2">Or you can choose one of these:</p>
      <Table data-testid="PopularChannels">
        <thead>
          <tr>
            <th>Channel</th>
            <th>Topic</th>
            <th># Users</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            const onClick = handleSelect(result.channel);

            return (
              <tr key={result.channel} onClick={onClick}>
                <td>
                  <Button outline onClick={onClick}>
                    {result.channel}
                  </Button>
                </td>
                <td>{result.topic}</td>
                <td>{result.population}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

PopularChannels.displayName = "PopularChannels";

export default PopularChannels;
