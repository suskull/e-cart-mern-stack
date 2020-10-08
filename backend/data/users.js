import bcryptjs from 'bcryptjs';


const users = [
    { 
        name: "Admin",
        password: bcryptjs.hashSync('123456', 10),
        email: 'admin@gmail.com',
        isAdmin: true
    },
    { 
        name: "User1",
        password: bcryptjs.hashSync('123456', 10),
        email: 'user1@gmail.com',
        isAdmin: false
    },
    { 
        name: "User2",
        password: bcryptjs.hashSync('123456', 10),
        email: 'user2@gmail.com',
    }
]

export default users