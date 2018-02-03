import React, { PureComponent } from 'react';
import Animate from 'react-move/Animate';
import { easeExpOut, easeExpIn, easeCircleOut, easeSinIn, easeSinOut, easeCubicInOut } from 'd3-ease';
import styled from 'styled-components';
import { compose, lifecycle, pure, withHandlers, withStateHandlers } from 'recompose';

const Rect = styled.div.attrs({
  opacity: props => {
    const width = props.x - (props.order - 1) * 60;
    return props.order === "1" ? 0.7 : props.opacity;
  },
  transform: props => {
    const width = props.x - (props.order - 1) * 60;
    const res = width < 0 ? 0 : width
    return `translate3d(${res}px, 0, 0)`;
  }
})`
  position: absolute;
  width: 50px;
  height: 50px;
  margin: 10px 0px 0px;
  opacity: ${props => props.opacity};
  background-color: #00cf77;
  transform: ${props => props.transform};
`;

const Track = styled.div`
  border-radius: 4px;
  background-color: rgb(240, 240, 232);
  position: relative;
  margin: 5px 3px 10px;
  width: ${props => `${props.width}px`};
  height: 70px;
`;

const withApp = compose(
  pure,
  lifecycle({
    componentDidMount() {
      console.log('App mounted');
    },
    componentWillUnmount() {
      console.log('App unmounted');
    }
  }),
  withStateHandlers(
    ({ initialOpen = false, initialShow = true }) => ({
      open: initialOpen,
      show: initialShow
    }),
    {
      toggleOpen: ({ open }) => () => ({
        open: !open,
      }),
      toggleShow: ({ show }) => () => ({
        show: !show,
      })
    }
  )
);

const setMove = (state) => (
  <Track {...state}>
    <Rect order="1" {...state} />
    <Rect order="2" {...state} />
    <Rect order="3" {...state} />
    <Rect order="4" {...state} />
    <Rect order="5" {...state} />
    <Rect order="6" {...state} />
    <Rect order="7" {...state} />
    <Rect order="8" {...state} />
    <Rect order="9" {...state} />
    <Rect order="10" {...state} />
  </Track>
);

const ReactMove = (props) => {
  return (
    <Animate
      show={props.show}
      start={() => {
        console.log("start", props);
        return {
          x: 0,
          width: 50,
          opacity: [0]
        };
      }}
      leave={() => {
        console.log("leave", props);
        return {
          opacity: [0],
          timing: { delay: 500, duration: 550, ease: easeSinIn }
        };
      }}
      update={() => {
        console.log("update", props);
        return {
          x: [props.open ? 540 : 0],
          width: [props.open ? 600 : 50],
          opacity: [props.open ? 0.7 : 0],
          timing: {
            delay: 50,
            duration: 500,
            ease: props.open ? easeCubicInOut : easeSinIn
          },
          events: {
            start() {
              console.log('start!', props);
            },
            interrupt() {
              console.log('interrupt!', props);
            },
            end() {
              console.log('end!', props);
            },
          },
        };
      }}
    >
      {state => setMove(state)}
    </Animate>
  );
};

const App = withApp(props => (
  <div>
    <button onClick={props.toggleOpen}>Toggle</button>
    <button onClick={props.toggleShow}>Show</button>
    <ReactMove {...props}/>
  </div>
));

export default App;