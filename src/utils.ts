export type ColorRGB = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type Pixels = { [key: string]: string };

export const getCoords = (x: number, y: number) => `${x};${y}`;

export const mixColors = (base: ColorRGB, added: ColorRGB): string => {
  const mix = { r: 0, g: 0, b: 0, a: 0 };

  const baseAlpha = base.a ?? 1;
  const addedAlpha = added.a ?? 1;

  mix.a = 1 - (1 - addedAlpha ?? 1) * (1 - baseAlpha ?? 1); // alpha
  mix.r = Math.round(
    (added.r * addedAlpha) / mix.a +
      (base.r * baseAlpha * (1 - addedAlpha)) / mix.a
  ); // red
  mix.g = Math.round(
    (added.g * addedAlpha) / mix.a +
      (base.g * baseAlpha * (1 - addedAlpha)) / mix.a
  ); // green
  mix.b = Math.round(
    (added.b * addedAlpha) / mix.a +
      (base.b * baseAlpha * (1 - addedAlpha)) / mix.a
  ); // blue

  return createRGB(mix);
};

export const createInitialState = (width: number, height: number): Pixels => {
  const pixels: Pixels = {};
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      pixels[getCoords(x, y)] = "rgba(0,0,0,0)";
    }
  }
  return pixels;
};

export const calculatePixelatedCircle = (
  x: number,
  y: number,
  brushSize: number
) => {
  const radius = Math.ceil(brushSize / 2);
  const xMin = x - radius;
  const xMax = x + radius;
  const yMin = y - radius;
  const yMax = y + radius;

  const coords: string[] = [];

  for (let i = xMin; i < xMax; i++) {
    for (let j = yMin; j < yMax; j++) {
      const distance = Math.sqrt(Math.pow(i - x, 2) + Math.pow(j - y, 2));
      if (distance <= radius) {
        coords.push(getCoords(i, j));
      }
    }
  }

  return coords;
};

export const createRGB = (color: ColorRGB) => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

export const parseRGB = (color: string) => {
  if (!color) {
    return { r: 0, g: 0, b: 0, a: 0 };
  }
  const [r, g, b, a] = color.match(/\d+/g)!.map(Number);
  return { r, g, b, a: a ?? 1 };
};
