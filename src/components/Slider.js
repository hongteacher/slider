import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import SLIDES from './../SlideData';

const Slider = () => {
  // 이미지 갯수 (실제 데이터에 존재하는 개수보다 1 적게 (index는 0부터 시작))
  const TOTAL_SLIDES = 2;
  const delay = 3000;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef();
  const timeoutRef = useRef();

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    //자동시작
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentSlide((prevIndex) =>
          prevIndex === TOTAL_SLIDES ? 0 : prevIndex + 1,
        ),
      delay,
    );
    //자동끝
    slideRef.current.style.transition = 'ease 1000ms';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;

    // cleanup 함수
    return () => {
      //리소스 잡기때문에 항상 써준다
      resetTimeout();
    };
  }, [currentSlide]);

  return (
    <SlideWrapper>
      <SlideContainer ref={slideRef}>
        {SLIDES.map((slide) => (
          <img key={slide.id} src={slide.url} alt="slider" />
        ))}
      </SlideContainer>
      <ButtonWrapper>
        <Button onClick={prevSlide}>
          <MdKeyboardArrowLeft />
        </Button>
        <Button onClick={nextSlide}>
          <MdKeyboardArrowRight />
        </Button>
      </ButtonWrapper>
      <DotWrapper>
        {SLIDES.map((dot) => (
          <Dotbutton
            key={dot.id}
            className={currentSlide === dot.id ? 'active' : ''}
            onClick={() => {
              setCurrentSlide(dot.id);
            }}
          />
        ))}
      </DotWrapper>
    </SlideWrapper>
  );
};

const SlideWrapper = styled.section`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SlideContainer = styled.div`
  width: 100%;
  display: flex;
  img {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 45%;
`;

const Button = styled.button`
  all: unset;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 64px;
  }
  &:hover {
    transition: all 0.3 ease-in-out;
    background: #ffc300;
    color: #000;
  }
`;

const DotWrapper = styled.div`
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 45%;
`;

const Dotbutton = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin: 15px 7px 0;
  background: #ccc;
  &.active {
    background: #ffc300;
  }
`;

export default Slider;
