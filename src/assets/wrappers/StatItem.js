import styled from 'styled-components';

const Wrapper = styled.article`
  max-width: 30%;
  width: 100%;
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
  @media (max-width: 767px) {
    padding:1rem 2rem;
    .count {
      display: block;
      font-weight: 700;
      font-size: 25px;
    }
    .icon {
      width: 35px;
      height: 30px;
      background: ${(props) => props.bcg};
      border-radius: var(--borderRadius);
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        font-size: 1.3rem;
        color: ${(props) => props.color};
      }
    }
    .title {
      font-size: 12px;
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      text-align: left;
      margin-top: 0.5rem;
    }
  }
`;

export default Wrapper;
