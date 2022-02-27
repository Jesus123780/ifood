import styled from "styled-components";

const Wrap = styled.li`
  /* background: green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;

  @media only screen and (max-width: 735px) {
    padding: 0px 5px;
  }
`;
const ImageWrap = styled.div`
  border: 1px solid hsl(0, 0%, 86%);
  border-radius: 1000px;
  padding: 3px;
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
const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-top: 15px;
  /* background: pink; */
  text-align: center;
  white-space: nowrap;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function StoryItem({ title, imagePath }) {
  return (
    <Wrap>
      <ImageWrap>
        <Img src={imagePath} />
      </ImageWrap>
      <Title>{title}</Title>
    </Wrap>
  );
}

StoryItem.defaultProps = {
  title: "IDPWD",
  imagePath: "/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg"
};
