import {TreeTable, TreeTableNode} from "./tree";

type TreeNode = {
    Children: TreeTableNode[],
    Value?: string
};

type TreePathItem = {
    node: TreeNode,
    index: number
}

type TreePath = Array<TreePathItem>


function getRow (node: TreeNode, index: number): TreeTableNode[] {
    if (index === 0) {
        return node.Children
    }
    index--;
    return node.Children.map(c => getRow(c, index)).flat(1)
}

function getColumn (root: TreeNode, index: number): TreePath {
    let counter = 0;
    let column: TreePath = [];

    function iterateNodes (node: TreeNode, path: TreePath = []): void {
        if (column.length) {
            return;
        } else if (node.Children.length) {
            node.Children.forEach((c, index) => iterateNodes(c, [...path, { node, index }]))
        } else if (node.Value) {
            counter ++;
            if (counter === index) column = path;
        } else {
            console.warn('Empty tree given');
        }
    }

    iterateNodes(root);
    return column;
}

export function addColumnAfter (tree: TreeTable, after: number) {
    const path = getColumn(tree, after);
    if (!path.length) {
        alert(`Cannot insert after column ${after}`);
        return;
    }
    let insertTo: TreePathItem | null = null;
    let newColumn = createNode();
    for (let i = path.length - 1; i > 0; i--) {
        if (
            path[i].node.Children.length === 1 ||
            path[i].index === path[i].node.Children.length - 1
        ) {
            newColumn = { ...createNode(), Children: [newColumn] }
        } else {
            insertTo = path[i];
            break;
        }
    }
    insertTo = insertTo || path[0];
    insertTo.node.Children.splice(insertTo.index + 1, 0, newColumn);
}

export function addRowAfter (tree: TreeTable, after: number) {
    const prevRow = getRow(tree, after - 1);
    prevRow.forEach(parent => {
        parent.Children = parent.Children.map(child => ({
            ...createNode(),
            Children: [child]
        }))
    })
}

function createNode (): TreeTableNode {
    return {
        VerticalSpan: 1,
        Value: 'NEW',
        Color: 'lime',
        Children: []
    };
}
