import React, { useState } from "react";
// @ts-ignore
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import { Canvas } from "./Canvas";

import * as S from "./styled";

interface ColorRGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a?: number;
}

const DEFAULT_COLOR = { r: 0, g: 0, b: 0, a: 1 };

const App = () => {
  const [showToolbar, setShowToolbar] = useState(false);

  const [pickerColor, setPickerColor] = useColor("hex", "#121212");
  const [brushSize, setBrushSize] = useState(10);
  const [canvasScale, setCanvasScale] = useState(2);
  const [brushColor, setBrushColor] = useState<ColorRGB>(DEFAULT_COLOR);

  const toggleToolbar = () => setShowToolbar((v) => !v);

  return (
    <>
      <CustomCursor
        fill={pickerColor.hex}
        dimensions={brushSize * canvasScale * 2}
        targetOpacity={1}
        smoothness={{
          movement: 1,
          scale: 1,
          opacity: 1,
        }}
      />

      <S.Page>
        <S.CanvasWrapper>
          <Canvas
            width={200}
            height={200}
            scale={canvasScale}
            background="white"
            brushSize={brushSize}
            brushColor={brushColor}
          />
        </S.CanvasWrapper>
        {showToolbar && (
          <S.Toolbar>
            <S.Label>Brush Size: {brushSize}</S.Label>
            <S.Slider
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(event) => setBrushSize(parseInt(event.target.value))}
              className="slider"
              id="myRange"
            />
            <S.Label>Canvas Scale: {canvasScale}</S.Label>
            <S.Slider
              type="range"
              min="1"
              max="20"
              value={canvasScale}
              onChange={(event) => setCanvasScale(parseInt(event.target.value))}
              className="slider"
              id="myRange"
            />
            <S.Spacer />
            <ColorPicker
              width={300}
              height={200}
              color={pickerColor}
              onChange={setPickerColor}
              onChangeComplete={(val) => setBrushColor(val.rgb)}
              hideHSV
              dark
              alpha
            />
          </S.Toolbar>
        )}
        <S.ToolbarToggle onClick={toggleToolbar}>
          <S.Toggle>{showToolbar ? "Hide" : "Show"} Toolbar</S.Toggle>
        </S.ToolbarToggle>
      </S.Page>
    </>
  );
};

export default App;
