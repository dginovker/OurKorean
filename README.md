This app uses Ionic, React, Redux, Boostrap, Typescript and Yarn.

Because those are all things I wanted to learn. Just like Korean (:

### Running the app

#### Upgrade to latest LTS node

```nvm use lts/*```

#### Install all the packages

```yarn```

#### Run the app

```yarn start```

#### Run the app tests

```yarn test```

### Firebase Stuff

#### Make a new release to OurKorean.com

```yarn build```

```firebase deploy -m "New update"```

### Mobile Stuff

#### Generate Android/iOS code

```npx cap sync```

#### Launch app in Android Studio

```npx cap open android```

#### Launch app in Xcode (iOS)

I have no idea how to do the iOS part. I've never tried.

```npx cap open ios```

## Debugging

`Error: ENOSPC: System limit for number of file watchers reached, watch ...`

* On Arch Linux, run `echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system`