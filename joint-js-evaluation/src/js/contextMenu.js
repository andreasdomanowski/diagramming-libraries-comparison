import {graph, paper} from "./graph";
import * as $ from "jquery";
import * as dom_identifier from "./const/dom-identifier";
import * as elementFactory from "./elementFactory";
import 'popper.js'

// saves context menu position for avoiding busy waiting with callbacks on context menu click
let contextMenuX = 0;
let contextMenuY = 0;

// context menu for new elements - right click on empty canvas position
paper.on('blank:contextmenu',
    function (evt, x, y) {
        let popupCoordinate = paper.localToPagePoint(x, y);

        $("#" + dom_identifier.contextMenu).css({
            top: popupCoordinate.y + "px",
            left: popupCoordinate.x + "px",
        });

        contextMenuX = x;
        contextMenuY = y;

        showNewElementContextMenu();
    });

function hideNewElementContextMenu() {
    $("#" + dom_identifier.contextMenu).removeClass("show").addClass("hide");
}

function showNewElementContextMenu() {
    $("#" + dom_identifier.contextMenu).removeClass("hide").addClass("show");
}

// context menu event handling
let contextMenuClickMapping = new Map([
    [dom_identifier.contextmenu_addRect_trigger, elementFactory.addRectangle],
    [dom_identifier.contextmenu_addCircle_trigger, elementFactory.addCircle],
    [dom_identifier.contextmenu_addComposedShape_trigger, elementFactory.addComposedShape],
    [dom_identifier.contextmenu_close_trigger, undefined]
]);

contextMenuClickMapping.forEach(
    (value, key) => {
        $("#" + key).click(function () {
            if (value !== undefined) {
                value.apply(null, [contextMenuX, contextMenuY, graph]);
            }
            hideNewElementContextMenu();
        });

        hideNewElementContextMenu();
    }
)

// mouseover on cells for link creation popup
// double click triggers link creation mode
// creation mode active, until either i) click on legal target or ii) context menu click anywhere
let linkCreationMode = false;
let currentLinkSourceCellView = undefined;

paper.on('element:pointerdblclick',
    function (cellView) {
        if (linkCreationMode === false) {
            linkCreationMode = true;
            currentLinkSourceCellView = cellView;
            $("#" + currentLinkSourceCellView.id).addClass("glow");
        }
    });

function stopLinkCreationMode() {
    linkCreationMode = false;
    $("#" + currentLinkSourceCellView.id).removeClass("glow");
}

paper.on('element:pointerclick', function (cellView) {
    if (linkCreationMode === true) {
        elementFactory.addLink(currentLinkSourceCellView.model, cellView.model, graph);
        stopLinkCreationMode();
    }
});

paper.on('element:mouseenter', function(elementView) {
    elementView.showTools();
});

paper.on('element:mouseleave', function(elementView) {
    elementView.hideTools();
});



