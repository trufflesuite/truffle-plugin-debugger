import styled from "styled-components";
import * as Colors from "../styles/colors";

const SyntaxStyle = styled.div`
  .hljs-comment,
  .hljs-quote {
    color: ${Colors.GREY};
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: ${Colors.PINK_500};
    font-weight: bold;
  }

  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: ${Colors.WATERMELON_600};
  }

  .hljs-string,
  .hljs-doctag {
    color: ${Colors.PORSCHE_1};
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: ${Colors.TEAL_1};
    font-weight: bold;
  }

  .hljs-subst {
    font-weight: normal;
  }

  .hljs-type,
  .hljs-class .hljs-title {
    color: ${Colors.TEAL_1};
    font-weight: bold;
  }

  .hljs-tag,
  .hljs-name,
  .hljs-attribute {
    color: ${Colors.TEAL_1};
    font-weight: normal;
  }

  .hljs-built_in,
  .hljs-builtin-name {
    color: ${Colors.TEAL_1};
  }
`;

export default SyntaxStyle;
