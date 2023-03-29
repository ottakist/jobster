import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 767px) {
    /* grid-template-columns: 2rem 2rem 2rem;
    height: 2rem; */
  }
  @media (min-width: 768px) {
    /* grid-template-columns: 1fr 1fr;
    column-gap: 1rem; */
  }
  @media (min-width: 1120px) {
    /* grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem; */
  }
`;
export default Wrapper;
