import * as joint from 'jointjs'
import * as $ from 'jquery';
import * as customShapes from './js/customShape'
import './css/joint-evaluation.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import * as dom_identifier from '../../common/js/const/dom-identifier'

// necessary for deserialization issues
window.joint = joint

let diagramCanvas = $("#diagramCanvas");

let graph = new joint.dia.Graph;
let paper = new joint.dia.Paper({
    el: diagramCanvas,
    model: graph,
    width: diagramCanvas.width,
    height: 500,
    gridSize: 1,
    restrictTranslate: true
});

let rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
rect.resize(130, 40);
rect.attr('label/text', 'First rectangle');
rect.addTo(graph);

let rect2 = new joint.shapes.standard.Rectangle();
rect2.position(400, 60);
rect2.resize(130, 40);
rect2.attr('label/text', 'Second rectangle');
rect2.addTo(graph);

let link = new joint.shapes.standard.Link();
link.source(rect);
link.target(rect2);
link.addTo(graph);

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
        let localPoint1 = paper.localToPagePoint(x, y);

        showContextMenu();

        document.getElementById(dom_identifier.contextMenu).style.top = localPoint1.y + 'px';
        document.getElementById(dom_identifier.contextMenu).style.left = localPoint1.x + 'px';

        paper.localToPagePoint();
        paper.clientToLocalPoint()

        contextMenuX = x;
        contextMenuY = y;
    });

function hideContextMenu() {
    $("#" + dom_identifier.contextMenu).removeClass("show").addClass("hide");
}

function showContextMenu() {
    $("#" + dom_identifier.contextMenu).removeClass("hide").addClass("show");
}

$("#" + dom_identifier.contextmenu_addRect_trigger).on("click", function () {
    addRectangle(contextMenuX, contextMenuY);
    hideContextMenu();
});

$("#" + dom_identifier.contextmenu_addCircle_trigger).on("click", function () {
    addCircle(contextMenuX, contextMenuY);
    hideContextMenu();
});

$("#" + dom_identifier.contextmenu_addComposedShape_trigger).on("click", function () {
    addComposedShape(contextMenuX, contextMenuY);
    hideContextMenu();
});

$("#" + dom_identifier.contextmenu_close_trigger).on("click", function () {
   hideContextMenu();
});

diagramCanvas.on("addRectangle", function () {
    addRectangle(contextMenuX, contextMenuY);
});

// serialization
$("#" + dom_identifier.serializeConsoleButton).on("click", () => {
    console.log(graph.toJSON());
});

$("#" + dom_identifier.serializeButton).on("click", () => {
    showInModal(JSON.stringify(graph.toJSON()));
});

function showInModal(modalSerializationContent) {
    $("#" + dom_identifier.modalSerializationContent).html(modalSerializationContent);
    $("#" + dom_identifier.modalIdentifier).modal();
}


// deserialization
$("#" + dom_identifier.deserializeButton).on("click", () => parseInputAndDisplayGraph(
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


