import React, { Component } from 'react';
import styles from './InfiniteHorizonCardSlider.scss';

type PropsType = {
  children: React.ReactNode[];
  cardWidth?: number;
  autoTimerSec?: number;
  startIndex?: number;
  scale?: { big: number; small: number; };
  focusEvent?: Function;
  focusEventAfter?: Function;
  useAuto?: boolean;
  useScale?: boolean;
  usePaging?: boolean;
  useBannerStyle?: boolean;
  lockBoolean?: boolean;
  cardStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

type StateType = {
  children: Array<any>;
  currentIndex: number;
  touchStartPoint: number;
  isLeftMoved: boolean;
}

class InfiniteHorizonCardSlider extends Component<PropsType, StateType> {
  slider: HTMLDivElement | null;
  container: HTMLDivElement | null;
  interval: NodeJS.Timer | number | undefined;
  constructor(props: PropsType) {
    super(props);
    this.state = {
      children: [],
      currentIndex: this.props.startIndex ? this.props.startIndex : 0,
      touchStartPoint: 0,
      isLeftMoved: false,
    }
    this.slider = null;
    this.container = null;
    this.interval = undefined;
  }

  componentDidMount = () => {
    const { slider } = this;
    const { useAuto, autoTimerSec } = this.props;
    this.initData();
    slider?.addEventListener('touchstart', (e) => this.onTouchStart(e as any))
    slider?.addEventListener('touchend', (e) => this.onTouchEnd(e as any))
    slider?.addEventListener('transitionstart', () => this.onTransitionStart())
    slider?.addEventListener('transitionend', () => this.onTransitionEnd())

    if (useAuto) {
      clearInterval(this.interval as NodeJS.Timeout);
      this.interval = setInterval(() => {
        this.slide(true);
      }, (autoTimerSec || 3) * 1000)
    }
  }

  componentWillUnmount = () => {
    const { slider } = this;
    const { useAuto } = this.props;
    slider?.removeEventListener('touchstart', (e) => { this.onTouchStart(e as any) })
    slider?.removeEventListener('touchend', (e) => { this.onTouchEnd(e as any) })
    slider?.removeEventListener('transitionstart', () => this.onTransitionStart())
    slider?.removeEventListener('transitionend', () => this.onTransitionEnd())

    if (useAuto) {
      clearInterval(this.interval as NodeJS.Timeout);
    }
  }

  initData = () => {
    this.setState({
      children: this.getRenderChildren(this.state.currentIndex),
    })
  }

  nextIndex = (moveLeft: boolean, offset: number) => {
    const { children } = this.props;
    const length = children.length - 1;
    if (moveLeft) {
      return (offset <= 0) ? length : offset - 1
    }
    return (offset >= length) ? 0 : offset + 1
  }

  getRenderChildren = (offset: number) => {
    const curIdx = offset;
    const childrenBuffer = this.props.children.slice();
    const newChildren = [
      childrenBuffer[this.nextIndex(true, this.nextIndex(true, curIdx))],
      childrenBuffer[this.nextIndex(true, curIdx)],
      childrenBuffer[curIdx],
      childrenBuffer[this.nextIndex(false, curIdx)],
      childrenBuffer[this.nextIndex(false, this.nextIndex(false, curIdx))],
    ]
    return newChildren;
  }

  getScaleStyle = (scale: PropsType['scale']) => {
    return {
      focus: scale ? `scale(${scale.big ? scale.big : 1.0})` : 'scale(1.0)',
      others: scale ? `scale(${scale.small ? scale.small : 0.85})` : 'scale(0.85)',
    }
  }

  scaleFix = (scaleUpIndex: number, useAnim = true) => {
    const { slider } = this;
    const { scale } = this.props;

    if (slider) {
      for (let i = 0 ; i < slider.children.length ; ++i) {
        const child = slider.children.item(i) as HTMLElement;
        if (child) {
          if (i === scaleUpIndex) {
            if (useAnim) { child.style.transition = 'all 0.5s ease'; }
            child.style.transform = this.getScaleStyle(scale).focus;
          } else {
            if (useAnim) { child.style.transition = 'all 0.5s ease'; }
            child.style.transform = this.getScaleStyle(scale).others;
          }
        }
      }
    }
  }

  slideEvent = (nextIndex: number, isLeft: boolean, isAfter?: boolean) => {
    const { focusEvent, focusEventAfter } = this.props;
    this.setState({ currentIndex: nextIndex, isLeftMoved: isLeft }, () => {
      if (!isAfter && focusEvent) {
        focusEvent(nextIndex, isLeft);
      }
      if (isAfter && focusEventAfter) {
        focusEventAfter(nextIndex, isLeft);
      }
    })
  }

  slide = (moveLeft: boolean) => {
    const { cardWidth, useScale } = this.props
    const { currentIndex } = this.state;
    const { slider } = this;

    const defaultStyle = this.getDefaultStyle()
    const _cardWidth = defaultStyle ? defaultStyle.cardWidth : cardWidth;

    if (slider) {
      if (moveLeft) {
        slider.className = styles.cards_wrapper_transition;
        slider.style.transform = `translateX(-${_cardWidth}px)`
        if (useScale) { this.scaleFix(3) }
  
        this.slideEvent(this.nextIndex(false, currentIndex), true);
      } else {
        slider.className = styles.cards_wrapper_transition;
        slider.style.transform = `translateX(${_cardWidth}px)`
        if (useScale) { this.scaleFix(1) }
  
        this.slideEvent(this.nextIndex(true, currentIndex), false);
      }
    }
  }
  
  onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (this.props.lockBoolean) {
      return;
    }

    if (this.props.useAuto) {
      clearInterval(this.interval as NodeJS.Timeout);
    }

    const startX = e.touches[0].clientX;
    this.setState({ touchStartPoint: startX })
  }

  onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (this.props.lockBoolean) {
      return;
    }

    if (this.props.useAuto) {
      this.interval = setInterval(() => {
        this.slide(true);
      }, (this.props.autoTimerSec || 3) * 1000)
    }

    const touch = e.changedTouches[e.changedTouches.length - 1];
    const xDirection = this.state.touchStartPoint - touch.clientX;
    if (xDirection > 10) {
      this.slide(true)
    } else if (xDirection < -10) {
      this.slide(false)
    }
  }

  onTransitionStart = () => {
    const { slider } = this;

    if (slider) {
      slider.style.pointerEvents = 'none'
    }
  }

  onTransitionEnd = () => {
    const { slider } = this;

    if (slider) {
      slider.className = styles.cards_wrapper
      slider.style.transform = 'none'
      slider.style.pointerEvents = 'auto'
  
      if (this.props.useScale) {
        for (let i = 0 ; i < slider.children.length ; ++i) {
          const child = slider.children.item(i) as HTMLElement;
          if (child) {
            child.style.transition = 'none';
          }
        }
        this.scaleFix(2, false)
      }
    }

    this.setState({ children: this.getRenderChildren(this.state.currentIndex) }, () => {
      this.slideEvent(this.state.currentIndex, this.state.isLeftMoved, true);
    })
  }

  getDefaultStyle = () => {
    if (this.props.useBannerStyle) {
      return {
        cardWidth: 1024,
        containerStyle: {
          width: 1024,
          height: 400
        },
        cardStyle: {
          width: 1024,
          height: 400,
          padding: 0,
          paddingBottom: 30,
          borderRadius: 0,
          boxShadow: 'none'
        }
      }
    }
    return null;
  }

  render() {
    const {
      useScale,
      usePaging,
      cardStyle,
      containerStyle,
    } = this.props;
    const { children } = this.state;
    const defaultStyle = this.getDefaultStyle();
    return (
      <div
        className={styles.slider_container}
        ref={(mount) => { this.container = mount }}
        style={defaultStyle ? defaultStyle.containerStyle : containerStyle}
      >
        <div className={styles.cards_wrapper} ref={(mount) => { this.slider = mount }}>
          {
            children.map((content, i) => {
              return (
                <div
                  key={`card_${i}`}
                  className={styles.card}
                  style={{ transform: useScale ? ((i === 2)
                    ? this.getScaleStyle(this.props.scale).focus
                    : this.getScaleStyle(this.props.scale).others) : 'none',
                    ...(defaultStyle ? defaultStyle.cardStyle : cardStyle)
                  }}
                >
                  {content}
                </div>
              )
            })
          }
        </div>
        {
          usePaging
          && (
            <div className={styles.dot_paging}>
              {
                [...Array(this.props.children.length)].map((_elem, i) => {
                  return <div key={i} className={this.state.currentIndex === i ? styles.dot_selected : styles.dot} />
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default InfiniteHorizonCardSlider