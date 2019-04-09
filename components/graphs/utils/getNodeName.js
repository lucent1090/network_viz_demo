export default function getNodeName(node) {
  return node.data.key || node.data.name;
}