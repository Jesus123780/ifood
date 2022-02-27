import { StoryItem } from "./story-item";
import styled from "styled-components";
import { data } from "./data";
import { IconArrowRight } from "../../public/icons";

const Wrap = styled.ul`
  display: flex;
  padding: 0 24px;
  /* overflow-x: scroll; */
  position: relative;
  margin-bottom: 44px;

  @media only screen and (max-width: 735px) {
    padding: 0px;
    margin-bottom: 21px;
  }
`;
const NextButton = styled.div`
  position: sticky;
  right: 0;
  display: flex;
  align-items: center;
`;

export function Story() {
  return (
    <Wrap>
      {data.map((item, id) => (
        <StoryItem key={id} title={item.title} imagePath={item.imagePath} />
      ))}
      <NextButton>
        <IconArrowRight />
      </NextButton>
    </Wrap>
  );
}
