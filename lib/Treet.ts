export class TreeRoot<T, C extends string> {
    value: T;
    children: Map<C, TreeNode<T, C>>;
    debugLabel = '';

    constructor(value: T) {
        this.value = value;
        this.children = new Map<C, TreeNode<T, C>>();
    }

    addChild(child: TreeNode<T, C>): TreeNode<T, C> {
        this.children.set(child.name, child);
        return child;
    }
}

export class TreeNode<T, C extends string> extends TreeRoot<T, C> {
    name: C;
    parent : TreeRoot<T, C> | null;

    constructor(parent: TreeRoot<T, C>, name: C, value: T) {
        super(value);
        this.name = name;
        this.parent = parent;
        this.debugLabel =  `${parent.debugLabel}${name}${value}`
    }

    addChild(child: TreeNode<T, C>): TreeNode<T, C> {
        this.children.set(child.name, child);
        return child;
    }
}

export class Tree<T, C extends string> {
    root: TreeRoot<T, C>;

    constructor(value: T) {
        this.root = new TreeRoot<T, C>(value);
    }

    depthFirstTraversal(callback: (node: TreeRoot<T, C>, depth: number) => void): void {
        const visit = (node: TreeRoot<T, C>, depth: number) => {
            callback(node, depth);
            node.children.forEach((child): void => {
                visit(child, depth + 1);
            });
        };

        if (this.root) {
            visit(this.root, 0);
        }
    }

    breadthFirstTraversal(callback: (node: TreeRoot<T, C>, depth: number) => void): void {
        if (!this.root) return;

        const queue: { node: TreeRoot<T, C>, depth: number }[] = [{ node: this.root, depth: 0 }];

        while (queue.length > 0) {
            const { node, depth } = queue.shift()!;
            callback(node, depth);
            node.children.forEach((child): void => {
                queue.push({ node: child, depth: depth + 1 });
            });
        }
    }
}

// Example usage:
// type ChildNames = "left" | "right";
// const tree = new Tree<number, ChildNames>(1);
// const child1 = new TreeNode<number, ChildNames>(2);
// const child2 = new TreeNode<number, ChildNames>(3);
// const grandchild1 = new TreeNode<number, ChildNames>(4);
// const grandchild2 = new TreeNode<number, ChildNames>(5);

// tree.root?.addChild("left", child1);
// tree.root?.addChild("right", child2);
// child1.addChild("left", grandchild1);
// child2.addChild("right", grandchild2);

// console.log("Depth-First Traversal:");
// tree.depthFirstTraversal((node, depth) => console.log(`Value: ${node.value}, Depth: ${depth}`));

// console.log("Breadth-First Traversal:");
// tree.breadthFirstTraversal((node, depth) => console.log(`Value: ${node.value}, Depth: ${depth}`));


  