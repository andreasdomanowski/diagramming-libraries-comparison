# Assessing diagramming libraries - JointJS vs. Diagram.js
Disclaimer: all information which was taken into account for the decision for or against a diagramming library was gathered until april 2021.

## Analysis scheme
- initial effort to get started
- ease of implementing the requirements
- customizability
- implementation effort for usability aspects
- support and questions
- miscellaneous aspects

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
 

## Diagram.js
### Initial Effort to Get Started
### Documentation and Examples
### Ease Of Implementing the Requirements
### Customizability
### Implementation Effort for Usability Aspects
### Support and Questions
### Miscellaneous aspects
- [example editor](https://github.com/bpmn-io/diagram-js-examples) provided by maintainers contains bugs that catch the eye
  - if an element is clicked repeatedly, it gets stuck to the mouse pointer and can't be dropped