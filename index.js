class Good {

    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.setAvailable(available);
    }

    setAvailable (available) {
        if (available == true) {
            this._available = 'В наличии';
        } else  if (available == false) {
            this._available = 'Нет в наличии';
        }
    }
}


class GoodsList {

    #goods = []

    constructor (filter, sortPrice, sortDir) {
        this.filter = filter;
        if (sortPrice !== false && sortPrice !== true) {
            throw new Error(`Не булево значение sortPrice: ${sortPrice}`);
        } 
        this.sortPrice = sortPrice;
        if (sortDir !== false && sortDir !== true) {
            throw new Error(`Не булево значение sortDir: ${sortDir}`);
        }
        this.sortDir = sortDir;
    }

    get list () {
        if (this.sortPrice) {
            const tempArray = this.#goods.slice();
            if (this.sortDir) {
                console.log('По возрастанию');
                tempArray.sort((p1, p2) => (p1.price >= p2.price) ? 1 : -1);
            } else {
                console.log('По убыванию');
                tempArray.sort((p1, p2) => (p1.price <= p2.price) ? 1 : -1);
            }
            return tempArray;
        } else {
            return this.#goods;
        }
    }

    add (value) {
        this.#goods.push(value);
    }

    remove (id) {
        // console.log('Начало цикла')
        for (let i=0; i<this.#goods.length; i++) {
            // console.log(`Цикл ${i} ${this.#goods[i].id}`)
            if (this.#goods[i].id == id) {
                // console.log('Begin to delete')
                this.#goods.splice(i, 1);
                break;
            }
        }
    }
}

const product_1 = new Good(1, 'Кепка', 'black', 52, 1500, true);
const product_2 = new Good(2, 'Штаны', 'Gussi', 54-4, 2500, true);
const product_3 = new Good(3, 'Футболка', 'Light pink', 53-4, 1900, true);
const product_4 = new Good(4, 'Шорты', 'blue', 50-3, 2000, true);
const product_5 = new Good(5, 'Куртка', 'Модная', 54-5, 3500, true);
// console.log(product_1, product_2, product_3, product_4, product_5)

product_5.setAvailable(false);
product_4.setAvailable(false);
// console.log(product_1)

const goodList = new GoodsList('/<regexp>/<flags>', false, true);
// console.log(goodList)
goodList.add(product_1);
goodList.add(product_2);
goodList.add(product_3);
goodList.add(product_4);
goodList.add(product_5);
// console.log(goodList.list)
// goodList.remove(5)
// console.log(goodList.list)
// goodList.remove(2)
console.log(goodList.list);

goodList.sortPrice = true;
console.log(goodList.list);

goodList.sortPrice = false;
console.log(goodList.list);