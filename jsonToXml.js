const createXmlFromJson = (function () {

    /**
     * Entry point for converting JSON to XML
     * @param {object} json
     * @param {string} tagName
     */
    function createXML(json, tagName = 'root') {
        if (Array.isArray(json)) {
            return createXmlForArray(json, tagName);
        }
        else if (Object(json) !== json) {
            let node = document.createElement(tagName);
            node.appendChild(document.createTextNode(json));
            return node;
        }
        return createXmlForObject(json);
    }

    /**
     * Generate XML for an JSON object
     * @param {object} json
     * @param {string} tagName
     */
    function createXmlForObject(json, tagName = 'root') {
        let root = document.createElement(tagName);

        if (typeof json !== 'object') {
            root.appendChild(document.createTextNode(json));
            return root;
        }
        let keys = Object.keys(json);
        keys.map(key => checkTypeAndGetXML(json, key))
            .forEach(ele => root.appendChild(ele));

        return root;
    }
    /**
     * 
     * @param {Object} obj
     * @param {string} key
     */
    function checkTypeAndGetXML(obj, key) {
        if (Array.isArray(obj[key])) {
            return createXmlForArray(obj[key], key);
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            return createXmlForObject(obj[key], key);
        }
        return createXMLForPrimitive(obj, key);

    }

    /**
     * Generate XML for an array
     * @param {Object} array
     * @param {string} key
     */
    function createXmlForArray(array, key) {
        let arrayRootNode = document.createElement(key);
        array.map(item => createXmlForObject(item, 'element'))
            .forEach(xml => arrayRootNode.appendChild(xml));
        return arrayRootNode;
    }
    /**
     * Generate XML Node for primitive data types
     * @param {any} obj
     * @param {any} key
     */
    function createXMLForPrimitive(obj, key) {
        let eleData = document.createTextNode(typeof obj !== 'string' ? obj[key] : obj);
        let ele = document.createElement(key);
        ele.appendChild(eleData);
        return ele;
    }
    return createXML;
})();