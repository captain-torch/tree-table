import { TreeTable, TreeTableNode } from './tree';

function calcSpan (children: TreeTableNode[]): number {
    return children.reduce(
        (overall: number, value: TreeTableNode) => {
            return overall + (value.Children.length ? calcSpan(value.Children) : 1)
        },
        0
    );
}

const createCellElement = ({ Children, Color, Value, VerticalSpan }: TreeTableNode) => {
    const cell = document.createElement('td');
    cell.colSpan = calcSpan(Children);
    cell.rowSpan = VerticalSpan;
    cell.innerText = Value;
    cell.setAttribute('style', `background-color: ${Color}`);

    return cell;
}

export const renderTreeTable = (containerId: string, treeTable: TreeTable) => {
    const tableContainer = document.querySelector(`#${containerId}`) as HTMLDivElement;

    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }

    if (treeTable.Children.length === 0) return;

    const table = document.createElement('table');
    const tableRows: HTMLTableRowElement[] = [];

    const renderNode = (node: TreeTableNode, level: number) => {
        if (!tableRows[level]) tableRows[level] = document.createElement('tr');
        tableRows[level].appendChild(createCellElement(node));

        node.Children.forEach(childNode => renderNode(childNode, level + node.VerticalSpan))
    };

    treeTable.Children.forEach(node => renderNode(node, 0));

    tableRows.forEach(tableRow => table.appendChild(tableRow));
    table.setAttribute('style', `height: ${tableRows.length * 100}px`);
    tableContainer.appendChild(table);

    console.log('TreeTable has been updated!');
    console.dir(treeTable);
};
