"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'foobar',
            database: 'heydaily',
            multipleStatements: true,
        });
        return connection;
    });
}
function testConnectivity() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error(`Unable to connect to the database: ${error.message}`);
            process.exit(1);
        }
    });
}
function createDbStructure() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield connect();
        const tableStructure = readFileSync('./db/create-tables.sql').toString();
        console.log('Creating table structure...');
        yield connection.query(tableStructure);
        console.log('Table structure created ok!');
    });
}
function runQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield connect();
        return connection.query(query);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield testConnectivity();
        yield createDbStructure();
        process.exit();
    });
}
module.exports = {
    init,
    runQuery,
};
