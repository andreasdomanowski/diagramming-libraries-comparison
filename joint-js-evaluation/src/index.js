import * as joint from 'jointjs'
import * as $ from 'jquery';
import * as customShapes from './js/customShape'
import './css/joint-evaluation.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import '@primer/octicons/build/build.css'
import * as dom_identifier from './js/const/dom-identifier'

// necessary for deserialization issues
window.joint = joint

let diagramCanvas = $("#diagramCanvas");

/*const graph = new joint.dia.Graph({}, {
    cellNamespace: joint.shapes.standard
});*/
const graph = new joint.dia.Graph();

let paper = new joint.dia.Paper({
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
    let rect1 = addRectangle(100, 30);
    let rect2 = addRectangle(400, 60);

    let link = new joint.shapes.standard.Link();
    link.source(rect1);
    link.target(rect2);
    link.addTo(graph);
})();

// saves context menu position for avoiding busy waiting with callbacks on context menu click
let contextMenuX = 0;
let contextMenuY = 0;

function addRectangle(x, y) {
    let rect = new joint.shapes.standard.Rectangle();
    rect.position(x, y);
    rect.resize(100, 40);
    rect.addTo(graph);
    return rect;
}

function addCircle(x, y) {
    let circle = new joint.shapes.standard.Circle();
    circle.position(x, y);
    circle.resize(100, 40);
    circle.addTo(graph);
    return circle;
}

function addComposedShape(x, y) {
    let newComposedShape = new customShapes.CustomElement();
    newComposedShape.position(x, y);
    newComposedShape.resize(100, 40);
    newComposedShape.addTo(graph);
    return newComposedShape;
}

paper.on('blank:contextmenu',
    function (evt, x, y) {
        let popupCoordinate = paper.localToPagePoint(x, y);

        $("#" + dom_identifier.contextMenu).css({
            top: popupCoordinate.y + "px",
            left: popupCoordinate.x + "px",
        });

        contextMenuX = x;
        contextMenuY = y;

        showContextMenu();
    });

function hideContextMenu() {
    $("#" + dom_identifier.contextMenu).removeClass("show").addClass("hide");
}

function showContextMenu() {
    $("#" + dom_identifier.contextMenu).removeClass("hide").addClass("show");
}

// context menu event handling

let contextMenuClickMapping = new Map([
    [dom_identifier.contextmenu_addRect_trigger, addRectangle],
    [dom_identifier.contextmenu_addCircle_trigger, addCircle],
    [dom_identifier.contextmenu_addComposedShape_trigger, addComposedShape],
    [dom_identifier.contextmenu_close_trigger, undefined]
]);

contextMenuClickMapping.forEach(
    (value, key) => {
        $("#" + key).click(function () {
            if (value !== undefined) {
                value.apply(null, [contextMenuX, contextMenuY]);
            }
            hideContextMenu();
        });

        hideContextMenu();
    }
)

// serialization
$("#" + dom_identifier.serializeConsoleButton).click(() => {
    console.log(graph.toJSON());
});

$("#" + dom_identifier.serializeButton).click(() => {
    showInModal(JSON.stringify(graph.toJSON()));
});

function showInModal(modalSerializationContent) {
    $("#" + dom_identifier.modalSerializationContent).html(modalSerializationContent);
    $("#" + dom_identifier.modalIdentifier).modal();
}

// deserialization
$("#" + dom_identifier.deserializeButton).click(() => parseInputAndDisplayGraph(
    $("#" + dom_identifier.deserializationTextarea).val()
));

function parseInputAndDisplayGraph(inputString) {
    let parsedJson = JSON.parse(inputString);
    deserializeAndDisplayGraph(parsedJson);
}

function deserializeAndDisplayGraph(input) {
    graph.clear();
    graph.fromJSON(input);
}