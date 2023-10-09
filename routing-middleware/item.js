const shoppingList = require("./fakeDb");

class ShoppingItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    shoppingList.push(this);
  }

  static findAll() {
    return shoppingList;
  }

  static update(name, newData) {
    let foundItem = ShoppingItem.findByName(name);
    if (foundItem === undefined) {
      throw { message: "Item not found", status: 404 };
    }
    foundItem.name = newData.name;
    foundItem.price = newData.price;

    return foundItem;
  }

  static findByName(name) {
    const foundItem = shoppingList.find(item => item.name === name);
    if (foundItem === undefined) {
      throw { message: "Item not found", status: 404 };
    }
    return foundItem;
  }

  static remove(name) {
    const foundIndex = shoppingList.findIndex(item => item.name === name);
    if (foundIndex === -1) {
      throw { message: "Item not found", status: 404 };
    }
    shoppingList.splice(foundIndex, 1);
  }
}

module.exports = ShoppingItem;
