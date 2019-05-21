# Pulina

[![travis][travis-image]][travis-url]
[![coveralls][coveralls-image]][coveralls-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/RauliL/pulina/master.svg
[travis-url]: https://travis-ci.org/RauliL/pulina
[coveralls-image]: https://coveralls.io/repos/github/RauliL/pulina/badge.svg
[coveralls-url]: https://coveralls.io/github/RauliL/pulina
[npm-image]: https://img.shields.io/npm/v/pulina.svg
[npm-url]: https://npmjs.org/package/pulina

Pulina is mininal IRC like chat implementation with a Web user interface. It
requires no registration, users can just connect, choose a nickname and join
chat rooms. Unlike in many other chat implementations, messages are not stored
on the server side anywhere.

## Requirements

* [Node.js] >= 8
* [Yarn]

## Installation

Clone this Git repository somewhere, make sure you have [Yarn] installed and
then proceed by installing dependencies and compiling static assets:

```bash
$ yarn install
$ yarn run build
```

After that you can start the application with:

```bash
$ yarn start
```

Which starts the backend HTTP server in port `3000`. You can change the default
port with `PORT` environment variable.

## Usage

When you open the user interface in a Web browser (by default at URL
`http://localhost:3000`) you will be greeted with a prompt asking for a
nickname. Once you have given a nickname, the chat application will ask you
which chat room (a.k.a channel) you wish to join. After that, you can start
chatting with other people on that room.

You can also input these commands into the message input:

### /join <#channel>

Joins a new channel.

### /part [#channel]

Leaves specified channel. If name of the channel is omitted, the current
channel will be used instead.

## TODO

Currently Pulina is very very minimal and does not provide many features which
would make it more useful. Some things that I might add later would be:

* Changing the nickname without having to reconnect.
* Channel lists and searching for channels.
* Password protected channels.
* Private messages.
* Channel operators who have privileges to ban other users from a channel.
* Flood protection.
* Improvements to the user interface in general, such as:
  * Keyboard shortcuts.
  * Rich text support.
  * URL previews like in Slack.

Icon made by [Freepik] from [www.flaticon.com](https://www.flaticon.com).

[Node.js]: https://nodejs.org
[Yarn]: https://yarnpkg.com
[Freepik]: https://www.freepik.com/
