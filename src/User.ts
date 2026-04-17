// Ceci est un resolver de relation
export const User = {
    // ici on veut recuperer les cvs d un user donc le parent = user
    cvs: (user, args, { db }, info) =>
        // a partir du tableau cvs de la bs on ne garde que les cvs de notre user
        db.cvs.filter(c => c.userId === user.id)
}