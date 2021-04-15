import * as $ from "jquery";
import * as joint from "jointjs";
import {addRectangle } from './addElements'

// necessary for deserialization issues
window.joint = joint;

let diagramCanvas = $("#diagramCanvas");

export const graph = new joint.dia.Graph();

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
(function () {
    let rect1 = addRectangle(100, 30, graph);
    let rect2 = addRectangle(400, 60, graph);

    let link = new joint.shapes.standard.Link();
    link.source(rect1);
    link.target(rect2);
    link.addTo(graph);
})();