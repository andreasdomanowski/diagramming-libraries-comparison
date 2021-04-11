import * as joint from 'jointjs'
import * as $ from 'jquery';
import * as customShapes from './js/customShape'
import './css/joint-evaluation.css'

// necessary for deserialization issues
window.joint = joint

let graph = new joint.dia.Graph;
let paper = new joint.dia.Paper({
    el: document.getElementById('diagramCanvas'),
    model: graph,
    width: 800,
    height: 600,
    gridSize: 1,
    restrictTranslate: true
});

let rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
rect.resize(100, 40);
rect.attr({
    body: {
        fill: 'blue'
    },
    label: {
        text: 'Hello',
        fill: 'white'
    }
});
rect.addTo(graph);

let rect2 = rect.clone();
rect2.translate(300, 0);
rect2.attr('label/text', 'World!');
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
    /**
     * @param evt               event emitted by jQuery
     * @param evt.originalEvent originalEvent
     */
    function (evt, x, y) {
        // show context menu at right position
        showContextMenu();
        document.getElementById("rmenu").style.top = y + 'px';
        document.getElementById("rmenu").style.left = x + 'px';

        contextMenuX = x;
        contextMenuY = y;
    });

function hideContextMenu() {
    $("#rmenu").removeClass("show").addClass("hide");
}

function showContextMenu() {
    $("#rmenu").removeClass("hide").addClass("show");
}

$("#contextmenu-addRect-trigger").on("click", function (event, x, y) {
    addRectangle(contextMenuX, contextMenuY);
    hideContextMenu();
});

$("#contextmenu-addCircle-trigger").on("click", function (event, x, y) {
    addCircle(contextMenuX, contextMenuY);
    hideContextMenu();
});


$("#contextmenu-addComposedShape-trigger").on("click", function (event, x, y) {
    addComposedShape(contextMenuY, contextMenuY);
    hideContextMenu();
});

$("#contextmenu-close-trigger").on("click", function (event, x, y) {
    $("#rmenu").removeClass("show").addClass("hide");
});

$("#diagramCanvas").on("addRectangle", function (event, x, y) {
    addRectangle(contextMenuX, contextMenuY);
});

function serializeGraph() {
    console.log(graph.toJSON());
    return graph.toJSON();
}

function deserializeAndDisplayGraph(input) {
    paper.options.model.set(input)
}

function parseInputAndDisplayGraph(inputString){
    deserializeAndDisplayGraph(JSON.parse(inputString));
}

$("#serializeButton").on("click", e => serializeGraph());

$("#deserializeButton").on("click", e => parseInputAndDisplayGraph(
    $("#deserializeTextbox").val()
));
