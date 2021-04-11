import * as joint from 'jointjs'
import * as $ from 'jquery';
import * as customShapes from './js/customShape'
import './css/joint-evaluation.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import * as dom_identifier from '../../common/js/const/dom-identifier'

// necessary for deserialization issues
window.joint = joint

let graph = new joint.dia.Graph;
let paper = new joint.dia.Paper({
    el: document.getElementById('diagramCanvas'),
    model: graph,
    width: $("#diagramCanvas").width,
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

// serialization
$("#" + dom_identifier.serializeConsoleButton).on("click", e => {
    console.log(graph.toJSON());
});

$("#" + dom_identifier.serializeButton).on("click", e => {
    showInModal(JSON.stringify(graph.toJSON()));
});

function showInModal(modalSerializationContent){
    $("#" + dom_identifier.modalSerializationContent).html(modalSerializationContent);
    $("#" + dom_identifier.modalIdentifier).modal();
}



// deserialization
function deserializeAndDisplayGraph(input) {
    paper.options.model.set(input)
}

function parseInputAndDisplayGraph(inputString){
    deserializeAndDisplayGraph(JSON.parse(inputString));
}
/*$("#deserializeButton").on("click", e => parseInputAndDisplayGraph(
    $("#deserializeTextbox").val()
));*/
$("#deserializeButton").on("click", e => {
    $('#deserializationModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
    }
);