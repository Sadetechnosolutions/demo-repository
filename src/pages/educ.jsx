import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline';
import Photographer from './photographer';

const EducationTimeline = ({ events }) => (
  <VerticalTimeline>
    {events.map((event, index) => (
      <VerticalTimelineElement
        key={index}
        date={event.date}
        iconStyle={{ background: 'blue', color: '#fff' }}
      >
        <h3 className="vertical-timeline-element-title">{event.title}</h3>
        <p>{event.description}</p>
      </VerticalTimelineElement>
    ))}
  </VerticalTimeline>
);

export default EducationTimeline;
