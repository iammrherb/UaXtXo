// DOM manipulation utilities
const DOM = {
    getElement(selector) {
        return document.querySelector(selector);
    },
    
    getAllElements(selector) {
        return document.querySelectorAll(selector);
    },
    
    addClass(element, className) {
        element.classList.add(className);
    },
    
    removeClass(element, className) {
        element.classList.remove(className);
    },
    
    toggleClass(element, className) {
        element.classList.toggle(className);
    },
    
    hasClass(element, className) {
        return element.classList.contains(className);
    },
    
    setContent(element, content) {
        if (typeof element === 'string') {
            element = this.getElement(element);
        }
        if (element) {
            element.innerHTML = content;
        }
    },
    
    setValue(element, value) {
        if (typeof element === 'string') {
            element = this.getElement(element);
        }
        if (element) {
            element.value = value;
        }
    },
    
    getValue(element) {
        if (typeof element === 'string') {
            element = this.getElement(element);
        }
        return element ? element.value : null;
    }
};

window.DOM = DOM;
