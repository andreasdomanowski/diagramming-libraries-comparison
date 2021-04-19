# Comparing diagramming libraries for the generation of editors based on meta models
## About this repository
A part of my diploma thesis (_Model-Driven, (Semi-)Automatic Generation of Lightweight, Client-Side, Online Diagram Editors_) deals with the generation of client-side diagram editors based on meta models.

For finding a suitable and flexible library for this task, two of the most promising candidates ([diagram-js](https://github.com/bpmn-io/diagram-js) and [JointJS](https://www.jointjs.com/opensource)) are evaluated. A set of basic requirements is stated and to be implemented with both libraries. The ease of working with each of them as well as the results determine the decision, which library is used for the final implementation. 

## Requirements
- implementation of a client-side web editor for basic geometric shapes and connections between them
- three different shapes: 
  - 1. circle
  - 2. rectangle
  - 3. composition of a rectangle and an ellipse
- Rectangles and shapes with rectangles have an associated label
- links between shapes
- functionality to add, manipulate and delete shapes on the drawing canvas
- serialization of the diagram or underlying data model