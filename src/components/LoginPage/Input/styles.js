import styled from 'styled-components';

export default styled.div`
  position: relative;

  span {
    background-image: ${props => props.icon ? 'url(' + require(`./${props.icon}.svg`) + ')' : 'none'};
    width: 19px;
    height: 19px;
    opacity: 0.4;
    background-size: cover;
    position: absolute;
    top: 25px;
    left: 21px;
  }
  input {
    margin: 10px 0;
    padding: 16px 6px 16px 53px;
    border: 1px solid #dfdfdf;
    border-radius: 7px;
    width: calc(100% - 62px);
  }
`;
