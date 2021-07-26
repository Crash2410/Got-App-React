export default class GotService {
    _apiBase = 'https://anapioficeandfire.com/api'

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacters = async (id) => {
        const characters = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(characters);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses');
        return res.map(this._transformHouses);
    }

    getHouse = async (id) => {
        const houses = await this.getResource(`/houses/${id}`);
        return this._transformHouses(houses);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books');
        return res.map(this._transformBooks);
    }

    getBooks = async (id) => {
        const books = await this.getResource(`/books/${id}`);
        return this._transformBooks(books);
    }

    alertNotInformation = (data) => {
        if (data && !!data) {
            return data;
        } else {
            return 'Not Information';
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _formatDate = (date) => {
        const time = new Date(Date.parse(date));
        const year = time.getFullYear();
        const mount = time.getMonth() < 10 ? '0' + time.getMonth() : time.getMonth();
        const dates = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();

        return `${year}/${mount}/${dates}`;
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.alertNotInformation(char.name),
            gender: this.alertNotInformation(char.gender),
            born: this.alertNotInformation(char.born),
            died: this.alertNotInformation(char.died),
            culture: this.alertNotInformation(char.culture)
        }
    }

    _transformHouses = (house) => {
        return {
            id: this._extractId(house),
            name: this.alertNotInformation(house.name),
            region: this.alertNotInformation(house.region),
            words: this.alertNotInformation(house.words),
            titles: this.alertNotInformation(house.titles[0]),
            overlord: this.alertNotInformation(house.overlord),
            ancestralWeapons: this.alertNotInformation(house.ancestralWeapons)
        }
    }

    _transformBooks = (book) => {
        return {
            id: this._extractId(book),
            name: this.alertNotInformation(book.name),
            numberOfPages: this.alertNotInformation(book.numberOfPages),
            publisher: this.alertNotInformation(book.publisher),
            released: this._formatDate(this.alertNotInformation(book.released)),
            authors: this.alertNotInformation(book.authors)
        }
    }
}