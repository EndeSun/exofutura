/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// canvasMindMap.ts
var canvasMindMap_exports = {};
__export(canvasMindMap_exports, {
  default: () => CanvasMindMap
});
module.exports = __toCommonJS(canvasMindMap_exports);
var import_obsidian2 = require("obsidian");

// node_modules/monkey-around/mjs/index.js
function around(obj, factories) {
  const removers = Object.keys(factories).map((key) => around1(obj, key, factories[key]));
  return removers.length === 1 ? removers[0] : function() {
    removers.forEach((r) => r());
  };
}
function around1(obj, method, createWrapper) {
  const original = obj[method], hadOwn = obj.hasOwnProperty(method);
  let current = createWrapper(original);
  if (original)
    Object.setPrototypeOf(current, original);
  Object.setPrototypeOf(wrapper, current);
  obj[method] = wrapper;
  return remove;
  function wrapper(...args) {
    if (current === original && obj[method] === wrapper)
      remove();
    return current.apply(this, args);
  }
  function remove() {
    if (obj[method] === wrapper) {
      if (hadOwn)
        obj[method] = original;
      else
        delete obj[method];
    }
    if (current === original)
      return;
    current = original;
    Object.setPrototypeOf(wrapper, original || Function);
  }
}

// utils.ts
var import_obsidian = require("obsidian");
var random = (e) => {
  let t = [];
  for (let n = 0; n < e; n++) {
    t.push((16 * Math.random() | 0).toString(16));
  }
  return t.join("");
};
var createChildFileNode = (canvas, parentNode, file, path, y) => {
  let tempChildNode;
  if (!(0, import_obsidian.requireApiVersion)("1.1.10")) {
    tempChildNode = canvas.createFileNode(file, path, {
      x: parentNode.x + parentNode.width + 200,
      y,
      height: parentNode.height * 0.6,
      width: parentNode.width
    }, true);
  } else {
    tempChildNode = canvas.createFileNode({
      file,
      subpath: path,
      pos: {
        x: parentNode.x + parentNode.width + 200,
        y,
        width: parentNode.width,
        height: parentNode.height * 0.6
      },
      size: {
        x: parentNode.x + parentNode.width + 200,
        y,
        width: parentNode.width,
        height: parentNode.height * 0.6
      },
      save: true,
      focus: false
    });
  }
  canvas.deselectAll();
  canvas.addNode(tempChildNode);
  addEdge(canvas, random(16), {
    fromOrTo: "from",
    side: "right",
    node: parentNode
  }, {
    fromOrTo: "to",
    side: "left",
    node: tempChildNode
  });
  canvas.requestSave();
  return tempChildNode;
};
var addEdge = (canvas, edgeID, fromEdge, toEdge) => {
  if (!canvas)
    return;
  const data = canvas.getData();
  if (!data)
    return;
  canvas.importData({
    "edges": [
      ...data.edges,
      { "id": edgeID, "fromNode": fromEdge.node.id, "fromSide": fromEdge.side, "toNode": toEdge.node.id, "toSide": toEdge.side }
    ],
    "nodes": data.nodes
  });
  canvas.requestFrame();
};

// canvasMindMap.ts
var CanvasMindMap = class extends import_obsidian2.Plugin {
  async onload() {
    this.registerCommands();
    this.patchCanvas();
    this.patchMarkdownFileInfo();
    this.patchCanvasNode();
  }
  onunload() {
  }
  registerCommands() {
    this.addCommand({
      id: "split-heading-into-mindmap",
      name: "Split Heading into mindmap based on H1",
      checkCallback: (checking) => {
        var _a;
        const canvasView = app.workspace.getActiveViewOfType(import_obsidian2.ItemView);
        if ((canvasView == null ? void 0 : canvasView.getViewType()) === "canvas") {
          if (!checking) {
            const canvas = canvasView == null ? void 0 : canvasView.canvas;
            const currentSelection = canvas == null ? void 0 : canvas.selection;
            if (currentSelection.size > 1) {
              return;
            }
            const currentSelectionItem = currentSelection.values().next().value;
            if (!currentSelectionItem.filePath)
              return;
            const currentSelectionItemFile = currentSelectionItem.file;
            if (!(currentSelectionItemFile.extension === "md"))
              return;
            const currentFileHeadings = (_a = app.metadataCache.getFileCache(currentSelectionItemFile)) == null ? void 0 : _a.headings;
            if (!currentFileHeadings)
              return;
            const currentFileHeadingH1 = currentFileHeadings.filter((heading) => heading.level === 1);
            if (currentFileHeadingH1.length === 0)
              return;
            const nodeGroupHeight = (currentSelectionItem.height * 0.6 + 20) * currentFileHeadingH1.length;
            let direction = -1;
            const nodeGroupY = currentSelectionItem.y + currentSelectionItem.height / 2 + nodeGroupHeight / 2 * direction;
            currentFileHeadingH1.forEach((item, index) => {
              createChildFileNode(canvas, currentSelectionItem, currentSelectionItemFile, "#" + item.heading, nodeGroupY - direction * (currentSelectionItem.height * 0.6 + 20) * index);
            });
          }
          return true;
        }
      }
    });
  }
  patchCanvas() {
    const createEdge = async (node1, node2, canvas) => {
      var _a;
      if ((0, import_obsidian2.requireApiVersion)("1.1.9")) {
        addEdge(canvas, random(16), {
          fromOrTo: "from",
          side: "right",
          node: node1
        }, {
          fromOrTo: "to",
          side: "left",
          node: node2
        });
      } else {
        const edge = canvas.edges.get((_a = canvas.getData().edges.first()) == null ? void 0 : _a.id);
        if (edge) {
          const tempEdge = new edge.constructor(canvas, random(16), {
            side: "right",
            node: node1
          }, { side: "left", node: node2 });
          canvas.addEdge(tempEdge);
          tempEdge.render();
        } else {
          setTimeout(async () => {
            const canvasFile = await this.app.vault.cachedRead(canvas.view.file);
            const canvasFileData = JSON.parse(canvasFile);
            canvasFileData.edges.push({
              id: random(16),
              fromNode: node1.id,
              fromSide: "right",
              toNode: node2.id,
              toSide: "left"
            });
            canvasFileData.nodes.push({
              id: node2.id,
              x: node2.x,
              y: node2.y,
              width: node2.width,
              height: node2.height,
              type: "text",
              text: node2.text
            });
            canvas.setData(canvasFileData);
            canvas.requestSave();
          }, 500);
        }
      }
    };
    const navigate = (canvas, direction) => {
      const currentSelection = canvas.selection;
      if (currentSelection.size !== 1)
        return;
      const currentSelectionItem = currentSelection.values().next().value;
      const currentViewPortNodes = canvas.getViewportNodes();
      const x = currentSelectionItem.x;
      const y = currentSelectionItem.y;
      canvas.deselectAll();
      let nextNode = null;
      if (direction === "top") {
        let nodeArray = currentViewPortNodes.filter((item) => item.y < y).filter((item) => item.x < x + currentSelectionItem.width / 2 && item.x + item.width > x + currentSelectionItem.width / 2);
        if (nodeArray.length === 0) {
          nextNode = currentViewPortNodes.filter((node) => node.y < y).sort((a, b) => b.y - a.y).sort((a, b) => a.x - b.x)[0];
        } else {
          nextNode = nodeArray == null ? void 0 : nodeArray.sort((a, b) => b.y - a.y)[0];
        }
      } else if (direction === "bottom") {
        let nodeArray = currentViewPortNodes.filter((item) => item.y > y).filter((item) => item.x < x + currentSelectionItem.width / 2 && item.x + item.width > x + currentSelectionItem.width / 2);
        if (nodeArray.length === 0) {
          nextNode = currentViewPortNodes.filter((node) => node.y > y).sort((a, b) => a.y - b.y).sort((a, b) => a.x - b.x)[0];
        } else {
          nextNode = nodeArray == null ? void 0 : nodeArray.sort((a, b) => a.y - b.y)[0];
        }
      } else if (direction === "left") {
        let nodeArray = currentViewPortNodes.filter((item) => item.x < x).filter((item) => item.y < y + currentSelectionItem.height / 2 && item.y + item.height > y + currentSelectionItem.height / 2);
        if (nodeArray.length === 0) {
          nextNode = currentViewPortNodes.filter((node) => node.x < x).sort((a, b) => b.x - a.x).sort((a, b) => a.y - b.y)[0];
        } else {
          nextNode = nodeArray == null ? void 0 : nodeArray.sort((a, b) => b.x - a.x)[0];
        }
      } else if (direction === "right") {
        let nodeArray = currentViewPortNodes.filter((item) => item.x > x).filter((item) => item.y < y + currentSelectionItem.height / 2 && item.y + item.height > y + currentSelectionItem.height / 2);
        if (nodeArray.length === 0) {
          nextNode = currentViewPortNodes.filter((node) => node.x > x).sort((a, b) => a.x - b.x).sort((a, b) => a.y - b.y)[0];
        } else {
          nextNode = nodeArray == null ? void 0 : nodeArray.sort((a, b) => a.x - b.x)[0];
        }
      }
      if (nextNode) {
        canvas.selectOnly(nextNode);
        canvas.zoomToSelection();
      }
      return nextNode;
    };
    const createSperateNode = (canvas, direction) => {
      let selection = canvas.selection;
      if (selection.size !== 1)
        return;
      let node = selection.values().next().value;
      let x = direction === "left" ? node.x - node.width - 50 : direction === "right" ? node.x + node.width + 50 : node.x;
      let y = direction === "top" ? node.y - node.height - 100 : direction === "bottom" ? node.y + node.height + 100 : node.y;
      if ((0, import_obsidian2.requireApiVersion)("1.1.10")) {
        const tempChildNode = canvas.createTextNode({
          pos: {
            x,
            y,
            height: node.height,
            width: node.width
          },
          size: {
            x,
            y,
            height: node.height,
            width: node.width
          },
          text: "",
          focus: true,
          save: true
        });
        canvas.zoomToSelection();
        return tempChildNode;
      } else {
        const tempChildNode = canvas.createTextNode({
          x,
          y
        }, { height: node.height, width: node.width }, true);
        canvas.zoomToSelection();
        return tempChildNode;
      }
    };
    const createNode = async (canvas, parentNode, y) => {
      let tempChildNode;
      if (!(0, import_obsidian2.requireApiVersion)("1.1.10")) {
        tempChildNode = canvas.createTextNode({
          x: parentNode.x + parentNode.width + 200,
          y
        }, { height: parentNode.height, width: parentNode.width }, true);
      } else {
        tempChildNode = canvas.createTextNode({
          pos: {
            x: parentNode.x + parentNode.width + 200,
            y,
            height: parentNode.height,
            width: parentNode.width
          },
          size: {
            x: parentNode.x + parentNode.width + 200,
            y,
            height: parentNode.height,
            width: parentNode.width
          },
          text: "",
          focus: false,
          save: true
        });
      }
      canvas.deselectAll();
      canvas.addNode(tempChildNode);
      await createEdge(parentNode, tempChildNode, canvas);
      canvas.requestSave();
      return tempChildNode;
    };
    const startEditing = (canvas) => {
      if (!canvas)
        return;
      const selection = canvas.selection;
      if (selection.size !== 1)
        return;
      const node = selection.entries().next().value[1];
      if (node.isEditing)
        return;
      node.startEditing();
    };
    const createChildNode = async (canvas) => {
      var _a, _b, _c;
      if (canvas.selection.size !== 1)
        return;
      const parentNode = canvas.selection.entries().next().value[1];
      let wholeHeight = 0;
      let prevParentEdges = canvas.getEdgesForNode(parentNode).filter((item) => {
        return item.from.node.id === parentNode.id && item.to.side === "left";
      });
      let tempChildNode;
      if (prevParentEdges.length === 0) {
        tempChildNode = await createNode(canvas, parentNode, parentNode.y);
      } else {
        let prevAllNodes = [];
        for (let i = 0; i < (prevParentEdges == null ? void 0 : prevParentEdges.length); i++) {
          let node = prevParentEdges[i].to.node;
          prevAllNodes.push(node);
        }
        if (prevAllNodes.length > 1) {
          prevAllNodes.sort((a, b) => {
            return a.y - b.y;
          });
        }
        const distanceY = ((_a = prevAllNodes[prevAllNodes.length - 1]) == null ? void 0 : _a.y) + ((_b = prevAllNodes[prevAllNodes.length - 1]) == null ? void 0 : _b.height) + 20;
        tempChildNode = await createNode(canvas, parentNode, distanceY);
        prevAllNodes.push(tempChildNode);
        prevAllNodes.sort((a, b) => {
          return a.y - b.y;
        });
        if (prevAllNodes.length === 1)
          return;
        if (prevAllNodes.length > 1 && prevAllNodes[0].x === ((_c = prevAllNodes[1]) == null ? void 0 : _c.x)) {
          let preNode;
          wholeHeight = prevAllNodes.length * (parentNode.height + 20);
          for (let i = 0; i < prevAllNodes.length; i++) {
            let tempNode;
            if (i === 0) {
              (tempNode = prevAllNodes[i]).moveTo({
                x: tempChildNode.x,
                y: parentNode.y + parentNode.height / 2 - wholeHeight / 2
              });
            } else {
              (tempNode = prevAllNodes[i]).moveTo({
                x: tempChildNode.x,
                y: preNode.y + preNode.height + 20
              });
            }
            canvas.requestSave();
            preNode = tempNode;
          }
        }
      }
      return tempChildNode;
    };
    const createSiblingNode = async (canvas) => {
      var _a;
      if (canvas.selection.size !== 1)
        return;
      const childNode = canvas.selection.entries().next().value[1];
      if (childNode.isEditing)
        return;
      const edges = canvas.getEdgesForNode(childNode).filter((item) => {
        return item.to.node.id === childNode.id;
      });
      if (edges.length === 0)
        return;
      const parentNode = edges[0].from.node;
      const distanceY = childNode.y + childNode.height / 2 + 110;
      const tempChildNode = await createNode(canvas, parentNode, distanceY);
      let wholeHeight = 0;
      let parentEdges = canvas.getEdgesForNode(parentNode).filter((item) => {
        return item.from.node.id === parentNode.id && item.to.side === "left";
      });
      let allnodes = [];
      for (let i = 0; i < parentEdges.length; i++) {
        let node = parentEdges[i].to.node;
        allnodes.push(node);
        wholeHeight += node.height + 20;
      }
      allnodes.sort((a, b) => {
        return a.y - b.y;
      });
      if (allnodes.length === 1)
        return;
      if (allnodes.length > 1 && allnodes[0].x === ((_a = allnodes[1]) == null ? void 0 : _a.x)) {
        let preNode;
        for (let i = 0; i < allnodes.length; i++) {
          let tempNode;
          if (i === 0) {
            (tempNode = allnodes[i]).moveTo({
              x: childNode.x,
              y: parentNode.y + parentNode.height / 2 - wholeHeight / 2
            });
          } else {
            (tempNode = allnodes[i]).moveTo({
              x: childNode.x,
              y: preNode.y + preNode.height + 20
            });
          }
          preNode = tempNode;
        }
      }
      canvas.requestSave();
      return tempChildNode;
    };
    const patchCanvas = () => {
      var _a;
      const canvasView = (_a = app.workspace.getLeavesOfType("canvas").first()) == null ? void 0 : _a.view;
      const canvas = canvasView == null ? void 0 : canvasView.canvas;
      if (!canvasView)
        return false;
      const patchCanvasView = canvas.constructor;
      const canvasViewunistaller = around(canvasView.constructor.prototype, {
        onOpen: (next) => async function() {
          this.scope.register(["Mod"], "ArrowUp", () => {
            createSperateNode(this.canvas, "top");
          });
          this.scope.register(["Mod"], "ArrowDown", () => {
            createSperateNode(this.canvas, "bottom");
          });
          this.scope.register(["Mod"], "ArrowLeft", () => {
            createSperateNode(this.canvas, "left");
          });
          this.scope.register(["Mod"], "ArrowRight", () => {
            createSperateNode(this.canvas, "right");
          });
          this.scope.register(["Alt"], "ArrowUp", () => {
            navigate(this.canvas, "top");
          });
          this.scope.register(["Alt"], "ArrowDown", () => {
            navigate(this.canvas, "bottom");
          });
          this.scope.register(["Alt"], "ArrowLeft", () => {
            navigate(this.canvas, "left");
          });
          this.scope.register(["Alt"], "ArrowRight", () => {
            navigate(this.canvas, "right");
          });
          this.scope.register([], "Enter", async () => {
            const node = await createSiblingNode(this.canvas);
            console.log(node);
            if (!node)
              return;
            setTimeout(() => {
              node.startEditing();
              this.canvas.zoomToSelection();
            }, 0);
          });
          this.scope.register([], "Tab", async () => {
            const node = await createChildNode(this.canvas);
            if (!node)
              return;
            setTimeout(() => {
              node.startEditing();
              this.canvas.zoomToSelection();
            }, 0);
          });
          return next.call(this);
        }
      });
      const uninstaller = around(patchCanvasView.prototype, {
        onKeydown: (next) => async function(e) {
          if (e.key === "Backspace" || e.key === "Delete") {
            if (this.selection.size !== 1) {
              return next.call(this, e);
            }
            const childNode = this.selection.entries().next().value[1];
            if (childNode.isEditing)
              return;
            const edges = this.getEdgesForNode(childNode).filter((item) => {
              return item.to.node.id === childNode.id;
            });
            if (edges.length === 0)
              return;
            const parentNode = edges[0].from.node;
            next.call(this, e);
            let wholeHeight = 0;
            let parentEdges = this.getEdgesForNode(parentNode).filter((item) => {
              return item.from.node.id === parentNode.id && item.to.side === "left";
            });
            let allnodes = [];
            for (let i = 0; i < parentEdges.length; i++) {
              let node = parentEdges[i].to.node;
              allnodes.push(node);
              wholeHeight += node.height + 20;
            }
            allnodes.sort((a, b) => {
              return a.y - b.y;
            });
            if (allnodes.length === 1)
              return;
            if (allnodes.length > 1) {
              if (allnodes[0].x !== allnodes[0].x) {
                return;
              }
            }
            let preNode;
            for (let i = 0; i < allnodes.length; i++) {
              let tempNode;
              if (i === 0) {
                (tempNode = allnodes[i]).moveTo({
                  x: childNode.x,
                  y: parentNode.y + parentNode.height - wholeHeight / 2
                });
              } else {
                (tempNode = allnodes[i]).moveTo({
                  x: childNode.x,
                  y: preNode.y + preNode.height + 20
                });
              }
              this.requestSave();
              preNode = tempNode;
            }
            this.requestSave();
            this.selectOnly(parentNode);
            this.zoomToSelection();
            parentNode.startEditing();
            return;
          }
          if (e.key === " ") {
            const selection = this.selection;
            if (selection.size !== 1)
              return;
            const node = selection.entries().next().value[1];
            if ((node == null ? void 0 : node.label) || (node == null ? void 0 : node.url))
              return;
            if (node.isEditing)
              return;
            node.startEditing();
          }
          next.call(this, e);
        }
      });
      this.register(uninstaller);
      this.register(canvasViewunistaller);
      canvas == null ? void 0 : canvas.view.leaf.rebuildView();
      console.log("Obsidian-Canvas-MindMap: canvas view patched");
      return true;
    };
    this.app.workspace.onLayoutReady(() => {
      if (!patchCanvas()) {
        const evt = app.workspace.on("layout-change", () => {
          patchCanvas() && app.workspace.offref(evt);
        });
        this.registerEvent(evt);
      }
    });
  }
  patchCanvasNode() {
    const patchNode = () => {
      var _a;
      const canvasView = (_a = app.workspace.getLeavesOfType("canvas").first()) == null ? void 0 : _a.view;
      const canvas = canvasView == null ? void 0 : canvasView.canvas;
      if (!canvas)
        return false;
      const node = Array.from(canvas.nodes).first();
      if (!node)
        return false;
      const nodeInstance = node[1];
      const uninstaller = around(nodeInstance.constructor.prototype, {
        setColor: (next) => function(e, t) {
          next.call(this, e, t);
          this.canvas.getEdgesForNode(this).forEach((edge) => {
            if (edge.from.node === this) {
              edge.setColor(e, true);
              edge.render();
            }
          });
          canvas.requestSave();
        }
      });
      this.register(uninstaller);
      console.log("Obsidian-Canvas-MindMap: canvas node patched");
      return true;
    };
    this.app.workspace.onLayoutReady(() => {
      if (!patchNode()) {
        const evt = app.workspace.on("layout-change", () => {
          patchNode() && app.workspace.offref(evt);
        });
        this.registerEvent(evt);
      }
    });
  }
  patchMarkdownFileInfo() {
    const patchEditor = () => {
      const editorInfo = app.workspace.activeEditor;
      if (!editorInfo)
        return false;
      const patchEditorInfo = editorInfo.constructor;
      const uninstaller = around(patchEditorInfo.prototype, {
        showPreview: (next) => function(e) {
          var _a;
          next.call(this, e);
          if (e) {
            this.node.canvas.wrapperEl.focus();
            (_a = this.node) == null ? void 0 : _a.setIsEditing(false);
          }
        }
      });
      this.register(uninstaller);
      console.log("Obsidian-Canvas-MindMap: markdown file info patched");
      return true;
    };
    this.app.workspace.onLayoutReady(() => {
      if (!patchEditor()) {
        const evt = app.workspace.on("file-open", () => {
          setTimeout(() => {
            patchEditor() && app.workspace.offref(evt);
          }, 100);
        });
        this.registerEvent(evt);
      }
    });
  }
};
