import { UserService } from "./services/user.service";
import { SkillService } from "./services/skill.service";
import { CvService } from "./services/cv.service";

export const AppContainer = {
    userService: new UserService(),
    skillService: new SkillService(),
    cvService: new CvService(),
};