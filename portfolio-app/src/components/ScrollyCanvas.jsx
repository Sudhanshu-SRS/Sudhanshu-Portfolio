import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import Overlay from './Overlay';

const FRAME_COUNT = 120;

const getFramePath = (index) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/sequence/frame_${paddedIndex}_delay-0.07s.png`;
};

export default function ScrollyCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [images, setImages] = useState([]);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  // ✅ Scale is now on the WRAPPER DIV — canvas itself always fills 100%
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1, 1.3, 1.6, 1]);

  // ─── Draw a single frame ───────────────────────────────────────────────
  const drawFrame = useCallback((index, imgArray = images) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgArray[index] || !imgArray[index].complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgArray[index];
    // Use the canvas's actual rendered size (set by CSS width:100% height:100%)
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (!width || !height) return;

    const dpr = window.devicePixelRatio || 1;

    // Only resize the internal buffer when needed (avoid layout thrash)
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // "cover" — fill the canvas, cropping from center
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;
    if (canvasAspect > imgAspect) {
      // Canvas is wider → fit width, crop top/bottom
      drawWidth = width;
      drawHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      // Canvas is taller/narrower → fit height, crop left/right
      drawHeight = height;
      drawWidth = height * imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, [images]);

  // ─── Preload all frames ───────────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          drawFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // ─── Redraw on resize ────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (images.length > 0) drawFrame(currentFrameRef.current, images);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, drawFrame]);

  // ─── Scroll-driven frame updates ─────────────────────────────────────
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const idx = Math.round(latest);
    currentFrameRef.current = idx;
    drawFrame(idx);
  });

  return (
    // ✅ NO overflow:hidden on the section — it's the scroll target
    <section ref={containerRef} className="relative bg-[#121212]" style={{ height: '500vh' }}>
      {/* sticky viewport — use 100dvh to exclude mobile browser chrome */}
      <div
        className="sticky top-0 w-full"
        style={{ height: '100dvh', overflow: 'hidden' }}
      >
        {/* ✅ Scale transform on the WRAPPER, not the canvas */}
        <motion.div
          ref={wrapperRef}
          style={{ scale }}
          className="absolute inset-0 origin-center"
        >
          {/* Canvas fills the wrapper exactly — no 100vw / 100vh */}
          <canvas
            ref={canvasRef}
            className="opacity-80"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          />
        </motion.div>

        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
