const addBtn = document.querySelector('.car__add'),
    editBtn = document.querySelector('.car__edit'),
    actionBtn = document.querySelector('.car__action');

const inputModel = document.getElementById('model'),
    inputColor = document.getElementById('color'),
    inputPower = document.getElementById('power'),
    inputPrice = document.getElementById('price');

const sortOptions = document.getElementById('car__options1'),
    searchOptions = document.getElementById('car__options2'),
    searchInput = document.querySelector('.car__search input');

const itemsContainer = document.querySelector('.items-car'),
    carInputs = document.querySelector('.car__inputs');

const itemsList = document.querySelectorAll('.items-car__radioBtn');

function CreateObject(model, color, power, price) {
    this.model = model;
    this.color = color;
    this.power = power;
    this.price = price;
}

itemsArr = [
    {
        model: 'Lamborghini',
        color: 'Gold',
        power: 800,
        price: 15000000
    },
    {
        model: 'BMW',
        color: 'Gray',
        power: 400,
        price: 3000000
    },
    {
        model: 'Audi',
        color: 'Black',
        power: 200,
        price: 1500000
    },
    {
        model: 'Ford',
        color: 'Blue',
        power: 150,
        price: 800000
    },
    {
        model: 'Opel',
        color: 'Green',
        power: 180,
        price: 700000
    },
    {
        model: 'Suzuki',
        color: 'Red',
        power: 300,
        price: 2500000
    }
];

const printItems = (array, value) => {
    itemsContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        itemsContainer.innerHTML += `
        <div class="items-car__item">
            <div class="items-car__options">
                <div class="items-car__model options">
                    Марка: <span>${array[i].model}</span>
                </div>
                <div class="items-car__color options">
                    Цвет: <span>${array[i].color}</span>
                </div>
                <div class="items-car__power options">
                    Мощность: <span>${array[i].power}</span>HP
                </div>
                <div class="items-car__price options">
                    Цена: <span>${array[i].price}</span>₽
                </div>
                <div class="items-car__delete">
                    <span>Удалить</span>
                </div>
                </div>
            <div class="items-car__radioBtn ${value}">
                <input type="radio" name="item">
            </div>
        </div>
        `;
    }
}

const checkInputs = () => {
    let str1 = inputModel.value,
        str2 = inputColor.value,
        str3 = inputPower.value,
        str4 = inputPrice.value;
    if (!Number.isInteger(parseInt(str3)) || !Number.isInteger(parseInt(str4))) {
        alert('Введите числа в 3 и 4 инпут!');
        return false;
    }
    let strsArr = [str1, str2, str3, str4];
    let space = 0, alpha = 0;
    for (let str of strsArr) {
        if (str.length == 0) {
            alert('Заполните все поля для ввода!');
            return false;
        }
        for (let len = 0; len < str.length; len++) {
            if (str[len] == ' ') space++;
            else alpha++;
        }
        if (space > alpha / 2) {
            alert('Заполните корректно все поля для ввода!');
            return false;
        }
    }
    return true
}

const clearInputs = () => {
    inputModel.value = '';
    inputColor.value = '';
    inputPower.value = '';
    inputPrice.value = '';
}

const addItem = () => {
    let model = inputModel.value[0].toUpperCase() + inputModel.value.slice(1),
        color = inputColor.value[0].toUpperCase() + inputColor.value.slice(1),
        power = inputPower.value,
        price = inputPrice.value;
    itemsArr.push(new CreateObject(model, color, power, price));
    clearInputs();
    printItems(itemsArr, 'none');
}

const editItem = value => {
    let radioBtnes = document.querySelectorAll('.items-car__radioBtn input');
    for (let len = 0; len < radioBtnes.length; len++) {
        if (radioBtnes[len].checked) {
            let model = inputModel.value[0].toUpperCase() + inputModel.value.slice(1),
                color = inputColor.value[0].toUpperCase() + inputColor.value.slice(1),
                power = inputPower.value,
                price = inputPrice.value;
            itemsArr.splice(len, 1, new CreateObject(model, color, power, price))
        }
    }
    clearInputs();
    printItems(itemsArr, 'active');
    prepareNextRadioBtnes();
}

const editRadioBtn = act => {
    for (let item of itemsList) act ? item.classList.add('none') : item.classList.remove('none');
}

const itemsPrepare = (index, checked) => {
    console.log(itemsArr[index].model);
    inputModel.value = itemsArr[index].model;
    inputColor.value = itemsArr[index].color;
    inputPower.value = itemsArr[index].power;
    inputPrice.value = itemsArr[index].price;
}

const prepareNextRadioBtnes = () => checkClickRadioBtnes();

const checkClickRadioBtnes = () => {
    let radioBtnes = document.querySelectorAll('.items-car__radioBtn input');
    for (let len = 0; len < radioBtnes.length; len++) {
        radioBtnes[len].addEventListener('click', () => {
            itemsPrepare(len, radioBtnes[len].checked);
            prepareNextRadioBtnes();
        });
    }
}

const prepareNextDelete = () => checkClickDelete();

const checkClickDelete = () => {
    let btnsDelete = document.querySelectorAll('.items-car__delete');
    for (let len = 0; len < btnsDelete.length; len++) {
        btnsDelete[len].addEventListener('click', () => {
            itemsArr.splice(len, 1);
            printItems(itemsArr, actionBtn.innerText == addBtn.innerText ? 'none' : 'active');
            prepareNextRadioBtnes();
            prepareNextDelete();
        });
    }
}

const allPrepare = () => {
    clearInputs();
    prepareNextRadioBtnes();
    prepareNextDelete();
}

printItems(itemsArr, 'none');

prepareNextDelete();

addBtn.addEventListener('click', () => {
    editBtn.classList.remove('active');
    addBtn.classList.add('active');
    carInputs.classList.remove('edit');
    carInputs.classList.add('add');
    actionBtn.innerHTML = addBtn.innerText;
    editRadioBtn(true);
    printItems(itemsArr, 'none');
    allPrepare();
});

editBtn.addEventListener('click', () => {
    addBtn.classList.remove('active');
    editBtn.classList.add('active');
    carInputs.classList.remove('add');
    carInputs.classList.add('edit');
    actionBtn.innerHTML = editBtn.innerText;
    editRadioBtn(false);
    printItems(itemsArr, 'active');
    allPrepare();
});

actionBtn.addEventListener('click', () => {
    actionBtn.innerText == addBtn.innerText ? checkInputs() ? addItem() : 0 : checkInputs() ? editItem() : 0;
    prepareNextDelete();
});

sortOptions.addEventListener('click', () => {
    switch (sortOptions.selectedIndex) {
        case 1:
            itemsArr.sort((a, b) => a.model > b.model ? 1 : -1);
            break;
        case 2:
            itemsArr.sort((a, b) => a.power - b.power);
            break;
        case 3:
            itemsArr.sort((a, b) => a.price - b.price);
            break;
        default:
            break;
    }
    printItems(itemsArr, actionBtn.innerText == addBtn.innerText ? 'none' : 'active');
    allPrepare();
});

searchInput.addEventListener('input', () => {
    let searchResultArr = [];
    for (item of itemsArr) {
        console.log(searchOptions.selectedIndex);
        switch (searchOptions.selectedIndex) {
            case 0:
                (item.model).toLowerCase().includes(searchInput.value) ? searchResultArr.push(item) : 0;
                break;
            case 1:
                (item.color).toLowerCase().includes(searchInput.value) ? searchResultArr.push(item) : 0;
                break;
            case 2:
                String(item.power).includes(searchInput.value) ? searchResultArr.push(item) : 0;
                break;
            case 3:
                String(item.price).includes(searchInput.value) ? searchResultArr.push(item) : 0;
                break;
            default:
                break;
        }
    }
    printItems(searchResultArr, actionBtn.innerText == addBtn.innerText ? 'none' : 'active');
    allPrepare();
});