import styled from 'styled-components';

// import UserIconSvg from './icon-user.svg';
// import PassIconSvg from './icon-pass.svg';

export default styled.div`
  /* .field {
    &__wrapper {
      position: relative;
    }
  } */

  position: relative;

  span {
    /* background-image: url(/static/media/user-shape.3e52b1da.svg); */
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

  /* .icon-user {
    background-image: url(\${UserIconSvg});
  }
  .icon-pass {
    background-image: url(\${PassIconSvg});
  } */
`;
