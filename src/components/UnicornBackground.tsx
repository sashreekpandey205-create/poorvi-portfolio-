"use client";

import { useEffect, useRef, useState } from "react";

const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js";
const PROJECT_ID = "Lzmk0T5Fpnc8nbVWk3V8";

interface UnicornBackgroundProps {
  width?: string;
  height?: string;
  className?: string;
}

/**
 * Manually loads the Unicorn Studio SDK and initialises the scene.
 * This avoids the library's Next.js Script component which can fail
 * due to hydration mismatches or lazy-load timing issues.
 */
export default function UnicornBackground({
  width = "100%",
  height = "100%",
  className = "",
}: UnicornBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  // Step 1: Load the SDK script manually
  useEffect(() => {
    // Already loaded globally
    if ((window as any).UnicornStudio?.addScene) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("[UnicornBackground] SDK failed to load");
    document.head.appendChild(script);

    return () => {
      // Don't remove — other instances may need it
    };
  }, []);

  // Step 2: Initialise the scene once the SDK + container are ready
  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    const el = containerRef.current;
    const id = `unicorn-${Math.random().toString(36).slice(2, 9)}`;
    el.id = id;

    let destroyed = false;
    let observer: IntersectionObserver | null = null;

    (async () => {
      try {
        const US = (window as any).UnicornStudio;
        if (!US?.addScene) {
          console.error("[UnicornBackground] UnicornStudio.addScene not found");
          return;
        }

        const scene = await US.addScene({
          elementId: id,
          projectId: PROJECT_ID,
          scale: 0.8,
          dpi: 1.2,
          fps: 40,
          lazyLoad: true,
          production: true,
        });

        if (destroyed) {
          scene?.destroy();
          return;
        }

        sceneRef.current = scene;

        // Intersection Observer to pause WebGL rendering when out of viewport visibility
        observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (sceneRef.current) {
              if (entry.isIntersecting) {
                try {
                  sceneRef.current.play();
                } catch (e) {
                  // Scene might not support play or be destroyed
                }
              } else {
                try {
                  sceneRef.current.pause();
                } catch (e) {
                  // Scene might not support pause or be destroyed
                }
              }
            }
          },
          { threshold: 0.05 }
        );
        observer.observe(el);

        // Remove the "Made with unicorn.studio" watermark badge
        setTimeout(() => {
          const badge = el.querySelector('a[href*="unicorn.studio"]');
          badge?.remove();
        }, 2000);
      } catch (err) {
        console.error("[UnicornBackground] Scene init failed:", err);
      }
    })();

    return () => {
      destroyed = true;
      if (observer) {
        observer.disconnect();
      }
      sceneRef.current?.destroy();
      sceneRef.current = null;
    };
  }, [loaded]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height, position: "relative" }}
    />
  );
}
