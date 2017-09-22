/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import * as selectors from '../../selectors';
import LoadUnload from '../LoadUnload';
import Iframe from '../Iframe';

const randomBetween = (min, max) => (Math.random() * (max - min)) + min; // prettier-ignore

const Ad = ({ siteId, pageId, formatId, target, width, height, slide, activeSlide }) => {
  const exit = randomBetween(2000, 6000);

  return (
    <Container width={width} height={height}>
      <IconContainer>
        <IconText>{'ad'}</IconText>
      </IconContainer>
      <Transition
        in={slide === activeSlide || slide === undefined}
        timeout={{ exit }}
        unmountOnExit
        enter={false}
      >
        {status => {
          if (status === 'entered' || status === 'exiting') {
            return (
              <Iframe title={'adIframe'} width={width} height={height}>{`
                <head>
                  <style>html,body{margin:0;padding:0;overflow:hidden;}</style>
                  <script src="//ced.sascdn.com/tag/2506/smart.js" type="text/javascript" async></script>
                  <script>
                    var sas = sas || {};
                    sas.cmd = sas.cmd || [];
                    sas.cmd.push(function setupAds() {
                      sas.setup({ networkid: 2506, domain: "//www8.smartadserver.com", async: true });
                    });
                    sas.cmd.push(function getAd() {
                      sas.call('onecall', {
                        siteId: ${siteId},
                        pageId: ${pageId},
                        formatId: ${formatId},
                        target: '${target}'
                      });
                    });
                    sas.cmd.push(function renderAd() {
                      sas.render('${formatId}');
                    });
                  </script>
                </head>
                <body>
                  <div id=sas_${formatId}></div>
                </body>
              `}
              </Iframe>
            );
          }
          return null;
        }}
      </Transition>
    </Container>
  );
};

Ad.propTypes = {
  siteId: PropTypes.number.isRequired,
  pageId: PropTypes.number.isRequired,
  formatId: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  target: PropTypes.string,
  slide: PropTypes.number,
  activeSlide: PropTypes.number,
};

const mapStateToProps = state => ({
  activeSlide: selectors.post.getActiveSlide(state),
});

export default connect(mapStateToProps)(Ad);

const Container = styled.div`
  margin: 30px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  * {
    max-width: 100%;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconText = styled.span`
  margin: 0;
  padding: 3px 5px;
  font-size: 20px;
  line-height: 20px;
  color: #bdbdbd;
  text-transform: uppercase;
  border: 3px solid #bdbdbd;
  border-radius: 4px;
`;

const StyledLoadUnload = styled(LoadUnload)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;

  iframe {
    max-width: 100%;
  }
`;
