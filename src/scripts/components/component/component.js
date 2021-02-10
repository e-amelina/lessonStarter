export class Component {
    constructor(parentSelector, tagName = 'div') {
      if (typeof parentSelector === "string") {
        this.parent = document.querySelector(parentSelector);
      } else {
        this.parent = parentSelector;
      }
      this.component = document.createElement(tagName);
    }
  
    render() {
      this.parent.append(this.component);
      return this.component;
    }

    addContent(content) {
        this.component.innerHTML = content;
      }
  }
  