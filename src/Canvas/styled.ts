import styled, { css } from "styled-components";

export type StyleProps = {
  width: number;
  height: number;
  background: string;
  scale: number;
};
export const Wrapper = styled.div<StyleProps>`
  ${({ width, height, background, scale = 1 }) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: ${width * scale}px;
    height: ${height * scale}px;
    background: ${background};
    cursor: none;
    border-radius: 12px;
    -webkit-user-select: none;
    &:active {
      cursor: none;
    }
    &::selection {
      cursor: none;
    }
    * {
      -webkit-user-select: none;
    }

    *:active,
    *:hover {
      cursor: none;
    }
  `}
`;

export type PixelProps = {
  color: string;
  scale: number;
};
export const Pixel = styled.div<PixelProps>`
  ${({ color, scale }) => css`
    width: ${scale}px;
    height: ${scale}px;
    background: ${color};
  `}
`;

export const ResetButton = styled.button`
  position: absolute;
  top: 24px;
  margin: 0 auto;
`;
