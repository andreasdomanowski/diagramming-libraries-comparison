# Assessing diagramming libraries - JointJS vs. Diagram.js
Disclaimer: all information which was taken into account for the decision for or against a diagramming library was gathered until april 2021.

## Analysis scheme
- initial effort to get started
- ease of implementing the requirements
- customizability
- implementation effort for usability aspects
- support and questions
- miscellaneous aspects
- problems

## JointJS
### Initial Effort to Get Started
- very low initial effort was needed
### Documentation and Examples
- JointJS is a mature library which provides an extensive documentation and examples
- examples provided for not just the basic use cases, but more complex applications and facets, too
### Ease Of Implementing the Requirements
### Customizability
- easy implementation of custom shapes with abstraction layer for SVG stacking
- events and callbacks for actions on elements can be defined very easily
### Implementation Effort for Usability Aspects
- Palette/element creation tools have to be implemented
  - path chosen: context menu for element creation, *tools* for element deletion, double click for link creation
- resize handlers have to be implemented by hand - big con!
### Support and Questions
-  many posts on StackOverflow, issues with solutions on GitHub
### Problems
- no auto resize of shapes - has to be implemented manually
 

## Diagram.js
### Initial Effort to Get Started
- relatively hard, due to the lack of documentation, just the example project is given
### Documentation and Examples
- just one example repository
- documentation mainly in code, just very patchy top level architecture document in a repo of bpmn.io
  - usage of DI framework makes getting an initial overview more cumbersome compared with JointJS
- very modular approach, but no documentation, which modules exist and how they can be used
### Ease Of Implementing the Requirements
- editor creation not as intuitive as with JointJS
- serialization was cumbersome, due to DiagramJS not supporting it out of the box
- palette and shape creation was very comfortable
### Customizability
- custom shapes are created easily due to the usage of tiny-svg, a nice toolset for SVG
### Implementation Effort for Usability Aspects
- out of the box palette support, this comes in very handy
- scrolling and automatic resize handling are definitely pros
### Support and Questions
- barely anything for diagram-js, but an active community around bpmn-js, which is built on top of diagram-js
### Miscellaneous aspects
- [example editor](https://github.com/bpmn-io/diagram-js-examples) provided by maintainers contains bugs that catch the eye
  - if an element is clicked repeatedly, it gets stuck to the mouse pointer and can't be dropped
  - moving the predefined connected rectangles results in the link having the highest "z-index". Combined with the anchor being the middle of the rectangle, this definitely catches the eye, too
### Problems
- things initially thought to be included like label rendering is not supported out of the box
  - therefore, it's a hurdle to implement basic requirements
  - though there are nice implementations of e.g. a [direct label editor](https://github.com/bpmn-io/diagram-js-direct-editing), a custom text renderer has to be implemented
- important architecture and implementation aspects like the names of events, or the interaction of core modules isn't documented at all
  - several aspects were just documented in answers in the message board of bpmn-js