import { UserService } from "./services/user.service";
import { RoleService } from "./services/role.service";
import { SkillService } from "./services/skill.service";
import { CvService } from "./services/cv.service";

export const AppContainer = {
    userService: new UserService(),
    roleService: new RoleService(),
    skillService: new SkillService(),
    cvService: new CvService(),
};