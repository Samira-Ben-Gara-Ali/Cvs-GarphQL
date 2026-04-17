// Ceci est un resolver de relation
export const Cv = {
    //recuperer l'user d'un cv => donc le parent ici = cv
    user: (cv, args, { db }, info) =>
        db.users.find(u => u.id === cv.userId),

    //on cherche les skills de la bd qui sont inclus dans le tableau skillIds du cv
    skills: (cv, args, { db }, info) =>
        db.skills.filter(s => cv.skillIds.includes(s.id))
}