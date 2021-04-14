# JointJS - Basic Workflow and High-Level API Overview
## Basics
- _Paper_ represents the modeling canvas, _Graph_ represents the underlying model
    - containing element specified in attribute _Paper.el_
    - separation of model and graphical representation

## Standard Model Elements
- standard shapes and links located in _joint.shapes.standard_
-  Model elements are added to graph via _addTo(Graph)_ on elements
   
## Custom Model Elements
- custom shapes defined with SVG    
- defined through _Element.define(...)_
    - new element class has name, default properties, prototype properties, and static properties
    - markup for graphical representation usually defined in prototype properties
        - property _markup_ 
- for creating completely new shapes, _joint.dia.Element.define(...)_ should be used+
- for extending other shaped, _joint.shapes.standard.ShapeToInheritFrom.define(...)_ can be used


##  Serialization
