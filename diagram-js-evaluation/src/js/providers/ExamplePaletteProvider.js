import * as shapeIdentifiers from '../shapes/EvaluationShapes'


export default function ExamplePaletteProvider(create, elementFactory, lassoTool, palette) {
    this._create = create;
    this._elementFactory = elementFactory;
    this._lassoTool = lassoTool;
    this._palette = palette;

    palette.registerProvider(this);
}

ExamplePaletteProvider.$inject = [
    'create',
    'elementFactory',
    'lassoTool',
    'palette'
];


ExamplePaletteProvider.prototype.getPaletteEntries = function () {
    const create = this._create;
    const elementFactory = this._elementFactory
    return {
        'create-rect': {
            group: 'create',
            className: 'palette-icon-create-rectangle',
            title: 'Create Rectangle',
            action: {
                click: function () {
                    const shape = elementFactory.createShape({
                        width: 100,
                        height: 80,
                        isFrame: true
                    });
                    shape.customLabel = 'Label';
                    shape.customShapeIdentifier = shapeIdentifiers.shapeRectangleIdentifier;
                    create.start(event, shape);
                }
            }
        },
        'create-circle': {
            group: 'create',
            className: 'palette-icon-create-circle',
            title: 'Create Circle',
            action: {
                click: function () {
                    const shape = elementFactory.createShape({
                        width: 100,
                        height: 80,
                        isFrame: true
                    });
                    shape.customLabel = 'Label';
                    shape.customShapeIdentifier = shapeIdentifiers.shapeCircleIdentifier;
                    create.start(event, shape);
                }
            }
        },
        'create-custom-shape': {
            group: 'create',
            className: 'palette-icon-create-custom-shape',
            title: 'Create Custom Shape',
            action: {
                click: function () {
                    const shape = elementFactory.createShape({
                        width: 100,
                        height: 80,
                        isFrame: true
                    });
                    shape.customLabel = 'Label';
                    shape.customShapeIdentifier = shapeIdentifiers.shapeComposedShapeIdentifier;
                    create.start(event, shape);
                }
            }
        }
    };
};