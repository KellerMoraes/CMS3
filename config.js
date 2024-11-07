const properties = {
    name: import.meta.env.VITE_V_NAME || 'name',
    id: import.meta.env.VITE_V_ID || 'id',
    icon: import.meta.env.V_ICON || 'icon',
    attributes: import.meta.env.V_ATTRIBUTES || 'attributes',
    class: import.meta.env.V_CLASS || 'class',
    content: import.meta.env.V_CONTENT || 'content',
    children: import.meta.env.V_CHILDREN || 'children'
};

export default properties;