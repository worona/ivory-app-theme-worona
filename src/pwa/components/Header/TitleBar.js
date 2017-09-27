import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dep } from 'worona-deps';
import Logo from './Logo';
import SliderPoints from './SliderPoints';
import MenuButton from './MenuButton';
import CloseButton from './CloseButton';
import NotificationsButton from '../../elements/NotificationsButton';

const TitleBar = ({ isPost }) =>
  <Container>
    <MenuButton />
    {isPost ? <SliderPoints /> : <Logo />}
    {!isPost && <NotificationsButton />}
    {isPost && <CloseButton />}
  </Container>;

TitleBar.propTypes = {
  isPost: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isPost: dep('router', 'selectors', 'getType')(state) === 'post'
});

export default connect(mapStateToProps)(TitleBar);

const Container = styled.div`
  box-sizing: border-box;
  height: ${({ theme }) => theme.titleSize};
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgColor};
`;
