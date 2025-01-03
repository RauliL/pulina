import { createSelector } from "@reduxjs/toolkit";
import { sortBy, values } from "lodash";
import { useContext } from "react";
import { useSelector } from "react-redux";

import { Channel, Client } from "./client";
import { ClientContext } from "./context";
import { RootState } from "./store";

export const useClient = (): Client => {
  const client = useContext(ClientContext);

  if (!client) {
    throw new Error("Client context not available");
  }

  return client;
};

const allChannelsSelector = createSelector(
  (state: RootState) => state.client.channels,
  (channels: Record<string, Channel>): Channel[] =>
    sortBy(values(channels), "name"),
);

export const useAllChannels = () => useSelector(allChannelsSelector);

export const useCurrentChannel = () =>
  useSelector<RootState, Channel | undefined>((state) => {
    const channels = sortBy(values(state.client.channels), "name");

    return (
      channels.find((channel) => channel.name === state.ui.currentChannel) ??
      channels[0]
    );
  });

export const useCurrentNick = () =>
  useSelector<RootState, string | undefined>((state) => state.client.nick);

export const useIsConnected = () =>
  useSelector<RootState, boolean>((state) => state.client.nick != null);
