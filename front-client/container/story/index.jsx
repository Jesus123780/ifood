import { StoryItem } from "./story-item";
import styled from "styled-components";
import { GET_ALL_STORY, GET_ALL_STORY_IMAGE_ITEM } from "./queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { SlideStory } from "./modalStory";
import { useSetState } from "components/hooks/useState";
import { SwiperSlide } from 'swiper/react'
import CustomSlider from "components/Slider";

const Wrap = styled.ul`
  display: flex;
  padding: 0 24px;
  position: relative;
  margin-bottom: 44px;

  @media only screen and (max-width: 735px) {
    padding: 0px;
    margin-bottom: 21px;
  }
`;
export function Story({ idStore }) {
  // STATE
  const OpenModalInfo = useSetState(null)
  const OpenModal = useSetState(false)
  // QUERY
  const [getAllStoryStore, { data }] = useLazyQuery(GET_ALL_STORY)
  const [getAllStoryItemPhotoStore, { data: dataItem }] = useLazyQuery(GET_ALL_STORY_IMAGE_ITEM)
  useEffect(() => {
    getAllStoryStore({ variables: { idStore: idStore } })
  }, [data])
  // HANDLE
  const handleSlider = (item) => {
    OpenModalInfo.setState(item)
    OpenModal.setState(!OpenModal.state)
    getAllStoryItemPhotoStore({ variables: { stoId: item.stoId } })
  }
  const closeModal = () => OpenModal.setState(!OpenModal.state)
  return (
    <Wrap>
      <CustomSlider
        spaceBetween={35}
        centeredSlides
        infinite={false}
        autoplay={false}
        slidesToShow={10}
        direction='horizontal' >
        {data && data?.getAllStoryStore?.map((item, i) => (
          <SwiperSlide
            key={item.iStoId}>
            <StoryItem key={item} title={item.nameStore} imagePath={item.imagePath} onClick={() => handleSlider(item)} />
          </SwiperSlide>
        ))}
      </CustomSlider>
      {OpenModal.state && <SlideStory closeModal={closeModal} data={data?.getAllStoryStore || []} dataItem={dataItem?.getAllStoryItemPhotoStore || []} OpenModalInfo={OpenModalInfo} />}
    </Wrap>
  );
}

