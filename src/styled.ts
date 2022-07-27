import styled from "styled-components";

export const Page = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 100vh;
  background: #333;
`;

export const Toolbar = styled.div`
  display: flex;

  flex: 0 auto;
  padding: 16px;
  flex-direction: column;
  background: #444;
  height: 90vh;
  border-radius: 24px;
  margin: 32px;
`;

export const Slider = styled.input.attrs({})`
  appearance: none;
  display: flex;
  width: 200px;
  height: 8px;
  background: #04aa6d;
  cursor: pointer;
`;

export const Label = styled.h6`
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  color: black;
  text-align: left;
`;

export const Spacer = styled.div`
  height: 32px;
`;

export const CanvasWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToolbarToggle = styled.div`
  position: absolute;
  top: 64px;
  right: 64px;
  background: #aaa;
  border-radius: 24px;
  padding: 8px 12px;
`;

export const Toggle = styled.span`
  font-size: 18px;
  line-height: 18px;
  font-weight: bold;
`;

export const Header = styled.div`
  display: flex;
  flex: 0 auto;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  margin: 0 auto;
  background: #666;
  border-radius: 24px;
`;

export const CanvasSelect = styled.div<{ selected: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
`;
