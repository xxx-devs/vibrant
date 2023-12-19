'use client';

import React, { forwardRef } from 'react';
import { Col, Row } from 'antd';
import styles from './styles.module.css';

interface CarouselProps {
  elementWidth: number;
  children: React.ReactElement[];
}

// eslint-disable-next-line prefer-arrow-callback
const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  { elementWidth, children },
  ref,
) {
  return (
    <Row gutter={16} justify="start" wrap={false} className={styles.carousel__row} ref={ref}>
      {children.map((child, index) => (
        <Col key={index} style={{ minWidth: elementWidth }}>
          {child}
        </Col>
      ))}
    </Row>
  );
});

export default Carousel;
