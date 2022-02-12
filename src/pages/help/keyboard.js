import React from "react";
import { Tabs, Tab, Figure } from "react-bootstrap";

export default function Keyboard() {
  return (
    <>
      <h3>How to set a Korean keyboard</h3>
      <br />
      <p>
        Select your device from the panels below, and follow the instructions
        for adding the right keyboard.
      </p>
      <br />
      <Tabs id="keyboard-help-tabs">
        <Tab eventKey="Android" title="Android">
          <br />
          <ol>
            <li>
              Hold down the comma key until the settings icon appears
              <br />
              <Figure>
                <Figure.Image
                  src="https://i.imgur.com/EMTidEi.png"
                  width={300}
                />
              </Figure>
            </li>
            <li>{"Select Languages > Add Keyboard"}</li>
            <li>
              Scroll down to Korean (May appear as 한국어 on some devices)
            </li>
            <li>
              If prompted for different flavors, select the first one if you're
              unsure.
            </li>
          </ol>
          Note: If you get prompted to choose between 대한민국 and
          조선민주주의인공화국 choose the first one.
          <br />
          <br />
          OurKorean does not support North Korean at this time.
          <br /> <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.wikihow.com/Type-in-Korean-on-Android"
          >
            Source
          </a>
        </Tab>
        <Tab eventKey="iOS" title="iOS">
          <br />
          <ol>
            <li>
              {`Go into your Settings > General > Keyboard > Keyboards > Add New Keyboard.`}
            </li>
            <li>Click Korean</li>
            <li>Select Standard unless you know what you're doing</li>
            <li>Hit done!</li>
          </ol>
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.sweetandtastytv.com/blog/2016/5/25/how-to-install-korean-on-your-iphone-and-imac"
          >
            Source
          </a>
        </Tab>
        <Tab eventKey="Windows" title="Windows">
          <br />
          <ol>
            <li>Open the start menu and type Language Settings. Open it</li>
            <li>Click "Add a language"</li>
            <li>Type "Korean", then select 한국어. Hit Next</li>
            <li>
              At the bottom right (near the system clock), you can now click
              "ENG" to enable Korean
            </li>
            <li>
              At the bottom right, click the new "A" that has appeared to turn
              on Korean
            </li>
          </ol>
          Tip: Press the right alt key will switch on and off Korean quickly.
          <br />
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.koreanfluent.com/cross_cultural/korean_keyboard/korean_keyboard.htm"
          >
            Source
          </a>
        </Tab>
        <Tab eventKey="Linux" title="Linux">
          <br />
          As a Linux user, you're on your own. I would recommend Googling "How
          to add Korean keyboard for [Linux distro] [Desktop environment].
          <br />
          <br />I personally use{" "}
          <a href="https://fcitx-im.org/wiki/Fcitx">Fcitx</a>, but I recommend
          whatever installs easiest on your flavor/distribution.
        </Tab>
        <Tab eventKey="Mac" title="Mac">
          <br />
          <ol>
            <li>{`Open System Preferences > Language & Region`}</li>
            <li>
              Under Preferred Languages, click on the + button to add a language
            </li>
            <li>
              A window will pop open. Select 한국어 - Korean and click on the
              Add button
            </li>
            <li>Do not set Korean as primary</li>
            <li>
              A flag should appear on the top right corner of the menu bar.
              Click it to switch languages!
            </li>
          </ol>
          {`Tip: After setting up Korean keyboard, go to Keyboard Preferences >
          Input Sources and add a toggle for COMMAND/SPACE. You can then hold
          the Command button and hit the Space Bar to switch between English and
          Korean!`}
          <br />
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.sweetandtastytv.com/blog/2016/5/25/how-to-install-korean-on-your-iphone-and-imac"
          >
            Source
          </a>
        </Tab>
      </Tabs>
    </>
  );
}
