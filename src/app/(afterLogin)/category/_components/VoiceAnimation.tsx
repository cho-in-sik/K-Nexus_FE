'use client';

import { useEffect } from 'react';
import { useScene, useNowFrame } from 'react-scenejs';
import { selectorAll } from 'scenejs';

export default function VoiceAnimation() {
  const scene = useScene(
    {
      '.raindrop': selectorAll(
        (i) => ({
          0: { 'border-width': '150px', opacity: 1, transform: 'scale(0)' },
          1.5: { 'border-width': '0px', opacity: 0.3, transform: 'scale(0.7)' },
          options: { delay: i * 0.4 },
        }),
        3,
      ),
    },
    {
      easing: 'ease-in-out',
      iterationCount: 'infinite',
    },
  );

  const raindropScene = scene.getItem('.raindrop');

  const frame1 = useNowFrame(raindropScene.getItem(0));
  const frame2 = useNowFrame(raindropScene.getItem(1));
  const frame3 = useNowFrame(raindropScene.getItem(2));

  useEffect(() => {
    scene.play();

    return () => {
      scene.finish();
    };
  }, []);
  return (
    <div className="">
      <div className="raindrop " style={frame1.camelCasedCSSObject}></div>
      <div className="raindrop " style={frame2.camelCasedCSSObject}></div>
      <div className="raindrop " style={frame3.camelCasedCSSObject}></div>
    </div>
  );
}
