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


ExamplePaletteProvider.prototype.getPaletteEntries = function() {
  var create = this._create,
      elementFactory = this._elementFactory,
      lassoTool = this._lassoTool;

  return {
    'create-rect': {
      group: 'create',
      className: 'palette-icon-create-rectangle',
      title: 'Create Rectangle',
      action: {
        click: function() {
          var shape = elementFactory.createShape({
            width: 100,
            height: 80
          });

          create.start(event, shape);
        }
      }
    },
    'create-circle': {
      group: 'create',
      className: 'palette-icon-create-circle',
      title: 'Create Circle',
      action: {
        click: function() {
          var shape = elementFactory.createShape({
            width: 300,
            height: 200,
            isFrame: true
          });

          create.start(event, shape);
        }
      }
    },
    'create-custom-shape':  {
      group: 'create',
      className: 'palette-icon-create-custom-shape',
      title: 'Create Custom Shape',
      action: {
        click: function() {
          var shape = elementFactory.createShape({
            width: 300,
            height: 200,
            isFrame: true
          });

          create.start(event, shape);
        }
      }
    }
  };
};