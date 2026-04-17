import {AppDataSource} from "./app-data.source";
import {User} from "./entities/user.entity";
import {Role} from "./entities/role.entity";
import {Skill} from "./entities/skill.entity";
import {Cv} from "./entities/cv.entity";
import {UserService} from "./services/user.service";
import {RoleService} from "./services/role.service";
import {SkillService} from "./services/skill.service";
import {CvService} from "./services/cv.service";

const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);
const skillRepository = AppDataSource.getRepository(Skill);
const cvRepository = AppDataSource.getRepository(Cv);
const userService = new UserService(userRepository);
const roleService = new RoleService(roleRepository);
const skillService = new SkillService(skillRepository);
const cvService = new CvService(cvRepository);

export const AppContainer = {
    userRepository,
    roleRepository,
    skillRepository,
    cvRepository,
    userService,
    roleService,
    skillService,
    cvService,
}