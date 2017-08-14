/* global window */
import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import { emojify } from 'react-emojione';
import Spinner from '../../elements/Spinner';
import * as deps from '../../deps';

const LoadMore = ({ requestAnotherPage, retrieved, total, isLoading }) => {
  const pageLimit = 3;

  return (
    <Container>
      {(() => {
        if (isLoading) {
          return <Spinner />;
        }

        if (retrieved >= total) {
          return (
            <Congratulations>
              <div>
                {'Te has pasado Worona.'}
              </div>
              <div>
                {'¡Enhorabuena! '}<span>{emojify(':tada:')}</span>
              </div>
            </Congratulations>
          );
        }

        if (retrieved < pageLimit) {
          return <Waypoint onEnter={requestAnotherPage} bottomOffset={-window.screen.height} />;
        }

        return (
          <button onClick={requestAnotherPage}>
            {'Cargar más'}
          </button>
        );
      })()}
    </Container>
  );
};

LoadMore.propTypes = {
  requestAnotherPage: React.PropTypes.func,
  retrieved: React.PropTypes.number,
  total: React.PropTypes.number,
  isLoading: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  retrieved: deps.selectorCreators.getNumberOfRetrievedPages('currentList')(state),
  total: deps.selectorCreators.getNumberOfTotalPages('currentList')(state),
  isLoading: deps.selectorCreators.isListLoading('currentList')(state),
});

const mapDispatchToProps = dispatch => ({
  requestAnotherPage: () => dispatch(deps.actions.anotherPostsPageRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadMore);

const Container = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;

  button {
    height: 60px;
    width: 100%;
    box-shadow: 0 0 3px 0 #999;
    color: #333;
  }
`;

const Congratulations = styled.div`
  text-align: center;
`;
