import * as $ from "jquery";
import * as joint from "jointjs";
import {addCircle, addRectangle} from './elementFactory'
import * as dom_identifier from './const/dom-identifier'

// necessary for deserialization issues
window.joint = joint;

let diagramCanvas = $("#"+dom_identifier.diagramCanvas);

export const graph = new joint.dia.Graph({},
    {
        cellNamespace : joint.shapes
    });

export let paper = new joint.dia.Paper({
    el: diagramCanvas,
    model: graph,
    cellViewNamespace: joint.shapes,
    width: diagramCanvas.width(),
    height: 500,
    gridSize: 1,
    restrictTranslate: true
});

// populate initial graph
let circle = addCircle(100, 30, graph);
let rect1 = addRectangle(300, 50, graph);
let rect2 = addRectangle(350, 200, graph);

rect1.attr('label/text', 'Label1');
rect2.attr('label/text', 'Label2');

let link = new joint.shapes.standard.Link();
link.source(circle);
link.target(rect1);
link.addTo(graph);