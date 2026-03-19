import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Overlay from './Overlay';

const FRAME_COUNT = 120;

const getFramePath = (index) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/sequence/frame_${paddedIndex}_delay-0.07s.png`;
};

export default function ScrollyCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

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
          if (canvasRef.current) {
               drawFrame(0, loadedImages);
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (index, imgArray = images) => {
    if (!canvasRef.current || !imgArray[index] || !imgArray[index].complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = imgArray[index];

    if (canvas.width !== img.width) {
       canvas.width = img.width;
       canvas.height = img.height;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(Math.round(latest));
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <Overlay scrollYProgress={scrollYProgress} />
    </div>
  );
}
