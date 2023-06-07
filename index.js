class Good {

    // Класс для хранения данных о товаре.

    constructor (id, name, description, sizes, price, available) {

        // Конструктор класса.
        // id:            код товара;
        // name:          наименование;
        // description:   описание;
        // sizes:         массив возможных размеров;
        // price:         цена товара;
        // available:     признак доступности для продажи.

        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.setAvailable(available);
    }

    setAvailable (available) {

        // Метод измененяет признак доступности для продажи.
        // available: true | false.

        if (available == true) {
            this._available = 'В наличии';
        } else  if (available == false) {
            this._available = 'Нет в наличии';
        }
    }
}


class BasketGood extends Good {

    // Класс дочерний от Good, для хранения данных о товаре в корзине.

    constructor (object) {

        // Конструктор класса.
        // object: объект класса Good;
        // amount: количество товара в корзине.

        super(
            object.id, 
            object.name, 
            object.description, 
            object.sizes, 
            object.price, 
            object.available
        );
        this.amount = 0;
    }
}


class Basket {

    // Класс для хранения данных о корзине товаров.
    // goods: массив объектов класса BasketGood для хранения данных о товарах в корзине.

    goods = [];

    add(good, amount) {

        // Добавляет товар в корзину, если товар уже есть увеличивает количество.

        for (let i=0; i<this.goods.length; i++) {
            if (this.goods[i].id == good.id) {
                this.goods[i].amount += amount;
                return;
            } 
        }
        good.amount += amount
        this.goods.push(good);
    }

    remove(good, amount) {
        // Уменьшает количество товара в корзине, если количество 
        // становится равным нулю, товар удаляется.

        for (let i=0; i<this.goods.length; i++) {
            console.log('Цикл=', i, this.goods)
            if (this.goods[i].id == good.id) {
                this.goods[i].amount -= amount;
                if (this.goods[i].amount <= 0) {
                    this.goods.splice(i, 1);
                }
                return;
            } 
        }
    }

    clear() {
        // Очищает содержимое корзины.
    }

    removeUnavailable() {
        // Удаляет из корзины товары, имеющие признак available === false.
    }

    get totalAmount() {
        // возвращает общую стоимость товаров в корзине
    }

    get totalSum() {
        // возвращает общее количество товаров в корзине
    }
}


class GoodsList {

    // Класс для хранения каталога товаров.
    // #goods: массив экземпляров объектов класса Good (приватное поле).

    #goods = [];

    constructor (filter, sortPrice, sortDir) {

        // Конструктор класса.
        // filter:       регулярное выражение используемое для фильтрации товаров по полю name;
        // sortPrice:    булево значение, признак включения сортировки по полю Price;
        // sortDir:      булево значение, признак направления сортировки по полю Price 
        //               (true - по возрастанию, false - по убыванию).

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

        // Возвращает массив доступных для продажи товаров в соответствии 
        // с установленным фильтром и сортировкой по полю Price.

        // Реализовать фильтр !!!!!!!!!!!!****************!!!!!!!!!!!!!!
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

        // Добавление товара в каталог.

        this.#goods.push(value);
    }

    remove (id) {

        // Удаление товара из каталога по его id.

        for (let i=0; i<this.#goods.length; i++) {
            if (this.#goods[i].id == id) {
                this.#goods.splice(i, 1);
                break;
            }
        }
    }
}

const product_1 = new Good(1, 'Кепка', 'black', [52, 54, 56], 1500, true);
const product_2 = new Good(2, 'Штаны', 'Gussi', [54-4, 54-5, 56-3, 56-5], 2500, true);
const product_3 = new Good(3, 'Футболка', 'Light pink', [52-4, 53-4, 56-5], 1900, true);
const product_4 = new Good(4, 'Шорты', 'blue', [50-3], 2000, true);
const product_5 = new Good(5, 'Куртка', 'Модная', [54-5], 3500, true);
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

const basket_good_1 = new BasketGood(product_5);
const basket_good_2 = new BasketGood(product_2);
const basket_good_3 = new BasketGood(product_5);
// console.log(basket_good_1, basket_good_2);

const basket = new Basket();
basket.add(basket_good_1, 8);
basket.add(basket_good_3, 12);
basket.add(basket_good_2, 17);
// console.log(basket);

basket.remove(basket_good_2, 6)
basket.remove(basket_good_2, 11)
console.log(basket);