import { useCallback, useEffect, useRef, useState } from 'react';

export function useBlowDetector(onBlow) {
  const [status, setStatus] = useState('idle');
  const resources = useRef({ stream: null, audioContext: null, frame: null });
  const hasBlown = useRef(false);

  const stop = useCallback(() => {
    const { stream, audioContext, frame } = resources.current;
    if (frame) cancelAnimationFrame(frame);
    stream?.getTracks().forEach((track) => track.stop());
    if (audioContext?.state !== 'closed') audioContext?.close();
    resources.current = { stream: null, audioContext: null, frame: null };
  }, []);

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unsupported');
      return;
    }

    try {
      setStatus('requesting');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.55;
      audioContext.createMediaStreamSource(stream).connect(analyser);
      const samples = new Uint8Array(analyser.fftSize);
      let loudFrames = 0;
      hasBlown.current = false;
      resources.current = { stream, audioContext, frame: null };
      setStatus('listening');

      const listen = () => {
        analyser.getByteTimeDomainData(samples);
        let total = 0;
        for (const sample of samples) total += (sample - 128) ** 2;
        const volume = Math.sqrt(total / samples.length);
        // Sustained breath usually produces a volume above this value for several frames.
        loudFrames = volume > 16 ? loudFrames + 1 : Math.max(0, loudFrames - 1);
        if (loudFrames > 8 && !hasBlown.current) {
          hasBlown.current = true;
          setStatus('blown');
          stop();
          onBlow();
          return;
        }
        resources.current.frame = requestAnimationFrame(listen);
      };
      listen();
    } catch (error) {
      setStatus(error?.name === 'NotAllowedError' ? 'denied' : 'error');
    }
  }, [onBlow, stop]);

  useEffect(() => stop, [stop]);
  return { status, start, stop };
}
