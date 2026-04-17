export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export const DB = {
    users: [
        {
            id: "1",
            name: "samira",
            email: "samira@gmail.com",
            role: Role.ADMIN
        },
        {
            id: "2",
            name: "lolo",
            email: "lolo@gmail.com",
            role: Role.USER
        }
    ],

    skills: [
        {
            id: "1",
            designation: "Danse"
        },
        {
            id: "2",
            designation: "Chant"
        },
        {
            id: "3",
            designation: "Peinture"
        }
    ],

    cvs: [
        {
            id: "1",
            name: "Danse",
            age: 25,
            job: "Danceuse",
            userId: "1",
            skillIds: ["1", "2"]
        },
        {
            id: "2",
            name: "Chant",
            age: 30,
            job: "Chanteuse",
            userId: "2",
            skillIds: ["2", "3"]
        }
    ]
}