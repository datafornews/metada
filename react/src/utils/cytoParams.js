import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import cxtmenu from 'cytoscape-cxtmenu';
import { colors, typography } from '../theme/metadaTheme';


cytoscape.use(cxtmenu);

cytoscape.use(dagre);

const breadthFirstLayout = {
    name: 'breadthfirst',
    fit: true, // whether to fit the viewport to the graph
    directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: '2px', // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    spacingFactor: 1, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    roots: undefined, // the roots of the trees
    maximalAdjustments: 10, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
    animate: false, // whether to transition the node positions
    animationDuration: 1000, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled,
    animateFilter: function (node, i) { return node.category === "m"; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
};

const dagreLayout = {
    name: 'dagre',
    // dagre algo options, uses default value on undefined
    nodeSep: undefined, // the separation between adjacent nodes in the same rank
    edgeSep: undefined, // the separation between adjacent edges in the same rank
    rankSep: undefined, // the separation between adjacent nodes in the same rank
    rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right,
    ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
    minLen: function (edge) { return 1; }, // number of ranks to keep between the source and target of the edge
    edgeWeight: function (edge) { return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

    // general layout options
    fit: true, // whether to fit to viewport
    padding: '10px', // fit padding
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node (default true)
    animate: false, // whether to transition the node positions
    animateFilter: function (node, i) { return true; }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    transform: function (node, pos) { return pos; }, // a function that applies a transform to the final node position
    ready: function () { }, // on layoutready
    stop: function () { } // on layoutstop
};

console.log('typography.fontFamily :', typography.fontFamily);


const nodeBaseStyle = {
    'background-opacity': 'data(backgroundOpacity)',
    'label': 'data(name)',
    'shape': 'roundrectangle',
    'font-weight': 'data(fontWeight)',
    'font-family': typography.fontFamily,
    'width': 'data(widthPx)',
    'text-valign': "center",
    'compound-sizing-wrt-labels': 'include',
    'source-text-margin-y': '30px',
    'target-text-margin-y': '30px',
    'height': 'data(height)',
    'text-wrap': 'wrap',
    'color': 'data(color)',
    'border-style': 'dashed',
    'border-opacity': 'data(borderOpacity)',
    'border-color': 'data(color)',
    'border-width': '0px',
    'background-color': 'data(backgroundColor)',
};

function addOneLineBreak(string) {
    const index = parseInt(string.length / 2, 10);
    let s1 = string.slice(0, index);
    let s2 = string.slice(index);
    let reverseS1 = s1.split("").reverse().join("");

    const space1 = reverseS1.indexOf(' ');
    const space2 = s2.indexOf(' ');

    if (space1 > -1 && space2 > -1) {
        if (space1 > space2) {
            s2 = s2.slice(0, space2) + '\n' + s2.slice(space2 + 1);
            return reverseS1.split("").reverse().join("") + s2
        } else {
            reverseS1 = reverseS1.slice(0, space1) + '\n' + reverseS1.slice(space1 + 1);
            return reverseS1.split("").reverse().join("") + s2
        }
    } else if (space2 > -1) {
        s2 = s2.slice(0, space2) + '\n' + s2.slice(space2 + 1);
        return reverseS1.split("").reverse().join("") + s2
    } else if (space1 > -1) {
        reverseS1 = reverseS1.slice(0, space1) + '\n' + reverseS1.slice(space1 + 1);
        return reverseS1.split("").reverse().join("") + s2
    } else {
        return string
    }
}

export function cytoParamsFromContainer(containerElement, cytoData, sourceId, clientType, activeId) {
    var layout;
    if (cytoData.edges.length < 10) {
        const spacing = 0.8 * Math.pow(cytoData.edges.length, 0.08);
        layout = dagreLayout;
        layout.spacingFactor = spacing;
    } else {
        const spacing = 0.55 * Math.pow(cytoData.edges.length, 0.08);
        layout = breadthFirstLayout;
        layout.spacingFactor = spacing;
    }

    const edgeLength = Math.exp(-cytoData.edges.length / 5)

    layout.padding = clientType === "mobile" ?
        0 : Math.floor(150 * edgeLength)

    const nodes = cytoData.nodes.map((v, k) => {
        return {
            data: {
                ...v.data,
                name: v.data.name.length > 15 ? addOneLineBreak(v.data.name) : v.data.name,

                height: v.data.name.length > 15 ? '40px' : '30px',
                widthPx: v.data.category === 's' ? '80px' : v.data.width + 100 + 'px',

                selectedColor: v.data.id === sourceId ? "white" : colors.accent,
                color: v.data.id === sourceId ? "white" : colors[v.data.category],
                backgroundColor: colors[v.data.category],
                backgroundOpacity: v.data.id === sourceId ? 1 : 0,

                fontWeight: v.data.id === sourceId ? 'bolder' : 'normal',
                fontSize: v.data.id === sourceId ? '3rem' : '2.5rem',

                borderOpacity: v.data.id === sourceId ? 1 : 0
            },
            grabbable: false,
            selected: v.data.id === activeId
        }
    });


    return {
        container: containerElement,
        elements: {
            nodes: nodes,
            edges: cytoData.edges
        },

        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    ...nodeBaseStyle
                },
            },
            {
                selector: 'edge',
                style: {
                    'width': 4,
                    'target-arrow-shape': 'triangle',
                    'line-color': 'rgb(205, 205, 205)',
                    'target-arrow-color': 'rgb(190, 190, 190)',
                    'curve-style': 'bezier', // haystack bezier segments unbundled-bezier
                    'label': 'data(label)',
                    'font-size': '10rem',
                    'color': 'rgb(80, 80, 80)',
                    'text-rotation': cytoData.edges.length > 10 ? 'autorotate' : 'none',
                    'arrow-scale': 0.9,
                }
            },
            {
                selector: 'node:selected',
                style: {
                    color: 'data(selectedColor)'
                }
            }
        ],

        layout: layout,
        minZoom: 0.4,
        maxZoom: 1.3,
        userPanningEnabled: false,
        boxSelectionEnabled: false
    }
};