import styled, { css } from "styled-components";

export const Boxed = styled.div`
  ${(props) =>
    props.padHorizontal &&
    css`
      padding-left: ${(props) => props.padHorizontal};
      padding-right: ${(props) => props.padHorizontal};
    `}
  ${(props) =>
    props.padVertical &&
    css`
      padding-top: ${(props) => props.padVertical};
      padding-bottom: ${(props) => props.padVertical};
    `}
  ${(props) =>
    props.pad &&
    css`
      padding: ${(props) => props.pad};
    `}
   ${(props) =>
    props.align &&
    css`
      text-align: ${(props) => props.align};
    `}
   ${(props) =>
    props.margin &&
    css`
      margin: ${(props) => props.margin};
    `}
   ${(props) =>
    props.color &&
    css`
      color: ${(props) => props.color};
    `}
  ${(props) =>
    props.position &&
    css`
      position: ${(props) => props.position};
    `}
  ${(props) =>
    props.background &&
    css`
      background: ${(props) => props.background};
    `}
  ${(props) =>
    props.bColor &&
    css`
      background-color: ${(props) => props.bColor};
    `}
  ${(props) =>
    props.hoverBColor &&
    css`
      :hover {
        background-color: ${(props) => props.hoverBColor};
      }
    `}
  ${(props) =>
    props.maxWidth &&
    css`
      max-width: ${(props) => props.maxWidth};
    `}
    ${(props) =>
    props.minWidth &&
    css`
      min-width: ${(props) => props.minWidth};
    `}
  ${(props) =>
    props.width &&
    css`
      width: ${(props) => props.width};
    `}
  ${(props) =>
    props.maxHeight &&
    css`
      max-height: ${(props) => props.maxHeight};
    `}
    ${(props) =>
    props.minHeight &&
    css`
      min-height: ${(props) => props.minHeight};
    `}
  ${(props) =>
    props.height &&
    css`
      height: ${(props) => props.height};
    `}
  ${(props) =>
    props.borderRadius &&
    css`
      border-radius: ${(props) => props.borderRadius};
    `}
  ${(props) =>
    props.border &&
    css`
      border: ${(props) => props.border};
    `}
  ${(props) =>
    props.alignItems &&
    css`
      align-items: ${(props) => props.alignItems};
      -webkit-align-items: ${(props) => props.alignItems};
    `}
  ${(props) =>
    props.boxShadow &&
    css`
      box-shadow: ${(props) => props.boxShadow};
    `}
  ${(props) =>
    props.textAlign &&
    css`
      text-align: ${(props) => props.textAlign};
    `}
  ${(props) =>
    props.display &&
    css`
      display: ${(props) => props.display};
    `}
  ${(props) =>
    props.flexWrap &&
    css`
      flex-wrap: ${(props) => props.flexWrap};
    `}
    ${(props) =>
    props.flexDirection &&
    css`
      flex-direction: ${(props) => props.flexDirection};
    `}

  ${(props) =>
    props.overflowX &&
    css`
      overflow-x: ${(props) => props.overflowX};
    `}
    ${(props) =>
    props.overflowY &&
    css`
      overflow-y: ${(props) => props.overflowY};
    `}
    ${(props) =>
    props.cursor &&
    css`
      cursor: ${(props) => props.cursor};
    `}
`;
