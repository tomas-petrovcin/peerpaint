import { onValue, ref, set } from "firebase/database";
import React, { useCallback, useMemo, useRef } from "react";

import * as S from "./styled";
import { database } from "../firebase";
import {
  calculatePixelatedCircle,
  ColorRGB,
  createInitialState,
  getCoords,
  mixColors,
  parseRGB,
  Pixels,
} from "../utils";

type Props = {
  scale?: number;
  brushSize: number;
  brushColor: ColorRGB;
} & S.StyleProps;

export const Canvas = ({
  width,
  height,
  background,
  brushSize,
  brushColor,
  scale = 1,
}: Props) => {
  const remoteCanvasRef = ref(database, `/canvas`);

  const isDrawing = useRef(false);
  const divRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const paintedThisStroke = useRef<string[]>([]);

  const initialState = useMemo(
    () => createInitialState(width, height),
    [width, height]
  );

  const updateRemoteCanvas = (pixels: Pixels) => {
    set(remoteCanvasRef, pixels);
  };

  const unscale = useCallback(
    (a: number) => {
      return Math.floor(a / scale);
    },
    [scale]
  );

  // paint pixel
  const paint = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      const y = e.clientX - bounds.left;
      const x = e.clientY - bounds.top;

      let pixelsToPaint;

      if (brushSize > 1) {
        pixelsToPaint = calculatePixelatedCircle(
          unscale(x),
          unscale(y),
          brushSize
        );
      } else {
        pixelsToPaint = [getCoords(unscale(x), unscale(y))];
      }

      pixelsToPaint.forEach((pixel) => {
        if (paintedThisStroke.current.includes(pixel)) return;
        const pixelElement = divRef.current[pixel];
        if (pixelElement) {
          const color = mixColors(
            parseRGB(pixelElement.style.backgroundColor),
            brushColor
          );
          pixelElement.style.backgroundColor = color;
          paintedThisStroke.current.push(pixel);
          updateRemoteCanvas({ [pixel]: color });
        }
      });
    },
    [brushColor, brushSize, unscale]
  );

  const paintFromRemote = useCallback((pixels: { [key: string]: string }) => {
    Object.entries(pixels).forEach(([coordinates, color]) => {
      const pixelElement = divRef.current[coordinates];
      if (pixelElement) {
        pixelElement.style.backgroundColor = color;
      }
    });
  }, []);

  // handle mouse down
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      isDrawing.current = true;
      event.preventDefault();
      paint(event);
    },
    [paint]
  );

  // handle mouse move
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDrawing.current) return;
      paint(event);
    },
    [paint]
  );

  // handle mouse up
  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
    paintedThisStroke.current = [];
  }, []);

  /* FIREBASE */
  onValue(remoteCanvasRef, (snapshot) => {
    const data = snapshot.val();
    paintFromRemote(data);
  });

  /* RENDER STUFF */
  const saveRef = useCallback(
    (coords: string) => (instance: HTMLDivElement | null) => {
      divRef.current[coords] = instance;
    },
    []
  );
  const renderPixels = useMemo(
    () =>
      Object.entries(initialState).map(([coords, color]) => (
        <S.Pixel
          key={coords}
          ref={saveRef(coords)}
          color={color}
          scale={scale}
        />
      )),
    [initialState, saveRef, scale]
  );

  return (
    <>
      <S.ResetButton onClick={() => updateRemoteCanvas(initialState)}>
        Reset Canvas
      </S.ResetButton>
      <S.Wrapper
        className="canvas"
        height={height}
        width={width}
        background={background}
        scale={scale}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {renderPixels}
      </S.Wrapper>
    </>
  );
};
