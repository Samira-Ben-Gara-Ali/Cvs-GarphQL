import { GraphQLError } from "graphql";
import { pubSub } from "./main";
export const Mutation = {
    //ici on destructure input pour acceder directement a ses elements => on evite args.input
    addCv: (parent, { input }, { db }, info) => {

        // on verifie que l user associee a ce cv existe vraiment
        validateExist(db.users, "id", input.userId, "user inexistant !");

        // tous les skills du cv existent dans la bd
        validateExist(db.skills, "id", input.skillIds, "skills invalides!");

        const cvsLength = db.cvs.length;
        let newId;

        //le premier cv a inserer
        if (!cvsLength) {
            newId = 1;
        } else {
            // index commence a partir de 0 => donc on fait length-1 pour avoir le dernier
            newId = db.cvs[cvsLength - 1].id + 1;
        }

        //ici on evite de modifier l argument input directement
        const newCv = {
            id: newId,
            ...input
        };
        db.cvs.push(newCv);

        // on publie l evenement dans le canal et le payload ici = cv
        pubSub.publish("new_cv", { cv: newCv });
        return newCv;
    },

    updateCv: (parent, { id, input }, { db }, info) => {

        const cv = db.cvs.find(c => c.id === id);
        if (!cv) {
            throw new GraphQLError(`cv avec id : '${id}' inexistant`);
        }

        // l user fourni dans le cv doit etre existant dans la bd
        if (input.userId) {
            validateExist(db.users, "id", input.userId, `user avec id : '${input.userId}' inexistant !`);
        }

        // les skills fournis dans le cv dovent figurer dans la liste
        if (input.skillIds) {
            validateExist(db.skills, "id", input.skillIds, "un ou plusieurs skills inexistants !");
        }

        // on met a jour le cv
        for (let key in input) {
            cv[key] = input[key];
        }

        pubSub.publish("update_cv", { cv });

        return cv;
    },

    deleteCv: (parent, { id }, { db }, info) => {

        // on a besoin de l index car la fonction splice prend un index
        const index = db.cvs.findIndex(c => c.id === id);
        if (index === -1) {
            throw new GraphQLError(`CV with id '${id}' not found`);
        }
        const deletedCv = db.cvs[index];

        // on veut supprimer un elt a partir de la position index
        db.cvs.splice(index, 1);

        pubSub.publish("delete_cv", { cv: deletedCv });
        return deletedCv;
    }
};


function validateExist(array, attribut, values, errorMessage) {

    const check = (value) =>
        array.some(element => element[attribut] === value);
    // ici on veut verifier un element simple exmple l existance d un user
    if (!Array.isArray(values)) {
        if (!check(values)) {
            throw new GraphQLError(errorMessage);
        }
    }

    // ici on veut verifier l existance de plusieurs elements exmple skills
    else {
        const allExist = values.every(value => check(value));

        if (!allExist) {
            throw new GraphQLError(errorMessage);
        }
    }
}