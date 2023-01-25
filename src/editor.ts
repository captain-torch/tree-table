import {TreeTable, TreeTableNode} from "./tree";

type TreePath = Array<{
    node: TreeTableNode | TreeTable,
    index: number
}>

type TreePatch = Array<{
    path: Array<number>
    patch: (node: TreeTableNode) => void
}>

function getRowInsertPatch (root: TreeTable, rowIndex: number): TreePatch {
    const treePatch: TreePatch = []
    function iterateChildren (node: TreeTableNode, level: number, path: number[]) {
        level += node.VerticalSpan;
        if (level >= rowIndex) {
            let patch;
            if (level > rowIndex) {
                patch = (node) => node.VerticalSpan = node.VerticalSpan + 1;
            } else if (node.Children.length) {
                patch = (node) => node.Children = node.Children.map(child => createNode([child]))
            } else {
                patch = (node) => node.Children = [createNode()]
            }
            treePatch.push({path, patch})
            return;
        }
        node.Children.forEach((c, index) => iterateChildren(c, level, [...path, index]))
    }
    root.Children.forEach((c, index) => iterateChildren(c, 0, [index]));
    return treePatch;
}

function getColumnInsertPatch (root: TreeTable, colIndex: number): TreePatch {
    let treePatch: TreePatch = [];
    let insertionIndex;
    let newColumn;
    let parent;
    let parentPath;
    let columnsFound = 0;

    function createColumnPatch (path: TreePath): TreePatch {
        for (let i = path.length - 1; i >= 0; i--) {
            const {node, index} = path[i];
            if (node.Children.length === 1 || index === node.Children.length - 1) {
                for (let j = 0; j < (node as any).VerticalSpan || 0; j++) {
                    newColumn = createNode(newColumn ? [newColumn] : []);
                }
            } else {
                parent = node;
                parentPath = path.slice(0, i).map(i => i.index);
                insertionIndex = index + 1;
                break;
            }
        }
        if (!parent) {
            parentPath = [];
            insertionIndex = root.Children.length
        }
        return [{
            path: parentPath,
            patch: node => node.Children.splice(insertionIndex, 0, newColumn)
        }];
    }

    function iterateChildren (node: TreeTableNode, path: TreePath) {
        if (columnsFound >= colIndex) {
            return;
        } else if (node.Children.length === 0) {
            columnsFound ++;
            if (columnsFound === colIndex) {
                path = [...path, { node, index: -1 }]
                treePatch = createColumnPatch(path)
            }
        } else {
            node.Children.forEach((c, index) => iterateChildren(c, [...path, { node, index }]))
        }
    }

    root.Children.forEach((c, index) => iterateChildren(c, [{node: root, index}]))
    return treePatch;
}

function applyPatch (tree: TreeTable, treePatch: TreePatch): TreeTable {
    if (!Array.isArray(treePatch) || !treePatch.length) {
        throw new Error('Empty patch given');
    }
    return window.immer.produce(tree, draft => {
        treePatch.forEach(({path, patch}) => {
            let targetNode: any = draft;
            for (let i = 0; i < path.length; i ++) {
                targetNode = targetNode.Children[path[i]];
            }
            patch(targetNode)
        })
    })
}

export function addRowAfter (tree: TreeTable, rowIndex: number): TreeTable {
    if (rowIndex === 0) {
        alert('First row has index 1');
        return tree;
    }
    try {
        return applyPatch(tree, getRowInsertPatch(tree, rowIndex));
    } catch (e) {
        alert('Unable to insert row');
        return tree;
    }
}

export function addColumnAfter (tree: TreeTable, colIndex: number) {
    if (colIndex === 0) {
        alert('First column has index 1');
        return tree;
    }
    try {
        return applyPatch(tree, getColumnInsertPatch(tree, colIndex));
    } catch (e) {
        alert('Unable to insert column');
        return tree;
    }
}

function createNode (Children: TreeTableNode[] = []): TreeTableNode {
    return {
        VerticalSpan: 1,
        Value: 'new',
        Color: 'yellow',
        Children
    };
}
