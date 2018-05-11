const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Long',
            room: 'A'
        }, {
            id: '2',
            name: 'Son',
            room: 'B'
        }, {
            id: '3',
            name: 'Hai',
            room: 'A'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1',
            name: 'Nhech',
            room: 'A'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userID = '1';
        var user = users.getUser(userID);

        expect(user.id).toBe(userID);
    });

    it('should not find user', () => {
        var userID = '99';
        var user = users.getUser(userID);
        expect(user).toBeFalsy();
    });

    it('should return names for A ', () => {
        var userList = users.getUserList('A');

        expect(userList).toEqual(['Long', 'Hai']);
    });
    it('should return names for B', () => {
        var userList = users.getUserList('B');

        expect(userList).toEqual(['Son']);
    });
});