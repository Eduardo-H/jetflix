import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;

  > div {
    width: 1280px !important;
    height: 720px !important;
  }

  @media (max-width:1400px) {
    > div {
      width: 720px !important;
      height: 405px !important;
    }
  }

  @media (max-width:800px) {
    > div {
      width: 500px !important;
      height: 280px !important;
    }
  }

  @media (max-width:600px) {
    > div {
      width: 300px !important;
      height: 220px !important;
    }
  }
`;