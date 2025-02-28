import {withAmp} from '@ampproject/storybook-addon';
import {boolean, number, object, text, withKnobs} from '@storybook/addon-knobs';

import * as Preact from '#preact';

import {VideoElementWithActions} from './_helpers';

export default {
  title: 'amp-video-1_0',
  decorators: [withKnobs, withAmp],
  parameters: {
    extensions: [
      {name: 'amp-video', version: '1.0'},
      {name: 'amp-accordion', version: '1.0'},
    ],
    experiments: ['bento'],
  },
};

const AmpVideoWithKnobs = ({i, ...rest}) => {
  const group = i ? `Player ${i + 1}` : undefined;

  const width = text('width', '640px', group);
  const height = text('height', '360px', group);

  const ariaLabel = text('aria-label', 'Video Player', group);
  const autoplay = boolean('autoplay', true, group);
  const controls = boolean('controls', true, group);
  const mediasession = boolean('mediasession', true, group);
  const noaudio = boolean('noaudio', false, group);
  const loop = boolean('loop', false, group);
  const poster = text(
    'poster',
    'https://amp.dev/static/inline-examples/images/kitten-playing.png',
    group
  );

  const artist = text('artist', '', group);
  const album = text('album', '', group);
  const artwork = text('artwork', '', group);
  const title = text('title', '', group);

  const sources = object(
    'sources',
    [
      {
        src: 'https://amp.dev/static/inline-examples/videos/kitten-playing.webm',
        type: 'video/webm',
      },
      {
        src: 'https://amp.dev/static/inline-examples/videos/kitten-playing.mp4',
        type: 'video/mp4',
      },
    ],
    group
  );

  return (
    <amp-video
      {...rest}
      aria-label={ariaLabel}
      autoplay={autoplay}
      controls={controls}
      mediasession={mediasession}
      noaudio={noaudio}
      loop={loop}
      poster={poster}
      artist={artist}
      album={album}
      artwork={artwork}
      title={title}
      layout="responsive"
      width={width}
      height={height}
    >
      {sources.map((props) => (
        <source {...props}></source>
      ))}
    </amp-video>
  );
};

const Spacer = ({height}) => {
  return (
    <div
      style={{
        height,
        background: `linear-gradient(to bottom, #bbb, #bbb 10%, #fff 10%, #fff)`,
        backgroundSize: '100% 10px',
      }}
    ></div>
  );
};

export const Default = () => {
  const amount = number('Amount', 1, {}, 'Page');
  const spacerHeight = text('Space', '80vh', 'Page');
  const spaceAbove = boolean('Space above', false, 'Page');
  const spaceBelow = boolean('Space below', false, 'Page');

  const players = [];
  for (let i = 0; i < amount; i++) {
    players.push(<AmpVideoWithKnobs key={i} i={i} />);
    if (i < amount - 1) {
      players.push(<Spacer height={spacerHeight} />);
    }
  }

  return (
    <>
      {spaceAbove && <Spacer height={spacerHeight} />}
      {players}
      {spaceBelow && <Spacer height={spacerHeight} />}
    </>
  );
};

export const Actions = () => {
  const id = 'player';
  return (
    <VideoElementWithActions id={id}>
      <AmpVideoWithKnobs id={id} />
    </VideoElementWithActions>
  );
};

export const InsideAccordion = () => {
  const width = number('width', 320);
  const height = number('height', 180);
  const autoplay = boolean('autoplay', false);

  return (
    <amp-accordion expand-single-section>
      <section expanded>
        <h2>Video</h2>
        <div>
          <amp-video
            autoplay={autoplay}
            controls
            loop
            width={width}
            height={height}
          >
            <source
              type="video/mp4"
              src="https://amp.dev/static/inline-examples/videos/kitten-playing.mp4"
            ></source>
          </amp-video>
        </div>
      </section>
    </amp-accordion>
  );
};

export const InsideDetails = () => {
  const width = number('width', 320);
  const height = number('height', 180);
  const autoplay = boolean('autoplay', false);

  return (
    <details open>
      <summary>Video</summary>
      <amp-video
        autoplay={autoplay}
        controls
        loop
        width={width}
        height={height}
      >
        <source
          type="video/mp4"
          src="https://amp.dev/static/inline-examples/videos/kitten-playing.mp4"
        ></source>
      </amp-video>
    </details>
  );
};
