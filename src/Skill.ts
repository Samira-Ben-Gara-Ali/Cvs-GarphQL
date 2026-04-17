// Ceci est un resolver de relation
export const Skill={
    // ici on veut recuperer les cvs contenant un skill particuler =? parent = skill
    cvs: (skill, args, { db }, info) =>
        db.cvs.filter(c => c.skillIds.includes(skill.id))
}