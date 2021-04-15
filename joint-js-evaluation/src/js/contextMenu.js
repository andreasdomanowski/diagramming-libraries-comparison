import {graph, paper} from "./graph";
import * as $ from "jquery";
import * as dom_identifier from "./const/dom-identifier";
import * as addElements from "./addElements";

// saves context menu position for avoiding busy waiting with callbacks on context menu click
let contextMenuX = 0;
let contextMenuY = 0;

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
    [dom_identifier.contextmenu_addRect_trigger, addElements.addRectangle],
    [dom_identifier.contextmenu_addCircle_trigger, addElements.addCircle],
    [dom_identifier.contextmenu_addComposedShape_trigger, addElements.addComposedShape],
    [dom_identifier.contextmenu_close_trigger, undefined]
]);

contextMenuClickMapping.forEach(
    (value, key) => {
        $("#" + key).click(function () {
            if (value !== undefined) {
                value.apply(null, [contextMenuX, contextMenuY, graph]);
            }
            hideContextMenu();
        });

        hideContextMenu();
    }
)