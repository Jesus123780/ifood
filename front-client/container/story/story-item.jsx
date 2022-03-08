import styled from "styled-components";

const Wrap = styled.li`
  /* background: green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  padding: 10px 15px;

  @media only screen and (max-width: 735px) {
    padding: 0px 5px;
  }
`;
const ImageWrap = styled.div`
  border: 1px solid hsl(0, 0%, 86%);
  border-radius: 1000px;
  padding: 3px;
  width: 100px;
  place-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
const Img = styled.img`
  width: 77px;
  height: 77px;
  border-radius: 1000px;
  display: block;

  @media only screen and (max-width: 735px) {
    width: 56px;
    height: 56px;
  }
`;
export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-top: 15px;
  text-align: center;
  white-space: nowrap;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/704bbaef30d14e44a157a98825ce8df3?x-expires=1646701200&x-signature=xS9LllyntZHP9ZclpQZ0LlmxPIo%3D
export function StoryItem({ title, imagePath, onClick }) {
  return (
    <Wrap onClick={onClick}> 
      <ImageWrap>
        <Img src={imagePath} />
      </ImageWrap>
      <Title>{title}</Title>
    </Wrap>
  );
}

StoryItem.defaultProps = {
  title: "Comida rapida",
  imagePath: "/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg"
};
