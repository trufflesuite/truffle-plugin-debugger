import styled from "styled-components";

export interface IProps {
  marginBottom?: string;
}

const List = styled.div`
  > * {
    &:not(:last-child) {
      margin-bottom: ${({ marginBottom = "1rem" }: IProps) => marginBottom};
    }
  }
`;
export default List;
