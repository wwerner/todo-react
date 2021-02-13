# todo-react with local-first cooperation

_(This is a fork from `mdn`, see there for the [React-focused README](https://github.com/mdn/todo-react/blob/master/README.md))_

**Demonstration of peer-to-peer collaborative editing!**

This adaptation of the classic TODO list example demonstrates [local-first cooperation](https://local-first-cooperation.github.io/website/) using [ActyxOS](https://developer.actyx.com/).
The idea is that persistence and business logic are **executed locally**, based on events stored in ActyxOS.
Multiple nodes in the same network will find each other using mDNS, making the TODO list **collaborative**.

You are very welcome to check out [this pull request](https://github.com/actyx-contrib/todo-react/pull/1/files) to convince yourself that this is neither daunting nor magical — it is an application of [event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) to distributed peer-to-peer applications.

## Trying it out

After cloning this repository, do the following inside the new directory (you’ll need at least node.js 10):

```bash
npm install --global yarn
yarn install
```

### Start ActyxOS

Before starting the app, you’ll need to have ActyxOS running, so get it from [downloads.actyx.com](https://downloads.actyx.com/).
Please use a non-Docker version because zero-configuration peer discovery is not supported by Docker.

On **Windows**, it suffices to run the installer, it should start `ActyxOS.exe`.

On **Mac or Linux**, you’ll need to make the downloaded binary executable and start it;
since it will store some data in its current working directory, you may want to do this from this project’s folder.

For **Android** please download the latest version from [downloads.actyx.com](https://downloads.actyx.com/) and install with `adb install actyxos.apk`, then start the ActyxOS app on your phone or tablet.

### Start the app

Now you can start the app:

```bash
yarn start
```

For Android, it is easiest to serve the web app from your computer and open it in the browser of your tablet or phone:

```bash
yarn build
yarn global add serve
serve -s build
# note down the external IP:port of your computer from the above output
adb shell am start -a android.intent.action.VIEW -d http://<IP:port>
```

This should open a browser tab in which — after a few seconds of [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) magic — you’ll see an empty TODO list.
Don’t be shy, try it out!

### ‼️ Automatic synchronisation between nodes ‼️

The real deal is to use another computer or tablet in the same network:
Once you start ActyxOS and the app there, you should see both screens synchronised (it may take a few seconds at first while ActyxOS uses mDNS to find other nodes).

This communication is all purely local, no cloud services or relays are involved. You can try disabling network connections (e.g. by switching off wifi), making modifications, then switching the wifi back on and violà: data will be synchronised!
(It may take up to 30sec for the synchronisation to resume, since by default ActyxOS announces its synchronisation state only at that interval.)

## If the two nodes don’t sync

Depending on your network setup, it may not be possible for the ActyxOS nodes to discover each other.
Due to how containers work, this will always be a problem in Docker, lxc, etc.
In these cases, you need to pick one node that is reachable via TCP/IP from all your nodes and configure that as a bootstrap node (in a production environment you’d use multiple of those).

There is [a guide describing this](https://developer.actyx.com/docs/os/advanced-guides/actyxos-bootstrap-node), for which you’ll need the swarm key of your nodes.
This is a default key in the above setup, but in any case you can get it using

```bash
ax settings get -l com.actyx.os/general/swarmKey localhost
```

Alternatively, you can reuse an existing non-Docker ActyxOS node as bootstrap node and tell all Docker-based nodes about it:

```bash
ax settings set -l com.actyx.os/general/bootstrapNodes '["/ip4/<IP>/tcp/4001"]' localhost
```

If you want to watch how ActyxOS does its thing:

```bash
ax settings set -l com.actyx.os/general/logLevels/os DEBUG localhost
ax logs tail -f -l localhost
```

_(You can also replace `localhost` in any of the above with the IP of another ActyxOS node, e.g. your tablet, to perform remote management.)_
