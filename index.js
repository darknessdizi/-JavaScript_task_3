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
            this.available = true;
        } else  if (available == false) {
            this.available = false;
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
            if (this.goods[i].id == good.id) {
                this.goods[i].amount -= amount;
                if (this.goods[i].amount <= 0) {
                    this.goods[i].amount = 0;
                    this.goods.splice(i, 1);
                }
                return;
            } 
        }
    }

    clear() {

        // Очищает содержимое корзины.

        this.goods.forEach(object => object.amount = 0);
        this.goods.splice(0, this.goods.length);
    }

    removeUnavailable() {

        // Удаляет из корзины товары, имеющие признак available === false.

        let newArray = this.goods.filter(object => object.available ? true : object.amount = 0);
        this.goods = newArray;
    }

    get totalAmount() {

        // возвращает общую стоимость товаров в корзине

        let total = this.goods.reduce((sum, object) => sum + (object.price * object.amount), 0);
        return total
    }

    get totalSum() {

        // возвращает общее количество товаров в корзине

        let total = 0;
        this.goods.forEach(object => total += object.amount);
        return total
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
        // с установленным фильтром полня name и сортировкой по полю Price.

        let tempArray = this.#goods.filter(object => this.filter.test(object.name));
        if (this.sortPrice) {
            if (this.sortDir) {
                // console.log('По возрастанию');
                tempArray.sort((p1, p2) => (p1.price >= p2.price) ? 1 : -1);
            } else {
                // console.log('По убыванию');
                tempArray.sort((p1, p2) => (p1.price <= p2.price) ? 1 : -1);
            }
        } 
        return tempArray;
    }

    add (value) {

        // Добавление товара в каталог.
        // value: объект класса Good.

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
const product_6 = new Good(6, 'Штаны короткие', 'Самые короткие в мире', [54-4, 54-5, 56-3, 56-5], 1000, true);
const product_7 = new Good(7, 'шТАны узкие', 'Для самых узких', [54-4, 54-5, 56-3], 1100, true);
const product_8 = new Good(8, 'Cool штаны-рыбацкие', 'Go на рыбалку', [54-4, 56-5], 1300, true);

product_5.setAvailable(false);
product_4.setAvailable(false);
product_7.setAvailable(false);

const goodList = new GoodsList(/штан/i, true, false);

goodList.add(product_1);
goodList.add(product_2);
goodList.add(product_3);
goodList.add(product_4);
goodList.add(product_5);
goodList.add(product_6);
goodList.add(product_7);
goodList.add(product_8);
console.log('Наполнили каталог GoodsList:', goodList.list)

goodList.remove(8)
console.log('Удалили элемент из GoodsList:', goodList.list)

goodList.sortDir = true;
console.log('Поменяли сортировку GoodsList (стало по возрастанию):', goodList.list);

goodList.sortPrice = false;
console.log('Отменили сортировку по цене GoodsList:', goodList.list);

const basket_good_1 = new BasketGood(product_1);
const basket_good_2 = new BasketGood(product_2);
const basket_good_3 = new BasketGood(product_3);
const basket_good_4 = new BasketGood(product_4);
const basket_good_5 = new BasketGood(product_5);
const basket_good_6 = new BasketGood(product_6);
const basket_good_7 = new BasketGood(product_7);
const basket_good_8 = new BasketGood(product_8);

const basket = new Basket();

basket.add(basket_good_1, 8);
basket.add(basket_good_3, 12);
basket.add(basket_good_2, 17);
basket.add(basket_good_2, 43);
basket.add(basket_good_4, 110);
basket.add(basket_good_5, 34);
console.log('Наполнили корзину basket:', basket.goods);

basket.remove(basket_good_2, 6);
basket.remove(basket_good_2, 11);
basket.remove(basket_good_5, 100);
console.log('Удалили элементы в корзине basket:', basket.goods);

basket.removeUnavailable();
console.log('Убрали элементы содержащие false в поле available:', basket.goods);

console.log('Общая стоимость товаров в корзине:', basket.totalAmount);
console.log('Общее количество товаров в корзине:', basket.totalSum);

basket.clear();
console.log('Корзина basket после очистки', basket.goods);